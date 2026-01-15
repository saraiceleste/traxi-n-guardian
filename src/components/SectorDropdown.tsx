import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SectorType = "carga" | "personas" | "logistica" | "otros";

interface SectorDropdownProps {
  value: SectorType;
  onValueChange: (value: SectorType) => void;
}

const sectors = [
  { value: "carga", label: "🚛 Movilidad de Carga (JIT Automotriz)" },
  { value: "personas", label: "🚌 Movilidad de Personas (Traxi escolar)" },
  { value: "logistica", label: "📦 Logística y Tecnología (Solistica/Medistik)" },
  { value: "otros", label: "📞 Otros (contactar comercial)" },
] as const;

export function SectorDropdown({ value, onValueChange }: SectorDropdownProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full bg-card border-2 border-primary/20 focus:border-primary text-sm font-medium">
        <SelectValue placeholder="Selecciona sector" />
      </SelectTrigger>
      <SelectContent className="bg-card z-50">
        {sectors.map((sector) => (
          <SelectItem key={sector.value} value={sector.value} className="cursor-pointer">
            {sector.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
