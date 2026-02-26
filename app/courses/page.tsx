"use client";

import { Search, Clock, BarChart, ChevronRight, BookmarkPlus } from "lucide-react";

export default function BrowseCatalog() {
  const categories = ["All", "Digital Tools", "Operational", "Safety", "Regulations"];

  const courses = [
    {
      id: 1,
      title: "Mastering Inaportnet: Step-by-Step Guide",
      description: "Panduan praktis penggunaan Inaportnet untuk alur pelayanan kapal dan barang di pelabuhan Indonesia dengan standar terbaru.",
      category: "Digital Tools",
      duration: "2h 30m",
      level: "Intermediate",
      author: "Capt. H. Sudirman",
      date: "Feb 24, 2026",
      image: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=2069&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Port Clearance Procedures for Tanker Vessels",
      description: "Memahami regulasi dan prosedur spesifik clearance kapal tanker di wilayah perairan Indonesia untuk meminimalkan keterlambatan.",
      category: "Operational",
      duration: "3h 15m",
      level: "Advanced",
      author: "Bambang Irawan",
      date: "Jan 12, 2026",
      image: "https://images.unsplash.com/photo-1524522173746-f628baad3644?q=80&w=1942&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Introduction to ISPS Code Implementation",
      description: "Dasar-dasar keamanan kapal dan fasilitas pelabuhan sesuai standar internasional bagi personil pelabuhan.",
      category: "Safety",
      duration: "1h 45m",
      level: "Beginner",
      author: "Safety Officer Team",
      date: "Dec 05, 2025",
      image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-20">
      {/* Editorial Header */}
      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-neutral-900 mb-6 tracking-tight">
          Maritime Knowledge
        </h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-100">
          <p className="text-xl text-neutral-500 font-light max-w-xl leading-relaxed">
            Professional courses curated by industry experts to elevate your port operation standards.
          </p>
          <div className="relative group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search topics..." 
              className="bg-transparent border-b border-neutral-200 py-2 pl-8 pr-4 outline-none focus:border-neutral-900 transition-all w-full md:w-64 text-sm"
            />
          </div>
        </div>
      </header>

      {/* Navigation Chips */}
      <nav className="flex items-center gap-6 mb-12 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button 
            key={cat}
            className={`text-[13px] tracking-wide whitespace-nowrap transition-colors pb-2 ${
              cat === "All" 
                ? "text-neutral-900 font-bold border-b-2 border-neutral-900" 
                : "text-neutral-400 hover:text-neutral-900 border-b-2 border-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Course Grid - Medium Style Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course) => (
          <article key={course.id} className="group flex flex-col border-b border-neutral-100 pb-8 md:border-none md:pb-0">
            {/* Thumbnail */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-100 rounded-sm mb-6">
              <img 
                src={course.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={course.title} 
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-900">{course.author}</span>
                <span className="text-neutral-300">·</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{course.date}</span>
              </div>
              
              <a href="#" className="block mb-3">
                <h3 className="text-xl font-bold text-neutral-900 leading-snug group-hover:underline underline-offset-4 decoration-1">
                  {course.title}
                </h3>
              </a>

              <p className="text-sm text-neutral-500 leading-relaxed font-serif italic mb-6 line-clamp-2">
                &ldquo;{course.description}&rdquo;
              </p>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-4 text-[11px] font-medium text-neutral-400">
                  <span className="flex items-center gap-1.5 uppercase tracking-tighter"><Clock size={12} /> {course.duration}</span>
                  <span className="flex items-center gap-1.5 uppercase tracking-tighter"><BarChart size={12} /> {course.level}</span>
                </div>
                <button className="text-neutral-400 hover:text-neutral-900 transition-colors">
                  <BookmarkPlus size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-24 pt-12 border-t border-neutral-100 flex justify-center">
        <button className="group text-sm font-medium text-neutral-900 flex items-center gap-2">
          Explore all catalog <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}