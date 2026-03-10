import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const FinalSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-b from-black via-rose-950/20 to-rose-900/40"
      />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8">
            Thank you for being you, Sunidhi.
          </h2>
          <p className="text-white/60 text-xl md:text-2xl mb-12 font-light italic serif">
            The world is a better place with you in it.
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="space-y-4"
          >
            <p className="text-rose-400 text-sm uppercase tracking-[0.5em]">Happy Birthday Once Again</p>
            <div className="flex justify-center gap-4">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Heart fill="#f43f5e" className="text-rose-500" size={32} />
              </motion.div>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                <Heart fill="#f43f5e" className="text-rose-500" size={32} />
              </motion.div>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                <Heart fill="#f43f5e" className="text-rose-500" size={32} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating hearts background effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: '110%', 
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: '-10%', 
              opacity: [0, 0.3, 0],
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
            className="absolute text-rose-500/20"
          >
            <Heart fill="currentColor" size={Math.random() * 40 + 20} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
