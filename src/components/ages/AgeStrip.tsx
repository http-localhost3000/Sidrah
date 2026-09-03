import { AgeTile } from "./AgeTile";
import type { AgeGroup } from "@/data/ages";

interface AgeStripProps {
  groups: AgeGroup[];
}

export function AgeStrip({ groups }: AgeStripProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {groups.map((g, i) => (
        <AgeTile key={g.id} ageGroup={g} index={i} />
      ))}
    </div>
  );
}
