import React from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import type { FurnitureItem } from '../../store/useAppStore';
import { useAppStore } from '../../store/useAppStore';

interface CanvasItemProps {
  item: FurnitureItem;
}

export const CanvasItem: React.FC<CanvasItemProps> = ({ item }) => {
  const { selectItem, updateItem, selectedId } = useAppStore();
  const isSelected = selectedId === item.id;

  return (
    <Rnd
      size={{ width: Number(item.width) || 50, height: Number(item.height) || 50 }}
      position={{ 
        x: (typeof item.x === 'number' && !Number.isNaN(item.x)) ? item.x : 0, 
        y: (typeof item.y === 'number' && !Number.isNaN(item.y)) ? item.y : 0 
      }}
      onDragStop={(_e, d) => {
        updateItem(item.id, { x: d.x, y: d.y });
      }}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        updateItem(item.id, {
          width: parseFloat(ref.style.width),
          height: parseFloat(ref.style.height),
          ...position,
        });
      }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        selectItem(item.id);
      }}
      bounds="parent"
      style={{ zIndex: (item.layer || 1) + (isSelected ? 100 : 0) }}
      enableResizing={isSelected}
    >
      <motion.div
        className={`w-full h-full flex items-center justify-center rounded-lg cursor-move select-none relative
          ${isSelected
            ? 'ring-2 ring-primary ring-offset-1 shadow-xl shadow-primary/20'
            : 'hover:ring-2 hover:ring-primary/40 hover:shadow-lg'
          }`}
        style={{
          transform: `rotate(${item.rotation}deg)`,
          backgroundColor: item.color || '#EDE0D4',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '8px',
          transition: 'box-shadow 0.2s, ring 0.2s',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        layout
      >
        {/* Inner content — counter-rotated so emoji stays upright */}
        <div
          className="flex flex-col items-center justify-center gap-1 pointer-events-none"
          style={{ transform: `rotate(${-item.rotation}deg)` }}
        >
          <span className="text-2xl drop-shadow-sm leading-none">{item.thumbnail}</span>
          {item.width > 50 && item.height > 30 && (
            <span className="text-[9px] font-semibold text-dark/50 leading-none px-1 truncate max-w-full">
              {item.name}
            </span>
          )}
        </div>

        {/* Selection handles indicator */}
        {isSelected && (
          <>
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white shadow-sm" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white shadow-sm" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white shadow-sm" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white shadow-sm" />
          </>
        )}
      </motion.div>
    </Rnd>
  );
};
