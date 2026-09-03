const items = [
  {
    title: "Worldwide shipping",
    description: "Destination-based shipping charges apply.",
  },
  {
    title: "Wholesale pricing",
    description:
      "Product pricing and set quantities available on enquiry.",
  },
  {
    title: "WhatsApp enquiries",
    description: "Quick product enquiries through WhatsApp.",
  },
];

export function WorldwideShippingStrip() {
  return (
    <div className="grid grid-cols-1 divide-y divide-rule border-y border-rule md:grid-cols-3 md:divide-x md:divide-y-0">
      {items.map((item) => (
        <div key={item.title} className="px-6 py-8 md:px-8 md:py-10">
          <p className="eyebrow text-ink/55">Wholesale</p>
          <h3 className="mt-3 font-display text-h-lg text-ink">
            {item.title}
          </h3>
          <p className="mt-2 max-w-xs text-body text-ink/70">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
