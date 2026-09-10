"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { supabase } from "@/lib/supabase";

const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      full_name: data.get("fullName") as string,
      business_name: data.get("businessName") as string || null,
      email: data.get("email") as string,
      whatsapp: data.get("whatsapp") as string || null,
      city: data.get("city") as string || null,
      subject: data.get("subject") as string,
      message: data.get("message") as string,
    };

    try {
      // Save to Supabase
      await supabase.from("contact_submissions").insert(payload);

      // Send email via Web3Forms if configured
      if (KEY) {
        data.set("access_key", KEY);
        data.set("subject", `Contact: ${payload.subject} — Sidrah Fashion`);
        await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or reach us on WhatsApp.");
    }
  }

  // Editorial underline fields: a quiet hairline that sits under each field,
  // over which an ink line draws itself on focus.
  const inputClass =
    "block w-full rounded-none border-0 border-b border-ink/25 bg-transparent px-0 py-2.5 " +
    "text-body text-ink placeholder:text-ink/40 " +
    "bg-[linear-gradient(#24231f,#24231f)] bg-no-repeat bg-[position:0_100%] " +
    "[background-size:0%_1px] focus:[background-size:100%_1px] " +
    "transition-[background-size,border-color] duration-300 ease-editorial " +
    "hover:border-ink/50 focus:border-ink/25 focus:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card";
  const labelClass =
    "block text-[0.66rem] font-medium uppercase tracking-[0.18em] text-ink/55";

  if (status === "success") {
    return (
      <div className="border border-ink/10 bg-card px-8 py-14 text-center shadow-1">
        <span
          aria-hidden="true"
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/60 bg-accent/15 text-ink"
        >
          <Check className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <p className="mt-6 font-display text-h-xl text-ink">Message sent.</p>
        <p className="mt-3 text-body text-ink/70">
          Thank you — we&rsquo;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative border border-ink/10 bg-card p-6 shadow-1 sm:p-10"
    >
      <div className="rule-b pb-8">
        <p className="eyebrow flex items-center gap-2.5 text-ink/55">
          <span aria-hidden="true" className="h-px w-4 bg-tan" />
          Wholesale enquiry
        </p>
        <h2 className="mt-4 font-display text-[2rem] leading-tight text-ink md:text-display-md">
          Send a message<span className="italic">.</span>
        </h2>
        <p className="mt-4 text-body text-ink/60">
          Fields marked <span className="text-accent-warm">*</span> are
          required. We aim to reply within one business day.
        </p>
      </div>

      <div className="mt-9 grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Full Name <span aria-hidden="true" className="text-accent-warm">*</span>
          </label>
          <input
            id="cf-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={`mt-3 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="cf-business" className={labelClass}>
            Business / Store Name
          </label>
          <input
            id="cf-business"
            name="businessName"
            type="text"
            autoComplete="organization"
            placeholder="Your store or business"
            className={`mt-3 ${inputClass}`}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email <span aria-hidden="true" className="text-accent-warm">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={`mt-3 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="cf-whatsapp" className={labelClass}>
            WhatsApp Number
          </label>
          <input
            id="cf-whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={`mt-3 ${inputClass}`}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-city" className={labelClass}>
            City / Country
          </label>
          <input
            id="cf-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder="Mumbai, India"
            className={`mt-3 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="cf-subject" className={labelClass}>
            Subject <span aria-hidden="true" className="text-accent-warm">*</span>
          </label>
          <input
            id="cf-subject"
            name="subject"
            type="text"
            required
            placeholder="Wholesale enquiry"
            className={`mt-3 ${inputClass}`}
          />
        </div>
      </div>

      <div className="mt-8">
        <label htmlFor="cf-message" className={labelClass}>
          Message <span aria-hidden="true" className="text-accent-warm">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your business and what you're looking for…"
          className={`mt-3 resize-none ${inputClass}`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 text-body text-red-700">
          {error}
        </p>
      )}

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-sm border border-ink bg-ink px-8 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-page transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(36,35,31,0.45)] disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />
          {status === "loading" ? "Sending…" : "Send Message"}
        </button>
        <span aria-hidden="true" className="hidden text-caption text-ink/40 sm:block">
          or
        </span>
        <a
          href="https://wa.me/919714114160?text=Hello%20Sidrah%20Fashion%2C%0A%0AI%20would%20like%20to%20enquire%20about%20your%20wholesale%20collection."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-body text-ink transition-colors hover:text-ink/70"
        >
          <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
          <span>WhatsApp us directly</span>
        </a>
      </div>
    </form>
  );
}
