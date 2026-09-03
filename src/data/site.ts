export const announcement = {
  message: "Wholesale boys' wear · Worldwide shipping",
} as const;

export const site = {
  name: "Sidrah Fashion",
  tagline: "Premium boyswear wholesale",
  address: {
    line1: "188 Zakaria Masjid Street",
    line2: "Below Hashemiah School",
    city: "Mumbai",
    postalCode: "400009",
    country: "India",
  },
  whatsapp: "+91 97141 14160",
  phone: "+91 97141 14160",
  email: "sidrahfashion07@gmail.com",
  instagram: {
    handle: "sidrah_fashion_wholesale",
    url: "https://www.instagram.com/sidrah_fashion_wholesale/",
  },
} as const;

export const primaryNav = [
  { label: "Shop", href: "/shop" },
  { label: "Brands", href: "/brands" },
  { label: "Shop by Age", href: "/ages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  shop: [
    { label: "Shop All", href: "/shop" },
    { label: "New Arrivals", href: "/shop?new=1" },
    { label: "Shop by Age", href: "/ages" },
    { label: "Brands", href: "/brands" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Become a Retailer", href: "/retailer" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Shipping", href: "/shipping" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Shipping Policy", href: "/shipping" },
  ],
} as const;
