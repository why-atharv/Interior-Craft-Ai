import React, { useState } from 'react';
import type { FurnitureCategory } from '../../store/useAppStore';
import { DraggableCatalogItem } from './DraggableCatalogItem';

export interface CatalogItem {

  id: string;
  name: string;
  category: FurnitureCategory;
  defaultWidth: number;
  defaultHeight: number;
  thumbnail: string;
}

export const catalogData: CatalogItem[] = [
  // 🪑 Seating
  { id: 's1', name: 'Sofa', category: 'Seating', defaultWidth: 80, defaultHeight: 35, thumbnail: '🛋️' },
  { id: 's2', name: 'Armchair', category: 'Seating', defaultWidth: 35, defaultHeight: 35, thumbnail: '💺' },
  { id: 's3', name: 'Recliner', category: 'Seating', defaultWidth: 40, defaultHeight: 40, thumbnail: '💺' },
  { id: 's4', name: 'Dining chair', category: 'Seating', defaultWidth: 20, defaultHeight: 20, thumbnail: '🪑' },
  { id: 's5', name: 'Rocking chair', category: 'Seating', defaultWidth: 25, defaultHeight: 30, thumbnail: '🪑' },
  { id: 's6', name: 'Bench', category: 'Seating', defaultWidth: 60, defaultHeight: 20, thumbnail: '🪑' },
  { id: 's7', name: 'Ottoman', category: 'Seating', defaultWidth: 25, defaultHeight: 25, thumbnail: '🪑' },

  // 🛏️ Sleeping
  { id: 'b1', name: 'Single Bed', category: 'Sleeping', defaultWidth: 39, defaultHeight: 75, thumbnail: '🛏️' },
  { id: 'b2', name: 'Double Bed', category: 'Sleeping', defaultWidth: 54, defaultHeight: 75, thumbnail: '🛏️' },
  { id: 'b3', name: 'Queen Bed', category: 'Sleeping', defaultWidth: 60, defaultHeight: 80, thumbnail: '🛏️' },
  { id: 'b4', name: 'King Bed', category: 'Sleeping', defaultWidth: 76, defaultHeight: 80, thumbnail: '🛏️' },
  { id: 'b5', name: 'Bunk bed', category: 'Sleeping', defaultWidth: 39, defaultHeight: 75, thumbnail: '🛏️' },
  { id: 'b6', name: 'Daybed', category: 'Sleeping', defaultWidth: 39, defaultHeight: 75, thumbnail: '🛋️' },
  { id: 'b7', name: 'Futon', category: 'Sleeping', defaultWidth: 54, defaultHeight: 75, thumbnail: '🛋️' },
  { id: 'b8', name: 'Headboard', category: 'Sleeping', defaultWidth: 60, defaultHeight: 5, thumbnail: '🪧' },

  // 🍽️ Storage & Surfaces
  { id: 'st1', name: 'Dining table', category: 'Storage & Surfaces', defaultWidth: 70, defaultHeight: 40, thumbnail: '🪚' },
  { id: 'st2', name: 'Coffee table', category: 'Storage & Surfaces', defaultWidth: 40, defaultHeight: 25, thumbnail: '🪚' },
  { id: 'st3', name: 'Side table', category: 'Storage & Surfaces', defaultWidth: 20, defaultHeight: 20, thumbnail: '🪚' },
  { id: 'st4', name: 'Console table', category: 'Storage & Surfaces', defaultWidth: 50, defaultHeight: 15, thumbnail: '🪚' },
  { id: 'st5', name: 'Bookshelf', category: 'Storage & Surfaces', defaultWidth: 36, defaultHeight: 12, thumbnail: '📚' },
  { id: 'st6', name: 'Wardrobe', category: 'Storage & Surfaces', defaultWidth: 48, defaultHeight: 24, thumbnail: '🚪' },
  { id: 'st7', name: 'Chest of drawers', category: 'Storage & Surfaces', defaultWidth: 36, defaultHeight: 18, thumbnail: '🗄️' },
  { id: 'st8', name: 'Nightstand', category: 'Storage & Surfaces', defaultWidth: 20, defaultHeight: 20, thumbnail: '🗄️' },

  // 🖥️ Work & Utility
  { id: 'w1', name: 'Desk', category: 'Work & Utility', defaultWidth: 48, defaultHeight: 24, thumbnail: '🖥️' },
  { id: 'w2', name: 'Office chair', category: 'Work & Utility', defaultWidth: 25, defaultHeight: 25, thumbnail: '💺' },
  { id: 'w3', name: 'Filing cabinet', category: 'Work & Utility', defaultWidth: 15, defaultHeight: 20, thumbnail: '🗄️' },
  { id: 'w4', name: 'TV stand', category: 'Work & Utility', defaultWidth: 60, defaultHeight: 16, thumbnail: '📺' },
  { id: 'w5', name: 'Shoe rack', category: 'Work & Utility', defaultWidth: 36, defaultHeight: 12, thumbnail: '👞' },
];

import { useAppStore } from '../../store/useAppStore';

export const CatalogSidebar: React.FC<{ darkMode?: boolean }> = ({ darkMode }) => {
  const [search, setSearch] = useState('');
  const roomType = useAppStore(state => state.room.type);

  const filtered = catalogData.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  const categories = Array.from(new Set(filtered.map(i => i.category)));

  // Smart suggestions logic
  const getSuggestedCategories = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('bed')) return ['Sleeping', 'Storage & Surfaces'];
    if (t.includes('living')) return ['Seating', 'Work & Utility', 'Storage & Surfaces'];
    if (t.includes('office') || t.includes('study')) return ['Work & Utility', 'Seating', 'Storage & Surfaces'];
    if (t.includes('kitchen') || t.includes('dining')) return ['Storage & Surfaces', 'Seating'];
    return ['Seating', 'Storage & Surfaces']; // default
  };
  
  const suggestedCategories = getSuggestedCategories(roomType);
  const suggestedItems = catalogData.filter(item => suggestedCategories.includes(item.category)).slice(0, 4);

  return (
    <aside className={`w-64 flex flex-col shrink-0 h-full z-10 relative border-r ${darkMode ? 'bg-dark-light border-white/10' : 'bg-white border-dark/10'}`}>
      <div className={`p-4 border-b ${darkMode ? 'border-white/5' : 'border-dark/5'}`}>
        <input 
          type="text" 
          placeholder="Search furniture..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full px-3 py-2 rounded-lg text-sm outline-none border border-transparent focus:border-primary/30 transition-colors ${darkMode ? 'bg-white/10 text-white placeholder:text-white/30' : 'bg-surface'}`}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {search === '' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-primary' : 'text-primary'}`}>✨ Suggested for {roomType}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {suggestedItems.map(item => (
                <DraggableCatalogItem key={`sugg-${item.id}`} {...item} />
              ))}
            </div>
          </div>
        )}
        
        {categories.length === 0 && <p className="text-xs text-dark/40 text-center mt-8">No results</p>}
        {categories.map(cat => (
          <div key={cat}>
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${darkMode ? 'text-white/40' : 'text-dark/50'}`}>{cat}</h3>
            <div className="grid grid-cols-2 gap-3">
              {filtered.filter(i => i.category === cat).map(item => (
                <DraggableCatalogItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
