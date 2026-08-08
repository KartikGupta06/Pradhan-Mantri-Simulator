import { GameTime, ElectionState } from '@/types/game';

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
 * Term starts May 2029 (Week 2). First term ends May 2034.
 */
export function calculateElectionRemaining(
  currentTime: GameTime,
  initialElectionYears: number = 2
): ElectionState {
  // Simple calculation: 2031 is 2 years from 2029 start.
  // We can calculate remaining years dynamically if needed.
  const targetYear = currentTime.year + initialElectionYears;
  const remainingYears = Math.max(0, targetYear - currentTime.year);

  return {
    yearsRemaining: remainingYears,
    termTotalYears: 5,
  };
}
