'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LiveIndicatorProps {
  label?: string;
  variant?: 'emerald' | 'crimson' | 'gold';
  className?: string;
}

export const LiveIndicator: React.FC<LiveIndicatorProps> = ({
  label = 'LIVE',
  variant = 'emerald',
  className,
}) => {
  const dotColor = {
    emerald: 'bg-emerald shadow-emerald-glow',
    crimson: 'bg-crimson shadow-crimson-glow',
    gold: 'bg-gold shadow-gold-sm',
  }[variant];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-navy-surface/80 border border-gold/15 text-[10px] font-mono font-bold tracking-wider text-slate-200',
        className
      )}
    >
      <span className={cn('w-2 h-2 rounded-full animate-ping opacity-75', dotColor)} />
      <span className="gold-gradient-text uppercase">{label}</span>
    </div>
  );
};
