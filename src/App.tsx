import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from './store/useStore';
import { IntroPage } from './components/sections/IntroPage';
import { HeroSection } from './components/sections/HeroSection';
import { HeartBeatSection } from './components/sections/HeartBeatSection';
import { StorySection } from './components/sections/StorySection';
import { MemoryGallery } from './components/sections/MemoryGallery';
import { LongLetter } from './components/sections/LongLetter';
import { InteractiveSurprise } from './components/sections/InteractiveSurprise';
import { NightSkySection } from './components/sections/NightSkySection';
import { FinalSection } from './components/sections/FinalSection';
import { QuotesSection } from './components/sections/QuotesSection';
import { StatsSection } from './components/sections/StatsSection';
import { MakeAWish } from './components/sections/MakeAWish';
import { StorylineOverlay } from './components/sections/StorylineOverlay';
import { EasterEggs } from './components/ui/EasterEggs';
import { Navbar } from './components/ui/Navbar';
import { CustomCursor, ScrollProgress } from './components/ui/Extras';

export default function App() {
  const isStarted = useStore((state) => state.isStarted);
  const isStorylineFinished = useStore((state) => state.isStorylineFinished);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white font-mono tracking-[0.5em] uppercase text-sm"
        >
          Loading Magic...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white selection:bg-rose-500/30 selection:text-rose-200">
      <AnimatePresence>
        {!isStarted && <IntroPage />}
      </AnimatePresence>

      {isStarted && !isStorylineFinished && (
        <StorylineOverlay />
      )}

      {isStarted && isStorylineFinished && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Navbar />
          <ScrollProgress />
          <CustomCursor />
          <EasterEggs />
          
          <div id="hero"><HeroSection /></div>
          <HeartBeatSection />
          <StatsSection />
          <div id="story"><StorySection /></div>
          <QuotesSection />
          <div id="gallery"><MemoryGallery /></div>
          <div id="letter"><LongLetter /></div>
          <MakeAWish />
          <NightSkySection />
          <div id="surprise"><InteractiveSurprise /></div>
          <FinalSection />
          
          {/* Footer */}
          <footer className="py-12 text-center text-white/20 text-xs tracking-widest uppercase border-t border-white/5">
            Made with love for Sunidhi • 2026
          </footer>
        </motion.main>
      )}
    </div>
  );
}
