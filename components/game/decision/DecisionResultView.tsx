'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition, popupAnimation } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TrendIndicator } from '@/components/ui/TrendIndicator';
import { PolicyOption } from './DecisionDetailsView';
import { CheckCircle2, Newspaper, Home, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DecisionResultViewProps {
  option: PolicyOption | null;
  onReturnHome: () => void;
  className?: string;
}

export const DecisionResultView: React.FC<DecisionResultViewProps> = ({
  option,
  onReturnHome,
  className,
}) => {
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
        <Badge variant="emerald">POLICY BILL PASSED</Badge>
        <h1 className="font-heading text-xl sm:text-2xl font-extrabold gold-gradient-text uppercase tracking-wide">
          DECISION ACCEPTED & ENACTED
        </h1>
        <p className="text-xs text-slate-300 font-sans max-w-[280px]">
          The Cabinet has formally passed the executive directive into national law.
        </p>
      </motion.div>

      {/* Enacted Policy Summary Card */}
      <Card variant="gold" className="flex flex-col gap-2 p-3.5 text-left border-gold/40">
        <span className="text-[9px] font-mono uppercase text-gold">ENACTED POLICY</span>
        <h3 className="font-sans text-sm font-bold text-slate-100">
          {option?.title || 'Targeted Direct Benefit Transfer (DBT)'}
        </h3>
        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          {option?.description || 'Direct financial assistance transferred to small farmers across 14 states.'}
        </p>
      </Card>

      {/* National Metric Changes Recap Grid */}
      <div className="flex flex-col gap-1.5 text-left">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gold-light">
          IMMEDIATE NATIONAL IMPACT RECAP
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Card variant="glass" className="flex flex-col p-2 text-center border-gold/15">
            <span className="text-[9px] font-mono text-slate-400 uppercase">POPULARITY</span>
            <TrendIndicator value="+5%" trend="up" isPositiveGood className="justify-center mt-1 text-sm font-bold" />
          </Card>
          <Card variant="glass" className="flex flex-col p-2 text-center border-gold/15">
            <span className="text-[9px] font-mono text-slate-400 uppercase">ECONOMY</span>
            <TrendIndicator value="+2.4%" trend="up" isPositiveGood className="justify-center mt-1 text-sm font-bold" />
          </Card>
          <Card variant="glass" className="flex flex-col p-2 text-center border-gold/15">
            <span className="text-[9px] font-mono text-slate-400 uppercase">APPROVAL</span>
            <TrendIndicator value="+4%" trend="up" isPositiveGood className="justify-center mt-1 text-sm font-bold" />
          </Card>
          <Card variant="glass" className="flex flex-col p-2 text-center border-gold/15">
            <span className="text-[9px] font-mono text-slate-400 uppercase">TREASURY</span>
            <TrendIndicator value={option?.cost ? `-${option.cost}` : '-₹14k Cr'} trend="down" isPositiveGood={false} className="justify-center mt-1 text-sm font-bold" />
          </Card>
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
          "PM ANNOUNCES HISTORIC RELIEF PACKAGE FOR FARMERS ACROSS INDIA"
        </h4>
        <p className="text-[11px] text-slate-300 font-sans line-clamp-2">
          Public reaction remains overwhelmingly positive as financial aid reaches rural districts ahead of monsoon sowing season.
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
