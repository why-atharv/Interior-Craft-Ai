import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Image as ImageIcon, FileText } from 'lucide-react';

interface ExportModalProps {
  canvasRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ canvasRef, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleExportPNG = async () => {
    if (!canvasRef.current) return;
    setLoading(true);
    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#fafafa',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `interiorcraft-design-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setStatus('success');
    } catch (e) {
      setStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => { setStatus('idle'); onClose(); }, 1500);
    }
  };

  const handleExportPDF = async () => {
    if (!canvasRef.current) return;
    setLoading(true);
    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#fafafa',
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`interiorcraft-design-${Date.now()}.pdf`);
      setStatus('success');
    } catch (e) {
      setStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => { setStatus('idle'); onClose(); }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-dark/30 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[420px]"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-dark/5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-dark">Export Your Design</h2>
                  <p className="text-sm text-dark/50 mt-1">Choose your preferred format</p>
                </div>
                <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-surface flex items-center justify-center text-dark/40 hover:text-dark transition-colors">
                  <X size={18} />
                </button>
              </div>

              {status === 'success' ? (
                <motion.div 
                  className="flex flex-col items-center py-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
                    >
                      ✅
                    </motion.div>
                  </div>
                  <p className="font-semibold text-dark">Export Successful!</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <ExportOption
                    icon={<ImageIcon size={22} className="text-primary" />}
                    title="Export as Image"
                    desc="High quality PNG image"
                    onClick={handleExportPNG}
                    loading={loading}
                    bg="bg-primary/10"
                  />
                  <ExportOption
                    icon={<FileText size={22} className="text-accent" />}
                    title="Export as PDF"
                    desc="Print-ready PDF file"
                    onClick={handleExportPDF}
                    loading={loading}
                    bg="bg-accent/10"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ExportOption = ({
  icon, title, desc, onClick, loading, bg
}: { icon: React.ReactNode; title: string; desc: string; onClick: () => void; loading: boolean; bg: string }) => (
  <motion.button
    onClick={onClick}
    disabled={loading}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl border border-dark/5 hover:border-primary/30 hover:shadow-md transition-all text-left ${loading ? 'opacity-50 cursor-wait' : ''}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="font-semibold text-dark text-sm">{title}</p>
      <p className="text-xs text-dark/50 mt-0.5">{desc}</p>
    </div>
    <Download size={16} className="ml-auto text-dark/20" />
  </motion.button>
);
