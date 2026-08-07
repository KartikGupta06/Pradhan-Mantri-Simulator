'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SegmentOption {
  value: string;
  label: string;
}

interface SegmentControlProps {
  options: SegmentOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SegmentControl: React.FC<SegmentControlProps> = ({
  options,
  selectedValue,
  onChange,
  className,
}) => {
  return (
    <div className={cn('w-full p-1 rounded-game-sm bg-navy-dark border border-gold/15 flex items-center gap-1', className)}>
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex-1 py-1.5 px-2 rounded-game-sm font-sans text-xs font-semibold uppercase tracking-wider transition-colors relative z-10 text-center',
              isSelected ? 'text-navy-dark font-bold' : 'text-slate-400 hover:text-slate-200'
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="segment-active-bg"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="absolute inset-0 rounded-game-sm gold-gradient-bg shadow-gold-sm -z-10"
              />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
