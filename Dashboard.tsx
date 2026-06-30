import React, { useRef, useState, useCallback } from 'react';
import {
  DndContext, useSensor, useSensors, PointerSensor, DragOverlay,
  type DragEndEvent, type DragStartEvent
} from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Undo2, Redo2, Save, Download, Sparkles,
  Moon, Sun, RotateCcw
} from 'lucide-react';

import { CatalogSidebar } from '../components/catalog/CatalogSidebar';
import { CanvasArea } from '../components/canvas/CanvasArea';
import { PropertiesPanel } from '../components/properties/PropertiesPanel';
import { ExportModal } from '../components/common/ExportModal';
import { ToastContainer } from '../components/common/Toast';
import { useAppStore } from '../store/useAppStore';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useLocalStorage } from '../hooks/useLocalStorage';

// --- AI Layout positions (deterministic "smart" layout)
const AI_LAYOUTS: Record<string, { x: number; y: number; rotation: number }> = {
  'Modern Sofa': { x: 80, y: 200, rotation: 0 },
  'L-Shape Sofa': { x: 60, y: 180, rotation: 0 },
  'Coffee Table': { x: 140, y: 230, rotation: 0 },
  'Dining Table': { x: 300, y: 80, rotation: 0 },
  'Armchair': { x: 220, y: 200, rotation: 45 },
  'Queen Bed': { x: 80, y: 80, rotation: 0 },
  'King Bed': { x: 60, y: 60, rotation: 0 },
  'Bookshelf': { x: 380, y: 20, rotation: 0 },
  'Potted Plant': { x: 10, y: 10, rotation: 0 },
};

const STORAGE_KEY = 'interiorcraft-ai-layout';

const Dashboard: React.FC = () => {
  const { undo, redo, history, historyIndex, addItem, items, updateItem } = useAppStore();
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const [activeDragItem, setActiveDragItem] = useState<any>(null);
  const [showExport, setShowExport] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; message: string; type?: 'success' | 'error' | 'info' }[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  // Activate hooks
  useKeyboardShortcuts();
  useLocalStorage();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
    setToasts(t => [...t, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  // Save design
  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, room: useAppStore.getState().room }));
      addToast('Design saved successfully! 🎉', 'success');
    } catch {
      addToast('Could not save design', 'error');
    }
  };

  // AI layout suggestion
  const handleAILayout = () => {
    setAiLoading(true);
    setTimeout(() => {
      items.forEach(item => {
        const pos = AI_LAYOUTS[item.name];
        if (pos) updateItem(item.id, pos);
      });
      setAiLoading(false);
      addToast('✨ AI layout applied!', 'success');
    }, 1200);
  };

  // Reset
  const handleReset = () => {
    if (window.confirm('Reset the entire layout? This cannot be undone.')) {
      useAppStore.setState({ items: [], selectedId: null, history: [[]], historyIndex: 0 });
      addToast('Canvas reset', 'info');
    }
  };

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'catalog-item') {
      setActiveDragItem(event.active.data.current.item);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragItem(null);
    const { active, over } = event;
    if (over?.id === 'canvas-droppable' && active.data.current?.type === 'catalog-item') {
      const item = active.data.current.item;
      // Calculate position within canvas
      const canvasEl = canvasRef.current;
      let x = 60, y = 60;
      if (canvasEl && active.rect.current.translated) {
        const rect = canvasEl.getBoundingClientRect();
        const translated = active.rect.current.translated;
        x = Math.max(0, Math.min(translated.left - rect.left, rect.width - item.defaultWidth));
        y = Math.max(0, Math.min(translated.top - rect.top, rect.height - item.defaultHeight));
      }
      addItem({
        name: item.name,
        category: item.category,
        width: item.defaultWidth,
        height: item.defaultHeight,
        thumbnail: item.thumbnail,
        x,
        y,
        color: '#EDE0D4',
      });
      addToast(`${item.thumbnail} ${item.name} added`, 'success');
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={`flex flex-col h-screen font-sans ${darkMode ? 'bg-dark text-white' : 'bg-surface text-dark'}`}>
        {/* ── Topbar ── */}
        <header className={`h-14 flex items-center px-5 justify-between shrink-0 border-b z-50 shadow-sm
          ${darkMode ? 'bg-dark-light border-white/10' : 'bg-white border-dark/10'}`}>
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm shadow shadow-primary/30 hover:scale-105 transition-transform">
              IC
            </Link>
            <span className={`font-bold tracking-tight text-sm hidden sm:block ${darkMode ? 'text-white' : 'text-dark'}`}>
              InteriorCraft <span className="text-primary">AI</span>
            </span>
          </div>

          {/* Center: History + AI */}
          <div className="flex items-center gap-1">
            <TopBtn onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)" dark={darkMode}>
              <Undo2 size={15} />
            </TopBtn>
            <TopBtn onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Y)" dark={darkMode}>
              <Redo2 size={15} />
            </TopBtn>

            <div className={`w-px h-6 mx-2 ${darkMode ? 'bg-white/10' : 'bg-dark/10'}`} />

            <motion.button
              onClick={handleAILayout}
              disabled={aiLoading || items.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-primary text-white text-xs font-bold shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              whileTap={{ scale: 0.95 }}
            >
              {aiLoading ? (
                <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                  <Sparkles size={14} />
                </motion.span>
              ) : (
                <Sparkles size={14} />
              )}
              {aiLoading ? 'Optimizing…' : '✨ AI Layout'}
            </motion.button>

            <div className={`w-px h-6 mx-2 ${darkMode ? 'bg-white/10' : 'bg-dark/10'}`} />

            <TopBtn onClick={handleReset} title="Reset canvas" dark={darkMode}>
              <RotateCcw size={15} />
            </TopBtn>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <TopBtn onClick={() => setDarkMode(d => !d)} title="Toggle dark mode" dark={darkMode}>
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </TopBtn>

            <div className={`w-px h-6 ${darkMode ? 'bg-white/10' : 'bg-dark/10'}`} />

            <motion.button
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors
                ${darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-surface text-dark hover:bg-dark/5'}`}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={14} /> Save
            </motion.button>

            <motion.button
              onClick={() => setShowExport(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark text-white text-xs font-bold shadow hover:bg-dark-light transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Download size={14} /> Export
            </motion.button>
          </div>
        </header>

        {/* ── Workspace ── */}
        <div className="flex flex-1 overflow-hidden relative">
          <CatalogSidebar darkMode={darkMode} />
          <CanvasArea canvasRef={canvasRef} />
          <PropertiesPanel darkMode={darkMode} />
        </div>
      </div>

      {/* Modals & overlays */}
      <ExportModal canvasRef={canvasRef} isOpen={showExport} onClose={() => setShowExport(false)} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* DnD ghost */}
      <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
        {activeDragItem && (
          <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-primary shadow-2xl flex items-center justify-center scale-110">
            <span className="text-4xl">{activeDragItem.thumbnail}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

// Small reusable topbar button
const TopBtn = ({
  onClick, disabled = false, title, dark, children
}: { onClick: () => void; disabled?: boolean; title?: string; dark?: boolean; children: React.ReactNode }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded-lg transition-colors ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
      ${dark ? 'text-white hover:bg-white/10' : 'text-dark/70 hover:bg-dark/5 hover:text-dark'}`}
    whileTap={disabled ? {} : { scale: 0.9 }}
  >
    {children}
  </motion.button>
);

export default Dashboard;
