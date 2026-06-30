import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Trash2, RotateCw, ArrowUp, ArrowDown } from 'lucide-react';

const COLORS = ['#EDE0D4', '#84A98C', '#D4A373', '#2F3E46', '#FAF7F2', '#A8DADC', '#F4A261', '#E9C46A'];

export const PropertiesPanel: React.FC<{ darkMode?: boolean }> = ({ darkMode }) => {
  const { items, selectedId, updateItem, removeItem } = useAppStore();
  const selectedItem = items.find(i => i.id === selectedId);

  if (!selectedItem) {
    return (
      <aside className={`w-64 ${darkMode ? 'bg-dark text-white border-white/10' : 'bg-white text-dark border-dark/10'} border-l flex flex-col shrink-0 p-6 h-full items-center justify-center text-center`}>
        <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center text-4xl mb-4 shadow-inner">
          🛋️
        </div>
        <p className="text-sm text-dark/50 font-medium leading-relaxed">
          Select an item on the canvas to edit its properties
        </p>
        <div className="mt-8 p-4 bg-surface rounded-2xl text-left space-y-2 w-full">
          <p className="text-[10px] font-bold text-dark/40 uppercase tracking-wider mb-3">Shortcuts</p>
          <ShortcutRow keys="Del" label="Remove" />
          <ShortcutRow keys="R" label="Rotate 45°" />
          <ShortcutRow keys="Ctrl+Z" label="Undo" />
          <ShortcutRow keys="Ctrl+Y" label="Redo" />
        </div>
      </aside>
    );
  }

  const handleChange = (field: keyof typeof selectedItem, value: number | string) => {
    updateItem(selectedItem.id, { [field]: value });
  };

  const bringForward = () => handleChange('layer', (selectedItem.layer || 1) + 1);
  const sendBackward = () => handleChange('layer', Math.max((selectedItem.layer || 1) - 1, 0));

  return (
    <aside className={`w-64 ${darkMode ? 'bg-dark text-white border-white/10' : 'bg-white text-dark border-dark/10'} border-l flex flex-col shrink-0 h-full overflow-y-auto`}>
      {/* Header */}
      <div className="p-5 border-b border-dark/5 bg-surface/50">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">{selectedItem.thumbnail}</span>
          <div>
            <h2 className="text-base font-bold text-dark leading-tight">{selectedItem.name}</h2>
            <span className="text-[10px] font-semibold text-dark/40 uppercase tracking-wider">{selectedItem.category}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-5 space-y-6 overflow-y-auto">
        {/* Position */}
        <Section title="Position">
          <div className="flex gap-2">
            <NumInput label="X" value={Math.round(selectedItem.x)} onChange={v => handleChange('x', v)} />
            <NumInput label="Y" value={Math.round(selectedItem.y)} onChange={v => handleChange('y', v)} />
          </div>
        </Section>

        {/* Size */}
        <Section title="Size">
          <div className="flex gap-2">
            <NumInput label="W" value={Math.round(selectedItem.width)} onChange={v => handleChange('width', v)} />
            <NumInput label="H" value={Math.round(selectedItem.height)} onChange={v => handleChange('height', v)} />
          </div>
        </Section>

        {/* Rotation */}
        <Section title="Rotation">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={360}
                step={1}
                value={selectedItem.rotation}
                onChange={e => handleChange('rotation', Number(e.target.value))}
                className="flex-1 accent-primary h-1.5 cursor-pointer"
              />
              <div className="w-14 bg-surface border border-dark/5 rounded-lg px-2 py-1 text-sm font-medium text-center text-dark">
                {selectedItem.rotation}°
              </div>
            </div>
            <button
              onClick={() => handleChange('rotation', (selectedItem.rotation + 45) % 360)}
              className="flex items-center gap-2 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
            >
              <RotateCw size={13} /> Rotate 45°
            </button>
          </div>
        </Section>

        {/* Color */}
        <Section title="Color">
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <button
                key={color}
                onClick={() => handleChange('color', color)}
                className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 shadow-sm ${selectedItem.color === color ? 'border-dark scale-110 shadow-md' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </Section>

        {/* Layer */}
        <Section title="Layer Order">
          <div className="flex gap-2">
            <button
              onClick={bringForward}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-surface border border-dark/5 text-xs font-semibold text-dark hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
            >
              <ArrowUp size={13} /> Forward
            </button>
            <button
              onClick={sendBackward}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-surface border border-dark/5 text-xs font-semibold text-dark hover:bg-surface hover:border-dark/20 transition-all"
            >
              <ArrowDown size={13} /> Backward
            </button>
          </div>
        </Section>

        {/* Delete */}
        <div className="pt-2">
          <button
            onClick={() => removeItem(selectedItem.id)}
            className="w-full py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 size={15} /> Remove Item
          </button>
        </div>
      </div>
    </aside>
  );
};

// Helper sub-components
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <label className="text-[10px] font-bold text-dark/40 uppercase tracking-widest block mb-2.5">{title}</label>
    {children}
  </div>
);

const NumInput = ({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) => (
  <div className="flex-1">
    <div className="flex items-center bg-surface border border-dark/5 rounded-xl px-2.5 py-2 focus-within:border-primary focus-within:bg-white transition-all">
      <span className="text-[10px] font-bold text-dark/30 mr-1.5 shrink-0">{label}</span>
      <input
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full bg-transparent text-sm font-semibold text-dark outline-none min-w-0"
      />
    </div>
  </div>
);

const ShortcutRow = ({ keys, label }: { keys: string; label: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-dark/50">{label}</span>
    <kbd className="text-[10px] font-mono bg-white border border-dark/10 rounded-md px-1.5 py-0.5 text-dark/60 shadow-sm">{keys}</kbd>
  </div>
);
