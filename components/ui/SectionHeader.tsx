'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText,
  onActionClick,
  icon,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between py-1 border-b border-gold/15', className)}>
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-gold opacity-80">{icon}</span>}
        <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-gold-light">
          {title}
        </h4>
      </div>
      {actionText && (
        <button
          onClick={onActionClick}
          className="text-[11px] font-sans text-slate-400 hover:text-gold transition-colors font-medium flex items-center gap-1"
        >
          {actionText} &gt;
        </button>
      )}
    </div>
  );
};
