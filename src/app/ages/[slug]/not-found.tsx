import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";

export default function AgeNotFound() {
  return (
    <section className="bg-page py-section">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-6 border border-rule bg-surface p-10 sm:p-14">
          <p className="eyebrow text-ink/55">404 · Not found</p>
          <h1 className="font-display text-display-md md:text-display-lg">
            Age range not found.
          </h1>
          <p className="max-w-prose text-body text-ink/70">
            The age range you&rsquo;re looking for isn&rsquo;t available.
            Browse all age ranges or return to the shop.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <LinkButton href="/ages" variant="ink" size="lg">
              View all ages
            </LinkButton>
            <Link
              href="/shop"
              className="eyebrow text-ink underline-offset-4 hover:underline"
            >
              Browse the shop
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
