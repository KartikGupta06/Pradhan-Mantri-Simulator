'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Landmark, ShieldAlert, Calendar, Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/game/store/useGameStore';

interface CabinetMeetingViewProps {
  onBeginMeeting: () => void;
  onCancel?: () => void;
  className?: string;
}

export const CabinetMeetingView: React.FC<CabinetMeetingViewProps> = ({
  onBeginMeeting,
  onCancel,
  className,
}) => {
  const gameState = useGameStore((state) => state.gameState);
  const activeDecision = useGameStore((state) => state.activeDecision);

  const dateString = `${gameState.time.month}, Week ${gameState.time.week}, ${gameState.time.year}`;

  return (
    <motion.div
      {...pageTransition}
      className={cn('w-full flex flex-col gap-4 py-2 px-1 select-none', className)}
    >
      {/* Government Emblem Seal & Meeting Title */}
      <div className="flex flex-col items-center text-center gap-2 mt-4">
        <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center text-gold shadow-gold-glow relative">
          <div className="absolute inset-1 rounded-full border border-gold/40 animate-pulse-slow" />
          <Landmark className="w-10 h-10" />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="crimson">{activeDecision.urgency.toUpperCase()} PRIORITY</Badge>
          <Badge variant="gold">{activeDecision.category.toUpperCase()}</Badge>
        </div>
        <h1 className="font-heading text-xl sm:text-2xl font-bold gold-gradient-text uppercase tracking-wide">
          EMERGENCY CABINET MEETING
        </h1>
        <p className="text-xs text-slate-400 font-sans max-w-[280px]">
          Cabinet Convened by Order of the Prime Minister
        </p>
      </div>

      {/* Meeting Metadata Strip */}
      <Card variant="glass" className="grid grid-cols-2 gap-2 p-3 text-center border-gold/20">
        <div className="flex items-center justify-center gap-2 border-r border-gold/15 pr-2">
          <Calendar className="w-4 h-4 text-gold shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-mono text-slate-400 uppercase">DATE</span>
            <span className="text-xs font-mono font-bold text-slate-100">{dateString}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pl-2">
          <Clock className="w-4 h-4 text-gold shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-mono text-slate-400 uppercase">LOCATION</span>
            <span className="text-xs font-sans font-bold text-slate-100">PMO South Block</span>
          </div>
        </div>
      </Card>

      {/* Meeting Briefing Notice */}
      <Card variant="gold" className="flex flex-col gap-2 p-4 text-left border-gold/40">
        <div className="flex items-center gap-2 text-gold">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <h3 className="font-heading text-xs font-bold uppercase tracking-wide">
            Agenda Briefing: {activeDecision.title}
          </h3>
        </div>
        <p className="text-xs text-slate-200 font-sans leading-relaxed">
          {activeDecision.description} {activeDecision.situation}
        </p>
      </Card>

      {/* Begin Meeting Action CTAs */}
      <div className="flex flex-col gap-2.5 mt-4">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onBeginMeeting}
          className="flex items-center justify-center gap-2 py-4"
        >
          <span>Begin Cabinet Meeting</span>
          <ChevronRight className="w-5 h-5" />
        </Button>

        {onCancel && (
          <Button variant="ghost" size="md" fullWidth onClick={onCancel}>
            Return to Dashboard
          </Button>
        )}
      </div>
    </motion.div>
  );
};
