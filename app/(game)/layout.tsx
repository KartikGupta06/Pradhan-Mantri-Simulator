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
      {/* 1. Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 relative flex flex-col w-full scroll-smooth">
        {children}
      </div>

      {/* 2. Fixed Pinned Bottom Navigation Shell */}
      <BottomNavigation />
    </div>
  );
}
