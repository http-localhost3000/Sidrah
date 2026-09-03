import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import type { Crumb } from "@/components/navigation/Breadcrumbs";

interface CatalogHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  aside?: ReactNode;
}

export function CatalogHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  aside,
}: CatalogHeaderProps) {
  return (
    <section className="bg-page pb-block pt-10 lg:pt-14">
      <Container>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <p className="eyebrow text-ink/60">{eyebrow}</p>
            <h1 className="mt-6 max-w-editorial font-display text-display-md md:text-display-lg">
              {title}
            </h1>
            {description && (
              <p className="mt-6 max-w-prose text-body-lg text-ink/75">
                {description}
              </p>
            )}
          </div>
          {aside && (
            <div className="lg:col-span-4 lg:flex lg:items-end lg:justify-end">
              {aside}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
