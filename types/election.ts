/**
 * Core Election System Data Types
 */

export type CampaignFocus = 'Economy' | 'Jobs' | 'Farmers';

export type ElectionOutcome = 'Strong Victory' | 'Narrow Victory' | 'Very Close Victory' | 'Defeat';

export interface ElectionResultData {
  outcome: ElectionOutcome;
  victory: boolean;
  finalScore: number;
  popularity: number;
  rollDelta: number;
  campaignFocus: CampaignFocus;
  summary: string;
}

export interface ElectionState {
  termNumber: number; // e.g. 1
  termStartYear: number; // e.g. 2029
  termEndYear: number; // e.g. 2034
  weeksElapsed: number; // Weeks elapsed in current term
  totalTermWeeks: number; // 260 weeks (5 years * 52 weeks)
  weeksRemaining: number;
  yearsRemaining: number;
  inElectionFlow: boolean;
  selectedCampaignFocus?: CampaignFocus;
  lastElectionResult?: ElectionResultData;
}
