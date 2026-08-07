/**
 * Core Game Architecture Types (Placeholder Shell)
 */

export interface GameStatePlaceholder {
  isInitialized: boolean;
  gameVersion: string;
  lastSavedAt: string | null;
}

export type GameScreenRoute =
  | 'dashboard'
  | 'cabinet'
  | 'decisions'
  | 'events'
  | 'diplomacy'
  | 'settings';
