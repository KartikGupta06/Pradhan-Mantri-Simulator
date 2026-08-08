/**
 * Core Economy & Country Statistics Data Types
 */

export type EconomicStatus = 'Booming' | 'Strong' | 'Stable' | 'Weak' | 'Struggling' | 'Crisis';
export type EconomicMomentum = 'Improving' | 'Stable' | 'Declining';
export type TreasuryStatus = 'Healthy' | 'Warning' | 'Critical';

export interface EconomicSnapshot {
  timestamp: string; // e.g. "May, Week 2, 2029"
  week: number;
  year: number;
  gdp: number;
  gdpGrowth: number;
  treasury: number;
  inflation: number;
  unemployment: number;
  popularity: number;
  economicHealth: number;
}

export interface DerivedEconomyMetrics {
  gdpGrowth: number;
  economicHealth: number;
  economicStatus: EconomicStatus;
  countryHealth: number;
  economicMomentum: EconomicMomentum;
  treasuryStatus: TreasuryStatus;
}
