import { cn } from "@/lib/utils";
interface RiskClient {
  rank: number;
  name: string;
  score: number;
}
interface TopRisksTableProps {
  risks: RiskClient[];
}
function getStatusFromScore(score: number) {
  if (score < 0.5) return {
    emoji: "🚨",
    colorClass: "text-status-red"
  };
  if (score < 0.75) return {
    emoji: "👁️",
    colorClass: "text-status-yellow"
  };
  return {
    emoji: "🟢",
    colorClass: "text-status-green"
  };
}
export function TopRisksTable({
  risks
}: TopRisksTableProps) {
  return <div className="bg-card rounded-xl border border-border p-3 space-y-2">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">TOP 4 RIESGOS</h3>
      <div className="grid grid-cols-2 gap-2">
        {risks.slice(0, 4).map(risk => {
        const status = getStatusFromScore(risk.score);
        return <div key={risk.rank} className="flex items-center gap-1 text-xs p-2 rounded-lg bg-muted/50">
              <span className="font-bold text-muted-foreground">#{risk.rank}</span>
              <span>{status.emoji}</span>
              <span className="font-medium truncate flex-1">{risk.name}</span>
              <span className={cn("font-bold", status.colorClass)}>
                {risk.score.toFixed(2)}
              </span>
            </div>;
      })}
      </div>
    </div>;
}