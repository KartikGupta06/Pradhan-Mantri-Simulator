'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useGameStore } from '@/game/store/useGameStore';

const GameStateContext = createContext<{ ready: boolean }>({ ready: true });

export function GameStateProvider({ children }: { children: ReactNode }) {
  return (
    <GameStateContext.Provider value={{ ready: true }}>
      {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => useContext(GameStateContext);
