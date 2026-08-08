export * from './decisionEngine';
export * from './timeUtils';
export * from './persistence';

export interface EngineModule {
  name: string;
  version: string;
}

export const ENGINE_METADATA: EngineModule = {
  name: 'Pradhan Mantri Simulation Engine',
  version: '0.5.0',
};
