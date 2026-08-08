import { DecisionOption } from './decision';

/**
 * Core Random Events System Types
 */

export type EventCategory =
  | 'Natural Disaster'
  | 'Economy'
  | 'Agriculture'
  | 'Healthcare'
  | 'Infrastructure'
  | 'Science'
  | 'Sports'
  | 'National';

export type EventSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface GameEvent {
  id: string;
  title: string;
  category: EventCategory;
  description: string;
  severity: EventSeverity;
  options: DecisionOption[];
  triggerConditions?: string;
}
