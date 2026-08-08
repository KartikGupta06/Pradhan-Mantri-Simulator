'use client';

import React, { useState } from 'react';
import { CabinetMeetingView } from './CabinetMeetingView';
import { DecisionDetailsView } from './DecisionDetailsView';
import { DecisionConfirmDialog } from './DecisionConfirmDialog';
import { DecisionResultView } from './DecisionResultView';
import { DecisionOption, DecisionResult } from '@/types/decision';
import { useGameStore } from '@/game/store/useGameStore';

type DecisionStep = 'meeting' | 'details' | 'result';

interface DecisionFlowContainerProps {
  onCompleteFlow: () => void;
}

export const DecisionFlowContainer: React.FC<DecisionFlowContainerProps> = ({
  onCompleteFlow,
}) => {
  const [step, setStep] = useState<DecisionStep>('meeting');
  const [selectedOption, setSelectedOption] = useState<DecisionOption | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentResult, setCurrentResult] = useState<DecisionResult | null>(null);

  const executeDecisionByOption = useGameStore((state) => state.executeDecisionByOption);

  const handleBeginMeeting = () => {
    setStep('details');
  };

  const handleImplementOption = (option: DecisionOption) => {
    setSelectedOption(option);
    setShowConfirmDialog(true);
  };

  const handleConfirmDecision = () => {
    setShowConfirmDialog(false);
    if (selectedOption) {
      // Execute decision via Decision Engine & update central GameState + localStorage
      const result = executeDecisionByOption(selectedOption);
      setCurrentResult(result);
      setStep('result');
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      {step === 'meeting' && (
        <CabinetMeetingView
          onBeginMeeting={handleBeginMeeting}
          onCancel={onCompleteFlow}
        />
      )}

      {step === 'details' && (
        <DecisionDetailsView
          onImplementOption={handleImplementOption}
        />
      )}

      {step === 'result' && (
        <DecisionResultView
          result={currentResult}
          onReturnHome={onCompleteFlow}
        />
      )}

      <DecisionConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmDecision}
        option={selectedOption}
      />
    </div>
  );
};
