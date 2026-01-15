import { useState, useMemo } from "react";
import { StatusCircle } from "@/components/StatusCircle";
import { SectorDropdown, type SectorType } from "@/components/SectorDropdown";
import { KPIInputs, type KPIValues } from "@/components/KPIInputs";
import { ActionButtons } from "@/components/ActionButtons";
import { ActionChecklist } from "@/components/ActionChecklist";
import { TopRisksTable } from "@/components/TopRisksTable";
import { PostSaleOffer } from "@/components/PostSaleOffer";
import { Mail, Phone } from "lucide-react";
const mockRisks = [{
  rank: 1,
  name: "AutoXYZ",
  score: 0.45
}, {
  rank: 2,
  name: "HospABC",
  score: 0.68
}, {
  rank: 3,
  name: "RetailDEF",
  score: 0.72
}, {
  rank: 4,
  name: "LogiGHI",
  score: 0.85
}];
const mockTrends = {
  puntualidad: -5,
  servicio: 2,
  nps: -8,
  quejas: 2
};
type StatusType = "green" | "yellow" | "red";
function calculateStatus(kpis: KPIValues): StatusType {
  const {
    puntualidad,
    servicio,
    nps,
    quejas
  } = kpis;

  // Red: Critical conditions
  if (puntualidad < 85 || nps < 50 || quejas >= 3) {
    return "red";
  }

  // Yellow: Warning conditions
  if (puntualidad < 92 || servicio < 85 || nps < 70 || quejas >= 1) {
    return "yellow";
  }

  // Green: All good
  return "green";
}
export default function Index() {
  const [clientName] = useState("CLIENTE XYZ");
  const [sector, setSector] = useState<SectorType>("carga");
  const [kpis, setKpis] = useState<KPIValues>({
    puntualidad: 92,
    servicio: 88,
    nps: 72,
    quejas: 1
  });
  const status = useMemo(() => calculateStatus(kpis), [kpis]);
  const handleSave = () => {
    console.log("Saving client analysis...", {
      sector,
      kpis,
      status
    });
  };
  const handleSuccess = () => {
    setKpis({
      puntualidad: 98,
      servicio: 95,
      nps: 90,
      quejas: 0
    });
  };
  const handleRisk = () => {
    setKpis({
      puntualidad: 82,
      servicio: 78,
      nps: 42,
      quejas: 3
    });
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-3 px-4 shadow-lg">
        <div className="max-w-[400px] mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-tight">TRAXIÓN</h1>
          <span className="text-xs opacity-80">Anti-Churn Dashboard</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[400px] mx-auto px-4 py-6 space-y-5">
        {/* Status Circle & Client Name */}
        <div className="text-center space-y-3 animate-fade-slide-in">
          <StatusCircle status={status} size={150} />
          
        </div>

        {/* Top Risks Table */}
        <div className="animate-fade-slide-in" style={{
        animationDelay: "50ms"
      }}>
          <TopRisksTable risks={mockRisks} />
        </div>

        {/* Sector Dropdown */}
        <div className="animate-fade-slide-in" style={{
        animationDelay: "100ms"
      }}>
          <SectorDropdown value={sector} onValueChange={setSector} />
        </div>

        {/* KPI Inputs */}
        <div className="animate-fade-slide-in" style={{
        animationDelay: "150ms"
      }}>
          <KPIInputs values={kpis} trends={mockTrends} onChange={setKpis} />
        </div>

        {/* Action Buttons */}
        <div className="animate-fade-slide-in" style={{
        animationDelay: "200ms"
      }}>
          <ActionButtons onSave={handleSave} onSuccess={handleSuccess} onRisk={handleRisk} />
        </div>

        {/* Action Checklist */}
        <div className="animate-fade-slide-in" style={{
        animationDelay: "250ms"
      }}>
          <ActionChecklist sector={sector} />
        </div>

        {/* Post-Sale Offer */}
        <div className="animate-fade-slide-in" style={{
        animationDelay: "300ms"
      }}>
          <PostSaleOffer status={status} />
        </div>

        {/* Contact Footer */}
        <footer className="text-center pt-4 pb-8 border-t border-border animate-fade-slide-in" style={{
        animationDelay: "350ms"
      }}>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <a href="mailto:comercialmkt@traxion.global" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              comercialmkt@traxion.global
            </a>
          </div>
          <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
            <Phone className="w-3 h-3" />
            <span>+52(55)98611889</span>
          </div>
        </footer>
      </main>
    </div>;
}