'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MiniChartPlaceholderProps {
  trend?: 'up' | 'down' | 'neutral';
  height?: number;
  className?: string;
}

export const MiniChartPlaceholder: React.FC<MiniChartPlaceholderProps> = ({
  trend = 'up',
  height = 36,
  className,
}) => {
  const strokeColor = {
    up: '#10B981',
    down: '#EF4444',
    neutral: '#D4AF37',
  }[trend];

  // SVG sparkline path
  const pathD = {
    up: 'M0 28 Q 20 24, 40 18 T 80 10 T 120 4',
    down: 'M0 4 Q 20 10, 40 18 T 80 24 T 120 32',
    neutral: 'M0 18 Q 30 14, 60 20 T 120 16',
  }[trend];

  return (
    <div className={cn('w-full flex items-center justify-center opacity-80', className)}>
      <svg width="100%" height={height} viewBox="0 0 120 36" fill="none">
        <path
          d={pathD}
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};
