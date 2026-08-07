'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { StatTile } from '@/components/ui/StatTile';
import { MapContainer } from '@/components/ui/MapContainer';
import { Badge } from '@/components/ui/Badge';
import { Landmark, TrendingUp, Users, Percent } from 'lucide-react';

export default function DashboardPage() {
  return (
    <motion.div {...pageTransition} className="flex flex-col gap-4 flex-1">
      {/* Header Strip Placeholder */}
      <div className="flex items-center justify-between border-b border-gold/15 pb-3">
        <div>
          <h1 className="font-heading text-lg gold-gradient-text">Prime Minister</h1>
          <p className="text-xs text-slate-400 font-sans">Republic of India</p>
        </div>
        <Badge variant="gold">Sprint 0 Foundation</Badge>
      </div>

      {/* National Stats Grid Placeholder */}
      <div className="grid grid-cols-2 gap-2">
        <StatTile label="Treasury" value="₹ -- Cr" trend="neutral" icon={<Landmark className="w-4 h-4" />} />
        <StatTile label="GDP Growth" value="-- %" trend="up" icon={<TrendingUp className="w-4 h-4" />} />
        <StatTile label="Approval" value="-- %" trend="neutral" icon={<Users className="w-4 h-4" />} />
        <StatTile label="Inflation" value="-- %" trend="down" icon={<Percent className="w-4 h-4" />} />
      </div>

      {/* Map Viewport Shell */}
      <MapContainer />
    </motion.div>
  );
}
