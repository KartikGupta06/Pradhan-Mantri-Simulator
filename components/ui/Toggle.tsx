'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className,
}) => {
  return (
    <label className={cn('inline-flex items-center gap-3 cursor-pointer select-none', disabled ? 'opacity-50 pointer-events-none' : '', className)}>
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'w-11 h-6 rounded-full p-0.5 transition-colors duration-200 border',
          checked
            ? 'bg-gold-dark/80 border-gold shadow-gold-sm'
            : 'bg-navy-surface border-gold/20'
        )}
      >
        <motion.div
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={cn(
            'w-4 h-4 rounded-full shadow-md',
            checked ? 'bg-gold-light' : 'bg-slate-500'
          )}
        />
      </div>
      {label && <span className="font-sans text-xs text-slate-200">{label}</span>}
    </label>
  );
};
