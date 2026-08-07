'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StatusChipProps {
  label: string;
  variant?: 'gold' | 'emerald' | 'crimson' | 'slate' | 'orange';
  icon?: React.ReactNode;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  label,
  variant = 'gold',
  icon,
  className,
}) => {
  const styles = {
    gold: 'bg-gold/10 text-gold-light border-gold/30',
    emerald: 'bg-emerald/10 text-emerald border-emerald/30',
    crimson: 'bg-crimson/10 text-crimson border-crimson/30',
    slate: 'bg-slate/10 text-slate-300 border-slate/30',
    orange: 'bg-orange/10 text-orange border-orange/30',
  }[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-game-sm text-[11px] font-sans font-medium border',
        styles,
        className
      )}
    >
      {icon && <span className="w-3 h-3 shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
