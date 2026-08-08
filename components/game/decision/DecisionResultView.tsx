'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition, popupAnimation } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TrendIndicator } from '@/components/ui/TrendIndicator';
import { DecisionResult } from '@/types/decision';
import { CheckCircle2, Newspaper, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/game/store/useGameStore';

interface DecisionResultViewProps {
  result?: DecisionResult | null;
  onReturnHome: () => void;
  className?: string;
}

export const DecisionResultView: React.FC<DecisionResultViewProps> = ({
  result: propResult,
  onReturnHome,
  className,
}) => {
  const storeResult = useGameStore((state) => state.latestResult);
  const result = propResult || storeResult;

  const decisionTitle = result?.decisionTitle || 'Flood in Assam';
  const optionTitle = result?.selectedOptionTitle || 'Emergency Relief Package';
  const optionDescription = result?.selectedOptionDescription || 'Immediate crisis response deployed.';
  const statChanges = result?.statChanges || [];

  return (
    <motion.div
      {...pageTransition}
      className={cn('w-full flex flex-col gap-4 py-2 px-1 select-none text-center', className)}
    >
      {/* Top Victory / Enactment Icon Banner */}
      <motion.div {...popupAnimation} className="flex flex-col items-center gap-2 mt-2">
        <div className="w-16 h-16 rounded-full bg-emerald/20 border-2 border-emerald flex items-center justify-center text-emerald shadow-emerald-glow">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>
        <Badge variant="emerald">EXECUTIVE DIRECTIVE ENACTED</Badge>
        <h1 className="font-heading text-xl sm:text-2xl font-extrabold gold-gradient-text uppercase tracking-wide">
          {decisionTitle}
        </h1>
        <p className="text-xs text-slate-300 font-sans max-w-[280px]">
          The Prime Minister&apos;s office has issued the executive directive into national implementation.
        </p>
      </motion.div>

      {/* Enacted Policy Summary Card */}
      <Card variant="gold" className="flex flex-col gap-2 p-3.5 text-left border-gold/40">
        <span className="text-[9px] font-mono uppercase text-gold">ENACTED OPTION</span>
        <h3 className="font-sans text-sm font-bold text-slate-100">
          {optionTitle}
        </h3>
        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          {optionDescription}
        </p>
      </Card>

      {/* National Metric Changes Recap Grid */}
      <div className="flex flex-col gap-1.5 text-left">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gold-light">
          IMMEDIATE NATIONAL IMPACT RECAP
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {statChanges.map((change) => (
            <Card key={change.statKey} variant="glass" className="flex flex-col p-2 text-center border-gold/15">
              <span className="text-[9px] font-mono text-slate-400 uppercase">{change.label}</span>
              <TrendIndicator
                value={change.formattedDelta}
                trend={change.delta >= 0 ? 'up' : 'down'}
                isPositiveGood={change.isPositiveGood}
                className="justify-center mt-1 text-sm font-bold"
              />
              <span className="text-[9px] font-sans text-slate-400 mt-1">
                New: <span className="text-slate-200 font-mono">{change.formattedNew}</span>
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* Breaking News Paper Preview Card */}
      <Card variant="glass" className="flex flex-col gap-2 p-3 text-left border-gold/20 relative overflow-hidden">
        <div className="flex items-center gap-1.5 text-gold">
          <Newspaper className="w-4 h-4" />
          <span className="font-heading text-[10px] uppercase font-bold tracking-widest">
            THE TIMES OF INDIA • BREAKING NEWS
          </span>
        </div>
        <h4 className="font-heading text-xs font-bold text-slate-100 uppercase leading-snug">
          &quot;GOVERNMENT ANNOUNCES ACTION PLAN FOR {decisionTitle.toUpperCase()}&quot;
        </h4>
        <p className="text-[11px] text-slate-300 font-sans line-clamp-2">
          {result?.summary || 'Public and media reaction following the Prime Minister\'s swift executive decision.'}
        </p>
      </Card>

      {/* Return to Executive Office CTA */}
      <div className="mt-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onReturnHome}
          className="flex items-center justify-center gap-2 py-4"
        >
          <Home className="w-5 h-5" />
          <span>Return to Executive Office</span>
        </Button>
      </div>
    </motion.div>
  );
};
