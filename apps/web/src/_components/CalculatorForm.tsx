'use client';

import { useState } from 'react';
import { calculate, DEFAULT_INTENSITY, DEFAULT_RATIO } from '@carb-calc/shared';
import type { CalculationInput, CalculationResult } from '@carb-calc/shared';
import { Button } from '@/components/ui/button';
import { DurationInput } from './DurationInput';
import { IntensityButtons } from './IntensityButtons';
import { WeightInput } from './WeightInput';
import { AdvancedOptions } from './AdvancedOptions';
import { ResultsPanel } from './ResultsPanel';

const DEFAULT_INPUT: CalculationInput = {
  durationMinutes: 120,
  intensity: DEFAULT_INTENSITY,
  ratio: DEFAULT_RATIO,
};

export function CalculatorForm() {
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(0);
  const [intensity, setIntensity] = useState(DEFAULT_INPUT.intensity);
  const [weightStr, setWeightStr] = useState('');
  const [ratio, setRatio] = useState(DEFAULT_RATIO);
  const [carbsOverride, setCarbsOverride] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  function handleCalculate() {
    const durationMinutes = hours * 60 + minutes;
    if (durationMinutes <= 0) return;

    const input: CalculationInput = {
      durationMinutes,
      intensity,
      weightKg: weightStr ? Number(weightStr) : undefined,
      carbsPerHourOverride: carbsOverride ? Number(carbsOverride) : undefined,
      ratio,
    };
    setResult(calculate(input));
  }

  const durationMinutes = hours * 60 + minutes;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Cycling Carb Calculator</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Optimal fructose + maltodextrin mix for your ride
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <section aria-label="Calculator inputs">
          <div className="flex flex-col gap-5">
            <DurationInput
              hours={hours}
              minutes={minutes}
              onHoursChange={setHours}
              onMinutesChange={setMinutes}
            />

            <IntensityButtons value={intensity} onChange={setIntensity} />

            <WeightInput value={weightStr} onChange={setWeightStr} />

            <AdvancedOptions
              ratio={ratio}
              carbsPerHourOverride={carbsOverride}
              onRatioChange={setRatio}
              onCarbsOverrideChange={setCarbsOverride}
            />

            <Button
              onClick={handleCalculate}
              disabled={durationMinutes <= 0}
              size="lg"
              className="mt-1 w-full sm:w-auto"
            >
              Calculate
            </Button>
          </div>
        </section>

        <section aria-label="Results" aria-live="polite">
          {result ? (
            <ResultsPanel result={result} />
          ) : (
            <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground md:min-h-[300px]">
              Results will appear here
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
