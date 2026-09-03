import { AgeTile } from "./AgeTile";
import type { AgeGroup } from "@/data/ages";

interface AgeGridProps {
  ageGroups: AgeGroup[];
}

export function AgeGrid({ ageGroups }: AgeGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {ageGroups.map((group) => (
        <AgeTile key={group.id} ageGroup={group} />
      ))}
    </div>
  );
}
