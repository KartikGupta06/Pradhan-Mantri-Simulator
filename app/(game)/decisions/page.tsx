'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Gavel } from 'lucide-react';

export default function DecisionsPage() {
  return (
    <motion.div {...pageTransition} className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between border-b border-gold/15 pb-3">
        <h1 className="font-heading text-lg gold-gradient-text">Policy Decisions</h1>
        <Badge variant="slate">Placeholder</Badge>
      </div>

      <Card variant="glass" className="flex flex-col items-center justify-center p-6 text-center gap-3">
        <Gavel className="w-8 h-8 text-gold opacity-60" />
        <h3 className="font-heading text-sm text-gold-light">Decision Engine Shell</h3>
        <p className="text-xs text-slate-400 font-sans max-w-[240px]">
          Multiple-choice policy card queues and trade-off mechanics will connect here.
        </p>
      </Card>
    </motion.div>
  );
}
