import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <section className="bg-page py-section">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-6 border border-rule bg-surface p-10 sm:p-14">
          <p className="eyebrow text-ink/55">404 · Not found</p>
          <h1 className="font-display text-display-md md:text-display-lg">
            Product not found.
          </h1>
          <p className="max-w-prose text-body text-ink/70">
            The product you&rsquo;re looking for isn&rsquo;t available at this
            link. It may have moved, been renamed or is temporarily out of the
            catalogue. Browse the full wholesale collection, or get in touch
            and we&rsquo;ll help you find what you need.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <LinkButton href="/shop" variant="ink" size="lg">
              Back to Shop
            </LinkButton>
            <Link
              href="/contact"
              className="eyebrow text-ink underline-offset-4 hover:underline"
            >
              Contact the team
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
