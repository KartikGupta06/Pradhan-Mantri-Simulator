/**
 * Core Decision & Policy Engine Data Types
 */

export type PolicyCategory =
  | 'All'
  | 'Economy'
  | 'Education'
  | 'Healthcare'
  | 'Agriculture'
  | 'Infrastructure'
  | 'National';

export interface StatEffects {
  treasury?: number; // Modify Treasury in Cr (e.g. -500)
  gdp?: number; // Modify GDP in Trillions (e.g. -0.1)
  inflation?: number; // Modify Inflation in % (e.g. +0.1)
  unemployment?: number; // Modify Unemployment in % (e.g. 0.0)
  popularity?: number; // Modify Popularity in % (e.g. +4)
  students?: number; // Modify Students approval (e.g. +3)
  farmers?: number; // Modify Farmers approval (e.g. +5)
  middleClass?: number; // Modify Middle Class approval (e.g. -2)
  businesses?: number; // Modify Businesses approval (e.g. +2)
}

export interface DecisionOption {
  id: string;
  title: string;
  description: string;
  pros: string;
  cons: string;
  effects: StatEffects;
}

export interface Decision {
  id: string;
  title: string;
  category: Exclude<PolicyCategory, 'All'> | string;
  description: string;
  situation: string;
  urgency: 'Low' | 'Medium' | 'High' | string;
  estimatedCost: string;
  status?: 'Available' | 'In Progress' | 'Completed';
  options: DecisionOption[];
}

export interface StatDiff {
  statKey: 'treasury' | 'gdp' | 'inflation' | 'unemployment' | 'popularity' | 'students' | 'farmers' | 'middleClass' | 'businesses';
  label: string;
  previousValue: number;
  newValue: number;
  delta: number;
  formattedPrevious: string;
  formattedNew: string;
  formattedDelta: string;
  isPositiveGood: boolean;
}

export interface DecisionResult {
  decisionId: string;
  decisionTitle: string;
  selectedOptionId: string;
  selectedOptionTitle: string;
  selectedOptionDescription: string;
  summary: string;
  statChanges: StatDiff[];
  previousState: import('./game').GameState;
  newState: import('./game').GameState;
}
