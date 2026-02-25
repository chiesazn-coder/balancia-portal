import Link from "next/link";
import type { Port } from "@/lib/ports";

function formatMonthYear(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
}

export default function PortCard({ port }: { port: Port }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href={`/ports/${port.slug}`}
            className="no-underline hover:no-underline"
          >
            <h3 className="text-lg font-semibold tracking-tight">
              {port.name}
            </h3>
          </Link>
          <div className="mt-1 text-sm text-neutral-600">{port.region}</div>
        </div>

        <div className="text-xs text-neutral-500">
          Updated {formatMonthYear(port.updatedAt)}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-neutral-700">
        {port.operationalNote}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {port.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
