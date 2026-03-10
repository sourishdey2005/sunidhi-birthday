import { create } from 'zustand';

interface AppState {
  isStarted: boolean;
  setStarted: (started: boolean) => void;
  isStorylineFinished: boolean;
  setStorylineFinished: (finished: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  isStarted: false,
  setStarted: (started) => set({ isStarted: started }),
  isStorylineFinished: false,
  setStorylineFinished: (finished) => set({ isStorylineFinished: finished }),
}));
