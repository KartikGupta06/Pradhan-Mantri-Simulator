'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { popupAnimation } from '@/animations/motion';
import { ModalProps } from '@/types/ui';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  className,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            {...popupAnimation}
            className={cn(
              'glass-panel-gold w-full max-w-sm rounded-game-lg p-5 flex flex-col gap-4 relative shadow-gold-glow',
              className
            )}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-gold/20 pb-3">
                <h3 className="font-heading text-lg gold-gradient-text">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-gold-light transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
