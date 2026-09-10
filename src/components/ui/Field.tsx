import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

// Shared wrapper for Input / Select / Textarea. Keeps labels, hints and
// error states consistent across every form on the site.
export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  className,
  children,
}: FieldProps) {
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="eyebrow flex items-center gap-1 text-ink/70"
      >
        <span>{label}</span>
        {required && (
          <span aria-hidden="true" className="text-accent-warm">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={hintId} className="text-caption text-ink/55">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-caption text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const fieldControl =
  "block w-full bg-card border border-ink/35 text-ink placeholder:text-ink/45 " +
  "px-4 py-3 text-body leading-6 transition-colors duration-150 ease-editorial " +
  "hover:border-ink/60 focus:border-ink focus:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page " +
  "disabled:cursor-not-allowed disabled:opacity-50 rounded-sm";
