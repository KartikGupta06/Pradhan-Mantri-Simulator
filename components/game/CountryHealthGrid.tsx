'use client';

import React from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { Heart, Coins, TrendingUp, Vote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/game/store/useGameStore';

interface CountryHealthGridProps {
  onCardClick?: (metric: string) => void;
  className?: string;
}

export const CountryHealthGrid: React.FC<CountryHealthGridProps> = ({
  onCardClick,
  className,
}) => {
  const gameState = useGameStore((state) => state.gameState);
  const { treasury, gdp } = gameState.economy;
  const { popularity } = gameState.publicOpinion;
  const { yearsRemaining } = gameState.election;

  const popularitySubtitle =
    popularity >= 70 ? 'Very Good' : popularity >= 50 ? 'Moderate' : 'Critical';

  return (
    <div className={cn('grid grid-cols-4 gap-1.5 w-full shrink-0', className)}>
      {/* Popularity Card */}
      <StatCard
        title="POPULARITY"
        value={`${popularity}%`}
        subtitle={popularitySubtitle}
        percentage={popularity}
        ringVariant={popularity >= 60 ? 'emerald' : popularity >= 40 ? 'gold' : 'crimson'}
        icon={<Heart className="w-3.5 h-3.5 text-emerald" />}
        onViewDetails={() => onCardClick?.('popularity')}
      />

      {/* Treasury Card */}
      <StatCard
        title="TREASURY"
        value={`₹ ${treasury.toLocaleString('en-IN')} Cr`}
        subtitle="Healthy"
        percentage={Math.min(100, Math.max(10, Math.round((treasury / 25000) * 100)))}
        ringVariant="gold"
        icon={<Coins className="w-3.5 h-3.5 text-gold" />}
        onViewDetails={() => onCardClick?.('treasury')}
      />

      {/* Economy Card */}
      <StatCard
        title="ECONOMY"
        value={`₹ ${gdp.toFixed(2)} T`}
        subtitle="Growing"
        percentage={70}
        ringVariant="cyan"
        icon={<TrendingUp className="w-3.5 h-3.5 text-cyan-400" />}
        onViewDetails={() => onCardClick?.('economy')}
      />

      {/* Election Card */}
      <StatCard
        title="ELECTION"
        value={`${yearsRemaining} Years`}
        subtitle="Time Left"
        percentage={40}
        ringVariant="gold"
        icon={<Vote className="w-3.5 h-3.5 text-purple-400" />}
        onViewDetails={() => onCardClick?.('election')}
      />
    </div>
  );
};
