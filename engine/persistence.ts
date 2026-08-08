import { GameState } from '@/types/game';

export const SAVE_KEY = 'pradhan-mantri-simulator-save-v1';
export const CURRENT_GAME_VERSION = '0.5.0';

/**
 * Saves game state to localStorage safely
 */
export function saveGameState(state: GameState): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const payload = JSON.stringify({
      ...state,
      lastSavedAt: new Date().toISOString(),
      version: CURRENT_GAME_VERSION,
    });
    localStorage.setItem(SAVE_KEY, payload);
    return true;
  } catch (error) {
    console.error('Failed to save game state to localStorage:', error);
    return false;
  }
}

/**
 * Loads game state from localStorage safely with validation
 */
export function loadGameState(): GameState | null {
  if (typeof window === 'undefined') return null;

  try {
    const rawData = localStorage.getItem(SAVE_KEY);
    if (!rawData) return null;

    const parsed = JSON.parse(rawData) as GameState;

    // Validate essential state properties
    if (
      !parsed ||
      !parsed.time ||
      !parsed.economy ||
      !parsed.publicOpinion ||
      !parsed.population ||
      typeof parsed.economy.treasury !== 'number' ||
      isNaN(parsed.economy.treasury) ||
      typeof parsed.publicOpinion.popularity !== 'number' ||
      isNaN(parsed.publicOpinion.popularity)
    ) {
      console.warn('Corrupted game save detected. Falling back to initial state.');
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load game state from localStorage:', error);
    return null;
  }
}

/**
 * Clears saved game state from localStorage (Dev Reset)
 */
export function clearGameState(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.error('Failed to clear game state from localStorage:', error);
  }
}
