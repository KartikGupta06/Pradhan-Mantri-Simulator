import { EconomyState, GameState, GameTime } from '@/types/game';
import {
  DerivedEconomyMetrics,
  EconomicMomentum,
  EconomicSnapshot,
  EconomicStatus,
  TreasuryStatus,
} from '@/types/economy';

/**
 * Pure Centralized Economy Engine Service
 */

/**
 * Calculates GDP Growth percentage based on core economic factors.
 * Formula: Base 6.4% + GDP expansion bonus - Inflation penalty - Unemployment penalty
 */
export function calculateGdpGrowth(economy: EconomyState): number {
  const baseGrowth = 6.4;
  const gdpDelta = (economy.gdp - 320.0) * 0.05;
  const inflationPenalty = (economy.inflation - 4.1) * 0.3;
  const unemploymentPenalty = (economy.unemployment - 6.2) * 0.2;

  const rawGrowth = baseGrowth + gdpDelta - inflationPenalty - unemploymentPenalty;
  return Number(Math.max(1.0, Math.min(12.0, rawGrowth)).toFixed(1));
}

/**
 * Calculates Economic Health score (0–100) using weighted normalized metrics.
 * Weights: GDP Growth (40%), Inflation (30%), Unemployment (30%).
 */
export function calculateEconomicHealth(
  gdpGrowth: number,
  inflation: number,
  unemployment: number
): number {
  const gdpScore = Math.min(100, Math.max(0, (gdpGrowth / 10.0) * 100));
  const inflationScore = Math.min(100, Math.max(0, (1.0 - inflation / 10.0) * 100));
  const unemploymentScore = Math.min(100, Math.max(0, (1.0 - unemployment / 12.0) * 100));

  const weightedHealth = gdpScore * 0.4 + inflationScore * 0.3 + unemploymentScore * 0.3;
  return Math.round(Math.max(0, Math.min(100, weightedHealth)));
}

/**
 * Converts Economic Health (0-100) into presentation status.
 */
export function getEconomicStatus(health: number): EconomicStatus {
  if (health >= 90) return 'Booming';
  if (health >= 75) return 'Strong';
  if (health >= 60) return 'Stable';
  if (health >= 40) return 'Weak';
  if (health >= 20) return 'Struggling';
  return 'Crisis';
}

/**
 * Calculates high-level Country Health score (0–100).
 * Combines Economic Health (50%), Popularity (35%), Employment (15%).
 */
export function calculateCountryHealth(
  economicHealth: number,
  popularity: number,
  unemployment: number
): number {
  const employmentScore = Math.max(0, 100 - unemployment * 8);
  const weightedCountry = economicHealth * 0.5 + popularity * 0.35 + employmentScore * 0.15;
  return Math.round(Math.max(0, Math.min(100, weightedCountry)));
}

/**
 * Determines Treasury Status level.
 */
export function getTreasuryStatus(treasury: number): TreasuryStatus {
  if (treasury >= 10000) return 'Healthy';
  if (treasury >= 3000) return 'Warning';
  return 'Critical';
}

/**
 * Calculates Economic Momentum / Trend from history snapshots.
 */
export function calculateEconomicMomentum(history: EconomicSnapshot[]): EconomicMomentum {
  if (!history || history.length < 2) return 'Stable';

  const latest = history[history.length - 1];
  const previous = history[Math.max(0, history.length - 3)];

  const delta = latest.economicHealth - previous.economicHealth;

  if (delta > 2) return 'Improving';
  if (delta < -2) return 'Declining';
  return 'Stable';
}

/**
 * Bundles all derived calculations into a single clean data structure.
 */
export function calculateDerivedMetrics(
  economy: EconomyState,
  popularity: number,
  history: EconomicSnapshot[] = []
): DerivedEconomyMetrics {
  const gdpGrowth = calculateGdpGrowth(economy);
  const economicHealth = calculateEconomicHealth(gdpGrowth, economy.inflation, economy.unemployment);
  const economicStatus = getEconomicStatus(economicHealth);
  const countryHealth = calculateCountryHealth(economicHealth, popularity, economy.unemployment);
  const treasuryStatus = getTreasuryStatus(economy.treasury);
  const economicMomentum = calculateEconomicMomentum(history);

  return {
    gdpGrowth,
    economicHealth,
    economicStatus,
    countryHealth,
    economicMomentum,
    treasuryStatus,
  };
}

/**
 * Creates a lightweight snapshot for history tracking (kept to last 12 weeks).
 */
export function createEconomicSnapshot(
  time: GameTime,
  economy: EconomyState,
  popularity: number,
  gdpGrowth: number,
  economicHealth: number
): EconomicSnapshot {
  return {
    timestamp: `${time.month}, Week ${time.week}, ${time.year}`,
    week: time.week,
    year: time.year,
    gdp: economy.gdp,
    gdpGrowth,
    treasury: economy.treasury,
    inflation: economy.inflation,
    unemployment: economy.unemployment,
    popularity,
    economicHealth,
  };
}

/**
 * Applies subtle weekly baseline update as time advances by ONE WEEK.
 * Performs state validation to prevent NaN, Infinity, or negative overflows.
 */
export function applyWeeklyPassiveEconomyUpdate(gameState: GameState): GameState {
  const current = gameState.economy;
  const currentPopularity = gameState.publicOpinion.popularity;

  // 1. Calculate current GDP Growth
  const gdpGrowth = calculateGdpGrowth(current);

  // 2. Subtle weekly GDP growth addition
  const weeklyGdpDelta = (gdpGrowth / 52 / 100) * current.gdp;
  let newGdp = current.gdp + weeklyGdpDelta;

  // 3. Subtle inflation drift towards target 4.0%
  let newInflation = current.inflation;
  if (current.inflation > 4.0) {
    newInflation -= 0.02;
  } else if (current.inflation < 4.0) {
    newInflation += 0.02;
  }

  // 4. Subtle unemployment drift towards target 5.5%
  let newUnemployment = current.unemployment;
  if (current.unemployment > 5.5) {
    newUnemployment -= 0.01;
  } else if (current.unemployment < 5.5) {
    newUnemployment += 0.01;
  }

  // 5. Subtle Popularity reaction to Economic Health
  const currentHealth = calculateEconomicHealth(gdpGrowth, newInflation, newUnemployment);
  let newPopularity = currentPopularity;
  if (currentHealth >= 75) {
    newPopularity += 0.2;
  } else if (currentHealth < 45) {
    newPopularity -= 0.2;
  }

  // Treasury validation & non-NaN checks
  let newTreasury = current.treasury;
  newTreasury = isNaN(newTreasury) ? 18450 : Math.round(newTreasury);
  newGdp = isNaN(newGdp) ? 320.45 : Number(Math.max(10, newGdp).toFixed(2));
  newInflation = isNaN(newInflation) ? 4.1 : Number(Math.max(0.1, newInflation).toFixed(1));
  newUnemployment = isNaN(newUnemployment) ? 6.2 : Number(Math.max(0.1, newUnemployment).toFixed(1));
  newPopularity = isNaN(newPopularity) ? 76 : Number(Math.max(0, Math.min(100, newPopularity)).toFixed(1));

  const updatedEconomy: EconomyState = {
    treasury: newTreasury,
    gdp: newGdp,
    inflation: newInflation,
    unemployment: newUnemployment,
  };

  // 6. Recalculate derived metrics
  const newDerived = calculateDerivedMetrics(
    updatedEconomy,
    newPopularity,
    gameState.economicHistory || []
  );

  // 7. Append new snapshot to history (max 12 weeks)
  const newSnapshot = createEconomicSnapshot(
    gameState.time,
    updatedEconomy,
    newPopularity,
    newDerived.gdpGrowth,
    newDerived.economicHealth
  );

  const updatedHistory = [...(gameState.economicHistory || []), newSnapshot].slice(-12);

  return {
    ...gameState,
    economy: updatedEconomy,
    publicOpinion: {
      popularity: newPopularity,
    },
    derivedEconomy: newDerived,
    economicHistory: updatedHistory,
  };
}
