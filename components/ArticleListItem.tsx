import Link from "next/link";
import type { Article } from "@/lib/content";

function formatMonthYear(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
}

export default function ArticleListItem({ a }: { a: Article }) {
  return (
    <article className="py-5">
      <Link href={`/knowledge/${a.slug}`} className="no-underline hover:no-underline">
        <h3 className="text-lg font-semibold tracking-tight leading-snug">
          {a.title}
        </h3>
      </Link>
      <p className="mt-2 text-sm leading-6 text-neutral-700">{a.excerpt}</p>
      <div className="mt-2 text-xs text-neutral-500">
        {a.minutes} min read · Updated {formatMonthYear(a.updatedAt)} · {a.category}
      </div>
    </article>
  );
}
