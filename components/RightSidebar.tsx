import Link from "next/link";

export default function RightSidebar({
  ports,
  topics,
}: {
  ports: { name: string; note: string }[];
  topics: string[];
}) {
  return (
    <aside className="hidden lg:block lg:w-[360px]">
      <div className="sticky top-20 pl-8">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="text-sm font-semibold">Staff Picks</div>
          <div className="mt-4 space-y-4">
            {ports.slice(0, 3).map((p) => (
              <div key={p.name}>
                <div className="text-sm font-semibold text-neutral-900">{p.name}</div>
                <div className="mt-1 text-sm leading-6 text-neutral-700">{p.note}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/ports" className="text-sm text-neutral-700 underline underline-offset-4">
              See the full list
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="text-sm font-semibold">Recommended topics</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {topics.map((t) => (
              <span
                key={t}
                className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 text-xs text-neutral-500">
          Coverage · About · Privacy · Disclaimer
        </div>
      </div>
    </aside>
  );
}