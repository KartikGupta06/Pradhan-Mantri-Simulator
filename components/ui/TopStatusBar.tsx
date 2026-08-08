'use client';

import React from 'react';
import { CountryStatBlock } from './CountryStatBlock';
import { Landmark, TrendingUp, Percent, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/game/store/useGameStore';

interface TopStatusBarProps {
  treasury?: string;
  gdp?: string;
  inflation?: string;
  unemployment?: string;
  className?: string;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  treasury: propTreasury,
  gdp: propGdp,
  inflation: propInflation,
  unemployment: propUnemployment,
  className,
}) => {
  const gameState = useGameStore((state) => state.gameState);

  const treasury =
    propTreasury ?? `₹ ${gameState.economy.treasury.toLocaleString('en-IN')} Cr`;
  const gdp = propGdp ?? `₹ ${gameState.economy.gdp.toFixed(2)} T`;
  const inflation = propInflation ?? `${gameState.economy.inflation.toFixed(1)}%`;
  const unemployment =
    propUnemployment ?? `${gameState.economy.unemployment.toFixed(1)}%`;

  return (
    <div
      className={cn(
        'w-full glass-panel rounded-game-sm px-1.5 py-1 grid grid-cols-4 gap-1 z-30 shrink-0 overflow-hidden',
        className
      )}
    >
      <CountryStatBlock
        label="Treasury"
        value={treasury}
        change="0.0%"
        trend="up"
        icon={<Landmark className="w-3 h-3" />}
      />
      <CountryStatBlock
        label="GDP"
        value={gdp}
        change="0.0%"
        trend="up"
        icon={<TrendingUp className="w-3 h-3" />}
      />
      <CountryStatBlock
        label="Inflation"
        value={inflation}
        change="0.0%"
        trend="down"
        isPositiveGood={false}
        icon={<Percent className="w-3 h-3" />}
      />
      <CountryStatBlock
        label="Unemploy."
        value={unemployment}
        change="0.0%"
        trend="up"
        isPositiveGood={false}
        icon={<Users className="w-3 h-3" />}
      />
    </div>
  );
};
