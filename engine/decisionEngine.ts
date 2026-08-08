import { GameState } from '@/types/game';
import { Decision, DecisionOption, DecisionResult, StatDiff } from '@/types/decision';
import { advanceTime } from './timeUtils';
import { applyWeeklyPassiveEconomyUpdate } from './economyEngine';
import { applyDirectVoterEffects, applyIndirectOpinionModifiers } from './publicOpinionEngine';
import { updateElectionCountdown } from './electionEngine';

/**
 * Applies a selected decision option to the game state,
 * updates economic metrics, voter group opinions, election countdown,
 * and generates the result object.
 */
export function applyDecision(
  currentState: GameState,
  decision: Decision,
  selectedOption: DecisionOption
): { updatedState: GameState; result: DecisionResult } {
  const effects = selectedOption.effects || {};

  // 1. Calculate raw updated metric values
  const prevTreasury = currentState.economy.treasury;
  const prevGdp = currentState.economy.gdp;
  const prevInflation = currentState.economy.inflation;
  const prevUnemployment = currentState.economy.unemployment;
  const prevPopularity = currentState.publicOpinion.popularity;

  let newTreasury = prevTreasury + (effects.treasury ?? 0);
  let newGdp = prevGdp + (effects.gdp ?? 0);
  let newInflation = prevInflation + (effects.inflation ?? 0);
  let newUnemployment = prevUnemployment + (effects.unemployment ?? 0);

  // Validate state
  newTreasury = isNaN(newTreasury) ? prevTreasury : Math.round(newTreasury);
  newGdp = isNaN(newGdp) ? prevGdp : Math.max(10, Number(newGdp.toFixed(2)));
  newInflation = isNaN(newInflation) ? prevInflation : Number(Math.max(0.1, newInflation).toFixed(1));
  newUnemployment = isNaN(newUnemployment)
    ? prevUnemployment
    : Number(Math.max(0.1, newUnemployment).toFixed(1));

  // 2. Apply Direct & Indirect Voter Group Effects
  const opinionAfterDirect = applyDirectVoterEffects(currentState.publicOpinion, effects);
  const opinionAfterIndirect = applyIndirectOpinionModifiers(
    opinionAfterDirect,
    { treasury: newTreasury, gdp: newGdp, inflation: newInflation, unemployment: newUnemployment },
    currentState.derivedEconomy.gdpGrowth
  );

  // 3. Advance time by ONE WEEK
  const newTime = advanceTime(currentState.time);

  // 4. Construct interim GameState after decision effects
  const interimState: GameState = {
    ...currentState,
    time: newTime,
    economy: {
      treasury: newTreasury,
      gdp: newGdp,
      inflation: newInflation,
      unemployment: newUnemployment,
    },
    publicOpinion: opinionAfterIndirect,
  };

  // 5. Apply subtle passive weekly economic updates & derived metric calculations
  const stateAfterEconomy = applyWeeklyPassiveEconomyUpdate(interimState);

  // 6. Update Election Countdown
  const updatedElection = updateElectionCountdown(newTime, currentState.election);

  const updatedState: GameState = {
    ...stateAfterEconomy,
    election: updatedElection,
  };

  // 7. Generate Stat Changes array for Result Screen
  const statChanges: StatDiff[] = [];

  // Treasury
  const treasuryDelta = updatedState.economy.treasury - prevTreasury;
  statChanges.push({
    statKey: 'treasury',
    label: 'Treasury',
    previousValue: prevTreasury,
    newValue: updatedState.economy.treasury,
    delta: treasuryDelta,
    formattedPrevious: `₹ ${prevTreasury.toLocaleString('en-IN')} Cr`,
    formattedNew: `₹ ${updatedState.economy.treasury.toLocaleString('en-IN')} Cr`,
    formattedDelta: `${treasuryDelta >= 0 ? '+' : ''}${treasuryDelta.toLocaleString('en-IN')} Cr`,
    isPositiveGood: true,
  });

  // Popularity
  const popularityDelta = Math.round(updatedState.publicOpinion.popularity - prevPopularity);
  statChanges.push({
    statKey: 'popularity',
    label: 'Popularity',
    previousValue: prevPopularity,
    newValue: Math.round(updatedState.publicOpinion.popularity),
    delta: popularityDelta,
    formattedPrevious: `${prevPopularity}%`,
    formattedNew: `${Math.round(updatedState.publicOpinion.popularity)}%`,
    formattedDelta: `${popularityDelta >= 0 ? '+' : ''}${popularityDelta}%`,
    isPositiveGood: true,
  });

  // GDP
  const gdpDelta = Number((updatedState.economy.gdp - prevGdp).toFixed(2));
  statChanges.push({
    statKey: 'gdp',
    label: 'GDP',
    previousValue: prevGdp,
    newValue: updatedState.economy.gdp,
    delta: gdpDelta,
    formattedPrevious: `₹ ${prevGdp.toFixed(2)} T`,
    formattedNew: `₹ ${updatedState.economy.gdp.toFixed(2)} T`,
    formattedDelta: `${gdpDelta >= 0 ? '+' : ''}${gdpDelta.toFixed(1)} T`,
    isPositiveGood: true,
  });

  // Inflation
  const inflationDelta = Number((updatedState.economy.inflation - prevInflation).toFixed(1));
  statChanges.push({
    statKey: 'inflation',
    label: 'Inflation',
    previousValue: prevInflation,
    newValue: updatedState.economy.inflation,
    delta: inflationDelta,
    formattedPrevious: `${prevInflation.toFixed(1)}%`,
    formattedNew: `${updatedState.economy.inflation.toFixed(1)}%`,
    formattedDelta: `${inflationDelta >= 0 ? '+' : ''}${inflationDelta.toFixed(1)}%`,
    isPositiveGood: false,
  });

  // Farmers (if modified)
  if (effects.farmers) {
    const prevF = currentState.publicOpinion.farmers.approval;
    const newF = updatedState.publicOpinion.farmers.approval;
    const fDelta = Number((newF - prevF).toFixed(1));
    statChanges.push({
      statKey: 'farmers',
      label: 'Farmers Approval',
      previousValue: prevF,
      newValue: newF,
      delta: fDelta,
      formattedPrevious: `${prevF}%`,
      formattedNew: `${newF}%`,
      formattedDelta: `${fDelta >= 0 ? '+' : ''}${fDelta}%`,
      isPositiveGood: true,
    });
  }

  // Summary generation
  const summary = `Executive Directive enacted for "${decision.title}". Action "${selectedOption.title}" implemented across key ministries. Overall Public Approval rating updated to ${updatedState.publicOpinion.popularity}%. Time advanced to ${newTime.month}, Week ${newTime.week}, ${newTime.year}.`;

  const result: DecisionResult = {
    decisionId: decision.id,
    decisionTitle: decision.title,
    selectedOptionId: selectedOption.id,
    selectedOptionTitle: selectedOption.title,
    selectedOptionDescription: selectedOption.description,
    summary,
    statChanges,
    previousState: currentState,
    newState: updatedState,
  };

  return { updatedState, result };
}
