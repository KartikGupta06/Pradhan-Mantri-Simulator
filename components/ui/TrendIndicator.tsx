'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendIndicatorProps {
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  isPositiveGood?: boolean; // if false, up is crimson, down is emerald (e.g. inflation/unemployment)
  className?: string;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  value,
  trend = 'neutral',
  isPositiveGood = true,
  className,
}) => {
  let textColor = 'text-slate-400';
  let Icon = Minus;

  if (trend === 'up') {
    Icon = TrendingUp;
    textColor = isPositiveGood ? 'text-emerald' : 'text-crimson';
  } else if (trend === 'down') {
    Icon = TrendingDown;
    textColor = isPositiveGood ? 'text-crimson' : 'text-emerald';
  }

  return (
    <div className={cn('inline-flex items-center gap-0.5 text-xs font-mono font-semibold', textColor, className)}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{value}</span>
    </div>
  );
};
