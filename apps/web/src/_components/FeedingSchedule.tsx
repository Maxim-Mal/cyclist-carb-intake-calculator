import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Feeding } from '@carb-calc/shared';

interface FeedingScheduleProps {
  feedings: Feeding[];
}

export function FeedingSchedule({ feedings }: FeedingScheduleProps) {
  if (feedings.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="mb-3 text-sm font-medium">Feeding schedule</h3>
      <div className="flex flex-col gap-1">
        {feedings.map((feeding, i) => (
          <div key={i}>
            {i > 0 && <Separator className="my-1" />}
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">{feeding.label}</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="tabular-nums">
                  {feeding.carbsG}g total
                </Badge>
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  F:{feeding.fructoseG}g · M:{feeding.maltodextrinG}g
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
