import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const MakeAWish = () => {
  const [isWished, setIsWished] = useState(false);
  const [wishText, setWishText] = useState('');

  const handleWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;
    
    setIsWished(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ffffff', '#ffd700']
    });
  };

  return (
    <section className="py-32 px-6 bg-black flex flex-col items-center justify-center min-h-[60vh] border-t border-white/5">
      <div className="max-w-2xl w-full text-center">
        <AnimatePresence mode="wait">
          {!isWished ? (
            <motion.div
              key="wish-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <span className="text-rose-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">
                A Moment of Magic
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
                Make a Wish, Sunidhi
              </h2>
              <p className="text-white/40 mb-12 italic serif text-lg">
                Close your eyes, think of something beautiful, and send it into the universe.
              </p>
              
              <form onSubmit={handleWish} className="relative max-w-md mx-auto">
                <input
                  type="text"
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Type your wish here..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-8 text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-colors"
                >
                  Send
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="wish-sent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="w-24 h-24 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.8)]"
                />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                Wish Sent to the Stars
              </h2>
              <p className="text-white/60 text-xl italic serif">
                "May every dream you have find its way to you."
              </p>
              <p className="text-white/20 font-mono text-xs uppercase tracking-widest mt-12">
                Your wish: {wishText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
