import { Button } from "@/components/ui/button";
import { Search, CheckCircle, AlertTriangle } from "lucide-react";
import confetti from "canvas-confetti";

interface ActionButtonsProps {
  onSave: () => void;
  onSuccess: () => void;
  onRisk: () => void;
}

export function ActionButtons({ onSave, onSuccess, onRisk }: ActionButtonsProps) {
  const handleSuccess = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#22c55e", "#1e3a8a", "#f59e0b"],
    });
    onSuccess();
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={onSave}
        className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg animate-lift-hover"
      >
        <Search className="w-4 h-4 mr-1" />
        SALVAR
      </Button>
      <Button
        onClick={handleSuccess}
        variant="outline"
        className="flex-1 border-status-green text-status-green hover:bg-status-green hover:text-white font-bold animate-lift-hover"
      >
        <CheckCircle className="w-4 h-4 mr-1" />
        ÉXITO
      </Button>
      <Button
        onClick={onRisk}
        variant="outline"
        className="flex-1 border-status-red text-status-red hover:bg-status-red hover:text-white font-bold animate-lift-hover"
      >
        <AlertTriangle className="w-4 h-4 mr-1" />
        RIESGO
      </Button>
    </div>
  );
}
