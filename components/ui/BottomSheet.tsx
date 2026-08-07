'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bottomSheetAnimation } from '@/animations/motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            {...bottomSheetAnimation}
            className={cn(
              'w-full max-w-[430px] sm:max-w-[390px] max-h-[85vh] glass-panel-gold rounded-t-[24px] p-5 flex flex-col gap-4 relative shadow-2xl border-t-2 border-gold/40',
              className
            )}
          >
            {/* Top Drag Handle Bar */}
            <div className="w-12 h-1 bg-gold/30 rounded-full mx-auto shrink-0 cursor-pointer" onClick={onClose} />

            {title && (
              <div className="flex items-center justify-between border-b border-gold/20 pb-3 shrink-0">
                <h3 className="font-heading text-base font-bold gold-gradient-text uppercase tracking-wide">
                  {title}
                </h3>
                <button onClick={onClose} className="text-slate-400 hover:text-gold p-1">
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
