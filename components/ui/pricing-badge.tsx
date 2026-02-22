import { memo } from "react";
import { Badge } from "@/components/ui/badge";

export const PricingBadge = memo(function PricingBadge({ pricing }: { pricing: string }) {
  return (
    <Badge
      variant="outline"
      className={`text-[10px] px-1.5 py-0 ${
        pricing === "Free"
          ? "text-green-400 border-green-400/30"
          : pricing === "Freemium"
          ? "text-cyan border-cyan/30"
          : "text-amber-400 border-amber-400/30"
      }`}
    >
      {pricing}
    </Badge>
  );
});
