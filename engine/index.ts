export * from './decisionEngine';
export * from './timeUtils';
export * from './persistence';
export * from './cabinetEngine';
export * from './newsEngine';
export * from './eventEngine';
export * from './economyEngine';

export interface EngineModule {
  name: string;
  version: string;
}

export const ENGINE_METADATA: EngineModule = {
  name: 'Pradhan Mantri Simulation Engine',
  version: '0.9.0',
};
