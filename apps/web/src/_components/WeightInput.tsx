'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WeightInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function WeightInput({ value, onChange }: WeightInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="weight-input">
        Weight <span className="text-muted-foreground">(optional)</span>
      </Label>
      <div className="relative flex items-center">
        <Input
          id="weight-input"
          type="number"
          min={30}
          max={200}
          step={1}
          placeholder="75"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-28 pr-8"
          aria-label="Rider weight in kilograms"
        />
        <span className="pointer-events-none absolute right-3 text-sm text-muted-foreground">
          kg
        </span>
      </div>
    </div>
  );
}
