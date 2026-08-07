'use client';

import React from 'react';
import { CountryStatBlock } from './CountryStatBlock';
import { Landmark, TrendingUp, Percent, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopStatusBarProps {
  treasury?: string;
  gdp?: string;
  inflation?: string;
  unemployment?: string;
  className?: string;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  treasury = '₹ 18,450 Cr',
  gdp = '₹ 320.45 T',
  inflation = '4.1%',
  unemployment = '6.2%',
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full glass-panel rounded-game-sm px-2 py-1.5 grid grid-cols-4 gap-1 z-30 shrink-0',
        className
      )}
    >
      <CountryStatBlock
        label="Treasury"
        value={treasury}
        change="2.4%"
        trend="up"
        icon={<Landmark className="w-3 h-3" />}
      />
      <CountryStatBlock
        label="GDP"
        value={gdp}
        change="2.1%"
        trend="up"
        icon={<TrendingUp className="w-3 h-3" />}
      />
      <CountryStatBlock
        label="Inflation"
        value={inflation}
        change="-0.3%"
        trend="down"
        isPositiveGood={false}
        icon={<Percent className="w-3 h-3" />}
      />
      <CountryStatBlock
        label="Unemploy."
        value={unemployment}
        change="0.4%"
        trend="up"
        isPositiveGood={false}
        icon={<Users className="w-3 h-3" />}
      />
    </div>
  );
};
