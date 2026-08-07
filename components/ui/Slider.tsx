'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  unit?: string;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  unit = '%',
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {(label || value !== undefined) && (
        <div className="flex items-center justify-between text-xs font-sans">
          {label && <span className="text-slate-300 font-medium">{label}</span>}
          <span className="font-mono font-bold text-gold-light">
            {value} {unit}
          </span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-gold bg-navy-surface h-2 rounded-lg cursor-pointer border border-gold/20"
      />
    </div>
  );
};
