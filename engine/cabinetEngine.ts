import { CabinetState, Candidate, MinistryType, Minister } from '@/types/cabinet';

/**
 * Pure Cabinet Engine Service
 */

/**
 * Appoints a candidate to a specific ministry
 */
export function appointMinister(
  cabinetState: CabinetState,
  candidate: Candidate
): CabinetState {
  const newMinister: Minister = {
    ...candidate,
    status: 'Active',
  };

  return {
    ...cabinetState,
    ministers: {
      ...cabinetState.ministers,
      [candidate.ministry]: newMinister,
    },
  };
}

/**
 * Removes/Vacates a minister from a ministry
 */
export function removeMinister(
  cabinetState: CabinetState,
  ministry: MinistryType
): CabinetState {
  return {
    ...cabinetState,
    ministers: {
      ...cabinetState.ministers,
      [ministry]: null,
    },
  };
}

/**
 * Updates PM Relationship score for a minister.
 * Triggers resignation if relationship falls to <= 15.
 */
export function updateMinisterRelationship(
  cabinetState: CabinetState,
  ministry: MinistryType,
  delta: number
): {
  updatedCabinet: CabinetState;
  resignationEvent: boolean;
  resignedMinisterName?: string;
  newRelationship?: number;
} {
  const currentMinister = cabinetState.ministers[ministry];
  if (!currentMinister) {
    return { updatedCabinet: cabinetState, resignationEvent: false };
  }

  const rawRelationship = currentMinister.relationship + delta;
  const newRelationship = Math.max(0, Math.min(100, rawRelationship));

  const ministerName = currentMinister.name;

  // Check critical threshold condition: Relationship <= 15
  if (newRelationship <= 15) {
    const updatedCabinet = removeMinister(cabinetState, ministry);
    return {
      updatedCabinet,
      resignationEvent: true,
      resignedMinisterName: ministerName,
      newRelationship,
    };
  }

  const updatedMinister: Minister = {
    ...currentMinister,
    relationship: newRelationship,
  };

  const updatedCabinet: CabinetState = {
    ...cabinetState,
    ministers: {
      ...cabinetState.ministers,
      [ministry]: updatedMinister,
    },
  };

  return {
    updatedCabinet,
    resignationEvent: false,
    newRelationship,
  };
}

/**
 * Calculates overall cabinet stability and strength indicators
 */
export function calculateCabinetMetrics(cabinetState: CabinetState): {
  filledCount: number;
  vacantCount: number;
  totalCount: number;
  averageRelationship: number;
  stabilityLabel: string;
  stabilityVariant: 'emerald' | 'gold' | 'crimson';
} {
  const ministersList = Object.values(cabinetState.ministers);
  const totalCount = ministersList.length;

  const filledMinisters = ministersList.filter((m): m is Minister => m !== null);
  const filledCount = filledMinisters.length;
  const vacantCount = totalCount - filledCount;

  if (filledCount === 0) {
    return {
      filledCount: 0,
      vacantCount: totalCount,
      totalCount,
      averageRelationship: 0,
      stabilityLabel: 'Unstable Cabinet',
      stabilityVariant: 'crimson',
    };
  }

  const sumRelationship = filledMinisters.reduce((acc, m) => acc + m.relationship, 0);
  const averageRelationship = Math.round(sumRelationship / filledCount);

  let stabilityLabel = 'High Stability';
  let stabilityVariant: 'emerald' | 'gold' | 'crimson' = 'emerald';

  if (averageRelationship < 50 || filledCount < 5) {
    stabilityLabel = 'Critical Instability';
    stabilityVariant = 'crimson';
  } else if (averageRelationship < 70 || filledCount < 7) {
    stabilityLabel = 'Moderate Stability';
    stabilityVariant = 'gold';
  }

  return {
    filledCount,
    vacantCount,
    totalCount,
    averageRelationship,
    stabilityLabel,
    stabilityVariant,
  };
}
