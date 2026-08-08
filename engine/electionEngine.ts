import { ElectionState, ElectionResultData, CampaignFocus, ElectionOutcome } from '@/types/election';
import { GameTime, GameState } from '@/types/game';
import { PublicOpinionState } from '@/types/publicOpinion';
import { applyDirectVoterEffects } from './publicOpinionEngine';

/**
 * Initial Prototype Election State
 */
export const INITIAL_ELECTION_STATE: ElectionState = {
  termNumber: 1,
  termStartYear: 2029,
  termEndYear: 2034,
  weeksElapsed: 0,
  totalTermWeeks: 260, // 5 years * 52 weeks
  weeksRemaining: 260,
  yearsRemaining: 5.0,
  inElectionFlow: false,
};

/**
 * Calculates election countdown time remaining based on current game time.
 * Triggers election flow when 5-year term ends (weeksRemaining <= 0).
 */
export function updateElectionCountdown(
  time: GameTime,
  election: ElectionState = INITIAL_ELECTION_STATE
): ElectionState {
  const yearsDiff = time.year - election.termStartYear;
  const weeksFromYears = yearsDiff * 52;

  // May (Month index 4, Week 2) was starting baseline
  const startBaselineWeek = 4 * 4 + 1; // 17 weeks
  const currentWeekProgress = time.monthIndex * 4 + (time.week - 1);
  const weeksFromMonths = currentWeekProgress - startBaselineWeek;

  const weeksElapsed = Math.max(0, weeksFromYears + weeksFromMonths);
  const weeksRemaining = Math.max(0, election.totalTermWeeks - weeksElapsed);
  const yearsRemaining = Number((weeksRemaining / 52).toFixed(1));
  const inElectionFlow = weeksRemaining <= 0;

  return {
    ...election,
    weeksElapsed,
    weeksRemaining,
    yearsRemaining,
    inElectionFlow: election.inElectionFlow || inElectionFlow,
  };
}

/**
 * Applies selected campaign focus boost to voter groups.
 * Campaign Options:
 * - Economy: Middle Class +3, Businesses +3
 * - Jobs: Students +3, Middle Class +2
 * - Farmers: Farmers +5
 */
export function applyCampaignFocus(
  opinion: PublicOpinionState,
  focus: CampaignFocus
): PublicOpinionState {
  if (focus === 'Economy') {
    return applyDirectVoterEffects(opinion, { middleClass: 3, businesses: 3 });
  } else if (focus === 'Jobs') {
    return applyDirectVoterEffects(opinion, { students: 3, middleClass: 2 });
  } else {
    return applyDirectVoterEffects(opinion, { farmers: 5 });
  }
}

/**
 * Calculates final election outcome based on overall popularity + small controlled uncertainty (±5%).
 */
export function calculateElectionResult(
  popularity: number,
  campaignFocus: CampaignFocus,
  devRollDelta?: number
): ElectionResultData {
  // Small controlled uncertainty factor between -5 and +5
  const rollDelta = devRollDelta !== undefined ? devRollDelta : Math.floor(Math.random() * 11) - 5;
  const finalScore = Math.max(0, Math.min(100, Math.round(popularity + rollDelta)));

  let victory = false;
  let outcome: ElectionOutcome = 'Defeat';

  if (finalScore >= 80) {
    victory = true;
    outcome = 'Strong Victory';
  } else if (finalScore >= 65) {
    victory = true;
    outcome = 'Narrow Victory';
  } else if (finalScore >= 50) {
    victory = true;
    outcome = 'Very Close Victory';
  } else {
    victory = false;
    outcome = 'Defeat';
  }

  let summary = '';
  if (victory) {
    summary = `Your government secured another 5-year term with a ${outcome.toLowerCase()}! Strong campaign resonance on ${campaignFocus.toLowerCase()} rallied decisive voter turnout across key demographics.`;
  } else {
    summary = `The government faced an electoral defeat. Discontent among key voter demographics led to a majority shift in parliament, concluding your premier term.`;
  }

  return {
    outcome,
    victory,
    finalScore,
    popularity,
    rollDelta,
    campaignFocus,
    summary,
  };
}

/**
 * Resets term for a re-elected Prime Minister, starting a new 5-year term while preserving game state.
 */
export function startNewTerm(gameState: GameState): GameState {
  const currentTerm = gameState.election.termNumber || 1;
  const nextTermNumber = currentTerm + 1;
  const nextStartYear = gameState.time.year;
  const nextEndYear = nextStartYear + 5;

  const newElectionState: ElectionState = {
    termNumber: nextTermNumber,
    termStartYear: nextStartYear,
    termEndYear: nextEndYear,
    weeksElapsed: 0,
    totalTermWeeks: 260,
    weeksRemaining: 260,
    yearsRemaining: 5.0,
    inElectionFlow: false,
    selectedCampaignFocus: undefined,
    lastElectionResult: undefined,
  };

  return {
    ...gameState,
    election: newElectionState,
  };
}
