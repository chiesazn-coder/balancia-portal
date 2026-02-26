import Link from "next/link";
import WeatherWidget from "./WeatherWidget"; // Import komponen baru

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
        {/* Staff Picks */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-bold text-neutral-900 font-serif italic">Staff Picks</div>
          <div className="mt-4 space-y-4">
            {ports.slice(0, 3).map((p) => (
              <div key={p.name} className="group cursor-pointer">
                <div className="text-sm font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                  {p.name}
                </div>
                <div className="mt-1 text-sm leading-5 text-neutral-600 line-clamp-2">
                  {p.note}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-2">
            <Link href="/ports" className="text-xs font-medium text-neutral-400 uppercase tracking-wider hover:text-neutral-900 transition-colors">
              See the full list
            </Link>
          </div>
        </div>

        {/* Memanggil Weather Widget */}
        <div className="mt-6">
          <WeatherWidget />
        </div>

        {/* Recommended topics */}
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-bold text-neutral-900 font-serif">Recommended topics</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t}
                className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 transition-all"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 px-2 text-[10px] text-neutral-400 uppercase tracking-[0.1em] font-medium">
          © 2026 Balancia Portal · Coverage · Disclaimer
        </div>
      </div>
    </aside>
  );
}