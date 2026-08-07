'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { PageHeader } from '@/components/ui/PageHeader';
import { ModulePlaceholderCard } from '@/components/ui/ModulePlaceholderCard';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Users, ShieldCheck, Landmark, UserX } from 'lucide-react';

export default function CabinetPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <motion.div
      {...pageTransition}
      className="w-full flex flex-col gap-3 pb-8 max-w-full select-none"
    >
      {/* Top Page Header */}
      <PageHeader
        title="UNION CABINET"
        subtitle="Ministry Governance & Portfolios"
        badgeText="Cabinet"
      />

      {/* Module Placeholder Cards Stack */}
      <div className="flex flex-col gap-2.5">
        <ModulePlaceholderCard
          icon={<Users className="w-5 h-5 text-gold" />}
          title="Assign & Reshuffle Ministers"
          description="Appoint key ministers to Home, Finance, Defense, and External Affairs."
          onClick={() => setActiveModule('Assign & Reshuffle Ministers')}
        />

        <ModulePlaceholderCard
          icon={<ShieldCheck className="w-5 h-5 text-emerald" />}
          title="Minister Relationships & Loyalty"
          description="Monitor PM relationship metrics, integrity scores, and scandal risks."
          onClick={() => setActiveModule('Minister Relationships & Loyalty')}
        />

        <ModulePlaceholderCard
          icon={<Landmark className="w-5 h-5 text-cyan-400" />}
          title="Cabinet Emergency Meetings"
          description="Convene cabinet consensus meetings before tabling major national reform bills."
          onClick={() => setActiveModule('Cabinet Emergency Meetings')}
        />

        <ModulePlaceholderCard
          icon={<UserX className="w-5 h-5 text-crimson" />}
          title="Resignations & Coalition Stability"
          description="Manage minister resignations, party dissent, and alliance stability."
          onClick={() => setActiveModule('Resignations & Coalition Stability')}
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
            Cabinet management module for <span className="text-gold font-bold">{activeModule}</span> will be connected in future simulation sprints.
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
