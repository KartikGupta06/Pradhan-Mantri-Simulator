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
        'w-full py-3.5 px-4 rounded-game-lg gold-glow-button border-2 border-gold-light/60 flex items-center justify-between text-navy-dark relative overflow-hidden group cursor-pointer transition-all duration-200',
        className
      )}
    >
      {/* Shimmer Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      {/* Left Icon Container */}
      <div className="w-10 h-10 rounded-game-sm bg-navy-dark/15 border border-navy-dark/30 flex items-center justify-center shrink-0">
        {icon || <Landmark className="w-6 h-6 text-navy-dark" />}
      </div>

      {/* Center Labels */}
      <div className="flex flex-col text-left flex-1 px-3">
        <span className="font-heading text-base font-extrabold tracking-wide uppercase leading-tight text-navy-dark">
          {title}
        </span>
        <span className="font-sans text-[11px] font-semibold text-navy-dark/80 tracking-normal">
          {subtitle}
        </span>
      </div>

      {/* Right Arrow */}
      <div className="w-7 h-7 rounded-full bg-navy-dark/10 flex items-center justify-center shrink-0">
        <ChevronRight className="w-5 h-5 text-navy-dark" />
      </div>
    </motion.button>
  );
};
