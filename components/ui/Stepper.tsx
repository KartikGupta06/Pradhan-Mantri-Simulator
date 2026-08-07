'use client';

import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepperProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  className,
}) => {
  const handleDecrement = () => {
    if (value - step >= min) onChange(value - step);
  };

  const handleIncrement = () => {
    if (value + step <= max) onChange(value + step);
  };

  return (
    <div className={cn('flex items-center justify-between p-2 rounded-game glass-panel border-gold/20', className)}>
      {label && <span className="font-sans text-xs font-semibold text-slate-200">{label}</span>}
      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrement}
          disabled={value <= min}
          className="w-7 h-7 rounded-game-sm bg-navy-surface border border-gold/30 flex items-center justify-center text-gold disabled:opacity-40 disabled:pointer-events-none hover:bg-gold/10"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="font-mono text-sm font-bold text-gold-light min-w-[24px] text-center">
          {value}
        </span>
        <button
          onClick={handleIncrement}
          disabled={value >= max}
          className="w-7 h-7 rounded-game-sm bg-navy-surface border border-gold/30 flex items-center justify-center text-gold disabled:opacity-40 disabled:pointer-events-none hover:bg-gold/10"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
