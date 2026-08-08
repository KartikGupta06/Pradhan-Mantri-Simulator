'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition, tapAnimation } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TrendIndicator } from '@/components/ui/TrendIndicator';
import { Gavel, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DecisionOption } from '@/types/decision';
import { useGameStore } from '@/game/store/useGameStore';

interface DecisionDetailsViewProps {
  onImplementOption: (option: DecisionOption) => void;
  className?: string;
}

export const DecisionDetailsView: React.FC<DecisionDetailsViewProps> = ({
  onImplementOption,
  className,
}) => {
  const activeDecision = useGameStore((state) => state.activeDecision);
  const options = activeDecision.options;

  const [selectedOptionId, setSelectedOptionId] = useState<string>(options[0]?.id || 'opt_a');
  const selectedOption = options.find((opt) => opt.id === selectedOptionId) || options[0];

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
        <Badge variant="crimson">{activeDecision.urgency.toUpperCase()} URGENCY</Badge>
      </div>

      {/* Main Decision Detail Card */}
      <Card variant="glass" className="flex flex-col gap-2.5 p-3.5 border-gold/25">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-gold">
            {activeDecision.category.toUpperCase()}
          </span>
          <span className="text-xs font-mono font-bold text-slate-300">
            Est. Cost: {activeDecision.estimatedCost}
          </span>
        </div>

        <h1 className="font-sans text-base sm:text-lg font-bold text-slate-100 leading-snug">
          {activeDecision.title}
        </h1>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          {activeDecision.description} {activeDecision.situation}
        </p>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gold/15 text-center">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-400">URGENCY</span>
            <span className="text-xs font-sans font-bold text-crimson">
              {activeDecision.urgency}
            </span>
          </div>
          <div className="flex flex-col border-x border-gold/15">
            <span className="text-[9px] font-mono text-slate-400">CATEGORY</span>
            <span className="text-xs font-sans font-bold text-gold-light">
              {activeDecision.category}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-400">STATUS</span>
            <span className="text-xs font-sans font-bold text-emerald">Action Required</span>
          </div>
        </div>
      </Card>

      {/* Options Selection Stack */}
      <div className="flex flex-col gap-2 mt-1">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gold-light">
          CHOOSE CABINET ACTION OPTION
        </span>

        {options.map((opt) => {
          const isSelected = opt.id === selectedOptionId;
          const { treasury, popularity, gdp, inflation } = opt.effects;

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

              {/* Stat Effects Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {treasury !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full bg-navy-dark/70 border border-gold/10 text-[9px] font-mono text-slate-300 flex items-center gap-1">
                    Treasury:{' '}
                    <TrendIndicator
                      value={`${treasury >= 0 ? '+' : ''}${treasury} Cr`}
                      trend={treasury >= 0 ? 'up' : 'down'}
                      isPositiveGood={true}
                    />
                  </span>
                )}
                {popularity !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full bg-navy-dark/70 border border-gold/10 text-[9px] font-mono text-slate-300 flex items-center gap-1">
                    Popularity:{' '}
                    <TrendIndicator
                      value={`${popularity >= 0 ? '+' : ''}${popularity}%`}
                      trend={popularity >= 0 ? 'up' : 'down'}
                      isPositiveGood={true}
                    />
                  </span>
                )}
                {gdp !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full bg-navy-dark/70 border border-gold/10 text-[9px] font-mono text-slate-300 flex items-center gap-1">
                    GDP:{' '}
                    <TrendIndicator
                      value={`${gdp >= 0 ? '+' : ''}${gdp} T`}
                      trend={gdp >= 0 ? 'up' : 'down'}
                      isPositiveGood={true}
                    />
                  </span>
                )}
                {inflation !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full bg-navy-dark/70 border border-gold/10 text-[9px] font-mono text-slate-300 flex items-center gap-1">
                    Inflation:{' '}
                    <TrendIndicator
                      value={`${inflation >= 0 ? '+' : ''}${inflation}%`}
                      trend={inflation > 0 ? 'up' : 'down'}
                      isPositiveGood={false}
                    />
                  </span>
                )}
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
