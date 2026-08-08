'use client';

import React from 'react';
import { Card } from './Card';
import { FileQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No policies available',
  description = 'Check back later.',
  className,
}) => {
  return (
    <Card
      variant="glass"
      className={cn(
        'w-full flex flex-col items-center justify-center p-6 text-center border-gold/15 gap-2 my-4',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-navy-surface border border-gold/20 flex items-center justify-center text-slate-400">
        <FileQuestion className="w-6 h-6" />
      </div>
      <h3 className="font-heading text-sm font-bold text-slate-200 uppercase tracking-wide">
        {title}
      </h3>
      <p className="text-xs text-slate-400 font-sans">{description}</p>
    </Card>
  );
};
