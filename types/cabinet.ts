/**
 * Core Cabinet System Types
 */

export type MinistryType =
  | 'Finance'
  | 'Home Affairs'
  | 'Defence'
  | 'Education'
  | 'Health'
  | 'Agriculture'
  | 'Infrastructure'
  | 'External Affairs';

export interface Candidate {
  id: string;
  name: string;
  age: number;
  ministry: MinistryType;
  experience: number; // 0-100 scale
  integrity: number; // 0-100 scale
  popularity: number; // 0-100 scale
  loyalty: number; // 0-100 scale
  relationship: number; // 0-100 PM Relationship scale
  shortDescription: string;
  avatarUrl?: string;
  status?: 'Active' | 'Candidate' | 'Resigned' | 'Vacant';
}

export interface Minister extends Candidate {
  appointedAtYear?: number;
  appointedAtWeek?: number;
}

export type CabinetMinisters = Record<MinistryType, Minister | null>;

export interface CabinetState {
  ministers: CabinetMinisters;
}

/**
 * Returns human readable relationship label
 */
export function getRelationshipTier(relationship: number): {
  label: string;
  variant: 'emerald' | 'gold' | 'crimson';
} {
  if (relationship >= 80) return { label: 'Excellent', variant: 'emerald' };
  if (relationship >= 60) return { label: 'Good', variant: 'emerald' };
  if (relationship >= 40) return { label: 'Neutral', variant: 'gold' };
  if (relationship >= 20) return { label: 'Strained', variant: 'crimson' };
  return { label: 'Critical', variant: 'crimson' };
}

/**
 * Helper to format 0-100 rating as 5-star string (e.g. ★★★★☆)
 */
export function formatStars(rating: number): string {
  const stars = Math.min(5, Math.max(1, Math.round((rating / 100) * 5)));
  return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}
