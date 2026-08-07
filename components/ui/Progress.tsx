'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number; // 0 to 100
  variant?: 'gold' | 'emerald' | 'crimson';
  height?: string;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  variant = 'gold',
  height = 'h-2',
  className,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const variantStyles = {
    gold: 'bg-gradient-to-r from-gold-dark to-gold shadow-gold-sm',
    emerald: 'bg-gradient-to-r from-emerald-dark to-emerald shadow-emerald-glow',
    crimson: 'bg-gradient-to-r from-crimson-dark to-crimson shadow-crimson-glow',
  };

  return (
    <div
      className={cn(
        'w-full bg-navy-surface border border-gold/10 rounded-full overflow-hidden p-0.5',
        height,
        className
      )}
    >
      <div
        className={cn('h-full rounded-full transition-all duration-300', variantStyles[variant])}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
};
