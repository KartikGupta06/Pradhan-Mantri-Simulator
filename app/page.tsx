'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { pageTransition } from '@/animations/motion';
import { Crown, Play, ShieldAlert } from 'lucide-react';

export default function SplashPage() {
  return (
    <motion.div
      {...pageTransition}
      className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-navy-dark via-navy to-navy-dark relative"
    >
      {/* Top Header Placeholder */}
      <div className="flex flex-col items-center gap-2 mt-8 text-center">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold shadow-gold-glow">
          <Crown className="w-8 h-8" />
        </div>
        <h1 className="font-heading text-2xl font-extrabold gold-gradient-text tracking-wide mt-2">
          Pradhan Mantri
        </h1>
        <h2 className="font-heading text-xs tracking-widest text-gold-light/70 uppercase">
          Simulator
        </h2>
      </div>

      {/* Center Welcome Card */}
      <Card variant="gold" className="flex flex-col gap-3 text-center my-auto border-gold/30">
        <div className="flex items-center justify-center text-gold gap-2">
          <ShieldAlert className="w-4 h-4" />
          <span className="text-xs font-heading tracking-wide uppercase">
            Sprint 1 Foundation Shell
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          Mobile-first strategy simulation architecture initialized.
        </p>
      </Card>

      {/* Bottom CTA Action */}
      <div className="flex flex-col gap-3 mb-6">
        <Link href="/dashboard">
          <Button variant="primary" fullWidth size="lg" className="flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-current" />
            Enter Game Foundation
          </Button>
        </Link>
        <span className="text-[10px] text-slate-500 text-center font-mono uppercase tracking-widest">
          v0.1.0-alpha • PWA Ready
        </span>
      </div>
    </motion.div>
  );
}
