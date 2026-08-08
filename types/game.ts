/**
 * Core Game Architecture Types & Centralized Game State Definition
 */

export interface GameTime {
  year: number;
  month: string;
  monthIndex: number; // 0-11 for Jan-Dec
  week: number; // 1-4
}

export interface EconomyState {
  treasury: number; // In Crores (e.g. 18450)
  gdp: number; // In Trillions (e.g. 320.45)
  inflation: number; // In Percent (e.g. 4.1)
  unemployment: number; // In Percent (e.g. 6.2)
}

export interface PublicOpinionState {
  popularity: number; // In Percent 0-100 (e.g. 76)
}

export interface PopulationState {
  total: number; // In Billions (e.g. 1.45)
}

export interface ElectionState {
  yearsRemaining: number; // (e.g. 2)
  termTotalYears: number; // 5
}

export interface PlayerState {
  name: string;
  title: string;
  party: string;
}

export interface GameState {
  time: GameTime;
  economy: EconomyState;
  publicOpinion: PublicOpinionState;
  population: PopulationState;
  election: ElectionState;
  player: PlayerState;
  lastSavedAt: string | null;
  version: string;
}

export type GameScreenRoute =
  | 'dashboard'
  | 'cabinet'
  | 'decisions'
  | 'events'
  | 'diplomacy'
  | 'settings';
