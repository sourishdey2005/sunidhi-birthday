import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EasterEggs = () => {
  const [typed, setTyped] = useState('');
  const [showHearts, setShowHearts] = useState(false);
  const [starClicks, setStarClicks] = useState(0);
  const [hiddenMessage, setHiddenMessage] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newTyped = (typed + e.key).slice(-7).toUpperCase();
      setTyped(newTyped);
      
      if (newTyped === 'SUNIDHI') {
        setShowHearts(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff4d6d', '#ff758f', '#ff85a1']
        });
        setTimeout(() => setShowHearts(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typed]);

  const handleStarClick = () => {
    const newClicks = starClicks + 1;
    setStarClicks(newClicks);
    if (newClicks === 10) {
      setHiddenMessage(true);
      setTimeout(() => setHiddenMessage(false), 5000);
      setStarClicks(0);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showHearts && (
          <div className="fixed inset-0 z-[300] pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: Math.random() * 100 + '%', y: '110%', opacity: 0 }}
                animate={{ y: '-10%', opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                transition={{ duration: Math.random() * 3 + 2, ease: "easeOut" }}
                className="absolute text-rose-500"
              >
                <Heart fill="currentColor" size={Math.random() * 30 + 10} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hiddenMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[300] bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-center shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-2">You found the hidden message!</h3>
            <p className="text-white/60 italic serif">"You are the most beautiful part of this story."</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Star for clicking */}
      <div 
        onClick={handleStarClick}
        className="fixed top-4 right-4 w-8 h-8 cursor-pointer z-[200] opacity-0 hover:opacity-10 transition-opacity"
      />
    </>
  );
};
