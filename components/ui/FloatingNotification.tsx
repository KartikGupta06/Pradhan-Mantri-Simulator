'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { floatingNotificationAnimation } from '@/animations/motion';
import { Bell, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  variant?: 'gold' | 'emerald' | 'crimson' | 'info';
  className?: string;
}

export const FloatingNotification: React.FC<FloatingNotificationProps> = ({
  isOpen,
  onClose,
  title,
  message,
  variant = 'gold',
  className,
}) => {
  const variantConfig = {
    gold: {
      border: 'border-gold/50 glass-panel-gold',
      icon: Bell,
      iconColor: 'text-gold',
    },
    emerald: {
      border: 'border-emerald/50 glass-panel-emerald',
      icon: CheckCircle2,
      iconColor: 'text-emerald',
    },
    crimson: {
      border: 'border-crimson/50 glass-panel-crimson',
      icon: AlertCircle,
      iconColor: 'text-crimson',
    },
    info: {
      border: 'border-cyan-400/50 glass-panel',
      icon: Info,
      iconColor: 'text-cyan-400',
    },
  }[variant];

  const Icon = variantConfig.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...floatingNotificationAnimation}
          className={cn(
            'fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[350px] p-3 rounded-game border shadow-xl flex items-start gap-2.5',
            variantConfig.border,
            className
          )}
        >
          <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', variantConfig.iconColor)} />
          <div className="flex-1 flex flex-col">
            <h4 className="font-heading text-xs font-bold text-slate-100 uppercase tracking-wide">
              {title}
            </h4>
            {message && <p className="text-xs text-slate-300 font-sans mt-0.5">{message}</p>}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-0.5">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
