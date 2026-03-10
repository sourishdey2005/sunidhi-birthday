import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const MusicPlayer = () => {
  const { isMusicPlaying, setMusicPlaying, volume, setVolume } = useStore();
  const [audio] = useState(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')); // Placeholder romantic instrumental

  useEffect(() => {
    audio.loop = true;
    audio.volume = volume;
  }, [audio, volume]);

  useEffect(() => {
    if (isMusicPlaying) {
      audio.play().catch(e => console.log("Audio play failed", e));
    } else {
      audio.pause();
    }
  }, [isMusicPlaying, audio]);

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-full shadow-2xl">
      <button
        onClick={() => setMusicPlaying(!isMusicPlaying)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-rose-500 hover:text-white transition-all duration-300"
      >
        {isMusicPlaying ? <Music2 size={20} /> : <Music size={20} />}
      </button>
      
      <div className="flex items-center gap-2 pr-2">
        <button onClick={() => setVolume(volume === 0 ? 0.5 : 0)}>
          {volume === 0 ? <VolumeX size={18} className="text-white/50" /> : <Volume2 size={18} className="text-white/50" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />
      </div>
    </div>
  );
};
