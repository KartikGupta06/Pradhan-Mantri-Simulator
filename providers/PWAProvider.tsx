'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { usePWA } from '@/hooks/usePWA';

interface PWAContextType {
  isInstallable: boolean;
  promptInstall: () => Promise<void>;
}

const PWAContext = createContext<PWAContextType>({
  isInstallable: false,
  promptInstall: async () => {},
});

export function PWAProvider({ children }: { children: ReactNode }) {
  const pwa = usePWA();
  return <PWAContext.Provider value={pwa}>{children}</PWAContext.Provider>;
}

export const usePWAContext = () => useContext(PWAContext);
