'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { PlayerProfileCard } from '@/components/ui/PlayerProfileCard';
import { TopStatusBar } from '@/components/ui/TopStatusBar';
import { HeroIndiaMap } from '@/components/game/HeroIndiaMap';
import { EmergencyBanner } from '@/components/ui/EmergencyBanner';
import { CountryHealthGrid } from '@/components/game/CountryHealthGrid';
import { PrimaryActionBar } from '@/components/game/PrimaryActionBar';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';

export const HomeScreen: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <motion.div
      {...pageTransition}
      className="w-full flex flex-col gap-3 pb-8 max-w-full select-none"
    >
      {/* 1. Top PM Profile Bar */}
      <PlayerProfileCard
        onNotificationClick={() => setActiveModal('notifications')}
        onSettingsClick={() => setActiveModal('settings')}
      />

      {/* 2. National Stats Strip */}
      <TopStatusBar />

      {/* 3. Hero India Map Viewport (Visual Hero) */}
      <HeroIndiaMap
        onCrisisClick={() => setActiveModal('crisis')}
        onIntelClick={() => setActiveModal('intel')}
        onDiplomacyClick={() => setActiveModal('diplomacy')}
        onWorldClick={() => setActiveModal('world')}
      />

      {/* 4. Active Crisis Panel */}
      <EmergencyBanner
        title="Flood in Assam"
        description="Lives and infrastructure at risk. People are looking for your response."
        urgentCount={3}
        onRespondClick={() => setActiveModal('crisis')}
      />

      {/* 5. Country Health Cards (4-Column Compact Single Row) */}
      <CountryHealthGrid onCardClick={(metric) => setActiveModal(metric)} />

      {/* 6. Primary Action Bar (Achievements, Dominant TAKE DECISION CTA, Objectives) */}
      <PrimaryActionBar
        onTakeDecisionClick={() => setActiveModal('decision')}
        onAchievementsClick={() => setActiveModal('achievements')}
        onObjectivesClick={() => setActiveModal('objectives')}
      />

      {/* Interactive Bottom Sheet Popup Shell for UI Feedback */}
      <BottomSheet
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={activeModal ? activeModal.toUpperCase() + ' DETAILS' : ''}
      >
        <div className="flex flex-col gap-3 py-2 text-center">
          <p className="text-xs text-slate-300 font-sans">
            Strategic view placeholder for <span className="text-gold font-bold">{activeModal}</span>. Game engine simulation logic will connect here in future sprints.
          </p>
          <div className="pt-2 border-t border-gold/15 flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setActiveModal(null)}>
              Close Panel
            </Button>
          </div>
        </div>
      </BottomSheet>
    </motion.div>
  );
};
