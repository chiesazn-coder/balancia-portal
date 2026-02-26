"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { UserCircle, Settings, HelpCircle, LogOut, Search, BookOpen, Edit3 } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getInitial = (name?: string | null) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-6 md:px-10">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <div className="relative h-7 w-7">
            <Image 
              src="/logo.png" 
              alt="Balancia Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl md:text-[18px] font-serif font-black text-neutral-900 tracking-tighter leading-none">
            Balancia Portal
          </span>
        </Link>

        {/* Search Bar */}
        <div className="ml-4 hidden flex-1 md:block">
          <div className="relative max-w-[240px] group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" />
            <input
              placeholder="Search"
              className="w-full rounded-full border-none bg-neutral-50 py-2 pl-10 pr-4 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-neutral-200 transition-all placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Right Navigation */}
        <div className="ml-auto flex items-center gap-5 md:gap-8">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/knowledge" className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors tracking-wide">
              Knowledge
            </Link>
            <Link href="/discuss" className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors tracking-wide">
              Discuss
            </Link>
          </div>

          <div className="flex items-center gap-4 border-l border-neutral-100 pl-4 md:pl-8">

            <div className="relative">
              {/* FIX: Tidak lagi membungkus button di dalam button */}
              {session ? (
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none"
                >
                  {session.user?.image ? (
                    <img 
                      src={session.user.image} 
                      className="h-8 w-8 rounded-full border border-neutral-100 object-cover p-[2px]" 
                      alt="profile" 
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white uppercase tracking-widest">
                      {getInitial(session.user?.name)}
                    </div>
                  )}
                </button>
              ) : (
                <Link 
                  href="/login"
                  className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white hover:bg-black transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Dropdown Menu */}
              {isDropdownOpen && session && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                  
                  <div className="absolute right-0 z-20 mt-4 w-60 overflow-hidden rounded-lg border border-neutral-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                    <div className="p-4 border-b border-neutral-50">
                      <span className="block text-sm font-bold text-neutral-900 truncate tracking-tight">
                        {session.user?.name}
                      </span>
                      <span className="block text-xs text-neutral-500 truncate mt-0.5 font-light italic">
                        {session.user?.email}
                      </span>
                    </div>

                    <div className="p-2">
                      <Link href="/profile" className="flex items-center gap-3 rounded-md px-3 py-2 text-[13px] text-neutral-600 hover:bg-neutral-50 transition-colors">
                        <UserCircle size={16} strokeWidth={1.5} /> Profile
                      </Link>
                      <Link href="/my-learning" className="flex items-center gap-3 rounded-md px-3 py-2 text-[13px] text-neutral-600 hover:bg-neutral-50 transition-colors">
                        <BookOpen size={16} strokeWidth={1.5} /> My Learning
                      </Link>
                      <Link href="/settings" className="flex items-center gap-3 rounded-md px-3 py-2 text-[13px] text-neutral-600 hover:bg-neutral-50 transition-colors border-b border-neutral-50 pb-3 mb-2">
                        <Settings size={16} strokeWidth={1.5} /> Settings
                      </Link>
                      
                      <button 
                        onClick={() => signOut()}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} strokeWidth={1.5} /> Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}