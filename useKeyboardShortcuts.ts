import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

/**
 * Registers global keyboard shortcuts for the canvas workspace.
 * - Delete / Backspace: Remove selected item
 * - R: Rotate selected item by 45°
 * - Ctrl+Z: Undo
 * - Ctrl+Y: Redo
 */
export const useKeyboardShortcuts = () => {
  const { selectedId, removeItem, updateItem, items, undo, redo } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when user is typing in an input
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        e.preventDefault();
        removeItem(selectedId);
      }

      if (e.key === 'r' || e.key === 'R') {
        if (selectedId) {
          const item = items.find(i => i.id === selectedId);
          if (item) {
            updateItem(selectedId, { rotation: (item.rotation + 45) % 360 });
          }
        }
      }

      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }

      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, items, removeItem, updateItem, undo, redo]);
};
