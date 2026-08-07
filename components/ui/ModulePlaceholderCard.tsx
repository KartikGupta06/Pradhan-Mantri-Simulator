'use client';

import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModulePlaceholderCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  statusBadge?: string;
  badgeVariant?: 'gold' | 'emerald' | 'crimson' | 'slate';
  onClick?: () => void;
  className?: string;
}

export const ModulePlaceholderCard: React.FC<ModulePlaceholderCardProps> = ({
  icon,
  title,
  description,
  statusBadge = 'Coming Soon',
  badgeVariant = 'gold',
  onClick,
  className,
}) => {
  return (
    <Card
      variant="glass"
      interactive={!!onClick}
      onClick={onClick}
      className={cn('flex items-center justify-between p-3.5 border-gold/20 gap-3 group', className)}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-10 h-10 rounded-game-sm bg-navy-surface border border-gold/30 flex items-center justify-center text-gold shrink-0 shadow-gold-sm group-hover:border-gold transition-colors">
          {icon}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-xs font-bold text-slate-100 uppercase tracking-wide truncate">
              {title}
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-tight mt-0.5 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <Badge variant={badgeVariant} className="text-[9px] py-0.5 px-2">
          {statusBadge}
        </Badge>
        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-gold transition-colors" />
      </div>
    </Card>
  );
};
