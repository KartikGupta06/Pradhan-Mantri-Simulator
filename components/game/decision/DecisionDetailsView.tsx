'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition, tapAnimation } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TrendIndicator } from '@/components/ui/TrendIndicator';
import { Gavel, CheckCircle2, ChevronRight, Coins, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PolicyOption {
  id: string;
  title: string;
  description: string;
  pros: string;
  cons: string;
  cost: string;
  impacts: { label: string; value: string; trend: 'up' | 'down' | 'neutral'; isPositive: boolean }[];
}

const POLICY_OPTIONS: PolicyOption[] = [
  {
    id: 'opt_a',
    title: 'Option A: Full Subsidized Relief Package',
    description: 'Provide immediate 100% farm loan waivers and free fertilizer distribution across all drought-affected districts.',
    pros: 'Maximum farmer popularity surge & immediate crisis containment.',
    cons: 'Heavy treasury drain & minor inflation increase.',
    cost: '₹ 25,000 Cr',
    impacts: [
      { label: 'Popularity', value: '+8%', trend: 'up', isPositive: true },
      { label: 'Treasury', value: '-₹25k Cr', trend: 'down', isPositive: false },
      { label: 'Approval', value: '+6%', trend: 'up', isPositive: true },
    ],
  },
  {
    id: 'opt_b',
    title: 'Option B: Targeted Direct Benefit Transfer (DBT)',
    description: 'Transfer direct digital cash assistance into verified bank accounts of small and marginal farmers.',
    pros: 'Zero leakages, balanced cost, high middle-class approval.',
    cons: 'Moderate immediate popularity increase.',
    cost: '₹ 14,000 Cr',
    impacts: [
      { label: 'Popularity', value: '+5%', trend: 'up', isPositive: true },
      { label: 'Treasury', value: '-₹14k Cr', trend: 'down', isPositive: false },
      { label: 'Economy', value: '+2.4%', trend: 'up', isPositive: true },
    ],
  },
  {
    id: 'opt_c',
    title: 'Option C: Irrigation Infrastructure & Credit Loans',
    description: 'Invest in canal networks, solar water pumps, and subsidized low-interest agricultural bank loans.',
    pros: 'Long-term GDP growth & low treasury burden.',
    cons: 'Slower immediate relief for suffering farmers.',
    cost: '₹ 8,000 Cr',
    impacts: [
      { label: 'Economy', value: '+4.1%', trend: 'up', isPositive: true },
      { label: 'Treasury', value: '-₹8k Cr', trend: 'down', isPositive: false },
      { label: 'Employment', value: '+3.0%', trend: 'up', isPositive: true },
    ],
  },
];

interface DecisionDetailsViewProps {
  onImplementOption: (option: PolicyOption) => void;
  className?: string;
}

export const DecisionDetailsView: React.FC<DecisionDetailsViewProps> = ({
  onImplementOption,
  className,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('opt_b');
  const selectedOption = POLICY_OPTIONS.find((opt) => opt.id === selectedOptionId) || POLICY_OPTIONS[1];

  return (
    <motion.div
      {...pageTransition}
      className={cn('w-full flex flex-col gap-3 pb-8 select-none', className)}
    >
      {/* Top Header Strip */}
      <div className="flex items-center justify-between border-b border-gold/20 pb-2">
        <div className="flex items-center gap-2 text-gold">
          <Gavel className="w-5 h-5" />
          <h2 className="font-heading text-sm font-bold gold-gradient-text uppercase tracking-wide">
            CABINET DECISION CARD
          </h2>
        </div>
        <Badge variant="crimson">HIGH URGENCY</Badge>
      </div>

      {/* Main Decision Detail Card */}
      <Card variant="glass" className="flex flex-col gap-2.5 p-3.5 border-gold/25">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-gold">AGRICULTURE & ECONOMY</span>
          <span className="text-xs font-mono font-bold text-slate-300">Est. Cost: ₹ 25,000 Cr</span>
        </div>

        <h1 className="font-sans text-base sm:text-lg font-bold text-slate-100 leading-snug">
          National Agricultural Relief & Subsidy Reform
        </h1>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          Severe drought conditions in Western India require immediate government intervention to protect farm incomes, prevent agrarian distress, and stabilize national food inflation.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gold/15 text-center">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-400">URGENCY</span>
            <span className="text-xs font-sans font-bold text-crimson">High</span>
          </div>
          <div className="flex flex-col border-x border-gold/15">
            <span className="text-[9px] font-mono text-slate-400">DIFFICULTY</span>
            <span className="text-xs font-sans font-bold text-gold-light">Medium</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-400">STATUS</span>
            <span className="text-xs font-sans font-bold text-emerald">Awaiting Vote</span>
          </div>
        </div>
      </Card>

      {/* Overall Impact Preview Chips */}
      <div className="flex flex-col gap-1.5">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gold-light">
          PROJECTED NATIONAL IMPACT PREVIEW
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="px-2 py-1 bg-navy-surface rounded-game-sm border border-gold/15 flex items-center justify-between">
            <span className="text-[10px] font-sans text-slate-400">Popularity</span>
            <TrendIndicator value="+5%" trend="up" isPositiveGood />
          </div>
          <div className="px-2 py-1 bg-navy-surface rounded-game-sm border border-gold/15 flex items-center justify-between">
            <span className="text-[10px] font-sans text-slate-400">Economy</span>
            <TrendIndicator value="+2.4%" trend="up" isPositiveGood />
          </div>
          <div className="px-2 py-1 bg-navy-surface rounded-game-sm border border-gold/15 flex items-center justify-between">
            <span className="text-[10px] font-sans text-slate-400">Treasury</span>
            <TrendIndicator value="-₹14k Cr" trend="down" isPositiveGood={false} />
          </div>
        </div>
      </div>

      {/* Options Selection Stack (3 Premium Options) */}
      <div className="flex flex-col gap-2 mt-1">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gold-light">
          CHOOSE CABINET ACTION OPTION
        </span>

        {POLICY_OPTIONS.map((opt) => {
          const isSelected = opt.id === selectedOptionId;
          return (
            <motion.div
              key={opt.id}
              {...tapAnimation}
              onClick={() => setSelectedOptionId(opt.id)}
              className={cn(
                'rounded-game p-3 flex flex-col gap-2 border transition-all cursor-pointer relative overflow-hidden',
                isSelected
                  ? 'glass-panel-gold border-2 border-gold shadow-gold-glow bg-gold/10'
                  : 'glass-panel border-gold/15 hover:border-gold/40'
              )}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-sans text-xs font-bold text-slate-100">{opt.title}</h4>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-gold-light">{opt.cost}</span>
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border flex items-center justify-center',
                      isSelected
                        ? 'border-gold bg-gold text-navy-dark'
                        : 'border-slate-500'
                    )}
                  >
                    {isSelected && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 font-sans leading-tight">
                {opt.description}
              </p>

              {/* Pros & Cons */}
              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-sans pt-1 border-t border-gold/10">
                <span className="text-emerald">✔ {opt.pros}</span>
                <span className="text-crimson">✖ {opt.cons}</span>
              </div>

              {/* Impact Chips for Option */}
              <div className="flex items-center gap-1.5 pt-1">
                {opt.impacts.map((imp, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded-full bg-navy-dark/70 border border-gold/10 text-[9px] font-mono text-slate-300 flex items-center gap-1"
                  >
                    {imp.label}: <TrendIndicator value={imp.value} trend={imp.trend} isPositiveGood={imp.isPositive} />
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA Action Button */}
      <div className="mt-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => onImplementOption(selectedOption)}
          className="flex items-center justify-center gap-2 py-4"
        >
          <span>Implement Selected Policy</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
};
