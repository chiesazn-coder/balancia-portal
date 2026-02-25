"use client";

import { useState } from "react";
import { Anchor, Search, MapPin, Wind, Ship, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import Container from "@/components/Container";

const portData = [
  {
    name: "Tanjung Priok",
    location: "Jakarta, North Coast of Java",
    maxDraft: "14.0 m",
    loa: "300 m",
    type: "Main Hub / Container",
    status: "International",
    coordinates: "06° 06' S / 106° 53' E"
  },
  {
    name: "Batam (Batu Ampar)",
    location: "Batam Island, Riau Archipelago",
    maxDraft: "12.0 m",
    loa: "250 m",
    type: "Transshipment / FTZ",
    status: "International",
    coordinates: "01° 09' N / 103° 59' E"
  },
  {
    name: "Cigading",
    location: "Banten, Sunda Strait",
    maxDraft: "18.5 m",
    loa: "350 m",
    type: "Bulk / Industrial",
    status: "International",
    coordinates: "06° 01' S / 105° 57' E"
  },
  {
    name: "Tanjung Perak",
    location: "Surabaya, East Java",
    maxDraft: "12.0 m",
    loa: "260 m",
    type: "Mixed / Gateway",
    status: "International",
    coordinates: "07° 12' S / 112° 44' E"
  },
];

export default function PortDirectoryPage() {
  const [query, setQuery] = useState("");

  const filteredPorts = portData.filter(port => 
    port.name.toLowerCase().includes(query.toLowerCase()) ||
    port.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container className="pt-20 pb-32 max-w-[1000px]">
      {/* Header - Medium Editorial Style */}
      <header className="mb-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-neutral-900 text-white rounded-full flex items-center justify-center shadow-lg">
              <Anchor size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Technical Directory</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-neutral-900 mb-6 tracking-tight leading-tight">
            Indonesian Ports
          </h1>
          <p className="text-xl text-neutral-500 font-light leading-relaxed">
            Verified technical specifications and operational constraints. Essential data for maritime planning and arrival procedures.
          </p>
        </div>
      </header>

      {/* Search & Stats Section - Glassmorphism Style */}
      <section className="relative mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="md:col-span-3">
             <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-neutral-900 transition-colors" size={20} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search port name or location..."
                  className="w-full bg-transparent border-b border-neutral-200 py-4 pl-8 pr-4 text-lg outline-none focus:border-neutral-900 transition-all placeholder:text-neutral-300 font-light"
                />
             </div>
          </div>
          
          {/* Glass Counter Box */}
          <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 backdrop-blur-xl p-5 shadow-sm">
             <div className="relative z-10">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Total Verified</p>
                <p className="text-2xl font-serif text-neutral-900">{filteredPorts.length} Ports</p>
             </div>
             <div className="absolute -right-4 -bottom-4 opacity-5 text-neutral-900">
                <Ship size={80} />
             </div>
          </div>
        </div>
      </section>

      {/* Port List - Cleaner Medium Layout */}
      <div className="space-y-0">
        {filteredPorts.length > 0 ? (
          filteredPorts.map((port, i) => (
            <div key={i} className="group py-12 border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-all px-4 -mx-4 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h2 className="text-3xl font-serif font-medium text-neutral-900 group-hover:text-blue-700 transition-colors">
                      {port.name}
                    </h2>
                    <span className="px-3 py-1 rounded-full border border-neutral-200 text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">
                      {port.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-500 font-light mb-8">
                    <span className="flex items-center gap-1.5"><MapPin size={16} className="text-neutral-300" /> {port.location}</span>
                    <span className="flex items-center gap-1.5"><Wind size={16} className="text-neutral-300" /> {port.coordinates}</span>
                  </div>
                  
                  {/* Technical Specs - Minimalist Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl">
                    <div className="border-l border-neutral-100 pl-4 transition-colors group-hover:border-neutral-300">
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Max Draft</p>
                      <p className="text-lg font-medium text-neutral-800">{port.maxDraft}</p>
                    </div>
                    <div className="border-l border-neutral-100 pl-4 transition-colors group-hover:border-neutral-300">
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Max LOA</p>
                      <p className="text-lg font-medium text-neutral-800">{port.loa}</p>
                    </div>
                    <div className="border-l border-neutral-100 pl-4 transition-colors group-hover:border-neutral-300 hidden md:block">
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Main Cargo</p>
                      <p className="text-lg font-medium text-neutral-800">{port.type}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Link 
                    href={`/ports/${port.name.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="flex items-center gap-2 text-sm font-bold text-neutral-300 group-hover:text-neutral-900 transition-all uppercase tracking-widest"
                  >
                    View Specs <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
             <p className="text-neutral-400 font-serif italic text-xl font-light">No ports found in the current directory.</p>
          </div>
        )}
      </div>

      {/* Info Note - Glassmorphism */}
      <footer className="mt-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/30 backdrop-blur-2xl p-8 flex items-start gap-4">
          <div className="p-2 bg-neutral-900 rounded-lg text-white">
            <Info size={18} />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 mb-1">Data Accuracy</h4>
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              Technical data is sourced from latest port circulars and bathymetry surveys. Always confirm with local pilot stations for the most current tidal and draft constraints.
            </p>
          </div>
        </div>
      </footer>
    </Container>
  );
}