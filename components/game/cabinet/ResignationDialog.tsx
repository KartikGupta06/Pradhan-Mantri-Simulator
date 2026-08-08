'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, UserX } from 'lucide-react';

interface ResignationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ministerName?: string;
  ministryName?: string;
}

export const ResignationDialog: React.FC<ResignationDialogProps> = ({
  isOpen,
  onClose,
  ministerName = 'The Minister',
  ministryName = 'Cabinet',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="CABINET RESIGNATION">
      <div className="flex flex-col gap-3.5 select-none text-left">
        <div className="flex items-start gap-3 p-3.5 rounded-game bg-crimson/15 border border-crimson/40">
          <div className="w-10 h-10 rounded-full bg-crimson/20 border border-crimson flex items-center justify-center text-crimson shrink-0 mt-0.5">
            <UserX className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h4 className="font-heading text-xs font-bold text-crimson uppercase tracking-wide">
              {ministerName} Resigns from {ministryName}
            </h4>
            <p className="text-xs text-slate-200 font-sans mt-1 leading-relaxed">
              &quot;Relations with the Prime Minister have deteriorated.&quot;
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          The {ministryName} portfolio is now vacant. You can review candidates and appoint a replacement minister from the Cabinet screen.
        </p>

        <div className="flex justify-end pt-2 border-t border-gold/15">
          <Button variant="crimson" size="sm" onClick={onClose} className="flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Acknowledge & Vacate Portfolio</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
