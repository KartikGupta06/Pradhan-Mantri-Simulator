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
  GraduationCap,
  Tractor,
  Building,
  Briefcase,
  Vote,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PublicOpinionScreenProps {
  onClose?: () => void;
  className?: string;
}

export const PublicOpinionScreen: React.FC<PublicOpinionScreenProps> = ({
  onClose,
  className,
}) => {
  const gameState = useGameStore((state) => state.gameState);
  const triggerElectionFlowDevAction = useGameStore((state) => state.triggerElectionFlowDevAction);

  const { popularity, students, farmers, middleClass, businesses } = gameState.publicOpinion;
  const { yearsRemaining, weeksRemaining } = gameState.election;

  const getTrendIcon = (trend: string) => {
    if (trend === 'Improving') return <TrendingUp className="w-3.5 h-3.5 text-emerald" />;
    if (trend === 'Declining') return <TrendingDown className="w-3.5 h-3.5 text-crimson" />;
    return <Minus className="w-3.5 h-3.5 text-gold" />;
  };

  const getApprovalBadgeVariant = (approval: number) => {
    if (approval >= 70) return 'emerald';
    if (approval >= 50) return 'gold';
    return 'crimson';
  };

  const voterGroups = [
    {
      key: 'students',
      name: 'Students & Youth',
      approval: students.approval,
      trend: students.trend,
      icon: GraduationCap,
      description: 'Focus on higher education grants, university expansion & youth job creation.',
    },
    {
      key: 'farmers',
      name: 'Agricultural Farmers',
      approval: farmers.approval,
      trend: farmers.trend,
      icon: Tractor,
      description: 'Focus on Minimum Support Prices (MSP), crop insurance subsidies & drought relief.',
    },
    {
      key: 'middleClass',
      name: 'Middle Class Taxpayers',
      approval: middleClass.approval,
      trend: middleClass.trend,
      icon: Building,
      description: 'Focus on retail inflation, income tax brackets & fuel prices.',
    },
    {
      key: 'businesses',
      name: 'Businesses & Industry',
      approval: businesses.approval,
      trend: businesses.trend,
      icon: Briefcase,
      description: 'Focus on GDP growth, corporate taxes & industrial infrastructure.',
    },
  ];

  return (
    <motion.div
      {...pageTransition}
      className={cn('w-full flex flex-col gap-3.5 pb-8 max-w-full select-none text-left', className)}
    >
      {/* Top Page Header */}
      <PageHeader
        title="Public Opinion"
        subtitle="How India feels about your government"
        badgeText="National Approval"
      />

      {/* OVERALL APPROVAL Meter Card */}
      <Card variant="gold" className="flex flex-col gap-3 p-4 border-gold/40 shadow-gold-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Vote className="w-5 h-5 text-gold" />
            <h2 className="font-heading text-xs font-bold uppercase tracking-wide text-slate-100">
              OVERALL GOVERNMENT APPROVAL
            </h2>
          </div>
          <Badge variant={getApprovalBadgeVariant(popularity)} className="text-[10px] py-0.5 px-2">
            {popularity >= 70 ? 'STRONG MANDATE' : popularity >= 50 ? 'MODERATE' : 'CRITICAL'}
          </Badge>
        </div>

        <div className="flex items-center justify-between my-1">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold gold-gradient-text">
                {popularity}%
              </span>
            </div>
            <span className="text-[10px] font-sans text-slate-300 mt-0.5">
              Equal Weighting across 4 Key Demographics (25% each)
            </span>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-navy-dark rounded-full border border-gold/20">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span className="text-[10px] font-mono text-slate-300">
                ELECTION IN: <strong className="text-gold">{yearsRemaining} YRS</strong>
              </span>
            </div>
            <button
              onClick={triggerElectionFlowDevAction}
              className="text-[9px] font-mono text-crimson hover:underline"
            >
              [Dev Test: Trigger Election Flow]
            </button>
          </div>
        </div>
      </Card>

      {/* VOTER GROUP CARDS SECTION */}
      <div className="flex flex-col gap-2.5">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gold-light pl-1">
          VOTER GROUP APPROVAL RATINGS
        </span>

        {voterGroups.map((group) => {
          const Icon = group.icon;
          return (
            <Card
              key={group.key}
              variant="glass"
              className="flex flex-col gap-2 p-3 border-gold/15 hover:border-gold/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans text-sm font-bold text-slate-100">{group.name}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300">
                    {getTrendIcon(group.trend)}
                    <span>{group.trend}</span>
                  </div>
                  <span className="font-mono text-base font-extrabold text-gold-light">
                    {Math.round(group.approval)}%
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                {group.description}
              </p>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-navy-dark rounded-full overflow-hidden border border-gold/10 mt-0.5">
                <div
                  className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, group.approval))}%` }}
                />
              </div>
            </Card>
          );
        })}
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
