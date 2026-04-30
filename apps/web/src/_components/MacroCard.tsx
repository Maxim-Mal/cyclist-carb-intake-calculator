import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MacroCardProps {
  label: string;
  value: string;
  unit: string;
  accent?: boolean;
}

export function MacroCard({ label, value, unit, accent = false }: MacroCardProps) {
  return (
    <Card size="sm" className={cn(accent && 'border-amber-400/60 bg-amber-50/60 dark:bg-amber-950/30')}>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground font-normal">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={cn('text-2xl font-semibold tabular-nums', accent && 'text-amber-700 dark:text-amber-400')}>
          {value}
          <span className="ml-1 text-base font-normal text-muted-foreground">{unit}</span>
        </p>
      </CardContent>
    </Card>
  );
}
