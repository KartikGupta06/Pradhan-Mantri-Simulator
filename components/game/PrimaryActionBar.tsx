'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LargeCTAButton } from '@/components/ui/LargeCTAButton';
import { NotificationDot } from '@/components/ui/NotificationDot';
import { Trophy, Target } from 'lucide-react';
import { tapAnimation } from '@/animations/motion';
import { cn } from '@/lib/utils';

interface PrimaryActionBarProps {
  onTakeDecisionClick?: () => void;
  onAchievementsClick?: () => void;
  onObjectivesClick?: () => void;
  hasObjectiveNotification?: boolean;
  className?: string;
}

export const PrimaryActionBar: React.FC<PrimaryActionBarProps> = ({
  onTakeDecisionClick,
  onAchievementsClick,
  onObjectivesClick,
  hasObjectiveNotification = true,
  className,
}) => {
  return (
    <div className={cn('w-full flex items-center justify-between gap-2 z-30 shrink-0', className)}>
      {/* Left Achievements Button */}
      <motion.button
        {...tapAnimation}
        onClick={onAchievementsClick}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-game bg-navy-surface border border-gold/30 flex flex-col items-center justify-center p-1 text-slate-300 hover:text-gold hover:border-gold shadow-lg shrink-0 cursor-pointer overflow-hidden relative"
      >
        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
        <span className="text-[9px] font-sans font-bold uppercase tracking-tight mt-1 text-slate-300 truncate w-full text-center">
          Achievements
        </span>
      </motion.button>

      {/* Center Hero TAKE DECISION CTA */}
      <div className="flex-1 min-w-0">
        <LargeCTAButton onClick={onTakeDecisionClick} />
      </div>

      {/* Right Objectives Button */}
      <motion.button
        {...tapAnimation}
        onClick={onObjectivesClick}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-game bg-navy-surface border border-gold/30 flex flex-col items-center justify-center p-1 text-slate-300 hover:text-gold hover:border-gold shadow-lg shrink-0 cursor-pointer relative overflow-hidden"
      >
        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
        {hasObjectiveNotification && (
          <NotificationDot className="absolute top-1 right-1" />
        )}
        <span className="text-[9px] font-sans font-bold uppercase tracking-tight mt-1 text-slate-300 truncate w-full text-center">
          Objectives
        </span>
      </motion.button>
    </div>
  );
};
