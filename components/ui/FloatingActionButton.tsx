'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { tapAnimation } from '@/animations/motion';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  variant?: 'gold' | 'emerald' | 'crimson' | 'dark';
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  label,
  onClick,
  variant = 'gold',
  className,
}) => {
  const styles = {
    gold: 'gold-gradient-bg text-navy-dark border-gold-light shadow-gold-glow',
    emerald: 'bg-emerald text-white border-emerald-dark shadow-emerald-glow',
    crimson: 'bg-crimson text-white border-crimson-dark shadow-crimson-glow',
    dark: 'glass-panel text-gold border-gold/40 shadow-xl',
  }[variant];

  return (
    <motion.button
      {...tapAnimation}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 p-3 rounded-full border shadow-lg font-sans font-bold text-xs uppercase tracking-wider cursor-pointer z-30',
        styles,
        className
      )}
    >
      <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      {label && <span className="pr-1">{label}</span>}
    </motion.button>
  );
};
