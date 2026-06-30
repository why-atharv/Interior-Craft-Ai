import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { FurnitureCategory } from '../../store/useAppStore';

interface DraggableCatalogItemProps {
  id: string;
  name: string;
  category: FurnitureCategory;
  defaultWidth: number;
  defaultHeight: number;
  thumbnail: string;
}

export const DraggableCatalogItem: React.FC<DraggableCatalogItemProps> = (props) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `catalog-${props.id}`,
    data: {
      type: 'catalog-item',
      item: props,
    },
  });

  return (
    <div 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`aspect-square bg-surface rounded-xl border border-dark/5 flex flex-col items-center justify-center cursor-grab hover:border-primary hover:shadow-md transition-all group ${isDragging ? 'opacity-50' : ''}`}
    >
      <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{props.thumbnail}</span>
      <span className="text-[10px] text-dark/60 font-medium text-center px-1">{props.name}</span>
    </div>
  );
};
