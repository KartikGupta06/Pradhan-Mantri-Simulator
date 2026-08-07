'use client';

import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Radio, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventCardProps {
  title: string;
  category?: string;
  description: string;
  severity?: 'high' | 'medium' | 'low';
  onActionClick?: () => void;
  actionLabel?: string;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  category = 'National Event',
  description,
  severity = 'medium',
  onActionClick,
  actionLabel = 'Respond Now',
  className,
}) => {
  const badgeVariant = {
    high: 'crimson',
    medium: 'gold',
    low: 'emerald',
  }[severity] as 'crimson' | 'gold' | 'emerald';

  return (
    <Card variant="glass" className={cn('flex flex-col gap-3 p-4 border-gold/20', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-gold">
          <Radio className="w-4 h-4" />
          <span className="text-xs font-heading font-bold uppercase tracking-wider">{category}</span>
        </div>
        <Badge variant={badgeVariant}>{severity} Priority</Badge>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-sans text-sm font-bold text-slate-100">{title}</h3>
        <p className="text-xs text-slate-300 font-sans leading-relaxed">{description}</p>
      </div>

      {onActionClick && (
        <div className="pt-2 border-t border-gold/15 flex justify-end">
          <Button variant="primary" size="sm" onClick={onActionClick}>
            {actionLabel}
          </Button>
        </div>
      )}
    </Card>
  );
};
