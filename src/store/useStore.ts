import { create } from 'zustand';

interface AppState {
  isStarted: boolean;
  setStarted: (started: boolean) => void;
  isStorylineFinished: boolean;
  setStorylineFinished: (finished: boolean) => void;
  isMusicPlaying: boolean;
  setMusicPlaying: (playing: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export const useStore = create<AppState>((set) => ({
  isStarted: false,
  setStarted: (started) => set({ isStarted: started }),
  isStorylineFinished: false,
  setStorylineFinished: (finished) => set({ isStorylineFinished: finished }),
  isMusicPlaying: false,
  setMusicPlaying: (playing) => set({ isMusicPlaying: playing }),
  volume: 0.5,
  setVolume: (volume) => set({ volume }),
}));
