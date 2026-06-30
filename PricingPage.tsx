import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface font-sans text-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="px-6 md:px-14 py-5 flex items-center justify-between sticky top-0 z-50 glass border-b border-white/30">
        <div className="flex items-center gap-3">
          <Link to="/" className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-dark/10 hover:bg-surface hover:text-primary transition-colors mr-2">
            <ArrowLeft size={20} />
          </Link>
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary/25">
            IC
          </div>
          <div>
            <span className="font-black text-dark text-lg tracking-tight">InteriorCraft</span>
            <span className="text-primary font-black text-lg"> AI</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Simple, Transparent Pricing</h1>
            <p className="text-dark/50 text-lg md:text-xl max-w-2xl mx-auto">Choose the perfect plan to design your space, tailored for Indian standards.</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Free Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl bg-white border border-dark/5 shadow-xl shadow-dark/5 flex flex-col h-[500px]"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-black">₹0</span>
                <span className="text-dark/50 font-medium mb-1">/ forever</span>
              </div>
              <p className="text-dark/60 text-sm">Perfect for visualizing a single room.</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {['1 Room Layout', 'Basic Furniture Catalog', 'Drag & Drop Canvas', 'Local Storage Save'].map(feature => (
                <li key={feature} className="flex items-center gap-3 text-sm font-medium text-dark/80">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/app" className="w-full py-4 rounded-xl bg-surface border border-dark/10 font-bold text-center hover:bg-dark hover:text-white transition-colors block">
              Get Started
            </Link>
          </motion.div>

          {/* Pro Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl bg-dark text-white border border-dark/5 shadow-2xl shadow-primary/20 flex flex-col h-[540px] relative transform md:-translate-y-4"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-xs font-bold tracking-wider flex items-center gap-1 shadow-lg">
              <Sparkles size={12} /> MOST POPULAR
            </div>
            <div className="mb-8 mt-2">
              <h3 className="text-2xl font-bold mb-2 text-white/90">Pro</h3>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-black text-white">₹499</span>
                <span className="text-white/50 font-medium mb-1">/ month</span>
              </div>
              <p className="text-white/60 text-sm">For enthusiasts who want full creative power.</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {[
                'Unlimited Rooms', 
                'Full Premium Furniture Catalog', 
                'AI Layout Suggestions', 
                'Export to High-Res PDF & PNG', 
                'Priority Support'
              ].map(feature => (
                <li key={feature} className="flex items-center gap-3 text-sm font-medium text-white/90">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl bg-white text-dark font-bold text-center hover:bg-surface transition-colors">
              Upgrade to Pro
            </button>
          </motion.div>

          {/* Enterprise Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl bg-white border border-dark/5 shadow-xl shadow-dark/5 flex flex-col h-[500px]"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-black">₹2,499</span>
                <span className="text-dark/50 font-medium mb-1">/ month</span>
              </div>
              <p className="text-dark/60 text-sm">For interior design teams and businesses.</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {[
                'Everything in Pro', 
                'Team Collaboration', 
                'Custom Branding & Logos', 
                'API Access', 
                'Dedicated Account Manager'
              ].map(feature => (
                <li key={feature} className="flex items-center gap-3 text-sm font-medium text-dark/80">
                  <div className="w-5 h-5 rounded-full bg-dark/10 flex items-center justify-center text-dark shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl bg-surface border border-dark/10 font-bold text-center hover:bg-dark hover:text-white transition-colors">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
