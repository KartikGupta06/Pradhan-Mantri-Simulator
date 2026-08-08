import { PublicOpinionState, OpinionTrend, VoterGroupState } from '@/types/publicOpinion';
import { EconomyState } from '@/types/game';
import { StatEffects } from '@/types/decision';

/**
 * Initial Prototype Public Opinion Values
 */
export const INITIAL_PUBLIC_OPINION: PublicOpinionState = {
  popularity: 76,
  students: {
    approval: 78,
    previousApproval: 78,
    trend: 'Stable',
  },
  farmers: {
    approval: 62,
    previousApproval: 62,
    trend: 'Stable',
  },
  middleClass: {
    approval: 74,
    previousApproval: 74,
    trend: 'Stable',
  },
  businesses: {
    approval: 69,
    previousApproval: 69,
    trend: 'Stable',
  },
};

/**
 * Derives overall popularity from equal 25% weights of the 4 voter groups.
 */
export function calculateOverallPopularity(opinion: PublicOpinionState): number {
  const weighted =
    opinion.students.approval * 0.25 +
    opinion.farmers.approval * 0.25 +
    opinion.middleClass.approval * 0.25 +
    opinion.businesses.approval * 0.25;

  return Math.max(0, Math.min(100, Math.round(weighted)));
}

/**
 * Determines trend state based on previous vs current approval rating.
 */
export function determineOpinionTrend(current: number, previous: number): OpinionTrend {
  const diff = current - previous;
  if (diff > 1) return 'Improving';
  if (diff < -1) return 'Declining';
  return 'Stable';
}

/**
 * Helper to update a single voter group state safely with bounds checking.
 */
export function updateVoterGroup(
  currentGroup: VoterGroupState,
  delta: number = 0
): VoterGroupState {
  const rawApproval = currentGroup.approval + delta;
  const newApproval = Math.max(0, Math.min(100, Number(rawApproval.toFixed(1))));
  const trend = determineOpinionTrend(newApproval, currentGroup.previousApproval);

  return {
    approval: newApproval,
    previousApproval: currentGroup.approval,
    trend,
  };
}

/**
 * Applies direct decision effects to voter groups (students, farmers, middleClass, businesses).
 * Also respects direct popularity modifier if supplied.
 */
export function applyDirectVoterEffects(
  opinion: PublicOpinionState,
  effects: StatEffects = {}
): PublicOpinionState {
  const studentsDelta = effects.students ?? 0;
  const farmersDelta = effects.farmers ?? 0;
  const middleClassDelta = effects.middleClass ?? 0;
  const businessesDelta = effects.businesses ?? 0;

  // If explicit popularity delta is provided without voter group deltas, distribute evenly
  let extraGroupDelta = 0;
  if (effects.popularity && !effects.students && !effects.farmers && !effects.middleClass && !effects.businesses) {
    extraGroupDelta = effects.popularity;
  }

  const updatedStudents = updateVoterGroup(opinion.students, studentsDelta + extraGroupDelta);
  const updatedFarmers = updateVoterGroup(opinion.farmers, farmersDelta + extraGroupDelta);
  const updatedMiddleClass = updateVoterGroup(opinion.middleClass, middleClassDelta + extraGroupDelta);
  const updatedBusinesses = updateVoterGroup(opinion.businesses, businessesDelta + extraGroupDelta);

  const interimOpinion: PublicOpinionState = {
    students: updatedStudents,
    farmers: updatedFarmers,
    middleClass: updatedMiddleClass,
    businesses: updatedBusinesses,
    popularity: 0,
  };

  const newPopularity = calculateOverallPopularity(interimOpinion);

  return {
    ...interimOpinion,
    popularity: newPopularity,
  };
}

/**
 * Applies indirect economic modifiers to voter group opinions.
 */
export function applyIndirectOpinionModifiers(
  opinion: PublicOpinionState,
  economy: EconomyState,
  gdpGrowth: number
): PublicOpinionState {
  let sDelta = 0;
  let fDelta = 0;
  let mDelta = 0;
  let bDelta = 0;

  // High unemployment (> 6.0%): Students and Middle Class become less satisfied
  if (economy.unemployment > 6.0) {
    sDelta -= 0.1;
    mDelta -= 0.1;
  }

  // High inflation (> 4.5%): Middle Class becomes less satisfied
  if (economy.inflation > 4.5) {
    mDelta -= 0.2;
  }

  // Strong economic growth (> 5.5%): Businesses & Middle Class satisfied
  if (gdpGrowth > 5.5) {
    bDelta += 0.1;
    mDelta += 0.1;
  }

  // Strong growth (> 6.0%): Farmers also benefit from demand
  if (gdpGrowth > 6.0) {
    fDelta += 0.1;
  }

  const updatedStudents = updateVoterGroup(opinion.students, sDelta);
  const updatedFarmers = updateVoterGroup(opinion.farmers, fDelta);
  const updatedMiddleClass = updateVoterGroup(opinion.middleClass, mDelta);
  const updatedBusinesses = updateVoterGroup(opinion.businesses, bDelta);

  const interimOpinion: PublicOpinionState = {
    students: updatedStudents,
    farmers: updatedFarmers,
    middleClass: updatedMiddleClass,
    businesses: updatedBusinesses,
    popularity: 0,
  };

  const newPopularity = calculateOverallPopularity(interimOpinion);

  return {
    ...interimOpinion,
    popularity: newPopularity,
  };
}
