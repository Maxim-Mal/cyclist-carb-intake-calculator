'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PRESETS } from '@carb-calc/shared';
import type { Intensity } from '@carb-calc/shared';

interface IntensityButtonsProps {
  value: Intensity;
  onChange: (value: Intensity) => void;
}

const INTENSITIES: Intensity[] = ['low', 'moderate', 'high', 'race'];

export function IntensityButtons({ value, onChange }: IntensityButtonsProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>Intensity</Label>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Ride intensity">
        {INTENSITIES.map((key) => {
          const preset = PRESETS[key];
          return (
            <Button
              key={key}
              variant={value === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => onChange(key)}
              type="button"
              title={`${preset.description} · ${preset.carbsPerHour} g/h`}
            >
              {preset.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
