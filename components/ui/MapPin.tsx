'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Shield, Radio, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapPinProps {
  type?: 'crisis' | 'intel' | 'diplomacy' | 'resource';
  label?: string;
  onClick?: () => void;
  className?: string;
}

export const MapPin: React.FC<MapPinProps> = ({
  type = 'crisis',
  label,
  onClick,
  className,
}) => {
  const pinConfig = {
    crisis: {
      bg: 'bg-crimson/20 border-crimson text-crimson shadow-crimson-glow',
      icon: AlertCircle,
    },
    intel: {
      bg: 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-gold-sm',
      icon: Radio,
    },
    diplomacy: {
      bg: 'bg-emerald/20 border-emerald text-emerald shadow-emerald-glow',
      icon: Shield,
    },
    resource: {
      bg: 'bg-gold/20 border-gold text-gold shadow-gold-glow',
      icon: Landmark,
    },
  }[type];

  const Icon = pinConfig.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={cn('inline-flex flex-col items-center cursor-pointer relative group', className)}
    >
      <div className={cn('w-7 h-7 rounded-full border-2 flex items-center justify-center backdrop-blur-md', pinConfig.bg)}>
        <Icon className="w-4 h-4" />
      </div>
      {label && (
        <span className="mt-1 px-1.5 py-0.5 rounded-game-sm bg-navy-dark/90 border border-gold/20 text-[9px] font-mono text-gold-light uppercase tracking-tight whitespace-nowrap shadow-md">
          {label}
        </span>
      )}
    </motion.div>
  );
};
