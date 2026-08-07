'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface DividerProps {
  variant?: 'gold' | 'slate' | 'dashed';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'gold',
  className,
}) => {
  const styles = {
    gold: 'bg-gradient-to-r from-transparent via-gold/30 to-transparent h-[1px]',
    slate: 'bg-slate-700/40 h-[1px]',
    dashed: 'border-b border-dashed border-gold/20 h-0',
  }[variant];

  return <div className={cn('w-full my-2', styles, className)} />;
};
