import { create } from 'zustand';
import { GameState } from '@/types/game';
import { Decision, DecisionResult, DecisionOption } from '@/types/decision';
import { Candidate, MinistryType } from '@/types/cabinet';
import { NewsItem } from '@/types/news';
import { GameEvent } from '@/types/event';
import { ASSAM_FLOOD_DECISION } from '@/constants/decisions';
import { INITIAL_CABINET_STATE } from '@/constants/candidates';
import { INITIAL_NEWS_ITEMS } from '@/constants/newsTemplates';
import { applyDecision } from '@/engine/decisionEngine';
import { appointMinister, removeMinister, updateMinisterRelationship } from '@/engine/cabinetEngine';
import { generateNewsFromDecision, generateNewsFromEvent, generateNewsFromCabinet, addNewsToHistory } from '@/engine/newsEngine';
import { evaluateRandomEvent, recordEventTrigger } from '@/engine/eventEngine';
import { calculateDerivedMetrics, createEconomicSnapshot } from '@/engine/economyEngine';
import { saveGameState, loadGameState, clearGameState, CURRENT_GAME_VERSION } from '@/engine/persistence';

const initialEconomyState = {
  treasury: 18450,
  gdp: 320.45,
  inflation: 4.1,
  unemployment: 6.2,
};

const initialTime = {
  year: 2029,
  month: 'May',
  monthIndex: 4,
  week: 2,
};

const initialDerived = calculateDerivedMetrics(initialEconomyState, 76, []);
const initialSnapshot = createEconomicSnapshot(
  initialTime,
  initialEconomyState,
  76,
  initialDerived.gdpGrowth,
  initialDerived.economicHealth
);

export const INITIAL_GAME_STATE: GameState = {
  time: initialTime,
  economy: initialEconomyState,
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
  news: INITIAL_NEWS_ITEMS,
  activeEvent: null,
  recentEvents: [],
  derivedEconomy: initialDerived,
  economicHistory: [initialSnapshot],
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
  addNewsAction: (item: NewsItem) => void;
  triggerRandomEventAction: (forceEventId?: string) => GameEvent | null;
  resolveActiveEventAction: (option: DecisionOption) => DecisionResult | null;
  dismissActiveEventAction: () => void;
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
    if (savedState && savedState.derivedEconomy) {
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

    return get().executeDecisionByOption(selectedOption);
  },

  executeDecisionByOption: (option: DecisionOption) => {
    const { gameState, activeDecision } = get();

    // 1. Run Part 5 Decision Engine (includes derived economy recalculations & passive weekly updates)
    const { updatedState: baseUpdatedState, result } = applyDecision(gameState, activeDecision, option);

    // 2. Generate Handcrafted News item from decision
    const newsItem = generateNewsFromDecision(activeDecision, option, result, baseUpdatedState.time);
    const updatedNews = addNewsToHistory(gameState.news || [], newsItem);

    // 3. Evaluate Random Event trigger (15% probability with 5-event anti-repetition memory)
    const triggeredEvent = evaluateRandomEvent(gameState.recentEvents || []);
    let updatedRecentEvents = gameState.recentEvents || [];
    if (triggeredEvent) {
      updatedRecentEvents = recordEventTrigger(updatedRecentEvents, triggeredEvent.id);
    }

    const updatedState: GameState = {
      ...baseUpdatedState,
      news: updatedNews,
      activeEvent: triggeredEvent || gameState.activeEvent,
      recentEvents: updatedRecentEvents,
    };

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
    const newsItem = generateNewsFromCabinet(candidate.name, candidate.ministry, 'appointed', gameState.time);
    const updatedNews = addNewsToHistory(gameState.news || [], newsItem);

    const updatedState: GameState = {
      ...gameState,
      cabinet: updatedCabinet,
      news: updatedNews,
      lastSavedAt: new Date().toISOString(),
    };

    saveGameState(updatedState);
    set({ gameState: updatedState });
  },

  removeMinisterAction: (ministry: MinistryType) => {
    const { gameState } = get();
    const currentMinister = gameState.cabinet.ministers[ministry];
    const updatedCabinet = removeMinister(gameState.cabinet, ministry);
    let updatedNews = gameState.news || [];

    if (currentMinister) {
      const newsItem = generateNewsFromCabinet(currentMinister.name, ministry, 'resigned', gameState.time);
      updatedNews = addNewsToHistory(updatedNews, newsItem);
    }

    const updatedState: GameState = {
      ...gameState,
      cabinet: updatedCabinet,
      news: updatedNews,
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

    let updatedNews = gameState.news || [];
    if (resignationEvent && resignedMinisterName) {
      const newsItem = generateNewsFromCabinet(resignedMinisterName, ministry, 'resigned', gameState.time);
      updatedNews = addNewsToHistory(updatedNews, newsItem);
    }

    const updatedState: GameState = {
      ...gameState,
      cabinet: updatedCabinet,
      news: updatedNews,
      lastSavedAt: new Date().toISOString(),
    };

    saveGameState(updatedState);
    set({ gameState: updatedState });

    return { resignationEvent, resignedMinisterName };
  },

  addNewsAction: (item: NewsItem) => {
    const { gameState } = get();
    const updatedNews = addNewsToHistory(gameState.news || [], item);
    const updatedState: GameState = { ...gameState, news: updatedNews };

    saveGameState(updatedState);
    set({ gameState: updatedState });
  },

  triggerRandomEventAction: (forceEventId?: string) => {
    const { gameState } = get();
    const eventToTrigger = evaluateRandomEvent(gameState.recentEvents || [], forceEventId);
    if (!eventToTrigger) return null;

    const updatedRecentEvents = recordEventTrigger(gameState.recentEvents || [], eventToTrigger.id);
    const updatedState: GameState = {
      ...gameState,
      activeEvent: eventToTrigger,
      recentEvents: updatedRecentEvents,
      lastSavedAt: new Date().toISOString(),
    };

    saveGameState(updatedState);
    set({ gameState: updatedState });
    return eventToTrigger;
  },

  resolveActiveEventAction: (option: DecisionOption) => {
    const { gameState } = get();
    const event = gameState.activeEvent;
    if (!event) return null;

    // Convert GameEvent to Decision format for Decision Engine
    const eventAsDecision: Decision = {
      id: event.id,
      title: event.title,
      category: event.category,
      description: event.description,
      situation: event.description,
      urgency: event.severity,
      estimatedCost: option.effects.treasury ? `₹ ${Math.abs(option.effects.treasury)} Cr` : 'N/A',
      options: event.options,
    };

    // 1. Run Part 5 Decision Engine (includes derived economy recalculations)
    const { updatedState: baseUpdatedState, result } = applyDecision(gameState, eventAsDecision, option);

    // 2. Generate Handcrafted News item from event resolution
    const newsItem = generateNewsFromEvent(event, option, result, baseUpdatedState.time);
    const updatedNews = addNewsToHistory(gameState.news || [], newsItem);

    const updatedState: GameState = {
      ...baseUpdatedState,
      news: updatedNews,
      activeEvent: null,
    };

    saveGameState(updatedState);

    set({
      gameState: updatedState,
      latestResult: result,
    });

    return result;
  },

  dismissActiveEventAction: () => {
    const { gameState } = get();
    const updatedState: GameState = { ...gameState, activeEvent: null };
    saveGameState(updatedState);
    set({ gameState: updatedState });
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
