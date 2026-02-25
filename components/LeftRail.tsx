import Link from "next/link";

const items = [
  { label: "Home", href: "/" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "Ports", href: "/ports" },
  { label: "Services", href: "/services" },
  { label: "Learning", href: "/learning" },
  { label: "Discuss", href: "/discuss" },
];

export default function LeftRail() {
  return (
    <aside className="hidden xl:block xl:w-[260px]">
      <div className="sticky top-20 pr-6">
        <nav className="space-y-1">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="block rounded-xl px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 border-t border-neutral-200 pt-6">
          <div className="text-xs font-semibold tracking-wide text-neutral-600">
            Quick note
          </div>
          <p className="mt-2 text-sm leading-6 text-neutral-700">
            This portal focuses on practical port-call flow. No marketing language.
          </p>
        </div>
      </div>
    </aside>
  );
}