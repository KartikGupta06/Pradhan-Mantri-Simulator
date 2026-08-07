'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardHover } from '@/animations/motion';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'glass' | 'gold' | 'solid';
  interactive?: boolean;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  interactive = false,
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    glass: 'glass-panel text-slate-100',
    gold: 'glass-panel-gold text-gold-light',
    solid: 'bg-navy-surface border border-slate-700/50 text-slate-200',
  };

  return (
    <motion.div
      whileHover={interactive ? cardHover : undefined}
      className={cn(
        'rounded-game p-4 relative overflow-hidden transition-all duration-200',
        variantClasses[variant],
        interactive ? 'cursor-pointer hover:border-gold/40' : '',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
