import { buildEnquiryUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "./WhatsAppIcon";
import type { Product } from "@/types/product";

interface WhatsAppButtonProps {
  product?: Pick<Product, "name" | "brand" | "sku">;
  className?: string;
  label?: string;
  size?: "md" | "lg";
}

// Inline pill-style WhatsApp CTA. For the floating mobile action, see
// StickyWhatsApp.
export function WhatsAppButton({
  product,
  className,
  label = "Enquire on WhatsApp",
  size = "md",
}: WhatsAppButtonProps) {
  const href = buildEnquiryUrl(product);
  const sizing =
    size === "lg" ? "h-12 px-8 text-[0.78rem]" : "h-11 px-6 text-[0.72rem]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2.5 border border-ink bg-ink text-page font-sans font-medium uppercase tracking-[0.14em] leading-none transition-colors duration-150 ease-editorial hover:bg-[#3a3934] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-sm",
        sizing,
        className,
      )}
    >
      <WhatsAppIcon className="h-4 w-4" />
      <span>{label}</span>
    </a>
  );
}
