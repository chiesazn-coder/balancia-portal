"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { UserCircle, Settings, HelpCircle, LogOut, Search, BookOpen} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fungsi helper untuk inisial nama jika foto tidak ada
  const getInitial = (name?: string | null) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-6">
        <Link href="/" className="flex items-center gap-2 no-underline group">
          <div className="relative h-8 w-8 overflow-hidden">
            <Image 
              src="/logo.png" // Ganti dengan nama file logo kamu di folder public
              alt="Balancia Logo"
              fill
              className="object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <span className="text-sm font-bold text-neutral-900 tracking-tight">
            Balancia Portal
          </span>
        </Link>

        {/* Search Bar ala Medium */}
        <div className="ml-2 hidden flex-1 md:block">
          <div className="relative max-w-[400px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              placeholder="Search Balancia"
              className="w-full rounded-full border border-neutral-100 bg-neutral-50 py-2 pl-10 pr-4 text-sm outline-none focus:bg-white focus:border-neutral-200 transition-all"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4 md:gap-6">

          <Link href="/discuss" className="text-sm text-neutral-500 hover:text-neutral-900">
            Discuss
          </Link>

          {/* User Profile & Dropdown */}
          <div className="relative">
            <button 
              onClick={() => session ? setIsDropdownOpen(!isDropdownOpen) : window.location.href = '/login'}
              className="flex items-center focus:outline-none"
            >
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  className="h-8 w-8 rounded-full border border-neutral-200 object-cover" 
                  alt="profile" 
                />
              ) : session ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium">
                  {getInitial(session.user?.name)}
                </div>
              ) : (
                <UserCircle className="h-8 w-8 text-neutral-400 hover:text-neutral-600 transition-colors" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && session && (
              <>
                {/* Backdrop untuk menutup dropdown saat klik di luar */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsDropdownOpen(false)}
                />
                
                <div className="absolute right-0 z-20 mt-3 w-64 rounded-xl border border-neutral-200 bg-white p-4 shadow-xl ring-1 ring-black ring-opacity-5">
                  <div className="mb-4 flex items-center gap-3 pb-4 border-b border-neutral-100">
                    {session.user?.image ? (
                      <img src={session.user.image} className="h-10 w-10 rounded-full" alt="avatar" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold">
                        {getInitial(session.user?.name)}
                      </div>
                    )}
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-semibold truncate">
                        {session.user?.name || "User"}
                      </span>
                      <span className="text-xs text-neutral-500 truncate">
                        {session.user?.email || ""}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Link href="/profile" className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors">
                      <UserCircle size={18} /> Profile
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors">
                      <Settings size={18} /> Settings
                    </Link>
                    <Link href="/my-learning" className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors">
                      <BookOpen size={18} /> My Courses
                    </Link>
                    <Link href="/help" className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors border-b border-neutral-100 pb-3 mb-2">
                      <HelpCircle size={18} /> Help
                    </Link>

                    
                    <button 
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} /> Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}