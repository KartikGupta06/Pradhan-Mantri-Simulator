'use client';

import React from 'react';
import { useMobileViewport } from '@/hooks/useMobileViewport';
import { RESOLUTION } from '@/constants/theme';

export const MobileGameShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobileDevice } = useMobileViewport();

  return (
    <div className="min-h-screen w-full bg-[#04060C] flex items-center justify-center relative overflow-hidden select-none">
      {/* Ambient Gold Glow Backdrop for Desktop Screens */}
      <div className="absolute w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Main Game Viewport Frame */}
      <main
        className="w-full max-w-[430px] h-[100dvh] max-h-[915px] sm:h-[844px] sm:w-[390px] bg-navy-dark border-0 sm:border-2 sm:border-gold/30 sm:rounded-[36px] shadow-2xl sm:shadow-gold-glow flex flex-col relative overflow-hidden transition-all duration-300"
        style={{
          aspectRatio: isMobileDevice ? 'auto' : RESOLUTION.aspectRatio,
        }}
      >
        {/* Top Mobile Notch / Speaker Bar on Desktop Preview */}
        <div className="hidden sm:flex justify-center pt-2 pb-1 shrink-0 bg-navy-dark/80">
          <div className="w-24 h-4 bg-navy-surface rounded-full border border-gold/10 flex items-center justify-center">
            <div className="w-8 h-1 bg-slate-600 rounded-full" />
          </div>
        </div>

        {/* Dynamic Screen Viewport Container */}
        <div className="flex-1 flex flex-col relative overflow-hidden w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
};
