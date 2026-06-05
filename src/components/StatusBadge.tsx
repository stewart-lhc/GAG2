import type { StatusTone } from "@/data/site";

const labels: Record<StatusTone, string> = {
  confirmed: "Confirmed",
  unknown: "Unknown",
  rumor: "Rumor",
  warning: "Warning"
};

export function StatusBadge({ tone }: { tone: StatusTone }) {
  return <span className={`badge badge-${tone}`}>{labels[tone]}</span>;
}
