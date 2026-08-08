'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { PageHeader } from '@/components/ui/PageHeader';
import { ModulePlaceholderCard } from '@/components/ui/ModulePlaceholderCard';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { usePWAContext } from '@/providers/PWAProvider';
import { useGameStore } from '@/game/store/useGameStore';
import { UserCheck, Trophy, Save, Settings, Download, ShieldCheck, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const { isInstallable, promptInstall } = usePWAContext();
  const resetGame = useGameStore((state) => state.resetGame);

  const handleReset = () => {
    resetGame();
    setActiveModule(null);
  };

  return (
    <motion.div
      {...pageTransition}
      className="w-full flex flex-col gap-3 pb-8 max-w-full select-none"
    >
      {/* Top Page Header */}
      <PageHeader
        title="PM OFFICE & SETTINGS"
        subtitle="Administration, Achievements & Game Options"
        badgeText="PM Office"
      />

      {/* Module Placeholder Cards Stack */}
      <div className="flex flex-col gap-2.5">
        <ModulePlaceholderCard
          icon={<UserCheck className="w-5 h-5 text-gold" />}
          title="PM Administration & Term Metrics"
          description="Review tenure duration, election win probabilities, and party manifesto goals."
          onClick={() => setActiveModule('PM Administration & Term Metrics')}
        />

        <ModulePlaceholderCard
          icon={<Trophy className="w-5 h-5 text-gold" />}
          title="National Achievements & Milestones"
          description="Track unlocked awards, ISRO space missions, and economic milestones."
          onClick={() => setActiveModule('National Achievements & Milestones')}
        />

        <ModulePlaceholderCard
          icon={<Save className="w-5 h-5 text-emerald" />}
          title="Cloud & Local Save Game"
          description="Save game progress, load past terms, and manage cloud backup sync."
          onClick={() => setActiveModule('Cloud & Local Save Game')}
        />

        <ModulePlaceholderCard
          icon={<Settings className="w-5 h-5 text-cyan-400" />}
          title="Game Options & Sound Preferences"
          description="Audio volume controls, visual polish quality, and mobile PWA installation."
          onClick={() => setActiveModule('Game Options & Sound Preferences')}
        />
      </div>

      {/* Dev Reset Control Card */}
      <Card variant="solid" className="flex items-center justify-between p-3.5 border-crimson/40 bg-navy-dark">
        <div className="flex flex-col text-left">
          <h4 className="font-heading text-xs font-bold text-crimson uppercase">
            Developer Controls: Reset Game
          </h4>
          <p className="text-[11px] text-slate-300 font-sans">
            Clear localStorage saved state and restore initial 2029 values.
          </p>
        </div>
        <Button
          variant="crimson"
          size="sm"
          onClick={handleReset}
          className="flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Game</span>
        </Button>
      </Card>

      {/* Live PWA Installation Card if Installable */}
      {isInstallable && (
        <Card variant="gold" className="flex items-center justify-between p-3.5 border-gold/40">
          <div className="flex flex-col text-left">
            <h4 className="font-heading text-xs font-bold gold-gradient-text uppercase">
              Install Game to Device
            </h4>
            <p className="text-[11px] text-slate-300 font-sans">
              Play offline in full-screen standalone mobile mode.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={promptInstall} className="flex items-center gap-1.5 shrink-0">
            <Download className="w-4 h-4" />
            Install PWA
          </Button>
        </Card>
      )}

      {/* Prototype Build Info Card */}
      <Card variant="solid" className="flex flex-col gap-1.5 p-3 border-gold/15">
        <div className="flex items-center gap-1.5 text-emerald">
          <ShieldCheck className="w-4 h-4" />
          <span className="font-heading text-xs font-bold uppercase tracking-wide">
            Engine & State Status
          </span>
        </div>
        <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
          Engine Version: Part 5 Playable Decision Loop<br />
          Persistence: localStorage (pradhan-mantri-simulator-save-v1)<br />
          Active State: Strongly Typed Zustand Architecture
        </p>
      </Card>

      {/* Interactive Bottom Sheet Popup */}
      <BottomSheet
        isOpen={!!activeModule}
        onClose={() => setActiveModule(null)}
        title={activeModule ? activeModule.toUpperCase() : ''}
      >
        <div className="flex flex-col gap-3 py-2 text-center">
          <p className="text-xs text-slate-300 font-sans">
            Administration module for <span className="text-gold font-bold">{activeModule}</span> will be connected in future simulation sprints.
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
