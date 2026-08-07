'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { PageHeader } from '@/components/ui/PageHeader';
import { ModulePlaceholderCard } from '@/components/ui/ModulePlaceholderCard';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Handshake, Globe, ShieldAlert, TrendingUp } from 'lucide-react';

export default function DiplomacyPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <motion.div
      {...pageTransition}
      className="w-full flex flex-col gap-3 pb-8 max-w-full select-none"
    >
      {/* Top Page Header */}
      <PageHeader
        title="GLOBAL DIPLOMACY"
        subtitle="Foreign Trade & International Alliances"
        badgeText="World"
      />

      {/* Module Placeholder Cards Stack */}
      <div className="flex flex-col gap-2.5">
        <ModulePlaceholderCard
          icon={<Handshake className="w-5 h-5 text-gold" />}
          title="Bilateral Alliances & Summits"
          description="Strengthen strategic partnerships with G20, QUAD, BRICS, and neighboring powers."
          onClick={() => setActiveModule('Bilateral Alliances & Summits')}
        />

        <ModulePlaceholderCard
          icon={<Globe className="w-5 h-5 text-cyan-400" />}
          title="International Trade Agreements"
          description="Negotiate free trade agreements (FTAs), tariff reductions, and export deals."
          onClick={() => setActiveModule('International Trade Agreements')}
        />

        <ModulePlaceholderCard
          icon={<ShieldAlert className="w-5 h-5 text-crimson" />}
          title="Geopolitical Standing & Defense"
          description="Monitor border defense posture, UN voting blocs, and global crisis responses."
          onClick={() => setActiveModule('Geopolitical Standing & Defense')}
        />

        <ModulePlaceholderCard
          icon={<TrendingUp className="w-5 h-5 text-emerald" />}
          title="Global Economic Corridors"
          description="Expand maritime trade corridors, foreign direct investment (FDI), and energy pacts."
          onClick={() => setActiveModule('Global Economic Corridors')}
        />
      </div>

      {/* Interactive Bottom Sheet Popup */}
      <BottomSheet
        isOpen={!!activeModule}
        onClose={() => setActiveModule(null)}
        title={activeModule ? activeModule.toUpperCase() : ''}
      >
        <div className="flex flex-col gap-3 py-2 text-center">
          <p className="text-xs text-slate-300 font-sans">
            Global diplomacy module for <span className="text-gold font-bold">{activeModule}</span> will be connected in future simulation sprints.
          </p>
          <div className="pt-2 border-t border-gold/15 flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setActiveModule(null)}>
              Close Panel
            </Button>
          </div>
        </div>
      </BottomSheet>
    </motion.div>
  );
}
