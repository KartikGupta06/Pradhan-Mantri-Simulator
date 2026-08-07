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
      className={cn('flex flex-col items-center justify-between p-3.5 text-center gap-2 border-gold/20', className)}
    >
      {/* Circular Ring with Center Icon */}
      <ProgressRing value={percentage} size={70} strokeWidth={6} variant={ringVariant}>
        {icon && (
          <div className="w-8 h-8 rounded-full bg-navy-surface border border-gold/30 flex items-center justify-center text-gold">
            {icon}
          </div>
        )}
      </ProgressRing>

      {/* Main Value & Labels */}
      <div className="flex flex-col items-center">
        <span className="font-mono text-base font-bold text-gold-light tracking-tight">{value}</span>
        <span className="font-heading text-[10px] uppercase tracking-widest text-slate-400 mt-0.5">
          {title}
        </span>
        {subtitle && (
          <span className="text-[10px] font-sans font-semibold text-emerald mt-0.5">
            {subtitle}
          </span>
        )}
      </div>

      {/* View Details Link */}
      {onViewDetails && (
        <div className="flex items-center gap-0.5 text-[10px] font-sans text-slate-400 hover:text-gold transition-colors pt-1 border-t border-gold/10 w-full justify-center">
          <span>View Details</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      )}
    </Card>
  );
};
