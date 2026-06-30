import type { FurnitureCategory } from '../../store/useAppStore';

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
  { id: 'b5', name: 'Bunk Bed', category: 'Sleeping', defaultWidth: 39, defaultHeight: 75, thumbnail: '🛏️' },
  { id: 'b6', name: 'Daybed', category: 'Sleeping', defaultWidth: 39, defaultHeight: 75, thumbnail: '🛋️' },
  { id: 'b7', name: 'Futon', category: 'Sleeping', defaultWidth: 54, defaultHeight: 75, thumbnail: '🛋️' },
  { id: 'b8', name: 'Headboard', category: 'Sleeping', defaultWidth: 60, defaultHeight: 10, thumbnail: '🪧' },

  // 🍽️ Storage & Surfaces
  { id: 'st1', name: 'Dining Table', category: 'Storage & Surfaces', defaultWidth: 70, defaultHeight: 40, thumbnail: '🍽️' },
  { id: 'st2', name: 'Coffee Table', category: 'Storage & Surfaces', defaultWidth: 40, defaultHeight: 25, thumbnail: '☕' },
  { id: 'st3', name: 'Side Table', category: 'Storage & Surfaces', defaultWidth: 20, defaultHeight: 20, thumbnail: '🪔' },
  { id: 'st4', name: 'Console Table', category: 'Storage & Surfaces', defaultWidth: 50, defaultHeight: 15, thumbnail: '🪔' },
  { id: 'st5', name: 'Bookshelf', category: 'Storage & Surfaces', defaultWidth: 36, defaultHeight: 12, thumbnail: '📚' },
  { id: 'st6', name: 'Wardrobe', category: 'Storage & Surfaces', defaultWidth: 48, defaultHeight: 24, thumbnail: '🚪' },
  { id: 'st7', name: 'Chest of Drawers', category: 'Storage & Surfaces', defaultWidth: 36, defaultHeight: 18, thumbnail: '🗄️' },
  { id: 'st8', name: 'Nightstand', category: 'Storage & Surfaces', defaultWidth: 20, defaultHeight: 20, thumbnail: '🕯️' },

  // 🖥️ Work & Utility
  { id: 'w1', name: 'Desk', category: 'Work & Utility', defaultWidth: 48, defaultHeight: 24, thumbnail: '🖥️' },
  { id: 'w2', name: 'Office Chair', category: 'Work & Utility', defaultWidth: 25, defaultHeight: 25, thumbnail: '💺' },
  { id: 'w3', name: 'Filing Cabinet', category: 'Work & Utility', defaultWidth: 15, defaultHeight: 20, thumbnail: '🗂️' },
  { id: 'w4', name: 'TV Stand', category: 'Work & Utility', defaultWidth: 60, defaultHeight: 16, thumbnail: '📺' },
  { id: 'w5', name: 'Shoe Rack', category: 'Work & Utility', defaultWidth: 36, defaultHeight: 12, thumbnail: '👟' },
];
