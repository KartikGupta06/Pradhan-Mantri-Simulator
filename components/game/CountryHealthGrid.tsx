'use client';

import React from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { Heart, Coins, TrendingUp, Vote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountryHealthGridProps {
  onCardClick?: (metric: string) => void;
  className?: string;
}

export const CountryHealthGrid: React.FC<CountryHealthGridProps> = ({
  onCardClick,
  className,
}) => {
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-2 w-full', className)}>
      {/* Popularity Card */}
      <StatCard
        title="POPULARITY"
        value="76%"
        subtitle="Very Good"
        percentage={76}
        ringVariant="emerald"
        icon={<Heart className="w-4 h-4 text-emerald" />}
        onViewDetails={() => onCardClick?.('popularity')}
      />

      {/* Treasury Card */}
      <StatCard
        title="TREASURY"
        value="₹ 18,450 Cr"
        subtitle="Healthy"
        percentage={82}
        ringVariant="gold"
        icon={<Coins className="w-4 h-4 text-gold" />}
        onViewDetails={() => onCardClick?.('treasury')}
      />

      {/* Economy Card */}
      <StatCard
        title="ECONOMY"
        value="₹ 320.45 T"
        subtitle="Growing"
        percentage={70}
        ringVariant="cyan"
        icon={<TrendingUp className="w-4 h-4 text-cyan-400" />}
        onViewDetails={() => onCardClick?.('economy')}
      />

      {/* Election Card */}
      <StatCard
        title="ELECTION"
        value="2 Years"
        subtitle="Time Left"
        percentage={40}
        ringVariant="gold"
        icon={<Vote className="w-4 h-4 text-purple-400" />}
        onViewDetails={() => onCardClick?.('election')}
      />
    </div>
  );
};
