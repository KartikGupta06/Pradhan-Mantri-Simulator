'use client';

import React from 'react';
import { Card } from './Card';
import { StatTileProps } from '@/types/ui';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  change,
  trend = 'neutral',
  icon,
  className,
}) => {
  const trendColor = {
    up: 'text-emerald',
    down: 'text-crimson',
    neutral: 'text-slate-400',
  }[trend];

  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  }[trend];

  return (
    <Card variant="glass" className={cn('flex flex-col gap-1 p-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-slate-400">
          {label}
        </span>
        {icon && <span className="text-gold opacity-80">{icon}</span>}
      </div>
      <div className="flex items-baseline justify-between mt-1">
        <span className="font-mono text-lg font-bold text-gold-light">
          {value}
        </span>
        {change && (
          <div className={cn('flex items-center gap-0.5 text-xs font-mono', trendColor)}>
            <TrendIcon className="w-3 h-3" />
            <span>{change}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
