/**
 * Core News System Types
 */

export type NewsCategory =
  | 'National'
  | 'Economy'
  | 'Politics'
  | 'Public'
  | 'Infrastructure'
  | 'Healthcare'
  | 'Education'
  | 'Agriculture'
  | 'Defence'
  | 'International';

export type NewsSentiment = 'Positive' | 'Neutral' | 'Negative';

export type NewsImportance = 'Breaking' | 'Important' | 'Normal';

export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  category: NewsCategory;
  timestamp: string; // e.g. "May, Week 2, 2029"
  importance: NewsImportance;
  sentiment: NewsSentiment;
  relatedDecisionId?: string;
  relatedMinisterId?: string;
  relatedEventId?: string;
}
