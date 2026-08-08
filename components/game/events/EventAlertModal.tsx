'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition, tapAnimation } from '@/animations/motion';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TrendIndicator } from '@/components/ui/TrendIndicator';
import { DecisionConfirmDialog } from '@/components/game/decision/DecisionConfirmDialog';
import { GameEvent } from '@/types/event';
import { DecisionOption, DecisionResult } from '@/types/decision';
import { AlertTriangle, ShieldAlert, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: GameEvent | null;
  onResolveOption: (option: DecisionOption) => DecisionResult | null;
}

export const EventAlertModal: React.FC<EventAlertModalProps> = ({
  isOpen,
  onClose,
  event,
  onResolveOption,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  if (!event) return null;

  const options = event.options || [];
  const selectedOption = options.find((opt) => opt.id === selectedOptionId) || options[0];

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'crimson';
      case 'medium':
        return 'gold';
      default:
        return 'emerald';
    }
  };

  const handleImplementOption = (option: DecisionOption) => {
    setSelectedOptionId(option.id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDecision = () => {
    setShowConfirmDialog(false);
    if (selectedOption) {
      onResolveOption(selectedOption);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen && !showConfirmDialog} onClose={onClose} title="NATIONAL CRISIS EVENT">
        <motion.div {...pageTransition} className="flex flex-col gap-3.5 select-none text-left">
          {/* Top Event Severity Banner */}
          <div className="flex items-center justify-between border-b border-crimson/30 pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-crimson animate-pulse" />
              <Badge variant={getSeverityBadgeVariant(event.severity)}>
                {event.severity.toUpperCase()} SEVERITY
              </Badge>
            </div>
            <Badge variant="gold">{event.category.toUpperCase()}</Badge>
          </div>

          {/* Main Event Details */}
          <Card variant="glass" className="flex flex-col gap-2 p-3 border-crimson/30 bg-crimson/5">
            <h2 className="font-heading text-sm sm:text-base font-bold text-slate-100 uppercase">
              {event.title}
            </h2>
            <p className="text-xs text-slate-200 font-sans leading-relaxed">
              {event.description}
            </p>
          </Card>

          {/* Response Options */}
          <div className="flex flex-col gap-2">
            <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gold-light">
              SELECT EXECUTIVE RESPONSE OPTION
            </span>

            {options.map((opt) => {
              const isSelected = opt.id === (selectedOptionId || options[0]?.id);
              const { treasury, popularity, gdp, inflation } = opt.effects;

              return (
                <motion.div
                  key={opt.id}
                  {...tapAnimation}
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={cn(
                    'rounded-game p-3 flex flex-col gap-1.5 border transition-all cursor-pointer relative overflow-hidden',
                    isSelected
                      ? 'glass-panel-gold border-2 border-gold shadow-gold-glow bg-gold/10'
                      : 'glass-panel border-gold/15 hover:border-gold/40'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-sans text-xs font-bold text-slate-100">{opt.title}</h4>
                    <div
                      className={cn(
                        'w-4 h-4 rounded-full border flex items-center justify-center',
                        isSelected ? 'border-gold bg-gold text-navy-dark' : 'border-slate-500'
                      )}
                    >
                      {isSelected && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 font-sans leading-tight">
                    {opt.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {treasury !== undefined && (
                      <span className="px-1.5 py-0.5 rounded-full bg-navy-dark/70 border border-gold/10 text-[9px] font-mono text-slate-300">
                        Treasury:{' '}
                        <TrendIndicator
                          value={`${treasury >= 0 ? '+' : ''}${treasury} Cr`}
                          trend={treasury >= 0 ? 'up' : 'down'}
                          isPositiveGood={true}
                        />
                      </span>
                    )}
                    {popularity !== undefined && (
                      <span className="px-1.5 py-0.5 rounded-full bg-navy-dark/70 border border-gold/10 text-[9px] font-mono text-slate-300">
                        Popularity:{' '}
                        <TrendIndicator
                          value={`${popularity >= 0 ? '+' : ''}${popularity}%`}
                          trend={popularity >= 0 ? 'up' : 'down'}
                          isPositiveGood={true}
                        />
                      </span>
                    )}
                    {gdp !== undefined && (
                      <span className="px-1.5 py-0.5 rounded-full bg-navy-dark/70 border border-gold/10 text-[9px] font-mono text-slate-300">
                        GDP:{' '}
                        <TrendIndicator
                          value={`${gdp >= 0 ? '+' : ''}${gdp} T`}
                          trend={gdp >= 0 ? 'up' : 'down'}
                          isPositiveGood={true}
                        />
                      </span>
                    )}
                    {inflation !== undefined && (
                      <span className="px-1.5 py-0.5 rounded-full bg-navy-dark/70 border border-gold/10 text-[9px] font-mono text-slate-300">
                        Inflation:{' '}
                        <TrendIndicator
                          value={`${inflation >= 0 ? '+' : ''}${inflation}%`}
                          trend={inflation > 0 ? 'up' : 'down'}
                          isPositiveGood={false}
                        />
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gold/15 flex justify-end">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => handleImplementOption(selectedOption)}
              className="flex items-center justify-center gap-1.5"
            >
              <span>Enact Executive Response</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </Modal>

      <DecisionConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmDecision}
        option={selectedOption}
      />
    </>
  );
};
