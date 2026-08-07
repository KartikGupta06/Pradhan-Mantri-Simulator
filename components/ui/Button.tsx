'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { tapAnimation } from '@/animations/motion';
import { ButtonVariant, ButtonSize } from '@/types/ui';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-gold to-gold-dark text-navy-dark font-bold border border-gold-light shadow-gold-sm hover:shadow-gold-glow',
  secondary:
    'bg-navy-surface text-gold-light border border-gold/30 hover:border-gold/60 hover:bg-navy-surface/80',
  emerald:
    'bg-emerald-dark text-white border border-emerald/50 shadow-emerald-glow',
  crimson:
    'bg-crimson-dark text-white border border-crimson/50 shadow-crimson-glow',
  ghost:
    'bg-transparent text-slate-300 hover:text-gold-light hover:bg-navy-surface/40',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-game-sm',
  md: 'px-4 py-2 text-sm rounded-game',
  lg: 'px-6 py-3 text-base rounded-game-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  return (
    <motion.button
      {...tapAnimation}
      className={cn(
        'inline-flex items-center justify-center font-sans tracking-wide uppercase transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
