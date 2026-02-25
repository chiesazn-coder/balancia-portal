import Link from "next/link";
import type { Article } from "@/lib/content";

function formatShortDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function FeaturedGrid({ items }: { items: Article[] }) {
  const [main, ...rest] = items;

  return (
    <section className="mt-10">
      <div className="mb-3 text-xs font-semibold tracking-wide text-neutral-600">
        FEATURED ARTICLES
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        {main && (
          <div className="pb-5">
            <Link href={`/knowledge/${main.slug}`} className="no-underline hover:no-underline">
              <h2 className="text-xl font-semibold leading-snug tracking-tight text-neutral-900 hover:underline">
                {main.title}
              </h2>
            </Link>

            <p className="mt-2 text-sm leading-6 text-neutral-700">{main.excerpt}</p>

            <div className="mt-2 text-xs text-neutral-500">
              {main.minutes} min read · Updated {formatShortDate(main.updatedAt)}
            </div>
          </div>
        )}

        <div className="grid gap-4 border-t border-neutral-200 pt-5 md:grid-cols-3">
          {rest.slice(0, 3).map((a) => (
            <div key={a.slug} className="rounded-xl border border-neutral-200 p-4">
              <Link href={`/knowledge/${a.slug}`} className="no-underline hover:no-underline">
                <div className="text-sm font-semibold leading-snug text-neutral-900 hover:underline">
                  {a.title}
                </div>
              </Link>

              <div className="mt-2 text-xs text-neutral-500">
                {a.minutes} min read · {formatShortDate(a.updatedAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}