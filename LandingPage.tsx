import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MousePointerClick, Sparkles, Layers, RotateCcw,
  ArrowRight, Star, Download
} from 'lucide-react';

/* ── Animation variants ── */
const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ── Room mockup furniture pieces ── */
const MockFurniture = ({ style, emoji, delay }: { style: React.CSSProperties; emoji: string; delay: number }) => (
  <motion.div
    className="absolute flex items-center justify-center rounded-lg shadow-sm"
    style={{ ...style, background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(0,0,0,0.06)' }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
  >
    <span className="text-3xl">{emoji}</span>
  </motion.div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface font-sans text-dark">

      {/* ── Nav ── */}
      <header className="px-6 md:px-14 py-5 flex items-center justify-between sticky top-0 z-50 glass border-b border-white/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary/25">
            IC
          </div>
          <div>
            <span className="font-black text-dark text-lg tracking-tight">InteriorCraft</span>
            <span className="text-primary font-black text-lg"> AI</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Dashboard', 'Templates', 'Pricing'].map(item => (
            <Link key={item} to={item === 'Dashboard' ? '/app' : item === 'Templates' ? '/templates' : '/pricing'}
              className="text-sm font-medium text-dark/60 hover:text-primary transition-colors">
              {item}
            </Link>
          ))}
        </nav>

        <Link to="/templates"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-dark text-white text-sm font-semibold shadow-lg shadow-dark/20 hover:bg-dark-light transition-all">
          Get Started <ArrowRight size={15} />
        </Link>
      </header>

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 pt-20 pb-24 flex flex-col lg:flex-row items-center gap-16">
        <motion.div className="flex-1 space-y-8" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fade} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
            <Sparkles size={14} /> AI-Powered Room Planning
          </motion.div>

          <motion.h1 variants={fade} className="text-5xl md:text-[68px] font-black tracking-tighter leading-[1.05] text-dark">
            Design Your<br />
            <span className="gradient-text">Dream Space.</span>
          </motion.h1>

          <motion.p variants={fade} className="text-lg text-dark/55 max-w-md leading-relaxed">
            Drag & drop furniture, get instant AI layout suggestions, and visualize your perfect room — before touching a single piece.
          </motion.p>

          <motion.div variants={fade} className="flex flex-wrap gap-4 pt-2">
            <Link to="/templates"
              className="px-8 py-4 rounded-2xl bg-dark text-white font-bold shadow-xl shadow-dark/20 hover:bg-dark-light transition-all flex items-center gap-2 text-sm">
              Start Designing <ArrowRight size={16} />
            </Link>
            <Link to="/app"
              className="px-8 py-4 rounded-2xl bg-white border border-dark/10 text-dark font-semibold hover:bg-surface hover:border-dark/20 transition-all text-sm">
              Open Workspace
            </Link>
          </motion.div>

          <motion.div variants={fade} className="flex items-center gap-8 pt-6 border-t border-dark/8">
            {[['10k+', 'Layouts Created'], ['4.9 ★', 'Average Rating'], ['Free', 'No Sign-up Needed']].map(([val, label]) => (
              <div key={label}>
                <div className="text-xl font-black text-dark">{val}</div>
                <div className="text-xs text-dark/45 font-medium mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated room preview */}
        <motion.div className="flex-1 w-full max-w-lg"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/3] rounded-3xl bg-white shadow-2xl border border-dark/6 overflow-hidden p-4">
            {/* Top bar mockup */}
            <div className="absolute top-0 inset-x-0 h-10 bg-surface/80 border-b border-dark/5 flex items-center px-4 gap-2 z-20">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="ml-3 text-[10px] font-medium text-dark/30">InteriorCraft AI — Living Room</div>
            </div>

            {/* Room floor */}
            <div className="absolute inset-4 mt-6 rounded-xl bg-surface/60"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,0,0,0.025) 24px, rgba(0,0,0,0.025) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(0,0,0,0.025) 24px, rgba(0,0,0,0.025) 25px)',
                border: '2px solid rgba(0,0,0,0.06)'
              }}
            >
              <MockFurniture style={{ width: 160, height: 70, bottom: 60, left: 40 }} emoji="🛋️" delay={0.4} />
              <MockFurniture style={{ width: 60, height: 40, bottom: 110, left: 110 }} emoji="🪚" delay={0.55} />
              <MockFurniture style={{ width: 55, height: 55, bottom: 55, right: 50 }} emoji="💺" delay={0.65} />
              <MockFurniture style={{ width: 30, height: 30, top: 20, right: 30 }} emoji="🪴" delay={0.75} />
            </div>

            {/* Floating AI badge */}
            <motion.div
              className="absolute bottom-6 right-6 glass px-3 py-2 rounded-xl text-xs font-semibold text-primary flex items-center gap-1.5 z-20 shadow-sm"
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <Sparkles size={12} /> AI Layout Ready
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="bg-white border-t border-dark/5 py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-14">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Everything You Need</h2>
            <p className="text-dark/50 text-lg max-w-2xl mx-auto">Professional-grade interior planning tools, beautifully packaged for everyone.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <MousePointerClick size={22} className="text-primary" />, bg: 'bg-primary/8', title: 'Drag & Drop', desc: 'Intuitively place and arrange furniture on your room canvas.' },
              { icon: <Sparkles size={22} className="text-accent" />, bg: 'bg-accent/8', title: 'AI Layout', desc: 'One click to generate an intelligent, balanced room arrangement.' },
              { icon: <Layers size={22} className="text-dark" />, bg: 'bg-dark/6', title: 'Resize & Rotate', desc: 'Fine-tune every piece — exact dimensions and any rotation angle.' },
              { icon: <RotateCcw size={22} className="text-blue-500" />, bg: 'bg-blue-50', title: 'Undo / Redo', desc: 'Full history stack — experiment freely with Ctrl+Z.' },
              { icon: <Star size={22} className="text-amber-500" />, bg: 'bg-amber-50', title: 'Save & Load', desc: 'Designs persist automatically via local storage — always there.' },
              { icon: <Download size={22} className="text-dark/60" />, bg: 'bg-dark/4', title: 'Export PNG/PDF', desc: 'Download your finished layout as a crisp image or print-ready PDF.' },
            ].map(({ icon, bg, title, desc }) => (
              <motion.div key={title}
                className="p-7 rounded-2xl bg-surface border border-dark/5 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group card-hover"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  {icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-dark/55 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Room Templates CTA ── */}
      <section className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6 md:px-14 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Pick a Template, Start Fast</h2>
            <p className="text-dark/50 text-lg mb-12">Choose from 6 room types, each with smart defaults and furniture suggestions.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
            {[
              ['🛋️', 'Living Room', 'bg-primary/10 border-primary/15'],
              ['🛏️', 'Bedroom', 'bg-accent/10 border-accent/15'],
              ['💼', 'Office', 'bg-dark/5 border-dark/10'],
              ['🍳', 'Kitchen', 'bg-amber-50 border-amber-100'],
              ['📚', 'Study Room', 'bg-blue-50 border-blue-100'],
              ['✏️', 'Custom Room', 'bg-purple-50 border-purple-100'],
            ].map(([emoji, name, style]) => (
              <motion.div key={name}
                className={`rounded-2xl border p-8 flex flex-col items-center gap-3 cursor-pointer hover:shadow-lg transition-all card-hover ${style}`}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              >
                <span className="text-4xl">{emoji}</span>
                <span className="font-bold text-sm text-dark">{name}</span>
              </motion.div>
            ))}
          </div>
          <Link to="/templates"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-dark text-white font-bold shadow-xl shadow-dark/20 hover:bg-dark-light transition-all text-sm">
            Browse All Templates <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white border-t border-dark/5 py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-14">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black tracking-tight mb-3">Loved by Designers</h2>
            <p className="text-dark/50">Real feedback from real users.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Priya S.', role: 'Interior Designer', quote: 'The AI layout feature alone is worth it. It saves me hours of planning every project.' },
              { name: 'Shyam.G', role: 'Homeowner', quote: 'I redesigned my entire living room digitally before moving anything. Absolutely brilliant.' },
              { name: 'Leena K.', role: 'Architecture Student', quote: 'Beautiful interface, powerful features. This is what student tools should look like.' },
            ].map(({ name, role, quote }) => (
              <motion.div key={name}
                className="bg-surface rounded-2xl p-7 border border-dark/5"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-dark/70 text-sm leading-relaxed mb-5">"{quote}"</p>
                <div>
                  <div className="font-bold text-sm">{name}</div>
                  <div className="text-xs text-dark/40 font-medium">{role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-dark">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm font-semibold">
              <Sparkles size={14} /> Free to Use
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Ready to transform<br />your space?</h2>
            <p className="text-white/50 text-lg">No account needed. Start designing in seconds.</p>
            <div className="flex justify-center gap-4 pt-4">
              <Link to="/templates"
                className="px-8 py-4 rounded-2xl bg-primary text-white font-bold shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all text-sm glow-primary flex items-center gap-2">
                Start Designing <ArrowRight size={16} />
              </Link>
              <Link to="/app"
                className="px-8 py-4 rounded-2xl bg-white/10 text-white font-semibold hover:bg-white/15 transition-all text-sm">
                Open Workspace
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-dark border-t border-white/5 py-8 text-center">
        <p className="text-white/30 text-sm">© 2026 InteriorCraft AI — Design. Visualize. Transform.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
