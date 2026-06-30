import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onDone: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  const colors = {
    success: 'bg-primary text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-dark text-white',
  };
  const icons = {
    success: <CheckCircle size={18} />,
    error: <XCircle size={18} />,
    info: <Info size={18} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl ${colors[type]} font-medium text-sm pointer-events-none`}
    >
      {icons[type]}
      {message}
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: { id: string; message: string; type?: 'success' | 'error' | 'info' }[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3">
    <AnimatePresence>
      {toasts.map(t => (
        <Toast key={t.id} message={t.message} type={t.type} onDone={() => removeToast(t.id)} />
      ))}
    </AnimatePresence>
  </div>
);
