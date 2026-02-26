"use client";

import { useSession, signIn } from "next-auth/react"; // Tambahkan signIn
import { 
  BookOpen, 
  Trophy, 
  Zap, 
  Target, 
  ChevronRight, 
  LayoutGrid,
  Lock,
  ArrowRight,
  Plus,
  LogIn // Icon tambahan
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/Container";

export default function LearningDashboard() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";

  // State Loading Ringan agar UI tidak "flicker" saat cek session
  if (isLoading) {
    return (
      <Container className="pt-20 pb-32 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 bg-neutral-100 rounded-full" />
          <div className="h-4 w-32 bg-neutral-100 rounded-md" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="pt-20 pb-32 max-w-[1200px]">
      
      {/* 1. Header & Welcome Hero */}
      <div className="relative overflow-hidden rounded-[3rem] border border-white/50 bg-white/40 backdrop-blur-3xl p-10 md:p-16 mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.04)] group">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[120px] -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-[10px] font-black tracking-[0.2em] uppercase shadow-lg">
              Maritime Excellence
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-medium text-neutral-900 mb-6 tracking-tight leading-tight">
            {isLoggedIn ? (
              <>
                Welcome back, <br/>
                <span className="text-neutral-400 italic font-light">
                  {session?.user?.name?.split(' ')[0] || 'Captain'}
                </span>! 👋
              </>
            ) : (
              <>
                Ready to sail, <br/>
                <span className="text-neutral-400 italic font-light">Future Captain</span>? ⚓
              </>
            )}
          </h1>

          <p className="text-neutral-500 text-xl font-light mb-10 leading-relaxed">
            {isLoggedIn 
              ? "You have 3 upcoming technical modules to explore. Keep sharpening your skills in Indonesia's port operations."
              : "Access our exclusive technical modules and industry-verified certifications by signing in to your account."}
          </p>

          <div className="flex flex-wrap gap-4">
            {isLoggedIn ? (
              <Link href="/courses" className="bg-neutral-900 text-white px-10 py-4 rounded-full text-sm font-bold hover:bg-black hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-neutral-900/10">
                Continue Learning <ChevronRight size={18} />
              </Link>
            ) : (
              <button 
                onClick={() => signIn()} 
                className="bg-neutral-900 text-white px-10 py-4 rounded-full text-sm font-bold hover:bg-black hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-neutral-900/10"
              >
                Sign In to Start <LogIn size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* 2. Stat Cards - Data Real / Hidden when logged out */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, val: isLoggedIn ? "12" : "-", label: "Day Streak", color: "text-orange-500", bg: "bg-orange-50/50" },
              { icon: Trophy, val: isLoggedIn ? "0" : "-", label: "Certificates", color: "text-yellow-500", bg: "bg-yellow-50/50" },
              { icon: Target, val: isLoggedIn ? "0%" : "-", label: "Avg. Completion", color: "text-blue-500", bg: "bg-blue-50/50" }
            ].map((stat, i) => (
              <div key={i} className="group relative bg-white border border-neutral-100 p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1">
                <div className={`h-12 w-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <stat.icon size={22} />
                </div>
                <p className="text-3xl font-serif font-medium text-neutral-900 mb-1">{stat.val}</p>
                <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 3. My Active Courses - Conditional Empty State */}
          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-xs font-black text-neutral-400 uppercase tracking-[0.3em] flex items-center gap-3">
                <LayoutGrid size={14} /> {isLoggedIn ? "My Active Courses" : "Available Courses"}
              </h2>
              <div className="h-[1px] flex-grow bg-neutral-100" />
            </div>
            
            <div className="relative overflow-hidden rounded-[3rem] border border-neutral-100 bg-neutral-50/30 p-16 text-center group">
              <div className="relative z-10">
                <div className="mx-auto w-20 h-20 bg-white rounded-[2rem] shadow-sm flex items-center justify-center mb-8 border border-neutral-100">
                  {isLoggedIn ? <BookOpen className="text-neutral-300" size={32} /> : <Lock className="text-neutral-300" size={32} />}
                </div>
                <h3 className="text-2xl font-serif font-medium text-neutral-900 mb-4">
                  {isLoggedIn ? "Ready to embark?" : "Locked Content"}
                </h3>
                <p className="text-neutral-500 text-lg font-light max-w-xs mx-auto mb-10 leading-relaxed">
                  {isLoggedIn 
                    ? "Join the elite maritime professionals by completing our industry-verified courses."
                    : "Please sign in to view your learning progress and enrolled modules."}
                </p>
                <button 
                  onClick={() => !isLoggedIn && signIn()}
                  className="inline-flex items-center gap-3 bg-neutral-900 text-white px-8 py-4 rounded-full text-sm font-bold shadow-xl shadow-neutral-900/10 hover:bg-black transition-all"
                >
                  {isLoggedIn ? <Link href="/courses">Explore Catalog</Link> : "Sign In Now"} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR (Premium Pass & Upcoming) */}
        <div className="lg:col-span-4 space-y-10">
           {/* ... bagian ini tetap sama, atau bisa kamu tambahkan logic Lock juga ... */}
           <div className="relative overflow-hidden rounded-[2.5rem] border border-neutral-900/5 bg-neutral-900 p-10 text-white shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Exclusive</span>
              </div>
              <h3 className="text-2xl font-serif font-medium mb-4">Premium Pass</h3>
              <p className="text-neutral-400 text-sm mb-10 font-light leading-relaxed">
                {isLoggedIn ? "Full access for you, Captain." : "Get full access to ship clearance guides and technical port docs."}
              </p>
              <button className="w-full bg-white text-neutral-900 py-4 rounded-2xl text-sm font-bold hover:bg-neutral-100 transition-all shadow-lg">
                {isLoggedIn ? "View Benefits" : "Join Waitlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}