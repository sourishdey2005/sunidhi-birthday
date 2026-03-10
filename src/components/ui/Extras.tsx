import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-rose-500 pointer-events-none z-[999] mix-blend-difference"
      animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
    />
  );
};

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-rose-500 origin-left z-[1000]"
      style={{ scaleX }}
    />
  );
};
