'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'gold' | 'emerald' | 'crimson' | 'slate';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gold',
  children,
  className,
}) => {
  const variantStyles = {
    gold: 'bg-gold/15 text-gold-light border-gold/30',
    emerald: 'bg-emerald/15 text-emerald border-emerald/30',
    crimson: 'bg-crimson/15 text-crimson border-crimson/30',
    slate: 'bg-slate/15 text-slate-300 border-slate/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
