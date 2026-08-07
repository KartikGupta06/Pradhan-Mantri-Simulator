'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PolicyOption } from './DecisionDetailsView';
import { ShieldAlert, Coins, CheckCircle2 } from 'lucide-react';

interface DecisionConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  option: PolicyOption | null;
}

export const DecisionConfirmDialog: React.FC<DecisionConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  option,
}) => {
  if (!option) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="CONFIRM EXECUTIVE POLICY">
      <div className="flex flex-col gap-3.5 select-none">
        <div className="flex items-start gap-2.5 p-2.5 rounded-game bg-navy-surface border border-gold/20">
          <ShieldAlert className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <h4 className="font-heading text-xs font-bold text-slate-100 uppercase">
              {option.title}
            </h4>
            <p className="text-xs text-slate-300 font-sans mt-0.5 leading-tight">
              Are you sure you want to enact this policy bill? This executive action will immediately bind treasury funds and update national opinion metrics.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-3 py-2 rounded-game bg-navy-dark border border-gold/15 text-xs">
          <span className="font-sans text-slate-400">Estimated Cost:</span>
          <span className="font-mono font-bold text-gold-light">{option.cost}</span>
        </div>

        <div className="flex gap-2 justify-end pt-2 border-t border-gold/15">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirm} className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            Confirm & Enact
          </Button>
        </div>
      </div>
    </Modal>
  );
};
