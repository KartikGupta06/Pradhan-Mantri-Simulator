'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Candidate, formatStars, getRelationshipTier } from '@/types/cabinet';
import { UserCheck, Star, Shield, Heart, Handshake } from 'lucide-react';

interface CandidateConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (candidate: Candidate) => void;
  candidate: Candidate | null;
}

export const CandidateConfirmDialog: React.FC<CandidateConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  candidate,
}) => {
  if (!candidate) return null;

  const { label: relLabel } = getRelationshipTier(candidate.relationship);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="CONFIRM CABINET APPOINTMENT">
      <div className="flex flex-col gap-3.5 select-none text-left">
        <div className="flex items-start gap-3 p-3 rounded-game bg-navy-surface border border-gold/20">
          <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-heading text-xs font-bold shrink-0 mt-0.5">
            {candidate.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <h4 className="font-heading text-xs font-bold text-slate-100 uppercase">
              Appoint {candidate.name} as {candidate.ministry} Minister?
            </h4>
            <p className="text-xs text-slate-300 font-sans mt-0.5 leading-relaxed">
              This executive action will formally induct the candidate into your Council of Ministers.
            </p>
          </div>
        </div>

        {/* 5 Stats Recap */}
        <div className="grid grid-cols-2 gap-1.5 p-2 bg-navy-dark rounded-game border border-gold/15 text-[10px] font-mono">
          <div className="flex justify-between px-1.5 py-0.5">
            <span className="text-slate-400 flex items-center gap-1">
              <Star className="w-3 h-3 text-gold" /> Experience:
            </span>
            <span className="text-gold-light font-bold">{formatStars(candidate.experience)}</span>
          </div>

          <div className="flex justify-between px-1.5 py-0.5">
            <span className="text-slate-400 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald" /> Integrity:
            </span>
            <span className="text-emerald font-bold">{formatStars(candidate.integrity)}</span>
          </div>

          <div className="flex justify-between px-1.5 py-0.5">
            <span className="text-slate-400 flex items-center gap-1">
              <Heart className="w-3 h-3 text-crimson" /> Popularity:
            </span>
            <span className="text-slate-200 font-bold">{formatStars(candidate.popularity)}</span>
          </div>

          <div className="flex justify-between px-1.5 py-0.5">
            <span className="text-slate-400 flex items-center gap-1">
              <Handshake className="w-3 h-3 text-cyan-400" /> Loyalty:
            </span>
            <span className="text-cyan-400 font-bold">{candidate.loyalty}/100</span>
          </div>

          <div className="col-span-2 flex justify-between px-1.5 py-1 border-t border-gold/10 mt-1">
            <span className="text-slate-400">PM Relationship:</span>
            <span className="text-gold font-bold">{candidate.relationship}/100 ({relLabel})</span>
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-2 border-t border-gold/15">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onConfirm(candidate)}
            className="flex items-center gap-1.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>Confirm Appointment</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
