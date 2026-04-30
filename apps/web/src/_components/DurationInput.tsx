'use client';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const HOURS = Array.from({ length: 13 }, (_, i) => i);
const MINUTES = [0, 15, 30, 45];

interface DurationInputProps {
  hours: number;
  minutes: number;
  onHoursChange: (h: number) => void;
  onMinutesChange: (m: number) => void;
}

const selectClass = cn(
  'h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm',
  'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring',
  'disabled:cursor-not-allowed disabled:opacity-50',
);

export function DurationInput({ hours, minutes, onHoursChange, onMinutesChange }: DurationInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>Duration</Label>
      <div className="flex items-center gap-2">
        <select
          value={hours}
          onChange={(e) => onHoursChange(Number(e.target.value))}
          className={selectClass}
          aria-label="Hours"
        >
          {HOURS.map((h) => (
            <option key={h} value={h}>
              {h}h
            </option>
          ))}
        </select>
        <select
          value={minutes}
          onChange={(e) => onMinutesChange(Number(e.target.value))}
          className={selectClass}
          aria-label="Minutes"
        >
          {MINUTES.map((m) => (
            <option key={m} value={m}>
              {m}m
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
