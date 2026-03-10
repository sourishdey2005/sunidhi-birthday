import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useStore } from '../../store/useStore';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const blur = useTransform(scrollY, [0, 100], [0, 10]);
  
  return (
    <motion.nav
      style={{ 
        opacity,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`
      }}
      className="fixed top-0 left-0 right-0 z-[100] h-16 border-b border-white/5 bg-black/20 flex items-center justify-between px-8"
    >
      <div className="flex items-center gap-4">
        <span className="text-rose-500 font-bold text-xl tracking-tighter">S.</span>
        <div className="h-4 w-[1px] bg-white/20" />
        <span className="text-white/80 text-xs font-mono tracking-widest uppercase">Happy Birthday Sunidhi</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-white/40">
        <a href="#story" className="hover:text-rose-400 transition-colors">The Story</a>
        <a href="#gallery" className="hover:text-rose-400 transition-colors">Memories</a>
        <a href="#letter" className="hover:text-rose-400 transition-colors">The Letter</a>
        <a href="#surprise" className="hover:text-rose-400 transition-colors">Surprise</a>
      </div>
    </motion.nav>
  );
};
