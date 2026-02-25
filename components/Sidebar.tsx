// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// Ganti Tool menjadi Wrench atau Hammer
import { Home, BookOpen, Anchor, Wrench, GraduationCap, MessageSquare } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Knowledge", href: "/knowledge", icon: BookOpen },
    { name: "Ports", href: "/ports", icon: Anchor },
    { name: "Services", href: "/services", icon: Wrench }, // Menggunakan Wrench
    { name: "Learning", href: "/learning", icon: GraduationCap },
    { name: "Discuss", href: "/discuss", icon: MessageSquare },
  ];

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-56px)] w-64 flex-col py-8 pl-6 pr-4 md:flex">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive 
                  ? "bg-neutral-50 text-neutral-900" 
                  : "text-neutral-500 hover:bg-neutral-50/50 hover:text-neutral-900"
              }`}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Catatan di bagian bawah Sidebar agar makin mirip Medium */}
        <div className="mt-auto border-t border-neutral-100 pt-6">
            <div className="rounded-2xl border border-neutral-100 p-4 bg-neutral-50/30">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                Quick note
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed italic">
                This portal focuses on practical port-call flow and operational reference. No marketing language.
            </p>
            </div>
        </div>
    </aside>
  );
}