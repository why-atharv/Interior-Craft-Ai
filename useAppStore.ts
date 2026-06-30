import { create } from 'zustand';

export type FurnitureCategory = 'Seating' | 'Sleeping' | 'Storage & Surfaces' | 'Work & Utility' | string;

export interface FurnitureItem {
  id: string;
  name: string;
  category: FurnitureCategory;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  color?: string;
  layer?: number;
  thumbnail: string; // Placeholder or emoji
}

export interface RoomState {
  type: string; // e.g. 'Bedroom', 'Living Room'
  width: number; // in ft
  height: number; // in ft
}

interface AppState {
  room: RoomState;
  items: FurnitureItem[];
  selectedId: string | null;
  history: FurnitureItem[][]; // Stack of items arrays
  historyIndex: number;
  
  // Actions
  setRoom: (width: number, height: number, type?: string) => void;
  addItem: (item: Omit<FurnitureItem, 'x' | 'y' | 'rotation' | 'id'> & { x: number, y: number }) => void;
  updateItem: (id: string, updates: Partial<FurnitureItem>) => void;
  removeItem: (id: string) => void;
  selectItem: (id: string | null) => void;
  
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  room: { width: 15, height: 12, type: 'Custom Room' },
  items: [],
  selectedId: null,
  history: [[]],
  historyIndex: 0,

  setRoom: (width, height, type = 'Custom Room') => set({ room: { width, height, type } }),
  
  addItem: (newItemInfo) => {
    const newItem: FurnitureItem = {
      ...newItemInfo,
      id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
      rotation: 0,
      layer: get().items.length,
    };
    const newItems = [...get().items, newItem];
    set({ items: newItems });
    get().saveHistory();
  },

  updateItem: (id, updates) => {
    const newItems = get().items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    set({ items: newItems });
  },

  removeItem: (id) => {
    const newItems = get().items.filter(item => item.id !== id);
    set({ items: newItems, selectedId: get().selectedId === id ? null : get().selectedId });
    get().saveHistory();
  },

  selectItem: (id) => set({ selectedId: id }),

  saveHistory: () => {
    const { items, history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...items]);
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      set({ 
        historyIndex: historyIndex - 1,
        items: history[historyIndex - 1]
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      set({ 
        historyIndex: historyIndex + 1,
        items: history[historyIndex + 1]
      });
    }
  }
}));
