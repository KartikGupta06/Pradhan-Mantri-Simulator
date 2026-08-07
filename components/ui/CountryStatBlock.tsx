'use client';

import React from 'react';
import { TrendIndicator } from './TrendIndicator';
import { cn } from '@/lib/utils';

interface CountryStatBlockProps {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  isPositiveGood?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const CountryStatBlock: React.FC<CountryStatBlockProps> = ({
  label,
  value,
  change,
  trend = 'neutral',
  isPositiveGood = true,
  icon,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-0.5 px-2 py-1 bg-navy-surface/60 rounded-game-sm border border-gold/10', className)}>
      <div className="flex items-center gap-1">
        {icon && <span className="text-gold text-xs opacity-75">{icon}</span>}
        <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-xs font-bold text-gold-light">
          {value}
        </span>
        {change && (
          <TrendIndicator value={change} trend={trend} isPositiveGood={isPositiveGood} />
        )}
      </div>
    </div>
  );
};
