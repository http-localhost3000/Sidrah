import type { ReactNode } from "react";
import { Boxes, Globe2, MessageCircle, Sparkles } from "lucide-react";

interface TrustItem {
  icon: ReactNode;
  title: string;
  description: string;
}

const items: TrustItem[] = [
  {
    icon: <Boxes className="h-5 w-5" aria-hidden="true" />,
    title: "Wholesale focused",
    description: "Built for retailers, boutiques and resellers, not end shoppers.",
  },
  {
    icon: <Sparkles className="h-5 w-5" aria-hidden="true" />,
    title: "Boys’ wear specialists",
    description: "A curated boyswear house across nine considered collections.",
  },
  {
    icon: <Globe2 className="h-5 w-5" aria-hidden="true" />,
    title: "Worldwide shipping",
    description: "International shipping available with destination-based charges.",
  },
  {
    icon: <MessageCircle className="h-5 w-5" aria-hidden="true" />,
    title: "Retailer support",
    description: "Direct WhatsApp enquiries with the Sidrah Fashion team.",
  },
];

export function WhySidrah() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
      {items.map((item) => (
        <div key={item.title} className="rule-t pt-6">
          <div className="inline-flex h-10 w-10 items-center justify-center border border-ink/20 text-ink">
            {item.icon}
          </div>
          <h3 className="mt-6 font-display text-h-lg text-ink">
            {item.title}
          </h3>
          <p className="mt-3 max-w-xs text-body text-ink/70">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
