'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onChange,
  label,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === selectedValue) || options[0];

  return (
    <div className={cn('flex flex-col gap-1 relative w-full', className)}>
      {label && <span className="font-sans text-xs text-slate-400 font-medium">{label}</span>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2 px-3 rounded-game bg-navy-surface border border-gold/20 flex items-center justify-between text-slate-100 font-sans text-xs font-semibold hover:border-gold/50 transition-colors"
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown className={cn('w-4 h-4 text-gold transition-transform', isOpen ? 'rotate-180' : '')} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 left-0 w-full z-50 glass-panel-gold rounded-game p-1 flex flex-col gap-0.5 shadow-2xl border-gold/30">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                'w-full text-left px-3 py-2 rounded-game-sm text-xs font-sans transition-colors',
                option.value === selectedValue
                  ? 'bg-gold/20 text-gold-light font-bold'
                  : 'text-slate-300 hover:bg-navy-surface hover:text-white'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
