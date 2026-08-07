'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Radio } from 'lucide-react';

export default function EventsPage() {
  return (
    <motion.div {...pageTransition} className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between border-b border-gold/15 pb-3">
        <h1 className="font-heading text-lg gold-gradient-text">National Events</h1>
        <Badge variant="slate">Placeholder</Badge>
      </div>

      <Card variant="glass" className="flex flex-col items-center justify-center p-6 text-center gap-3">
        <Radio className="w-8 h-8 text-gold opacity-60 animate-pulse" />
        <h3 className="font-heading text-sm text-gold-light">Crisis & Events Shell</h3>
        <p className="text-xs text-slate-400 font-sans max-w-[240px]">
          Random event generation system and active national alerts placeholder.
        </p>
      </Card>
    </motion.div>
  );
}
