'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NotificationDotProps {
  count?: number;
  variant?: 'crimson' | 'gold' | 'emerald';
  className?: string;
}

export const NotificationDot: React.FC<NotificationDotProps> = ({
  count,
  variant = 'crimson',
  className,
}) => {
  const bgStyles = {
    crimson: 'bg-crimson text-white shadow-crimson-glow',
    gold: 'bg-gold text-navy-dark shadow-gold-sm font-bold',
    emerald: 'bg-emerald text-white shadow-emerald-glow',
  }[variant];

  if (count !== undefined) {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-mono font-bold leading-none border border-navy-dark',
          bgStyles,
          className
        )}
      >
        {count > 99 ? '99+' : count}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-block w-2.5 h-2.5 rounded-full border border-navy-dark animate-pulse',
        bgStyles,
        className
      )}
    />
  );
};
