"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function PortPreview({
  ports,
}: {
  ports: { name: string; note: string }[];
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ports.slice(0, 6);

    return ports
      .filter((p) => p.name.toLowerCase().includes(s))
      .slice(0, 6);
  }, [ports, q]);

  return (
    <section className="mt-10">
      <div className="mb-3 text-xs font-semibold tracking-wide text-neutral-600">
        PORT INTELLIGENCE
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="flex gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search port name…"
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-500"
          />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {filtered.map((p) => (
            <div
              key={p.name}
              className="rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              <div className="text-sm font-semibold text-neutral-900">{p.name}</div>
              <div className="mt-2 text-xs leading-5 text-neutral-600">{p.note}</div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="md:col-span-3 rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
              No ports found for “{q.trim()}”.
            </div>
          )}
        </div>

        <div className="mt-5 text-sm text-neutral-700">
          <Link href="/ports" className="underline underline-offset-4">
            Browse all ports →
          </Link>
        </div>
      </div>
    </section>
  );
}