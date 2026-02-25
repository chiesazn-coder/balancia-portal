"use client";

import { Search, Filter, Clock, BarChart, ChevronRight } from "lucide-react";

export default function BrowseCatalog() {
  const categories = ["All", "Digital Tools", "Operational", "Safety", "Regulations"];

  const courses = [
    {
      id: 1,
      title: "Mastering Inaportnet: Step-by-Step Guide",
      description: "Panduan praktis penggunaan Inaportnet untuk alur pelayanan kapal dan barang di pelabuhan.",
      category: "Digital Tools",
      duration: "2h 30m",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=2069&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Port Clearance Procedures for Tanker Vessels",
      description: "Memahami regulasi dan prosedur spesifik clearance kapal tanker di wilayah perairan Indonesia.",
      category: "Operational",
      duration: "3h 15m",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1524522173746-f628baad3644?q=80&w=1942&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Introduction to ISPS Code Implementation",
      description: "Dasar-dasar keamanan kapal dan fasilitas pelabuhan sesuai standar internasional.",
      category: "Safety",
      duration: "1h 45m",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Course Catalog</h1>
          <p className="text-neutral-500">Explore our professional maritime courses designed by port operation experts.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="w-full rounded-full border border-neutral-200 py-2 pl-10 pr-4 outline-none focus:border-neutral-900 transition-all"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button 
            key={cat}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              cat === "All" ? "bg-neutral-900 text-white" : "border border-neutral-200 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="group flex flex-col border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300">
            {/* Course Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.image} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt={course.title} 
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {course.category}
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-neutral-500 line-clamp-2 mb-6">
                {course.description}
              </p>
              
              <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center justify-between text-xs text-neutral-400 font-medium">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                  <span className="flex items-center gap-1"><BarChart size={14} /> {course.level}</span>
                </div>
                <button className="text-neutral-900 flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                  View <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}