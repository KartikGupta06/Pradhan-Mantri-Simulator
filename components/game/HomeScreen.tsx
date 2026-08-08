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
import { DecisionFlowContainer } from '@/components/game/decision/DecisionFlowContainer';
import { EconomyScreen } from '@/components/game/economy/EconomyScreen';
import { PublicOpinionScreen } from '@/components/game/opinion/PublicOpinionScreen';
import { ElectionFlowContainer } from '@/components/game/election/ElectionFlowContainer';
import { useGameStore } from '@/game/store/useGameStore';
import { RefreshCw } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const resetGame = useGameStore((state) => state.resetGame);
  const inElectionFlow = useGameStore((state) => state.gameState.election?.inElectionFlow);

  // If 5-Year Term ended or Election flow triggered, render full Election Experience
  if (inElectionFlow) {
    return (
      <div className="w-full flex-1 flex flex-col p-2 sm:p-2.5 overflow-y-auto">
        <ElectionFlowContainer onCompleteFlow={() => setActiveModal(null)} />
      </div>
    );
  }

  // If Decision Flow active, render full decision flow experience
  if (activeModal === 'decision') {
    return (
      <div className="w-full flex-1 flex flex-col p-2 sm:p-2.5">
        <DecisionFlowContainer onCompleteFlow={() => setActiveModal(null)} />
      </div>
    );
  }

  // If Economy or Treasury stat card clicked, render full Economy Screen
  if (activeModal === 'economy' || activeModal === 'treasury') {
    return (
      <div className="w-full flex-1 flex flex-col p-2 sm:p-2.5 overflow-y-auto">
        <EconomyScreen onClose={() => setActiveModal(null)} />
      </div>
    );
  }

  // If Objectives, Popularity, or Opinion clicked, render full Public Opinion Screen
  if (activeModal === 'objectives' || activeModal === 'popularity' || activeModal === 'opinion') {
    return (
      <div className="w-full flex-1 flex flex-col p-2 sm:p-2.5 overflow-y-auto">
        <PublicOpinionScreen onClose={() => setActiveModal(null)} />
      </div>
    );
  }

  const handleResetGame = () => {
    resetGame();
    setActiveModal(null);
  };

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
        onRespondClick={() => setActiveModal('decision')}
      />

      {/* 5. Country Health Cards (4-Column Compact Single Row) */}
      <CountryHealthGrid onCardClick={(metric) => setActiveModal(metric)} />

      {/* 6. Primary Action Bar (Achievements, Dominant TAKE DECISION CTA, Objectives/Opinion) */}
      <PrimaryActionBar
        onTakeDecisionClick={() => setActiveModal('decision')}
        onAchievementsClick={() => setActiveModal('achievements')}
        onObjectivesClick={() => setActiveModal('objectives')}
      />

      {/* Interactive Bottom Sheet Popup Shell for UI Feedback & Dev Settings */}
      <BottomSheet
        isOpen={
          !!activeModal &&
          activeModal !== 'decision' &&
          activeModal !== 'economy' &&
          activeModal !== 'treasury' &&
          activeModal !== 'popularity' &&
          activeModal !== 'objectives' &&
          activeModal !== 'opinion'
        }
        onClose={() => setActiveModal(null)}
        title={activeModal ? activeModal.toUpperCase() + ' DETAILS' : ''}
      >
        <div className="flex flex-col gap-3 py-2 text-center">
          {activeModal === 'settings' ? (
            <div className="flex flex-col gap-3 text-left">
              <p className="text-xs text-slate-300 font-sans">
                PM Office Settings & Developer Controls.
              </p>
              <div className="p-3 bg-navy-dark rounded-game border border-crimson/30 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-crimson uppercase">
                    DEV RESET GAME STATE
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">RESTORE 2029 INITIAL</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Clears local storage save data and restores the initial game state.
                </p>
                <Button
                  variant="crimson"
                  size="sm"
                  onClick={handleResetGame}
                  className="flex items-center justify-center gap-1.5 mt-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Game (Dev Only)</span>
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-300 font-sans">
              Strategic view placeholder for <span className="text-gold font-bold">{activeModal}</span>. Game engine simulation logic will connect here in future sprints.
            </p>
          )}

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
