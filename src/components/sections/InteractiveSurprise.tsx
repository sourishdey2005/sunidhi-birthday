import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

export const InteractiveSurprise = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSurprise = () => {
    setIsRevealed(true);
    
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <section className="py-32 px-6 bg-black flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">One Last Thing...</h2>
              <motion.button
                onClick={handleSurprise}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(244,63,94,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-rose-500 text-white rounded-full text-xl font-bold tracking-wide flex items-center gap-3 mx-auto"
              >
                Click for a Surprise <Heart fill="white" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-rose-500 mb-8 flex justify-center"
              >
                <Heart size={80} fill="currentColor" />
              </motion.div>
              <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
                The world is lucky to have you in it.
              </h2>
              <p className="text-white/50 text-xl italic serif">
                Keep shining, keep smiling, and never stop being you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
