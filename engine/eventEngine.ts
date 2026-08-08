import { GameEvent } from '@/types/event';
import { HANDCRAFTED_EVENTS_CATALOG } from '@/constants/eventsCatalog';

/**
 * Centralized Random Event Trigger Probability (15%)
 */
export const RANDOM_EVENT_PROBABILITY = 0.15;

/**
 * Anti-repetition window size (5 decisions)
 */
export const EVENT_REPEAT_WINDOW = 5;

/**
 * Evaluates whether a random national event should trigger after a decision.
 * Enforces anti-repetition rules using recentEvents history.
 */
export function evaluateRandomEvent(
  recentEvents: string[] = [],
  forceTriggerId?: string
): GameEvent | null {
  // Developer override for dev testing
  if (forceTriggerId) {
    const forcedEvent = HANDCRAFTED_EVENTS_CATALOG.find((e) => e.id === forceTriggerId);
    if (forcedEvent) return forcedEvent;
  }

  // Evaluate 15% random trigger probability
  const roll = Math.random();
  if (roll > RANDOM_EVENT_PROBABILITY) {
    return null;
  }

  // Filter out events triggered within the recent 5-decision window
  const recentSet = new Set(recentEvents.slice(-EVENT_REPEAT_WINDOW));
  let eligibleEvents = HANDCRAFTED_EVENTS_CATALOG.filter((e) => !recentSet.has(e.id));

  // Fallback if all events have been triggered recently
  if (eligibleEvents.length === 0) {
    const lastEventId = recentEvents[recentEvents.length - 1];
    eligibleEvents = HANDCRAFTED_EVENTS_CATALOG.filter((e) => e.id !== lastEventId);
  }

  if (eligibleEvents.length === 0) {
    eligibleEvents = HANDCRAFTED_EVENTS_CATALOG;
  }

  // Pick random event from eligible list
  const randomIndex = Math.floor(Math.random() * eligibleEvents.length);
  return eligibleEvents[randomIndex];
}

/**
 * Records an event trigger in history, maintaining anti-repetition memory
 */
export function recordEventTrigger(
  recentEvents: string[] = [],
  eventId: string
): string[] {
  const updated = [...recentEvents, eventId];
  return updated.slice(-EVENT_REPEAT_WINDOW);
}
