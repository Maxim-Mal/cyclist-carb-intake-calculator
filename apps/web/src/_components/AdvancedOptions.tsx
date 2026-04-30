'use client';

import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { Ratio } from '@carb-calc/shared';

interface AdvancedOptionsProps {
  ratio: Ratio;
  carbsPerHourOverride: string;
  onRatioChange: (ratio: Ratio) => void;
  onCarbsOverrideChange: (value: string) => void;
}

export function AdvancedOptions({
  ratio,
  carbsPerHourOverride,
  onRatioChange,
  onCarbsOverrideChange,
}: AdvancedOptionsProps) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="group/trigger flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronRight className={cn('size-4 transition-transform duration-200', 'group-data-[open]/trigger:rotate-90')} />
        Advanced options
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[open]:animate-in data-[open]:fade-in-0 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:duration-200">
        <div className="mt-3 flex flex-col gap-4 rounded-lg border border-border bg-muted/30 px-4 py-3">
          <div className="flex flex-col gap-1.5">
            <Label>Fructose : Maltodextrin ratio</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0.1}
                max={10}
                step={0.1}
                value={ratio.fructose}
                onChange={(e) =>
                  onRatioChange({ ...ratio, fructose: Number(e.target.value) || 1 })
                }
                className="w-20"
                aria-label="Fructose ratio part"
              />
              <span className="text-sm text-muted-foreground">:</span>
              <Input
                type="number"
                min={0.1}
                max={10}
                step={0.1}
                value={ratio.maltodextrin}
                onChange={(e) =>
                  onRatioChange({ ...ratio, maltodextrin: Number(e.target.value) || 0.8 })
                }
                className="w-20"
                aria-label="Maltodextrin ratio part"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Science-backed default is 1:0.8 — maximises gut absorption via dual transporters.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="carbs-override">
              Carbs/h override <span className="text-muted-foreground">(optional)</span>
            </Label>
            <div className="relative flex items-center">
              <Input
                id="carbs-override"
                type="number"
                min={10}
                max={200}
                step={5}
                placeholder="auto"
                value={carbsPerHourOverride}
                onChange={(e) => onCarbsOverrideChange(e.target.value)}
                className="w-28 pr-12"
              />
              <span className="pointer-events-none absolute right-3 text-sm text-muted-foreground">
                g/h
              </span>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
