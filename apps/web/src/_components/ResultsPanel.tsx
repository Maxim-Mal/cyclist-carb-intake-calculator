import type { CalculationResult } from '@carb-calc/shared';
import { MacroCard } from './MacroCard';
import { FeedingSchedule } from './FeedingSchedule';

interface ResultsPanelProps {
  result: CalculationResult;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-base font-medium">Results</h2>
        <p className="text-xs text-muted-foreground">
          {result.carbsPerHour} g/h · {result.durationMinutes} min
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MacroCard label="Total carbs" value={String(result.totalCarbsG)} unit="g" accent />
        <MacroCard label="Calories" value={String(result.totalCalories)} unit="kcal" />
        <MacroCard label="Fructose" value={String(result.fructoseG)} unit="g" />
        <MacroCard label="Maltodextrin" value={String(result.maltodextrinG)} unit="g" />
      </div>

      <FeedingSchedule feedings={result.feedings} />
    </div>
  );
}
