"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { supabase } from "@/lib/supabase";

const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const WHATSAPP_URL =
  "https://wa.me/919714114160?text=Hello%20Sidrah%20Fashion%2C%0A%0AI%20am%20interested%20in%20becoming%20a%20retailer.%20Please%20share%20your%20wholesale%20terms%2C%20catalogue%20and%20minimum%20order%20requirements.";

const INTEREST_OPTIONS = [
  "Boys' Shirts",
  "T-Shirts",
  "Denim",
  "Track Pants",
  "Shorts",
  "Cord Sets",
  "Cargo Pants",
  "Linen Pants",
  "Full Catalogue",
];

type Status = "idle" | "loading" | "success" | "error";

export function RetailerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  function toggle(opt: string) {
    setInterests((prev) =>
      prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      full_name: data.get("fullName") as string,
      business_name: data.get("businessName") as string,
      email: data.get("email") as string,
      whatsapp: data.get("whatsapp") as string || null,
      city: data.get("city") as string || null,
      country: data.get("country") as string || null,
      business_type: data.get("businessType") as string || null,
      number_of_stores: data.get("numberOfStores") as string || null,
      website_instagram: data.get("websiteInstagram") as string || null,
      interests,
      message: data.get("message") as string || null,
    };

    try {
      // Save to Supabase
      await supabase.from("retailer_applications").insert(payload);

      // Send email via Web3Forms if configured
      if (KEY) {
        data.set("access_key", KEY);
        data.set("interests", interests.join(", "));
        data.set("subject", `New Retailer Application: ${payload.business_name} — Sidrah Fashion`);
        await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      }

      setStatus("success");
      form.reset();
      setInterests([]);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or contact us on WhatsApp.");
    }
  }

  const inputClass =
    "block w-full rounded-sm border border-ink/35 bg-page px-4 py-3 text-body text-ink placeholder:text-ink/45 hover:border-ink/60 focus:border-ink focus:outline-none transition-colors";
  const labelClass =
    "block text-[0.72rem] font-medium uppercase tracking-wide text-ink/60 mb-2";

  if (status === "success") {
    return (
      <div className="rounded-sm border border-rule bg-surface px-8 py-12">
        <p className="font-display text-h-xl text-ink">Application received.</p>
        <p className="mt-3 max-w-prose text-body text-ink/70">
          Thank you — we&rsquo;ll review your application and be in touch via
          email or WhatsApp shortly.
        </p>
        <div className="mt-8">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-3 rounded-sm border border-ink bg-ink px-8 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-page transition-colors hover:bg-ink/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Also contact on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="rf-name" className={labelClass}>
            Full Name <span aria-hidden="true" className="text-accent-warm">*</span>
          </label>
          <input
            id="rf-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="rf-business" className={labelClass}>
            Business Name <span aria-hidden="true" className="text-accent-warm">*</span>
          </label>
          <input
            id="rf-business"
            name="businessName"
            type="text"
            required
            autoComplete="organization"
            placeholder="Your store or company name"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="rf-email" className={labelClass}>
            Email <span aria-hidden="true" className="text-accent-warm">*</span>
          </label>
          <input
            id="rf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="rf-whatsapp" className={labelClass}>
            WhatsApp Number <span aria-hidden="true" className="text-accent-warm">*</span>
          </label>
          <input
            id="rf-whatsapp"
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="rf-city" className={labelClass}>
            City <span aria-hidden="true" className="text-accent-warm">*</span>
          </label>
          <input
            id="rf-city"
            name="city"
            type="text"
            required
            autoComplete="address-level2"
            placeholder="Mumbai"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="rf-country" className={labelClass}>
            Country <span aria-hidden="true" className="text-accent-warm">*</span>
          </label>
          <input
            id="rf-country"
            name="country"
            type="text"
            required
            autoComplete="country-name"
            placeholder="India"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="rf-type" className={labelClass}>
            Type of Business
          </label>
          <select
            id="rf-type"
            name="businessType"
            className={`${inputClass} appearance-none`}
          >
            <option value="">Select type…</option>
            <option>Boutique</option>
            <option>Multi-brand store</option>
            <option>Online retailer</option>
            <option>Supermarket / Department store</option>
            <option>Export / Wholesale distributor</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="rf-stores" className={labelClass}>
            Number of Stores / Locations
          </label>
          <input
            id="rf-stores"
            name="numberOfStores"
            type="text"
            placeholder="e.g. 1"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="rf-social" className={labelClass}>
          Website or Instagram
        </label>
        <input
          id="rf-social"
          name="websiteInstagram"
          type="text"
          autoComplete="url"
          placeholder="https:// or @handle"
          className={inputClass}
        />
      </div>

      <div>
        <p className={labelClass}>What are you interested in?</p>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              aria-pressed={interests.includes(opt)}
              className={`inline-flex h-9 items-center rounded-sm border px-4 text-[0.7rem] font-medium uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                interests.includes(opt)
                  ? "border-ink bg-ink text-page"
                  : "border-ink/40 bg-card text-ink hover:border-ink"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="rf-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="rf-message"
          name="message"
          rows={4}
          placeholder="Tell us more about your business and what you're looking for…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-body text-red-600">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 items-center justify-center rounded-sm border border-ink bg-ink px-8 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-page transition-colors hover:bg-ink/85 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {status === "loading" ? "Sending…" : "Submit Application"}
        </button>
        <span className="hidden text-caption text-ink/40 sm:block">or</span>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-body text-ink transition-colors hover:text-ink/70"
        >
          <WhatsAppIcon className="h-4 w-4 text-green-600" />
          <span>Get in touch on WhatsApp</span>
        </a>
      </div>
    </form>
  );
}
