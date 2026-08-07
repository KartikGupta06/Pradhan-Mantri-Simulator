'use client';

import React from 'react';
import { Card } from './Card';
import { ProgressRing } from './ProgressRing';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  percentage?: number;
  ringVariant?: 'emerald' | 'gold' | 'crimson' | 'cyan';
  icon?: React.ReactNode;
  onViewDetails?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  percentage = 75,
  ringVariant = 'gold',
  icon,
  onViewDetails,
  className,
}) => {
  return (
    <Card
      variant="glass"
      interactive={!!onViewDetails}
      onClick={onViewDetails}
      className={cn(
        'flex flex-col items-center justify-between p-2 sm:p-2.5 text-center gap-1 border-gold/20 overflow-hidden w-full h-full',
        className
      )}
    >
      {/* Circular Ring with Center Icon */}
      <ProgressRing value={percentage} size={54} strokeWidth={5} variant={ringVariant}>
        {icon && (
          <div className="w-6 h-6 rounded-full bg-navy-surface border border-gold/30 flex items-center justify-center text-gold">
            {icon}
          </div>
        )}
      </ProgressRing>

      {/* Main Value & Labels */}
      <div className="flex flex-col items-center w-full min-w-0">
        <span className="font-mono text-xs sm:text-sm font-bold text-gold-light tracking-tight truncate w-full">
          {value}
        </span>
        <span className="font-heading text-[9px] uppercase tracking-widest text-slate-400 mt-0.5 truncate w-full">
          {title}
        </span>
        {subtitle && (
          <span className="text-[9px] font-sans font-semibold text-emerald mt-0.5 truncate w-full">
            {subtitle}
          </span>
        )}
      </div>

      {/* View Details Link */}
      {onViewDetails && (
        <div className="flex items-center gap-0.5 text-[9px] font-sans text-slate-400 hover:text-gold transition-colors pt-0.5 border-t border-gold/10 w-full justify-center shrink-0">
          <span>View Details</span>
          <ChevronRight className="w-2.5 h-2.5" />
        </div>
      )}
    </Card>
  );
};
