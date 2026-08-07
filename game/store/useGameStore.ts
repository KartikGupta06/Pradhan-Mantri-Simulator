import { create } from 'zustand';
import { GameStatePlaceholder } from '@/types/game';

interface GameStoreState {
  meta: GameStatePlaceholder;
  setInitialized: (initialized: boolean) => void;
}

export const useGameStore = create<GameStoreState>((set) => ({
  meta: {
    isInitialized: false,
    gameVersion: '0.1.0-alpha',
    lastSavedAt: null,
  },
  setInitialized: (initialized) =>
    set((state) => ({
      meta: { ...state.meta, isInitialized: initialized },
    })),
}));
