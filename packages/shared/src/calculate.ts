import { DEFAULT_RATIO, PRESETS } from './presets';
import type { CalculationInput, CalculationResult, Feeding, Ratio } from './types';

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

function splitGrams(totalG: number, ratio: Ratio): { fructoseG: number; maltodextrinG: number } {
  const totalParts = ratio.fructose + ratio.maltodextrin;
  const fructoseG = round((totalG * ratio.fructose) / totalParts);
  const maltodextrinG = round(totalG - fructoseG);
  return { fructoseG, maltodextrinG };
}

function buildFeedings(
  carbsPerHour: number,
  durationMinutes: number,
  ratio: Ratio,
): Feeding[] {
  const feedings: Feeding[] = [];
  let remaining = durationMinutes;
  let cursor = 0;

  while (remaining > 0) {
    const segmentMinutes = Math.min(remaining, 60);
    const carbsG = round(carbsPerHour * (segmentMinutes / 60));
    const { fructoseG, maltodextrinG } = splitGrams(carbsG, ratio);

    const startH = Math.floor(cursor / 60);
    const endMin = cursor + segmentMinutes;

    feedings.push({
      label:
        segmentMinutes === 60
          ? `Hour ${feedings.length + 1} (${startH}:00–${startH + 1}:00)`
          : `Remaining ${segmentMinutes} min`,
      carbsG,
      fructoseG,
      maltodextrinG,
    });

    cursor += segmentMinutes;
    remaining -= segmentMinutes;
  }

  return feedings;
}

export function calculate(input: CalculationInput): CalculationResult {
  const ratio = input.ratio ?? DEFAULT_RATIO;
  const carbsPerHour =
    input.carbsPerHourOverride != null && input.carbsPerHourOverride > 0
      ? input.carbsPerHourOverride
      : PRESETS[input.intensity].carbsPerHour;

  const durationHours = input.durationMinutes / 60;
  const totalCarbs = carbsPerHour * durationHours;

  const { fructoseG, maltodextrinG } = splitGrams(totalCarbs, ratio);

  return {
    durationMinutes: input.durationMinutes,
    carbsPerHour,
    totalCarbsG: round(totalCarbs),
    fructoseG,
    maltodextrinG,
    totalCalories: round(totalCarbs * 4),
    feedings: buildFeedings(carbsPerHour, input.durationMinutes, ratio),
  };
}
