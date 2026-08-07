'use client';

import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-slate-300 font-sans">{description}</p>
        <div className="flex gap-2 justify-end pt-2 border-t border-gold/10">
          <Button variant="secondary" size="sm" onClick={onClose}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
