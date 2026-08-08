import { create } from 'zustand';
import { GameState } from '@/types/game';
import { Decision, DecisionResult, DecisionOption } from '@/types/decision';
import { Candidate, MinistryType } from '@/types/cabinet';
import { ASSAM_FLOOD_DECISION } from '@/constants/decisions';
import { INITIAL_CABINET_STATE } from '@/constants/candidates';
import { applyDecision } from '@/engine/decisionEngine';
import { appointMinister, removeMinister, updateMinisterRelationship } from '@/engine/cabinetEngine';
import { saveGameState, loadGameState, clearGameState, CURRENT_GAME_VERSION } from '@/engine/persistence';

export const INITIAL_GAME_STATE: GameState = {
  time: {
    year: 2029,
    month: 'May',
    monthIndex: 4,
    week: 2,
  },
  economy: {
    treasury: 18450,
    gdp: 320.45,
    inflation: 4.1,
    unemployment: 6.2,
  },
  publicOpinion: {
    popularity: 76,
  },
  population: {
    total: 1.45,
  },
  election: {
    yearsRemaining: 2,
    termTotalYears: 5,
  },
  player: {
    name: 'KARTIK GUPTA',
    title: 'Prime Minister of India',
    party: 'Bharat Vikas Party',
  },
  cabinet: INITIAL_CABINET_STATE,
  lastSavedAt: null,
  version: CURRENT_GAME_VERSION,
};

interface GameStoreState {
  gameState: GameState;
  activeDecision: Decision;
  latestResult: DecisionResult | null;
  isInitialized: boolean;

  // Actions
  initialize: () => void;
  setActiveDecision: (decision: Decision) => void;
  executeDecision: (optionId: string) => DecisionResult | null;
  executeDecisionByOption: (option: DecisionOption) => DecisionResult;
  appointMinisterAction: (candidate: Candidate) => void;
  removeMinisterAction: (ministry: MinistryType) => void;
  updateRelationshipAction: (ministry: MinistryType, delta: number) => { resignationEvent: boolean; resignedMinisterName?: string };
  resetGame: () => void;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  gameState: INITIAL_GAME_STATE,
  activeDecision: ASSAM_FLOOD_DECISION,
  latestResult: null,
  isInitialized: false,

  initialize: () => {
    if (get().isInitialized) return;

    const savedState = loadGameState();
    if (savedState && savedState.cabinet) {
      set({ gameState: savedState, isInitialized: true });
    } else {
      set({ gameState: INITIAL_GAME_STATE, isInitialized: true });
    }
  },

  setActiveDecision: (decision: Decision) => {
    set({ activeDecision: decision });
  },

  executeDecision: (optionId: string) => {
    const { gameState, activeDecision } = get();
    const selectedOption = activeDecision.options.find((opt) => opt.id === optionId);
    if (!selectedOption) return null;

    const { updatedState, result } = applyDecision(gameState, activeDecision, selectedOption);

    saveGameState(updatedState);

    set({
      gameState: updatedState,
      latestResult: result,
    });

    return result;
  },

  executeDecisionByOption: (option: DecisionOption) => {
    const { gameState, activeDecision } = get();

    const { updatedState, result } = applyDecision(gameState, activeDecision, option);

    saveGameState(updatedState);

    set({
      gameState: updatedState,
      latestResult: result,
    });

    return result;
  },

  appointMinisterAction: (candidate: Candidate) => {
    const { gameState } = get();
    const updatedCabinet = appointMinister(gameState.cabinet, candidate);
    const updatedState: GameState = {
      ...gameState,
      cabinet: updatedCabinet,
      lastSavedAt: new Date().toISOString(),
    };

    saveGameState(updatedState);
    set({ gameState: updatedState });
  },

  removeMinisterAction: (ministry: MinistryType) => {
    const { gameState } = get();
    const updatedCabinet = removeMinister(gameState.cabinet, ministry);
    const updatedState: GameState = {
      ...gameState,
      cabinet: updatedCabinet,
      lastSavedAt: new Date().toISOString(),
    };

    saveGameState(updatedState);
    set({ gameState: updatedState });
  },

  updateRelationshipAction: (ministry: MinistryType, delta: number) => {
    const { gameState } = get();
    const { updatedCabinet, resignationEvent, resignedMinisterName } = updateMinisterRelationship(
      gameState.cabinet,
      ministry,
      delta
    );

    const updatedState: GameState = {
      ...gameState,
      cabinet: updatedCabinet,
      lastSavedAt: new Date().toISOString(),
    };

    saveGameState(updatedState);
    set({ gameState: updatedState });

    return { resignationEvent, resignedMinisterName };
  },

  resetGame: () => {
    clearGameState();
    set({
      gameState: INITIAL_GAME_STATE,
      activeDecision: ASSAM_FLOOD_DECISION,
      latestResult: null,
    });
  },
}));
