'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { PageHeader } from '@/components/ui/PageHeader';
import { ModulePlaceholderCard } from '@/components/ui/ModulePlaceholderCard';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Coins, Sprout, GraduationCap, HeartPulse, Scale } from 'lucide-react';

export default function DecisionsPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <motion.div
      {...pageTransition}
      className="w-full flex flex-col gap-3 pb-8 max-w-full select-none"
    >
      {/* Top Page Header */}
      <PageHeader
        title="POLICY & REFORMS"
        subtitle="National Legislation & Strategic Bills"
        badgeText="Policies"
      />

      {/* Module Placeholder Cards Stack */}
      <div className="flex flex-col gap-2.5">
        <ModulePlaceholderCard
          icon={<Coins className="w-5 h-5" />}
          title="Economy & Tax Reforms"
          description="Fiscal restructuring, GST calibration, and corporate tax incentives."
          onClick={() => setActiveModule('Economy & Tax Reforms')}
        />

        <ModulePlaceholderCard
          icon={<Sprout className="w-5 h-5 text-emerald" />}
          title="Agriculture & Farmers Welfare"
          description="MSP regulation, irrigation infrastructure, and farm credit subsidies."
          onClick={() => setActiveModule('Agriculture & Farmers Welfare')}
        />

        <ModulePlaceholderCard
          icon={<GraduationCap className="w-5 h-5 text-cyan-400" />}
          title="Education & Digital India"
          description="NEP expansion, AI research grants, and digital skill universities."
          onClick={() => setActiveModule('Education & Digital India')}
        />

        <ModulePlaceholderCard
          icon={<HeartPulse className="w-5 h-5 text-crimson" />}
          title="Healthcare & Social Safety"
          description="Ayushman universal insurance, wellness clinics, and pension safety nets."
          onClick={() => setActiveModule('Healthcare & Social Safety')}
        />

        <ModulePlaceholderCard
          icon={<Scale className="w-5 h-5 text-gold" />}
          title="National Budget Allocation"
          description="Annual budget splits between defense, infrastructure, and social sector."
          onClick={() => setActiveModule('National Budget Allocation')}
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
            Policy reform engine for <span className="text-gold font-bold">{activeModule}</span> will be connected in future simulation sprints.
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
