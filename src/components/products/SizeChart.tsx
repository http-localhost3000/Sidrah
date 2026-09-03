import type { SizeChartRow } from "@/data/sizeChart";

interface SizeChartProps {
  rows: SizeChartRow[];
  category?: string;
}

/**
 * Rendered as a scrollable table. Structured so per-category charts can be
 * passed in later without changing the presentation.
 */
export function SizeChart({ rows, category }: SizeChartProps) {
  return (
    <div>
      <p className="max-w-prose text-body text-ink/70">
        Generic Sidrah Fashion boyswear chart{category ? ` — ${category}` : ""}.
        Measurements are placeholders while we finalise the definitive
        Sidrah Fashion size specification.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <thead>
            <tr className="border-b border-ink/20">
              <th
                scope="col"
                className="pb-3 pr-4 text-caption font-medium uppercase tracking-[0.12em] text-ink/60"
              >
                Size
              </th>
              <th
                scope="col"
                className="pb-3 pr-4 text-caption font-medium uppercase tracking-[0.12em] text-ink/60"
              >
                Age
              </th>
              <th
                scope="col"
                className="pb-3 pr-4 text-caption font-medium uppercase tracking-[0.12em] text-ink/60"
              >
                Chest (cm)
              </th>
              <th
                scope="col"
                className="pb-3 text-caption font-medium uppercase tracking-[0.12em] text-ink/60"
              >
                Body length (cm)
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.size}
                className="border-b border-rule last:border-b-0"
              >
                <td className="py-3 pr-4 font-medium text-ink">{row.size}</td>
                <td className="py-3 pr-4 text-ink/75">{row.ageLabel}</td>
                <td className="py-3 pr-4 text-ink/55">{row.chestCm}</td>
                <td className="py-3 text-ink/55">{row.bodyLengthCm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-caption text-ink/55">
        Individual products may not stock every size shown here — refer to the
        product page for confirmed availability.
      </p>
    </div>
  );
}
