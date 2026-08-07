'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search ministers, policies...',
  className,
}) => {
  return (
    <div className={cn('relative w-full', className)}>
      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 rounded-game bg-navy-surface border border-gold/20 text-slate-100 font-sans text-xs placeholder:text-slate-500 focus:outline-none focus:border-gold/60 transition-colors"
      />
    </div>
  );
};
