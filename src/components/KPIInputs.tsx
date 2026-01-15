import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KPIValues {
  puntualidad: number;
  servicio: number;
  nps: number;
  quejas: number;
}

interface KPITrend {
  puntualidad: number;
  servicio: number;
  nps: number;
  quejas: number;
}

interface KPIInputsProps {
  values: KPIValues;
  trends: KPITrend;
  onChange: (values: KPIValues) => void;
}

const kpiConfig = [
  { key: "puntualidad" as const, label: "Puntualidad %", suffix: "%", maxVal: 100 },
  { key: "servicio" as const, label: "Servicio %", suffix: "%", maxVal: 100 },
  { key: "nps" as const, label: "NPS", suffix: "", maxVal: 100 },
  { key: "quejas" as const, label: "Quejas", suffix: "", maxVal: 99, inverse: true },
];

function TrendIndicator({ value, inverse = false }: { value: number; inverse?: boolean }) {
  const isPositive = inverse ? value < 0 : value > 0;
  const isNegative = inverse ? value > 0 : value < 0;

  if (value === 0) {
    return <Minus className="w-3 h-3 text-muted-foreground" />;
  }

  return (
    <span
      className={cn(
        "flex items-center gap-0.5 text-xs font-bold animate-trend",
        isPositive && "text-status-green",
        isNegative && "text-status-red"
      )}
    >
      {isPositive ? (
        <TrendingUp className="w-3 h-3" />
      ) : (
        <TrendingDown className="w-3 h-3" />
      )}
      {inverse ? (value > 0 ? "+" : "") : (value > 0 ? "+" : "")}
      {value}
    </span>
  );
}

export function KPIInputs({ values, trends, onChange }: KPIInputsProps) {
  const handleChange = (key: keyof KPIValues, val: string) => {
    const numVal = Math.max(0, Math.min(parseInt(val) || 0, kpiConfig.find(k => k.key === key)?.maxVal || 100));
    onChange({ ...values, [key]: numVal });
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {kpiConfig.map((kpi) => (
        <div key={kpi.key} className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-muted-foreground">
              {kpi.label}
            </Label>
            <TrendIndicator value={trends[kpi.key]} inverse={kpi.inverse} />
          </div>
          <div className="relative">
            <Input
              type="number"
              value={values[kpi.key]}
              onChange={(e) => handleChange(kpi.key, e.target.value)}
              className="pr-6 text-lg font-bold text-center bg-card border-2 border-border focus:border-primary"
              min={0}
              max={kpi.maxVal}
            />
            {kpi.suffix && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                {kpi.suffix}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
