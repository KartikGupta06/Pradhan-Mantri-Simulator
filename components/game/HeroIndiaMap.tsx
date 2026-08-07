'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Radio, Handshake, Globe, AlertTriangle, Leaf, Building2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroIndiaMapProps {
  onCrisisClick?: () => void;
  onIntelClick?: () => void;
  onDiplomacyClick?: () => void;
  onWorldClick?: () => void;
  className?: string;
}

export const HeroIndiaMap: React.FC<HeroIndiaMapProps> = ({
  onCrisisClick,
  onIntelClick,
  onDiplomacyClick,
  onWorldClick,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full h-72 sm:h-80 rounded-game-lg glass-panel relative overflow-hidden border-2 border-gold/25 shadow-2xl flex flex-col justify-between p-3 select-none',
        className
      )}
    >
      {/* Dark Tactical Grid Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:18px_18px] opacity-15 pointer-events-none" />

      {/* Styled India Map Vector Graphic Silhouette Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <svg viewBox="0 0 400 450" className="w-full h-full text-gold/20 fill-current stroke-gold/40 stroke-1">
          {/* Stylized India Peninsula Path */}
          <path d="M160,40 L190,30 L220,50 L250,70 L280,60 L310,90 L340,110 L350,140 L330,160 L350,180 L380,190 L390,210 L350,220 L310,210 L280,240 L260,280 L230,340 L200,390 L180,420 L170,390 L150,340 L120,290 L90,240 L80,200 L60,180 L40,150 L60,120 L90,100 L120,80 Z" />
        </svg>
      </div>

      {/* Ambient Pulsing Map Node Orbs */}
      {/* North Node */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-gold-sm">
          <Building2 className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* West Node */}
      <div className="absolute top-1/2 left-14 -translate-y-1/2 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-emerald/20 border border-emerald flex items-center justify-center text-emerald shadow-emerald-glow">
          <Leaf className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* South Node */}
      <div className="absolute bottom-12 left-1/3 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-gold-sm">
          <Building2 className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* HERO CRISIS MARKER & FLOATING CALLOUT CARD (Assam - Northeast) */}
      <div className="absolute top-10 right-6 sm:right-12 z-20 flex flex-col items-end">
        {/* Pulsing Red Hazard Ring Marker */}
        <div className="relative flex items-center justify-center mb-1">
          <div className="absolute w-10 h-10 rounded-full bg-crimson/30 animate-ping" />
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCrisisClick}
            className="w-7 h-7 rounded-full bg-crimson border-2 border-white flex items-center justify-center text-white shadow-crimson-glow cursor-pointer z-10"
          >
            <AlertTriangle className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Floating Glass Crisis Callout Bubble */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={onCrisisClick}
          className="glass-panel-crimson rounded-game p-2.5 max-w-[200px] sm:max-w-[220px] flex flex-col gap-1 border-crimson/60 cursor-pointer shadow-2xl"
        >
          <div className="flex items-center gap-1.5 text-crimson">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span className="font-heading text-[11px] font-extrabold uppercase tracking-wide">
              FLOOD IN ASSAM
            </span>
          </div>
          <p className="text-[10px] text-slate-200 font-sans leading-tight line-clamp-2">
            Heavy rainfall has caused severe flooding.
          </p>
          <div className="flex items-center justify-end gap-0.5 text-[10px] font-sans font-bold text-crimson hover:underline pt-0.5">
            <span>Tap to Respond</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Left Compass Rose Watermark */}
      <div className="z-10 flex items-center gap-1.5 opacity-60">
        <Compass className="w-8 h-8 text-gold animate-spin-slow" />
        <span className="text-[9px] font-mono font-bold tracking-widest text-gold-light uppercase">
          REPUBLIC OF INDIA
        </span>
      </div>

      {/* Right Floating Tactical Tool Column (Intel, Diplomacy, World) */}
      <div className="absolute right-3 bottom-3 z-20 flex flex-col gap-2">
        <button
          onClick={onIntelClick}
          className="w-11 h-11 rounded-game bg-navy-dark/90 border border-gold/30 flex flex-col items-center justify-center text-slate-300 hover:text-gold hover:border-gold shadow-lg transition-all"
        >
          <Radio className="w-4 h-4 text-gold" />
          <span className="text-[9px] font-sans font-bold tracking-tight uppercase mt-0.5">Intel</span>
        </button>

        <button
          onClick={onDiplomacyClick}
          className="w-11 h-11 rounded-game bg-navy-dark/90 border border-gold/30 flex flex-col items-center justify-center text-slate-300 hover:text-gold hover:border-gold shadow-lg transition-all"
        >
          <Handshake className="w-4 h-4 text-gold" />
          <span className="text-[9px] font-sans font-bold tracking-tight uppercase mt-0.5">Diplomacy</span>
        </button>

        <button
          onClick={onWorldClick}
          className="w-11 h-11 rounded-game bg-navy-dark/90 border border-gold/30 flex flex-col items-center justify-center text-slate-300 hover:text-gold hover:border-gold shadow-lg transition-all"
        >
          <Globe className="w-4 h-4 text-gold" />
          <span className="text-[9px] font-sans font-bold tracking-tight uppercase mt-0.5">World</span>
        </button>
      </div>
    </div>
  );
};
