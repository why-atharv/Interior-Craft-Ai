import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { Card, Button } from '../components/ui';

const templates = [
  { id: 'bedroom-compact', title: 'Modern', name: 'Compact Bedroom (10x10)', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80' },
  { id: 'bedroom-master', name: 'Master Bedroom Suite (15x20)', image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 'living-cozy', name: 'Cozy Living Room (12x15)', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80' },
  { id: 'living-open', name: 'Open-Plan Living & Dining (20x25)', image: 'https://images.unsplash.com/photo-1629079447792-066af3327de5?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 'studio', name: 'Studio Apartment (15x20)', image: 'https://plus.unsplash.com/premium_photo-1661853413809-6be6bed796d9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 'office', name: 'Executive Office (12x12)', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80' },
  { id: 'kitchen', name: 'Modern Kitchen (10x15)', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80' },
  { id: 'study', name: 'Study & Library (10x12)', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' },
  { id: 'guest', name: 'Guest Room (10x12)', image: 'https://images.unsplash.com/photo-1573088422077-b6ed78408ff4?q=80&w=1017&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 'kids', name: 'Kids Playroom (12x14)', image: 'https://images.unsplash.com/photo-1596066190600-3af9aadaaea1?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const TemplateSelection: React.FC = () => {
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleSelect = (id: string) => {
    // In a real app, we'd pass the template ID to the setup wizard
    navigate(`/setup?template=${id}`);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-between glass sticky top-0 z-50 border-b border-dark/5">
        <div className="flex items-center gap-4">
          <Link to="/" className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-dark/10 hover:bg-surface hover:text-primary transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <span className="font-bold text-dark text-lg">Select Room Type</span>
            <span className="text-xs text-dark/50">Choose a room template or start from scratch</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {templates.map((template) => (
            <motion.div
              key={template.id}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
              }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-dark/5 cursor-pointer group"
              onClick={() => handleSelect(template.id)}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {imageErrors[template.id] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-surface/50 text-dark/40 font-medium">
                    Template preview unavailable
                  </div>
                ) : (
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => handleImageError(template.id)}
                  />
                )}
              </div>
              <Card className="p-5 flex items-center justify-between">
                <span className="font-semibold text-dark text-red-500">{template.title ?? template.name}</span>
                <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowLeft className="rotate-135" size={16} />
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Custom Room Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
            }}
            whileHover={{ y: -5 }}
          >
            <Button
              className="bg-dark text-white rounded-2xl overflow-hidden shadow-lg shadow-dark/10 cursor-pointer group flex flex-col items-center justify-center aspect-[4/3] relative w-full"
              onClick={() => handleSelect('custom')}
            >
              <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors" />
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-primary">
                <Plus size={32} />
              </div>
              <span className="font-semibold text-lg">Custom Room</span>
              <span className="text-sm text-white/50 mt-1">Start from scratch</span>
            </Button>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
};

export default TemplateSelection;
