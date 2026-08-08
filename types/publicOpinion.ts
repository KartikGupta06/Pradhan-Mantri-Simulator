/**
 * Core Public Opinion & Voter Group Data Types
 */

export type VoterGroupType = 'students' | 'farmers' | 'middleClass' | 'businesses';

export type OpinionTrend = 'Improving' | 'Stable' | 'Declining';

export interface VoterGroupState {
  approval: number; // 0-100 scale
  previousApproval: number;
  trend: OpinionTrend;
}

export interface PublicOpinionState {
  popularity: number; // Overall derived popularity (equal 25% weight)
  students: VoterGroupState;
  farmers: VoterGroupState;
  middleClass: VoterGroupState;
  businesses: VoterGroupState;
}
