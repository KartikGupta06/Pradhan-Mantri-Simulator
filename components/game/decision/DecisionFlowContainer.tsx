'use client';

import React, { useState } from 'react';
import { CabinetMeetingView } from './CabinetMeetingView';
import { DecisionDetailsView, PolicyOption } from './DecisionDetailsView';
import { DecisionConfirmDialog } from './DecisionConfirmDialog';
import { DecisionResultView } from './DecisionResultView';

type DecisionStep = 'meeting' | 'details' | 'result';

interface DecisionFlowContainerProps {
  onCompleteFlow: () => void;
}

export const DecisionFlowContainer: React.FC<DecisionFlowContainerProps> = ({
  onCompleteFlow,
}) => {
  const [step, setStep] = useState<DecisionStep>('meeting');
  const [selectedOption, setSelectedOption] = useState<PolicyOption | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleBeginMeeting = () => {
    setStep('details');
  };

  const handleImplementOption = (option: PolicyOption) => {
    setSelectedOption(option);
    setShowConfirmDialog(true);
  };

  const handleConfirmDecision = () => {
    setShowConfirmDialog(false);
    setStep('result');
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
          option={selectedOption}
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
