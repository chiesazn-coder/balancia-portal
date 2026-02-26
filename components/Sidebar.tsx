"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, BookOpen, Anchor, Wrench, 
  GraduationCap, MessageSquare, Menu, X 
} from "lucide-react";

// 1. Definisikan Menu Items di luar agar tidak dibuat ulang terus menerus
const menuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Knowledge", href: "/knowledge", icon: BookOpen },
  { name: "Ports", href: "/ports", icon: Anchor },
  { name: "Services", href: "/services", icon: Wrench },
  { name: "Learning", href: "/learning", icon: GraduationCap },
  { name: "Discuss", href: "/discuss", icon: MessageSquare },
];

// 2. PINDAHKAN NavContent ke luar komponen utama Sidebar
interface NavContentProps {
  pathname: string;
  onClose?: () => void;
}

const NavContent = ({ pathname, onClose }: NavContentProps) => (
  <>
    <nav className="space-y-1">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClose} // Panggil fungsi tutup jika ada
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              isActive 
                ? "bg-neutral-100 text-neutral-900" 
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
            {item.name}
          </Link>
        );
      })}
    </nav>

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
  </>
);

// 3. KOMPONEN UTAMA
export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* MOBILE TRIGGER */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition-transform active:scale-90"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE OVERLAY & SIDEBAR */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        
        <aside className={`absolute left-0 top-0 h-full w-72 bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="mb-8 flex items-center gap-2">
             <span className="font-bold text-lg text-neutral-900">Balancia Portal</span>
          </div>
          {/* Kirim props ke NavContent */}
          <NavContent pathname={pathname} onClose={() => setIsOpen(false)} />
        </aside>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="sticky top-14 hidden h-[calc(100vh-56px)] w-64 flex-col py-8 pl-6 pr-4 md:flex">
        {/* Di desktop tidak perlu onClose karena sidebar-nya permanen */}
        <NavContent pathname={pathname} />
      </aside>
    </>
  );
}