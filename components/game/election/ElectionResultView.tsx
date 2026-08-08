'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ElectionResultData } from '@/types/election';
import { useGameStore } from '@/game/store/useGameStore';
import { Trophy, Skull, RefreshCw, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ElectionResultViewProps {
  result: ElectionResultData;
  onContinue: () => void;
}

export const ElectionResultView: React.FC<ElectionResultViewProps> = ({ result, onContinue }) => {
  const gameState = useGameStore((state) => state.gameState);
  const resetGame = useGameStore((state) => state.resetGame);

  const { students, farmers, middleClass, businesses } = gameState.publicOpinion;

  const isVictory = result.victory;

  return (
    <motion.div
      {...pageTransition}
      className="w-full flex flex-col gap-3.5 p-3 select-none text-left max-w-md mx-auto"
    >
      {/* Top Victory / Defeat Hero Header */}
      <Card
        variant={isVictory ? 'gold' : 'glass'}
        className={cn(
          'flex flex-col items-center justify-center p-5 text-center gap-2 border-2',
          isVictory ? 'border-gold shadow-gold-glow bg-gold/10' : 'border-crimson bg-crimson/10'
        )}
      >
        <div
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center border-2',
            isVictory
              ? 'bg-gold/20 border-gold text-gold animate-bounce'
              : 'bg-crimson/20 border-crimson text-crimson'
          )}
        >
          {isVictory ? <Trophy className="w-6 h-6" /> : <Skull className="w-6 h-6" />}
        </div>

        <Badge variant={isVictory ? 'emerald' : 'crimson'} className="text-xs font-bold px-3 py-0.5 uppercase">
          {result.outcome}
        </Badge>

        <h1 className="font-heading text-xl sm:text-2xl font-black tracking-wide text-slate-100 uppercase mt-1">
          {isVictory ? 'ELECTION VICTORY' : 'ELECTORAL DEFEAT'}
        </h1>

        <p className="text-xs text-slate-200 font-sans max-w-[280px] leading-relaxed">
          {result.summary}
        </p>
      </Card>

      {/* Final Numbers Summary */}
      <Card variant="glass" className="flex flex-col gap-2 p-3 border-gold/20">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">FINAL ELECTION SCORE</span>
          <span className={cn('font-extrabold text-base', isVictory ? 'text-emerald' : 'text-crimson')}>
            {result.finalScore}%
          </span>
        </div>

        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">CAMPAIGN STRATEGY FOCUS</span>
          <span className="text-gold font-bold">{result.campaignFocus} Focus</span>
        </div>

        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">POLL UNCERTAINTY VARIANCE</span>
          <span className="text-slate-400">{result.rollDelta >= 0 ? '+' : ''}{result.rollDelta}%</span>
        </div>
      </Card>

      {/* Final Demographics Approval Breakout */}
      <div className="flex flex-col gap-2">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gold-light pl-1">
          FINAL DEMOGRAPHIC VOTER RESULTS
        </span>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2 bg-navy-dark rounded border border-gold/15 flex flex-col">
            <span className="text-[10px] text-slate-400">STUDENTS & YOUTH</span>
            <span className="font-bold text-slate-100 text-sm">{Math.round(students.approval)}%</span>
          </div>

          <div className="p-2 bg-navy-dark rounded border border-gold/15 flex flex-col">
            <span className="text-[10px] text-slate-400">AGRICULTURAL FARMERS</span>
            <span className="font-bold text-slate-100 text-sm">{Math.round(farmers.approval)}%</span>
          </div>

          <div className="p-2 bg-navy-dark rounded border border-gold/15 flex flex-col">
            <span className="text-[10px] text-slate-400">MIDDLE CLASS</span>
            <span className="font-bold text-slate-100 text-sm">{Math.round(middleClass.approval)}%</span>
          </div>

          <div className="p-2 bg-navy-dark rounded border border-gold/15 flex flex-col">
            <span className="text-[10px] text-slate-400">BUSINESS & INDUSTRY</span>
            <span className="font-bold text-slate-100 text-sm">{Math.round(businesses.approval)}%</span>
          </div>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="pt-2">
        {isVictory ? (
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={onContinue}
            className="flex items-center justify-center gap-2"
          >
            <span>Begin Second 5-Year Term</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="crimson"
            size="md"
            fullWidth
            onClick={resetGame}
            className="flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Start New Game (2029)</span>
          </Button>
        )}
      </div>
    </motion.div>
  );
};
