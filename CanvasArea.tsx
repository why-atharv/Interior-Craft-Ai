import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { CanvasItem } from './CanvasItem';
import { MiniMap } from './MiniMap';

interface CanvasAreaProps {
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({ canvasRef }) => {
  const { room, items, selectItem } = useAppStore();
  const [zoom, setZoom] = React.useState(100);

  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-droppable' });

  // 1 ft = 40px
  const scale = 40;
  const canvasWidth = room.width * scale;
  const canvasHeight = room.height * scale;

  const zoomIn = () => setZoom(z => Math.min(z + 10, 200));
  const zoomOut = () => setZoom(z => Math.max(z - 10, 50));

  const setRef = (el: HTMLDivElement | null) => {
    (setNodeRef as any)(el);
    (canvasRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  return (
    <main
      className="flex-1 bg-surface relative overflow-hidden flex items-center justify-center"
      onClick={() => selectItem(null)}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#84A98C 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.12,
        }}
      />

      {/* Zoom wrapper */}
      <div
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center', transition: 'transform 0.2s ease' }}
      >
        {/* Room canvas */}
        <div
          ref={setRef}
          className={`bg-white relative transition-all duration-300 overflow-hidden
            ${isOver ? 'ring-4 ring-primary/40 shadow-2xl shadow-primary/20' : 'shadow-2xl'}`}
          style={{
            width: canvasWidth,
            height: canvasHeight,
            border: `4px solid ${isOver ? '#84A98C' : 'rgba(47,62,70,0.08)'}`,
            borderRadius: '4px',
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.03) 39px, rgba(0,0,0,0.03) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.03) 39px, rgba(0,0,0,0.03) 40px)',
            backgroundColor: '#f9f6f1',
          }}
        >
          <AnimatePresence>
            {items.map(item => (
              <CanvasItem key={item.id} item={item} />
            ))}
          </AnimatePresence>

          {items.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-3">
              <div className="text-4xl opacity-20">🛋️</div>
              <span className="text-dark/30 text-sm font-medium">Drag furniture here to begin</span>
            </div>
          )}
        </div>
      </div>

      {/* Room dimension label */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 glass px-4 py-1.5 rounded-full text-xs font-semibold text-dark/50 border border-dark/5">
        {room.width} ft × {room.height} ft
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass px-5 py-2.5 rounded-full flex items-center gap-5 z-20 shadow-lg border border-dark/5">
        <button onClick={zoomOut} className="text-dark/60 hover:text-primary transition-colors" title="Zoom Out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/></svg>
        </button>
        <span className="text-sm font-bold text-dark w-12 text-center">{zoom}%</span>
        <button onClick={zoomIn} className="text-dark/60 hover:text-primary transition-colors" title="Zoom In">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>

      {/* Mini Map */}
      <MiniMap />
    </main>
  );
};
