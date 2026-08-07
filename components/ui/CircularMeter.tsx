'use client';

import React from 'react';
import { ProgressRing } from './ProgressRing';
import { cn } from '@/lib/utils';

interface CircularMeterProps {
  value: number; // 0 to 100
  label: string;
  sublabel?: string;
  variant?: 'emerald' | 'gold' | 'crimson' | 'cyan';
  icon?: React.ReactNode;
  size?: number;
  className?: string;
}

export const CircularMeter: React.FC<CircularMeterProps> = ({
  value,
  label,
  sublabel,
  variant = 'gold',
  icon,
  size = 84,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-1.5 p-3 rounded-game glass-panel text-center', className)}>
      <ProgressRing value={value} size={size} variant={variant}>
        {icon ? (
          <div className="w-9 h-9 rounded-full bg-navy-surface border border-gold/20 flex items-center justify-center text-gold">
            {icon}
          </div>
        ) : (
          <span className="font-mono text-sm font-bold text-gold-light">{value}%</span>
        )}
      </ProgressRing>
      <span className="font-heading text-[11px] uppercase tracking-wider text-slate-300">
        {label}
      </span>
      {sublabel && (
        <span className="text-[10px] font-sans text-emerald font-semibold">
          {sublabel}
        </span>
      )}
    </div>
  );
};
