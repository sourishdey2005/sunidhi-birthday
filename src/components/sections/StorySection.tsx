import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';

const storyParts = [
  {
    title: "April 2025",
    text: "The month that changed everything. A simple day turned into a lifetime memory.",
    sub: "The Beginning"
  },
  {
    title: "Laal Quila",
    text: "We met amidst the red sandstone, where history witnessed our first encounter.",
    sub: "The Meeting"
  },
  {
    title: "The Fortress",
    text: "The ancient walls felt small compared to the spark that ignited between us.",
    sub: "A Royal Spark"
  },
  {
    title: "Two Strangers",
    text: "In a crowd of thousands, our souls found their own unique rhythm.",
    sub: "Finding Each Other"
  },
  {
    title: "The First Walk",
    text: "Walking through those corridors, talking about everything and nothing at all.",
    sub: "Connecting Souls"
  },
  {
    title: "Delhi Sunset",
    text: "The sun was setting over the city, but a new light was beginning in our lives.",
    sub: "Golden Hour"
  },
  {
    title: "The Bridge",
    text: "One message led to another, building a digital bridge across every distance.",
    sub: "Messages of Love"
  },
  {
    title: "The Echoes",
    text: "Then came the phone calls—the kind that never seemed to have an end.",
    sub: "Endless Voices"
  },
  {
    title: "Late Night Talks",
    text: "Stretching into the silent hours of the morning, sharing our deepest secrets.",
    sub: "Whispers in the Dark"
  },
  {
    title: "Deepest Fears",
    text: "Sharing our wildest dreams and our quietest hopes under the moon.",
    sub: "Intimacy"
  },
  {
    title: "Every Whisper",
    text: "Every word brought us closer, every laugh made the entire world brighter.",
    sub: "Growing Closer"
  },
  {
    title: "The Heartbeat",
    text: "From the majesty of a fortress to the intimacy of a single heartbeat.",
    sub: "Our Rhythm"
  },
  {
    title: "Favorite Story",
    text: "You became my favorite narrative, my most beautiful and cherished memory.",
    sub: "The Muse"
  },
  {
    title: "A Gift",
    text: "Today, we celebrate the person who makes every single day feel like a gift.",
    sub: "The Celebration"
  },
  {
    title: "Sunidhi",
    text: "Happy Birthday. Our story is just beginning, and I can't wait for the next chapter.",
    sub: "Forever"
  }
];

export const StorySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const [hasStarted, setHasStarted] = useState(false);
  const durationPerPart = 12000; // 12 seconds per part = 180 seconds total (3 mins)

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hasStarted && currentIndex < storyParts.length - 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, durationPerPart);
    }
    return () => clearInterval(interval);
  }, [hasStarted, currentIndex]);

  return (
    <div ref={containerRef} className="relative h-[100vh] bg-black overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,77,109,0.1)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="space-y-8"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-rose-500 font-mono text-xs tracking-[0.8em] uppercase block"
            >
              {storyParts[currentIndex].sub}
            </motion.span>
            
            <h3 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-none">
              {storyParts[currentIndex].title}
            </h3>

            <p className="text-white/60 text-xl md:text-3xl font-serif italic leading-relaxed max-w-2xl mx-auto">
              "{storyParts[currentIndex].text}"
            </p>

            {/* Progress Bar */}
            <div className="mt-16 flex justify-center">
              <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  key={`progress-${currentIndex}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: durationPerPart / 1000, ease: "linear" }}
                  className="absolute inset-0 bg-rose-500 origin-left"
                />
              </div>
            </div>

            <div className="text-white/10 font-mono text-[10px] uppercase tracking-widest">
              Chapter {currentIndex + 1} of {storyParts.length}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {storyParts.map((_, i) => (
          <div 
            key={i}
            className={`w-1 h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-rose-500 h-4' : 'bg-white/10'}`}
          />
        ))}
      </div>
    </div>
  );
};
