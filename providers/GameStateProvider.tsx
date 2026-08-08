'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useGameStore } from '@/game/store/useGameStore';

const GameStateContext = createContext<{ ready: boolean }>({ ready: true });

export function GameStateProvider({ children }: { children: ReactNode }) {
  const initialize = useGameStore((state) => state.initialize);
  const isInitialized = useGameStore((state) => state.isInitialized);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <GameStateContext.Provider value={{ ready: isInitialized }}>
      {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => useContext(GameStateContext);
