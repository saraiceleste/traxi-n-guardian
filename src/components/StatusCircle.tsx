import { cn } from "@/lib/utils";

type StatusType = "green" | "yellow" | "red";

interface StatusCircleProps {
  status: StatusType;
  size?: number;
  className?: string;
}

const statusConfig = {
  green: {
    emoji: "👁️",
    bgClass: "bg-status-green",
    label: "Cliente Estable",
  },
  yellow: {
    emoji: "👁️",
    bgClass: "bg-status-yellow",
    label: "Atención Requerida",
  },
  red: {
    emoji: "🚨",
    bgClass: "bg-status-red animate-pulse-status",
    label: "Riesgo Crítico",
  },
};

export function StatusCircle({ status, size = 150, className }: StatusCircleProps) {
  const config = statusConfig[status];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
          config.bgClass
        )}
        style={{ width: size, height: size }}
      >
        <span style={{ fontSize: size * 0.4 }}>{config.emoji}</span>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{config.label}</span>
    </div>
  );
}
