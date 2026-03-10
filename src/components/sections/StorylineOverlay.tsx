import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';

const storyParts = [
  {
    text: "It was a day like any other, until it wasn't. The sun was setting over the red sandstone of Laal Quila...",
    sub: "The beginning of everything."
  },
  {
    text: "I remember the crowd, the noise, the history... but in that moment, everything else faded away when I saw you.",
    sub: "A moment frozen in time."
  },
  {
    text: "We were just two strangers in a place built for kings, yet I felt like I had found something more precious than gold.",
    sub: "A royal encounter."
  },
  {
    text: "That first smile. That first 'hello'. It was the beginning of a chapter I never wanted to end.",
    sub: "The spark."
  },
  {
    text: "We walked through those ancient corridors, talking about everything and nothing at all.",
    sub: "Connecting souls."
  },
  {
    text: "The day ended, but our story was just getting started. One message led to another...",
    sub: "The digital bridge."
  },
  {
    text: "And then came the calls. The kind where you lose track of time, and the world outside ceases to exist.",
    sub: "Endless echoes."
  },
  {
    text: "Late night talks that stretched into the silent hours of the morning. Sharing our deepest fears and wildest dreams.",
    sub: "Whispers in the dark."
  },
  {
    text: "From the history of a fortress to the intimacy of a whisper. Every word brought us closer.",
    sub: "Building our own empire."
  },
  {
    text: "Today, we celebrate the person who made that day at Laal Quila the most important day of my life.",
    sub: "Happy Birthday, Sunidhi."
  }
];

export const StorylineOverlay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const setStorylineFinished = useStore((state) => state.setStorylineFinished);
  const durationPerPart = 12000; // 12 seconds per part for a total of 120 seconds (2 mins)

  useEffect(() => {
    if (currentIndex < storyParts.length) {
      const timer = setTimeout(() => {
        if (currentIndex === storyParts.length - 1) {
          setStorylineFinished(true);
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      }, durationPerPart);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, setStorylineFinished]);

  return (
    <div className="fixed inset-0 z-[150] bg-black flex items-center justify-center px-6">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,77,109,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="space-y-8"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-rose-500 font-mono text-xs tracking-[0.6em] uppercase block"
            >
              {storyParts[currentIndex].sub}
            </motion.span>
            
            <h2 className="text-3xl md:text-5xl font-serif italic leading-relaxed text-white/90">
              "{storyParts[currentIndex].text}"
            </h2>

            {/* Progress Bar for current part */}
            <div className="mt-12 flex justify-center">
              <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: durationPerPart / 1000, ease: "linear" }}
                  className="absolute inset-0 bg-rose-500 origin-left"
                />
              </div>
            </div>

            <div className="text-white/20 font-mono text-[10px] uppercase tracking-widest">
              Part {currentIndex + 1} of {storyParts.length}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Skip Button */}
      <button 
        onClick={() => setStorylineFinished(true)}
        className="absolute bottom-10 right-10 text-white/20 hover:text-white/50 text-[10px] uppercase tracking-[0.3em] transition-colors"
      >
        Skip Story
      </button>
    </div>
  );
};
