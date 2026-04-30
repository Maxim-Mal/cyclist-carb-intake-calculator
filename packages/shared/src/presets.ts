import type { Intensity, Preset, Ratio } from './types';

export const PRESETS: Record<Intensity, Preset> = {
  low: {
    key: 'low',
    label: 'Low (Z1–Z2)',
    carbsPerHour: 30,
    description: 'Easy / recovery rides',
  },
  moderate: {
    key: 'moderate',
    label: 'Moderate (Z3)',
    carbsPerHour: 60,
    description: 'Endurance pace',
  },
  high: {
    key: 'high',
    label: 'High (Z4)',
    carbsPerHour: 90,
    description: 'Threshold / hard rides',
  },
  race: {
    key: 'race',
    label: 'Race (Z5)',
    carbsPerHour: 120,
    description: 'Well-trained athletes only',
  },
};

export const DEFAULT_RATIO: Ratio = { fructose: 1, maltodextrin: 0.8 };

export const DEFAULT_INTENSITY: Intensity = 'moderate';
