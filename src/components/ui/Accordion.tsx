"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  id?: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number | null;
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  defaultOpen = null,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(
    defaultOpen === null ? new Set() : new Set([defaultOpen]),
  );
  const baseId = useId();

  const toggle = (idx: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        if (!allowMultiple) next.clear();
        next.add(idx);
      }
      return next;
    });
  };

  return (
    <div className={cn("border-t border-rule", className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const headerId = `${baseId}-${i}-header`;
        const panelId = `${baseId}-${i}-panel`;

        return (
          <div key={item.id ?? i} className="border-b border-rule">
            <h3>
              <button
                id={headerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-ink/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                <span className="font-display text-h-lg">{item.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-ink/60 transition-transform duration-300 ease-editorial",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className="pb-6 pr-8 text-body text-ink/75"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
