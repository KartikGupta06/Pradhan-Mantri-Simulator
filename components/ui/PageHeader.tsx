'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Badge } from './Badge';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
  badgeText?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  backHref = '/dashboard',
  badgeText = 'Module',
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full flex items-center justify-between p-3 rounded-game glass-panel border-gold/20 shrink-0 select-none',
        className
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {showBack && (
          <Link
            href={backHref}
            className="w-8 h-8 rounded-full bg-navy-surface border border-gold/25 flex items-center justify-center text-gold hover:border-gold transition-colors shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
        )}
        <div className="flex flex-col min-w-0">
          <h1 className="font-heading text-sm sm:text-base font-bold gold-gradient-text uppercase tracking-wide truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[10px] text-slate-400 font-sans truncate">{subtitle}</p>
          )}
        </div>
      </div>

      {badgeText && (
        <div className="shrink-0 ml-2">
          <Badge variant="gold" className="text-[9px]">
            {badgeText}
          </Badge>
        </div>
      )}
    </div>
  );
};
