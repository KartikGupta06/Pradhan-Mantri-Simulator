'use client';

import React from 'react';
import { useGameStore } from '@/game/store/useGameStore';
import { CampaignChoiceView } from './CampaignChoiceView';
import { ElectionResultView } from './ElectionResultView';
import { CampaignFocus } from '@/types/election';

interface ElectionFlowContainerProps {
  onCompleteFlow?: () => void;
}

export const ElectionFlowContainer: React.FC<ElectionFlowContainerProps> = ({ onCompleteFlow }) => {
  const gameState = useGameStore((state) => state.gameState);
  const selectCampaignFocusAction = useGameStore((state) => state.selectCampaignFocusAction);
  const startNewTermAction = useGameStore((state) => state.startNewTermAction);

  const lastResult = gameState.election.lastElectionResult;

  const handleSelectCampaign = (focus: CampaignFocus) => {
    selectCampaignFocusAction(focus);
  };

  const handleContinueVictory = () => {
    startNewTermAction();
    if (onCompleteFlow) onCompleteFlow();
  };

  if (lastResult) {
    return <ElectionResultView result={lastResult} onContinue={handleContinueVictory} />;
  }

  return <CampaignChoiceView onSelectCampaign={handleSelectCampaign} />;
};
