import { cn } from "@/lib/utils";

type StatusType = "green" | "yellow" | "red";

interface PostSaleOfferProps {
  status: StatusType;
}

const offers = {
  green: {
    emoji: "💚",
    title: "FIDELIZACIÓN VERDE",
    offer: "E-book JIT gratis",
    bgClass: "bg-status-green/10 border-status-green/30",
    textClass: "text-status-green",
  },
  yellow: {
    emoji: "⚠️",
    title: "ATENCIÓN",
    offer: "Llamada de seguimiento programada",
    bgClass: "bg-status-yellow/10 border-status-yellow/30",
    textClass: "text-status-yellow",
  },
  red: {
    emoji: "🎁",
    title: "POSVENTA CRÍTICA",
    offer: "+1 cruce GRATIS",
    bgClass: "bg-status-red/10 border-status-red/30",
    textClass: "text-status-red",
  },
};

export function PostSaleOffer({ status }: PostSaleOfferProps) {
  const offer = offers[status];

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-4 text-center transition-all duration-300",
        offer.bgClass
      )}
    >
      <span className="text-2xl">{offer.emoji}</span>
      <p className={cn("text-xs font-bold uppercase tracking-wide mt-1", offer.textClass)}>
        {offer.title}
      </p>
      <p className="text-sm font-semibold text-foreground mt-1">{offer.offer}</p>
    </div>
  );
}
