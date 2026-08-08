'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/motion';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { MinisterCard } from '@/components/game/cabinet/MinisterCard';
import { CandidateCard } from '@/components/game/cabinet/CandidateCard';
import { CandidateConfirmDialog } from '@/components/game/cabinet/CandidateConfirmDialog';
import { ResignationDialog } from '@/components/game/cabinet/ResignationDialog';
import { MinistryType, Candidate } from '@/types/cabinet';
import { MINISTRIES, CANDIDATES_CATALOG } from '@/constants/candidates';
import { calculateCabinetMetrics } from '@/engine/cabinetEngine';
import { useGameStore } from '@/game/store/useGameStore';
import { ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';

export default function CabinetPage() {
  const gameState = useGameStore((state) => state.gameState);
  const appointMinisterAction = useGameStore((state) => state.appointMinisterAction);
  const updateRelationshipAction = useGameStore((state) => state.updateRelationshipAction);

  const cabinet = gameState.cabinet;
  const metrics = calculateCabinetMetrics(cabinet);

  // Selection & Modal States
  const [selectedMinistry, setSelectedMinistry] = useState<MinistryType | null>(null);
  const [candidateToAppoint, setCandidateToAppoint] = useState<Candidate | null>(null);

  // Resignation Notification State
  const [resignationNotice, setResignationNotice] = useState<{
    ministerName: string;
    ministryName: string;
  } | null>(null);

  const availableCandidates = selectedMinistry
    ? CANDIDATES_CATALOG.filter((c) => c.ministry === selectedMinistry)
    : [];

  const handleOpenCandidateSelection = (ministry: MinistryType) => {
    setSelectedMinistry(ministry);
  };

  const handleConfirmAppointment = (candidate: Candidate) => {
    appointMinisterAction(candidate);
    setCandidateToAppoint(null);
    setSelectedMinistry(null);
  };

  const handleDevChangeRelationship = (ministry: MinistryType, delta: number) => {
    const { resignationEvent, resignedMinisterName } = updateRelationshipAction(ministry, delta);

    if (resignationEvent && resignedMinisterName) {
      setResignationNotice({
        ministerName: resignedMinisterName,
        ministryName: ministry,
      });
    }
  };

  return (
    <motion.div
      {...pageTransition}
      className="w-full flex flex-col gap-3.5 pb-8 max-w-full select-none"
    >
      {/* Top Page Header */}
      <PageHeader
        title="Cabinet"
        subtitle="Your Council of Ministers"
        badgeText="Union Cabinet"
      />

      {/* Top Cabinet Metrics Strip */}
      <Card variant="glass" className="flex flex-col gap-2.5 p-3.5 border-gold/25">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold" />
            <h3 className="font-heading text-xs font-bold text-slate-100 uppercase tracking-wide">
              CABINET STABILITY & COMPOSITION
            </h3>
          </div>
          <Badge variant={metrics.stabilityVariant} className="text-[9px]">
            {metrics.stabilityLabel.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gold/15 text-center">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-400">CABINET STRENGTH</span>
            <span className="text-sm font-mono font-bold text-gold-light">
              {metrics.filledCount}/{metrics.totalCount} Filled
            </span>
          </div>

          <div className="flex flex-col border-x border-gold/15">
            <span className="text-[9px] font-mono text-slate-400">AVG PM RELATION</span>
            <span className="text-sm font-mono font-bold text-emerald">
              {metrics.averageRelationship}%
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-400">VACANT SEATS</span>
            <span className={metrics.vacantCount > 0 ? 'text-sm font-mono font-bold text-crimson' : 'text-sm font-mono font-bold text-emerald'}>
              {metrics.vacantCount} {metrics.vacantCount === 1 ? 'Seat' : 'Seats'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 font-mono">
          <span>{metrics.filledCount} Active Ministers • {metrics.vacantCount} Vacant Portfolios</span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleOpenCandidateSelection(MINISTRIES[0])}
            className="flex items-center gap-1 text-[10px] py-1 px-2"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reshuffle Cabinet</span>
          </Button>
        </div>
      </Card>

      {/* Grid of 8 Ministry Cards */}
      <div className="flex flex-col gap-3">
        {MINISTRIES.map((ministry) => {
          const minister = cabinet.ministers[ministry];

          return (
            <MinisterCard
              key={ministry}
              ministry={ministry}
              minister={minister}
              onAppoint={handleOpenCandidateSelection}
              onReplace={handleOpenCandidateSelection}
              onDevChangeRelationship={handleDevChangeRelationship}
            />
          );
        })}
      </div>

      {/* Candidate Selection Bottom Sheet Overlay */}
      <BottomSheet
        isOpen={!!selectedMinistry}
        onClose={() => setSelectedMinistry(null)}
        title={selectedMinistry ? `${selectedMinistry.toUpperCase()} CANDIDATES` : ''}
      >
        <div className="flex flex-col gap-3 py-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-slate-300 font-sans">
              Select a candidate for <span className="text-gold font-bold">{selectedMinistry}</span>:
            </span>
            <Badge variant="gold" className="text-[9px]">
              {availableCandidates.length} CANDIDATES
            </Badge>
          </div>

          <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
            {availableCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onSelectCandidate={(cand) => setCandidateToAppoint(cand)}
              />
            ))}
          </div>

          <div className="pt-2 border-t border-gold/15 flex justify-end">
            <Button variant="secondary" size="sm" onClick={() => setSelectedMinistry(null)}>
              Cancel
            </Button>
          </div>
        </div>
      </BottomSheet>

      {/* Candidate Appointment Confirmation Modal */}
      <CandidateConfirmDialog
        isOpen={!!candidateToAppoint}
        onClose={() => setCandidateToAppoint(null)}
        onConfirm={handleConfirmAppointment}
        candidate={candidateToAppoint}
      />

      {/* Minister Resignation Event Modal */}
      <ResignationDialog
        isOpen={!!resignationNotice}
        onClose={() => setResignationNotice(null)}
        ministerName={resignationNotice?.ministerName}
        ministryName={resignationNotice?.ministryName}
      />
    </motion.div>
  );
}
