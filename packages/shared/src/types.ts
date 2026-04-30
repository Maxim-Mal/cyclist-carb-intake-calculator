export type Intensity = 'low' | 'moderate' | 'high' | 'race';

export interface Ratio {
  fructose: number;
  maltodextrin: number;
}

export interface CalculationInput {
  durationMinutes: number;
  intensity: Intensity;
  weightKg?: number;
  carbsPerHourOverride?: number;
  ratio: Ratio;
}

export interface Feeding {
  label: string;
  carbsG: number;
  fructoseG: number;
  maltodextrinG: number;
}

export interface CalculationResult {
  durationMinutes: number;
  carbsPerHour: number;
  totalCarbsG: number;
  fructoseG: number;
  maltodextrinG: number;
  totalCalories: number;
  feedings: Feeding[];
}

export interface Preset {
  key: Intensity;
  label: string;
  carbsPerHour: number;
  description: string;
}
