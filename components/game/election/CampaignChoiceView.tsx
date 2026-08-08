'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition, tapAnimation } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CampaignFocus } from '@/types/election';
import { useGameStore } from '@/game/store/useGameStore';
import { Vote, TrendingUp, Briefcase, GraduationCap, Tractor, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CampaignChoiceViewProps {
  onSelectCampaign: (focus: CampaignFocus) => void;
}

export const CampaignChoiceView: React.FC<CampaignChoiceViewProps> = ({ onSelectCampaign }) => {
  const gameState = useGameStore((state) => state.gameState);
  const { popularity, students, farmers, middleClass, businesses } = gameState.publicOpinion;

  const [selectedFocus, setSelectedFocus] = useState<CampaignFocus>('Economy');

  const campaignChoices: {
    focus: CampaignFocus;
    title: string;
    description: string;
    boostText: string;
    icon: any;
  }[] = [
    {
      focus: 'Economy',
      title: 'Economy & Enterprise Focus',
      description: 'Focus campaign messaging on GDP growth, business incentives, and fiscal stability.',
      boostText: 'Middle Class +3% • Businesses +3%',
      icon: TrendingUp,
    },
    {
      focus: 'Jobs',
      title: 'Jobs & Youth Opportunity Focus',
      description: 'Focus campaign messaging on university expansion, startup grants, and public hiring.',
      boostText: 'Students +3% • Middle Class +2%',
      icon: GraduationCap,
    },
    {
      focus: 'Farmers',
      title: 'Rural & Farmer Welfare Focus',
      description: 'Focus campaign messaging on MSP price guarantees, crop relief, and rural subsidies.',
      boostText: 'Farmers +5%',
      icon: Tractor,
    },
  ];

  return (
    <motion.div
      {...pageTransition}
      className="w-full flex flex-col gap-3.5 p-3 select-none text-left max-w-md mx-auto"
    >
      {/* Top Banner */}
      <div className="flex flex-col gap-1 border-b border-gold/30 pb-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <Vote className="w-6 h-6 text-gold animate-bounce" />
          <Badge variant="gold" className="text-xs font-bold px-2 py-0.5">
            TERM 1 ENDED
          </Badge>
        </div>
        <h1 className="font-heading text-lg sm:text-xl font-bold text-gold-light uppercase tracking-wide">
          GENERAL ELECTION
        </h1>
        <p className="text-xs text-slate-300 font-sans">
          Your 5-year premier term has concluded. Launch your election campaign strategy to seek re-election.
        </p>
      </div>

      {/* Approval Status Recap */}
      <Card variant="gold" className="flex flex-col gap-2 p-3 border-gold/40">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-bold">INCUMBENT APPROVAL RATING</span>
          <span className="text-gold font-extrabold text-lg">{popularity}%</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono text-slate-300 pt-1 border-t border-gold/15">
          <span>Students: {Math.round(students.approval)}%</span>
          <span>Farmers: {Math.round(farmers.approval)}%</span>
          <span>Middle Class: {Math.round(middleClass.approval)}%</span>
          <span>Businesses: {Math.round(businesses.approval)}%</span>
        </div>
      </Card>

      {/* Campaign Focus Selection */}
      <div className="flex flex-col gap-2">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gold-light pl-1">
          CHOOSE STRATEGIC CAMPAIGN FOCUS
        </span>

        {campaignChoices.map((choice) => {
          const Icon = choice.icon;
          const isSelected = selectedFocus === choice.focus;

          return (
            <motion.div
              key={choice.focus}
              {...tapAnimation}
              onClick={() => setSelectedFocus(choice.focus)}
              className={cn(
                'rounded-game p-3 flex flex-col gap-1.5 border transition-all cursor-pointer relative overflow-hidden',
                isSelected
                  ? 'glass-panel-gold border-2 border-gold shadow-gold-glow bg-gold/10'
                  : 'glass-panel border-gold/15 hover:border-gold/30'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gold" />
                  <h4 className="font-sans text-xs font-bold text-slate-100">{choice.title}</h4>
                </div>
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border flex items-center justify-center',
                    isSelected ? 'border-gold bg-gold text-navy-dark' : 'border-slate-500'
                  )}
                >
                  {isSelected && <CheckCircle2 className="w-3 h-3" />}
                </div>
              </div>

              <p className="text-[11px] text-slate-300 font-sans leading-tight">
                {choice.description}
              </p>

              <span className="text-[10px] font-mono text-emerald font-bold pt-0.5">
                Campaign Boost: {choice.boostText}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="pt-2">
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={() => onSelectCampaign(selectedFocus)}
          className="flex items-center justify-center gap-2"
        >
          <span>Launch Campaign & Cast Ballots</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};
