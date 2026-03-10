import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';
import { Canvas } from '@react-three/fiber';
import { Stars } from '../3d/Stars';

export const IntroPage = () => {
  const [step, setStep] = useState(0);
  const setStarted = useStore((state) => state.setStarted);
  const setMusicPlaying = useStore((state) => state.setMusicPlaying);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 3000), // "Some people enter..."
      setTimeout(() => setStep(2), 6000), // Stars appear + "Today is special"
      setTimeout(() => setStep(3), 9000), // "Happy Birthday Sunidhi"
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    setStarted(true);
    setMusicPlaying(true);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5] }}>
          {step >= 2 && <Stars count={2000} />}
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.p
              key="text1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-white/80 text-xl md:text-2xl font-light italic serif"
            >
              “Some people enter your life quietly…<br />
              and somehow make it brighter.”
            </motion.p>
          )}

          {step === 2 && (
            <motion.p
              key="text2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5 }}
              className="text-white/60 text-lg md:text-xl tracking-widest uppercase"
            >
              Today is a special day.
            </motion.p>
          )}

          {step === 3 && (
            <motion.div
              key="text3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                className="text-5xl md:text-8xl font-bold text-white tracking-tighter"
                style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)' }}
              >
                Happy Birthday <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-500">
                  Sunidhi
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-white/50 text-sm md:text-base tracking-widest uppercase"
              >
                This little digital world was made just for you.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                onClick={handleEnter}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-black rounded-full font-medium tracking-wide transition-all duration-300"
              >
                Enter the Story
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
