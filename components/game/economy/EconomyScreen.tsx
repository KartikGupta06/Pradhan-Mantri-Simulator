'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrendIndicator } from '@/components/ui/TrendIndicator';
import { useGameStore } from '@/game/store/useGameStore';
import {
  TrendingUp,
  Landmark,
  Percent,
  Users,
  Coins,
  Heart,
  Activity,
  History,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EconomyScreenProps {
  onClose?: () => void;
  className?: string;
}

export const EconomyScreen: React.FC<EconomyScreenProps> = ({ onClose, className }) => {
  const gameState = useGameStore((state) => state.gameState);

  const { treasury, gdp, inflation, unemployment } = gameState.economy;
  const { popularity } = gameState.publicOpinion;
  const { derivedEconomy, economicHistory = [] } = gameState;

  const {
    gdpGrowth,
    economicHealth,
    economicStatus,
    countryHealth,
    economicMomentum,
    treasuryStatus,
  } = derivedEconomy;

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'booming':
      case 'strong':
        return 'emerald';
      case 'stable':
        return 'gold';
      default:
        return 'crimson';
    }
  };

  const getTreasuryBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy':
        return 'emerald';
      case 'warning':
        return 'gold';
      default:
        return 'crimson';
    }
  };

  const getMomentumTrend = (momentum: string): 'up' | 'down' | 'neutral' => {
    if (momentum === 'Improving') return 'up';
    if (momentum === 'Declining') return 'down';
    return 'neutral';
  };

  return (
    <motion.div
      {...pageTransition}
      className={cn('w-full flex flex-col gap-3.5 pb-8 max-w-full select-none text-left', className)}
    >
      {/* Top Header */}
      <PageHeader
        title="Economy"
        subtitle="State of the Indian economy"
        badgeText="National Accounts"
      />

      {/* TOP SECTION: Economic Health Large Visual Indicator */}
      <Card variant="gold" className="flex flex-col gap-3 p-4 border-gold/40 shadow-gold-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-gold" />
            <h2 className="font-heading text-xs font-bold uppercase tracking-wide text-slate-100">
              NATIONAL ECONOMIC HEALTH INDEX
            </h2>
          </div>
          <Badge variant={getStatusBadgeVariant(economicStatus)} className="text-[10px] py-0.5 px-2">
            {economicStatus.toUpperCase()}
          </Badge>
        </div>

        <div className="flex items-center justify-between my-1">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold gold-gradient-text">
                {economicHealth}
              </span>
              <span className="text-xs font-mono text-slate-400">/ 100</span>
            </div>
            <span className="text-[10px] font-sans text-slate-300 mt-0.5">
              Weighted Index (GDP 40% • Inflation 30% • Jobs 30%)
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-navy-dark rounded-full border border-gold/20">
              <span className="text-[10px] font-mono text-slate-400">MOMENTUM:</span>
              <TrendIndicator
                value={economicMomentum}
                trend={getMomentumTrend(economicMomentum)}
                isPositiveGood={economicMomentum !== 'Declining'}
                className="text-xs font-bold"
              />
            </div>
            <span className="text-[10px] font-mono text-emerald flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Country Health: {countryHealth}/100
            </span>
          </div>
        </div>
      </Card>

      {/* KEY METRICS GRID (6 Core Cards) */}
      <div className="flex flex-col gap-2">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gold-light pl-1">
          KEY MACROECONOMIC INDICATORS
        </span>

        <div className="grid grid-cols-2 gap-2">
          {/* GDP Card */}
          <Card variant="glass" className="flex flex-col gap-1.5 p-3 border-gold/15">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-gold" /> GDP TOTAL
              </span>
              <TrendIndicator value="+0.4T" trend="up" isPositiveGood />
            </div>
            <span className="font-mono text-lg font-bold text-slate-100">
              ₹ {gdp.toFixed(2)} T
            </span>
            <span className="text-[10px] text-slate-400 font-sans">Gross Domestic Product</span>
          </Card>

          {/* GDP Growth Card */}
          <Card variant="glass" className="flex flex-col gap-1.5 p-3 border-gold/15">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono">
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-cyan-400" /> GDP GROWTH
              </span>
              <TrendIndicator value="Annual" trend="up" isPositiveGood />
            </div>
            <span className="font-mono text-lg font-bold text-cyan-400">
              {gdpGrowth}%
            </span>
            <span className="text-[10px] text-slate-400 font-sans">Derived Annual Growth</span>
          </Card>

          {/* Treasury Card */}
          <Card variant="glass" className="flex flex-col gap-1.5 p-3 border-gold/15">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono">
              <span className="flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-gold" /> TREASURY
              </span>
              <Badge variant={getTreasuryBadgeVariant(treasuryStatus)} className="text-[8px] py-0 px-1">
                {treasuryStatus.toUpperCase()}
              </Badge>
            </div>
            <span className="font-mono text-lg font-bold text-gold-light">
              ₹ {treasury.toLocaleString('en-IN')} Cr
            </span>
            <span className="text-[10px] text-slate-400 font-sans">Available Federal Reserves</span>
          </Card>

          {/* Inflation Card */}
          <Card variant="glass" className="flex flex-col gap-1.5 p-3 border-gold/15">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono">
              <span className="flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-crimson" /> INFLATION
              </span>
              <TrendIndicator value="CPI" trend={inflation > 4.5 ? 'up' : 'down'} isPositiveGood={false} />
            </div>
            <span className="font-mono text-lg font-bold text-slate-100">
              {inflation.toFixed(1)}%
            </span>
            <span className="text-[10px] text-slate-400 font-sans">Consumer Price Index</span>
          </Card>

          {/* Unemployment Card */}
          <Card variant="glass" className="flex flex-col gap-1.5 p-3 border-gold/15">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-cyan-400" /> UNEMPLOYMENT
              </span>
              <TrendIndicator value="Rate" trend={unemployment > 6.5 ? 'up' : 'down'} isPositiveGood={false} />
            </div>
            <span className="font-mono text-lg font-bold text-slate-100">
              {unemployment.toFixed(1)}%
            </span>
            <span className="text-[10px] text-slate-400 font-sans">Workforce Unemployed</span>
          </Card>

          {/* Popularity Card */}
          <Card variant="glass" className="flex flex-col gap-1.5 p-3 border-gold/15">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-emerald" /> POPULARITY
              </span>
              <TrendIndicator value="Approval" trend="up" isPositiveGood />
            </div>
            <span className="font-mono text-lg font-bold text-emerald">
              {Math.round(popularity)}%
            </span>
            <span className="text-[10px] text-slate-400 font-sans">Public Approval Rating</span>
          </Card>
        </div>
      </div>

      {/* SIMPLE HISTORY SNAPSHOTS STRIP (Last 12 Weeks) */}
      <div className="flex flex-col gap-2 mt-1">
        <div className="flex items-center justify-between pl-1 text-gold-light text-[10px] font-heading font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1">
            <History className="w-3.5 h-3.5 text-gold" /> WEEKLY ECONOMIC SNAPSHOT HISTORY (LAST 12 WEEKS)
          </span>
        </div>

        <Card variant="glass" className="flex flex-col gap-2 p-3 border-gold/15 overflow-hidden">
          <div className="flex flex-col gap-1.5 max-h-[180px] overflow-y-auto pr-1 text-[10px] font-mono">
            {[...economicHistory].reverse().map((snap, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded bg-navy-dark border border-gold/10 hover:border-gold/30 transition-all"
              >
                <span className="text-slate-300 font-bold">{snap.timestamp}</span>
                <span className="text-cyan-400">Growth: {snap.gdpGrowth}%</span>
                <span className="text-gold-light">₹{snap.treasury.toLocaleString('en-IN')}Cr</span>
                <span className="text-emerald">Health: {snap.economicHealth}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {onClose && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gold/15 text-gold border border-gold/30 rounded-game text-xs font-sans font-bold"
          >
            Close Panel
          </button>
        </div>
      )}
    </motion.div>
  );
};
