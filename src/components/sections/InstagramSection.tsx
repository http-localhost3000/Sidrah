import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { site } from "@/data/site";

const instagramPosts = [
  {
    url: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=95&w=1200&auto=format&fit=crop",
    alt: "Boyswear Oxford Shirt Editorial",
  },
  {
    url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=95&w=1200&auto=format&fit=crop",
    alt: "Boyswear Editorial Styling",
  },
  {
    url: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=95&w=1200&auto=format&fit=crop",
    alt: "Denim & Casual Boyswear",
  },
  {
    url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=95&w=1200&auto=format&fit=crop",
    alt: "Kids Clothing Outfit Layout",
  },
  {
    url: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=95&w=1200&auto=format&fit=crop",
    alt: "Minimalist Kids Apparel Display",
  },
  {
    url: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=95&w=1200&auto=format&fit=crop",
    alt: "Sidrah Fashion Studio",
  },
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
        {instagramPosts.map((post, i) => (
          <li key={i}>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open @${site.instagram.handle} on Instagram`}
              className="group block overflow-hidden bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            >
              <div className="relative aspect-square overflow-hidden bg-surface">
                <Image
                  src={post.url}
                  alt={post.alt}
                  fill
                  unoptimized
                  className="object-cover object-center transition-transform duration-500 ease-editorial group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}

