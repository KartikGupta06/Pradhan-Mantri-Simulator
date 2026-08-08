import { GameTime } from '@/types/game';
import { ElectionState } from '@/types/election';
import { updateElectionCountdown } from './electionEngine';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Advances game time by ONE WEEK.
 * Week 1 -> 2 -> 3 -> 4 -> Next Month Week 1.
 * December Week 4 -> Next Year January Week 1.
 */
export function advanceTime(currentTime: GameTime): GameTime {
  let { year, monthIndex, week } = currentTime;

  week += 1;
  if (week > 4) {
    week = 1;
    monthIndex += 1;
    if (monthIndex >= 12) {
      monthIndex = 0;
      year += 1;
    }
  }

  return {
    year,
    monthIndex,
    month: MONTHS[monthIndex],
    week,
  };
}

/**
 * Derives election time remaining from current game time.
 */
export function calculateElectionRemaining(
  currentTime: GameTime,
  electionState?: ElectionState
): ElectionState {
  return updateElectionCountdown(currentTime, electionState);
}
