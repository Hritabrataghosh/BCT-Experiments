import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background from './components/Background';
import SocialSidebar from './components/SocialSidebar';
import CustomCursor from './components/CustomCursor';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-[#0f172a] text-slate-200 min-h-screen selection:bg-cyan-500/30">
      <Background />
      <Navbar />
      <SocialSidebar />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-[100] origin-left" 
        style={{ scaleX }} 
      />

      <main className="container mx-auto px-6">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer className="py-10 text-center border-t border-white/5 text-slate-500 text-sm">
        <p>© 2026 Hritabrata Ghosh. Built with React & Framer Motion.</p>
      </footer>
    </div>
  );
}

export default App;