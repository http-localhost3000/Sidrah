import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";
import { site } from "@/data/site";

const tiles: Array<"cream" | "sage" | "ivory" | "warm"> = [
  "cream",
  "sage",
  "warm",
  "ivory",
  "cream",
  "sage",
];

export function InstagramSection() {
  return (
    <Container className="py-section">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-editorial">
          <p className="eyebrow text-ink/55">Instagram</p>
          <h2 className="mt-4 font-display text-display-md md:text-display-lg">
            @{site.instagram.handle}
          </h2>
          <p className="mt-5 max-w-prose text-body text-ink/70">
            Editorial imagery, new drops and behind-the-scenes from the Sidrah
            Fashion team in Mumbai.
          </p>
        </div>
        <Link
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow inline-flex items-center gap-2 self-start rounded-sm border border-ink px-5 py-3 text-ink transition-colors hover:bg-ink hover:text-page md:self-end"
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
          Follow us on Instagram
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {tiles.map((tone, i) => (
          <li key={i}>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open @${site.instagram.handle} on Instagram`}
              className="group block overflow-hidden bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            >
              <div className="overflow-hidden">
                <div className="transition-transform duration-500 ease-editorial group-hover:scale-[1.03]">
                  <PlaceholderVisual
                    aspect="square"
                    tone={tone}
                    showMark={true}
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
