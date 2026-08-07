'use client';

import React from 'react';
import { BottomNavigation } from '@/components/ui/BottomNavigation';

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col justify-between h-full w-full relative overflow-hidden bg-navy-dark">
      {/* Scrollable Game Screen Viewport Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 relative flex flex-col">
        {children}
      </div>

      {/* Persistent Bottom Mobile Navigation Shell */}
      <BottomNavigation />
    </div>
  );
}
