import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const RoomSetupWizard: React.FC = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(12);

  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  const setRoom = useAppStore(state => state.setRoom);

  const handleNext = () => {
    // Determine type from templateId
    let type = 'Custom Room';
    if (templateId) {
      if (templateId.includes('bed')) type = 'Bedroom';
      else if (templateId.includes('living')) type = 'Living Room';
      else if (templateId.includes('office')) type = 'Office';
      else if (templateId.includes('kitchen')) type = 'Kitchen';
      else if (templateId.includes('study')) type = 'Study';
      else if (templateId.includes('guest')) type = 'Guest Room';
      else if (templateId.includes('kids')) type = 'Kids Room';
      else if (templateId.includes('studio')) type = 'Studio';
    }
    setRoom(width, height, type);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-between glass sticky top-0 z-50 border-b border-dark/5 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/templates" className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-dark/10 hover:bg-surface hover:text-primary transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <span className="font-bold text-dark text-lg">Room Setup Wizard</span>
          </div>
        </div>
        <button 
          onClick={handleNext}
          className="px-6 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
        >
          Next
        </button>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 flex gap-12">
        {/* Left: Stepper */}
        <aside className="w-64 shrink-0">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-dark/10 before:to-transparent">
            
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-primary/20 bg-primary/5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-dark text-sm">Room Dimensions</h3>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-dark/20 bg-white text-dark/40 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 opacity-50">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-dark/70 text-sm">Room Style</h3>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-dark/20 bg-white text-dark/40 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 opacity-50">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-dark/70 text-sm">Wall & Floor</h3>
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* Right: Content */}
        <motion.div 
          className="flex-1 bg-white rounded-3xl p-10 border border-dark/5 shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">Room Dimensions</h2>
            <p className="text-dark/60 mb-8">Set the size of your room in feet.</p>

            <div className="flex gap-12 items-center">
              <div className="space-y-6 flex-1">
                <div>
                  <label htmlFor="room-width" className="block text-sm font-semibold text-dark mb-2">
                    Width (ft)
                  </label>
                  <div className="relative">
                    <input
                      id="room-width"
                      type="number"
                      min="1"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      aria-label="Room width in feet"
                      className="w-full bg-surface border border-dark/10 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/40 font-medium">ft</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="room-height" className="block text-sm font-semibold text-dark mb-2">
                    Height (ft)
                  </label>
                  <div className="relative">
                    <input
                      id="room-height"
                      type="number"
                      min="1"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      aria-label="Room height in feet"
                      className="w-full bg-surface border border-dark/10 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/40 font-medium">ft</span>
                  </div>
                </div>
              </div>

              {/* Visualizer */}
              <div className="flex-1">
                <div className="aspect-square bg-surface rounded-2xl border-2 border-dashed border-dark/20 relative flex items-center justify-center p-8">
                  <div className="bg-primary/20 border-2 border-primary rounded-lg transition-all duration-300 w-52 h-52">
                    <div className="absolute top-1/2 -left-8 -translate-y-1/2 -rotate-90 text-xs font-medium text-dark/50">
                      {height} ft
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-dark/50">
                      {width} ft
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RoomSetupWizard;
