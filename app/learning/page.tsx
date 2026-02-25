"use client";

import { useSession } from "next-auth/react";
import { 
  BookOpen, 
  Trophy, 
  Zap, 
  Target, 
  ChevronRight, 
  LayoutGrid,
  Lock,
  ArrowRight,
  Plus
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/Container";

export default function LearningDashboard() {
  const { data: session } = useSession();

  return (
    <Container className="pt-20 pb-32 max-w-[1200px]">
      
      {/* 1. Header & Welcome Hero - Editorial Glass Style */}
      <div className="relative overflow-hidden rounded-[3rem] border border-white/50 bg-white/40 backdrop-blur-3xl p-10 md:p-16 mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.04)] group">
        {/* Background Mesh Gradient - Kunci efek Glass */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[120px] -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-[10px] font-black tracking-[0.2em] uppercase shadow-lg">
              Maritime Excellence
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-neutral-900 mb-6 tracking-tight leading-tight">
            Welcome back, <br/>
            <span className="text-neutral-400 italic font-light">{session?.user?.name?.split(' ')[0] || 'Captain'}</span>! 👋
          </h1>
          <p className="text-neutral-500 text-xl font-light mb-10 leading-relaxed">
            You have 3 upcoming technical modules to explore. Keep sharpening your skills in Indonesia&apos;s port operations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/courses" className="bg-neutral-900 text-white px-10 py-4 rounded-full text-sm font-bold hover:bg-black hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-neutral-900/10">
              Continue Learning <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* LEFT CONTENT */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* 2. Stat Cards - Minimalist with Inner Glow */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, val: "12", label: "Day Streak", color: "text-orange-500", bg: "bg-orange-50/50" },
              { icon: Trophy, val: "0", label: "Certificates", color: "text-yellow-500", bg: "bg-yellow-50/50" },
              { icon: Target, val: "0%", label: "Avg. Completion", color: "text-blue-500", bg: "bg-blue-50/50" }
            ].map((stat, i) => (
              <div key={i} className="group relative bg-white border border-neutral-100 p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1">
                <div className={`h-12 w-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={22} />
                </div>
                <p className="text-3xl font-serif font-medium text-neutral-900 mb-1">{stat.val}</p>
                <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 3. My Active Courses - Medium Style List */}
          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-xs font-black text-neutral-400 uppercase tracking-[0.3em] flex items-center gap-3">
                <LayoutGrid size={14} /> My Active Courses
              </h2>
              <div className="h-[1px] flex-grow bg-neutral-100" />
            </div>
            
            <div className="relative overflow-hidden rounded-[3rem] border border-neutral-100 bg-neutral-50/30 p-16 text-center group">
              {/* Grainy Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
                   style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
              </div>
              
              <div className="relative z-10">
                <div className="mx-auto w-20 h-20 bg-white rounded-[2rem] shadow-sm flex items-center justify-center mb-8 border border-neutral-100 group-hover:rotate-6 transition-transform duration-500">
                  <BookOpen className="text-neutral-300" size={32} />
                </div>
                <h3 className="text-2xl font-serif font-medium text-neutral-900 mb-4">Ready to embark?</h3>
                <p className="text-neutral-500 text-lg font-light max-w-xs mx-auto mb-10 leading-relaxed">
                  Join the elite maritime professionals by completing our industry-verified courses.
                </p>
                <Link href="/courses" className="inline-flex items-center gap-3 bg-neutral-900 text-white px-8 py-4 rounded-full text-sm font-bold shadow-xl shadow-neutral-900/10 hover:bg-black transition-all">
                  Explore Catalog <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* 4. Premium Pass - Grey Glass Edition */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-neutral-900/5 bg-neutral-900 p-10 text-white shadow-2xl">
            {/* Inner Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Exclusive</span>
              </div>
              <h3 className="text-2xl font-serif font-medium mb-4">Premium Pass</h3>
              <p className="text-neutral-400 text-sm mb-10 font-light leading-relaxed">
                Get full access to ship clearance guides, technical port docs, and expert webinars.
              </p>
              <button className="w-full bg-white text-neutral-900 py-4 rounded-2xl text-sm font-bold hover:bg-neutral-100 transition-all active:scale-95 shadow-lg">
                Join Waitlist
              </button>
            </div>
          </div>

          {/* 5. Upcoming Items - Clean Sidebar Style */}
          <div className="p-2">
            <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
              Upcoming <div className="h-[1px] flex-grow bg-neutral-100" />
            </h3>
            <div className="space-y-10">
              {[
                { title: "Inaportnet Masterclass", cat: "Digital" },
                { title: "Tanker Clearance", cat: "Operational" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-6 group cursor-default">
                  <div className="shrink-0 h-12 w-12 rounded-2xl border border-neutral-100 flex items-center justify-center text-neutral-300 group-hover:text-neutral-900 group-hover:border-neutral-900 transition-all duration-500">
                    <Lock size={18} />
                  </div>
                  <div className="pt-1">
                    <p className="text-[10px] font-black text-neutral-300 mb-1.5 tracking-widest uppercase">{item.cat}</p>
                    <p className="text-lg font-serif font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-12 w-full py-4 border border-dashed border-neutral-200 rounded-2xl text-xs font-bold text-neutral-400 hover:text-neutral-900 hover:border-neutral-900 transition-all flex items-center justify-center gap-2">
              <Plus size={14} /> View All Modules
            </button>
          </div>

        </div>
      </div>
    </Container>
  );
}