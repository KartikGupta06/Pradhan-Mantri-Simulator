export * from './decisionEngine';
export * from './timeUtils';
export * from './persistence';
export * from './cabinetEngine';
export * from './newsEngine';
export * from './eventEngine';
export * from './economyEngine';
export * from './publicOpinionEngine';
export * from './electionEngine';

export interface EngineModule {
  name: string;
  version: string;
}

export const ENGINE_METADATA: EngineModule = {
  name: 'Pradhan Mantri Simulation Engine',
  version: '1.0.0',
};
