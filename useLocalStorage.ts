import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

const STORAGE_KEY = 'interiorcraft-ai-layout';

/**
 * Persists the current canvas items and room state to localStorage
 * and rehydrates them when the app loads.
 */
export const useLocalStorage = () => {
  const { items, room, setRoom } = useAppStore();

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { items: savedItems, room: savedRoom } = JSON.parse(saved);
        if (savedItems && Array.isArray(savedItems)) {
          // Sanitize items: filter out any corrupted NaN coordinates
          const sanitizedItems = savedItems.filter(item => 
            !Number.isNaN(item.x) && !Number.isNaN(item.y) && 
            !Number.isNaN(item.width) && !Number.isNaN(item.height)
          );
          useAppStore.setState({ items: sanitizedItems, history: [sanitizedItems], historyIndex: 0 });
        }
        if (savedRoom && !Number.isNaN(savedRoom.width) && !Number.isNaN(savedRoom.height)) {
          setRoom(savedRoom.width, savedRoom.height);
        }
      }
    } catch (e) {
      console.warn('Could not rehydrate from localStorage', e);
    }
  }, []);

  // Persist whenever items or room changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, room }));
      } catch (e) {
        console.warn('Could not save to localStorage', e);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [items, room]);
};
