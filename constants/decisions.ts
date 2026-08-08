import { Decision } from '@/types/decision';

/**
 * Initial Playable Decisions Catalog
 */

export const ASSAM_FLOOD_DECISION: Decision = {
  id: 'assam_flood_crisis',
  title: 'Flood in Assam',
  category: 'National Crisis',
  description: 'Heavy rainfall has caused severe flooding in Assam.',
  situation: 'Lives and infrastructure are at risk. People are expecting an immediate response.',
  urgency: 'High',
  estimatedCost: '₹ 500 Cr',
  options: [
    {
      id: 'opt_a',
      title: 'Emergency Relief Package',
      description: 'Deploy NDRF forces immediately, distribute free rations, and release direct financial aid to flood victims.',
      pros: 'Immediate crisis response & significant boost to government popularity.',
      cons: 'Highest treasury drain & minor inflationary effect.',
      effects: {
        treasury: -500,
        popularity: 4,
        gdp: -0.1,
        inflation: 0.1,
        unemployment: 0,
      },
    },
    {
      id: 'opt_b',
      title: 'Request State + Central Coordination',
      description: 'Coordinate joint relief operations with state authorities, matching state funds with central emergency support.',
      pros: 'Fiscal prudence with shared financial responsibility.',
      cons: 'Moderate approval gains due to shared operational responsibility.',
      effects: {
        treasury: -200,
        popularity: 2,
        gdp: 0.0,
        inflation: 0.0,
        unemployment: 0,
      },
    },
    {
      id: 'opt_c',
      title: 'Wait for Detailed Assessment',
      description: 'Send a parliamentary study committee to survey the damage before approving major relief funds.',
      pros: 'Minimal upfront treasury impact.',
      cons: 'Public backlash for delayed response & localized economic slowdown.',
      effects: {
        treasury: -50,
        popularity: -5,
        gdp: -0.2,
        inflation: 0.0,
        unemployment: 0,
      },
    },
  ],
};

export const INITIAL_DECISIONS: Decision[] = [ASSAM_FLOOD_DECISION];
