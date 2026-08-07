'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { tapAnimation } from '@/animations/motion';
import { Landmark, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LargeCTAButtonProps {
  title?: string;
  subtitle?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const LargeCTAButton: React.FC<LargeCTAButtonProps> = ({
  title = 'TAKE DECISION',
  subtitle = 'Cabinet Meeting Awaits',
  onClick,
  icon,
  className,
}) => {
  return (
    <motion.button
      {...tapAnimation}
      onClick={onClick}
      className={cn(
        'w-full py-3.5 sm:py-4 px-3 sm:px-4 rounded-game-lg gold-glow-button border-2 border-gold-light/90 flex items-center justify-between text-navy-dark relative overflow-hidden group cursor-pointer shadow-gold-glow transition-all duration-200 shrink-0',
        className
      )}
    >
      {/* Shimmer Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      {/* Left Icon Container */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-game-sm bg-navy-dark/15 border border-navy-dark/30 flex items-center justify-center shrink-0">
        {icon || <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-navy-dark" />}
      </div>

      {/* Center Labels */}
      <div className="flex flex-col text-left flex-1 px-2.5 min-w-0">
        <span className="font-heading text-sm sm:text-base font-extrabold tracking-wider uppercase leading-tight text-navy-dark truncate">
          {title}
        </span>
        <span className="font-sans text-[10px] sm:text-[11px] font-bold text-navy-dark/85 tracking-normal truncate">
          {subtitle}
        </span>
      </div>

      {/* Right Arrow */}
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-navy-dark/15 flex items-center justify-center shrink-0">
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-navy-dark" />
      </div>
    </motion.button>
  );
};
