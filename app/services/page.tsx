"use client";

import { 
  Wrench, 
  ShieldCheck, 
  Ship, 
  Users, 
  Truck,
  ArrowRight,
  ChevronRight,
  Plus
} from "lucide-react";
import Container from "@/components/Container";
import Link from "next/link";

const services = [
  {
    category: "Port Agency",
    slug: "port-agency",
    icon: Ship,
    description: "Full attendance to vessels during port calls, ensuring fast turnaround and efficient CIQP clearance.",
    features: ["Inaportnet Handling", "Port Clearance (In/Out)", "Berth Coordination"]
  },
  {
    category: "Husbandry Services",
    slug: "husbandry-services",
    icon: Users,
    description: "Taking care of your crew and vessel requirements with precision and reliability.",
    features: ["Crew Change", "Cash to Master", "Medical Assistance"]
  },
  {
    category: "Technical Support",
    slug: "technical-support",
    icon: Wrench,
    description: "Coordination for repairs, underwater inspections, and technical supplies.",
    features: ["Underwater Survey", "Spares Clearance", "Repair Coordination"]
  },
  {
    category: "Logistics & Supply",
    slug: "logistics-supply",
    icon: Truck,
    description: "Seamless coordination for bunkers, fresh water, and provisions delivery.",
    features: ["Bunker Coordination", "Fresh Water Supply", "Provisioning"]
  }
];

export default function ServicesPage() {
  return (
    <Container className="pt-20 pb-32 max-w-[1000px]">
      {/* Header Section - Editorial Style */}
      <header className="mb-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-neutral-900 text-white rounded-full flex items-center justify-center shadow-lg">
              <ShieldCheck size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Our Expertise</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-neutral-900 mb-6 tracking-tight leading-tight">
            Operational Excellence
          </h1>
          <p className="text-xl text-neutral-500 font-light leading-relaxed">
            Balancia provides comprehensive port services tailored to the complex needs of modern shipping in Indonesian waters.
          </p>
        </div>
      </header>

      {/* Services Grid - Cleaner Apple Layout */}
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
        {services.map((service, i) => (
          <div 
            key={i} 
            className="group relative flex flex-col items-start"
          >
            {/* Icon dengan gaya minimalis */}
            <div className="h-16 w-16 rounded-3xl bg-neutral-50 text-neutral-400 flex items-center justify-center mb-8 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-sm">
              <service.icon size={28} />
            </div>
            
            <h3 className="text-3xl font-serif font-medium text-neutral-900 mb-4 tracking-tight">
              {service.category}
            </h3>
            
            <p className="text-neutral-500 font-light text-lg leading-relaxed mb-8">
              {service.description}
            </p>

            {/* Features dengan gaya minimalis list */}
            <div className="w-full space-y-4 mb-10 border-t border-neutral-100 pt-8">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm font-medium text-neutral-600">
                  <span className="flex items-center gap-3">
                    <Plus size={14} className="text-neutral-300" />
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <Link 
              href={`/services/${service.slug}`} 
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-neutral-400 group-hover:text-neutral-900 transition-all"
            >
              Learn More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>

      {/* Footer Banner - Grey Glassmorphism Style */}
      <section className="relative mt-40">
        {/* Background Decorative Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[130%] -z-10 pointer-events-none opacity-40">
          <div className="absolute top-0 right-[20%] w-80 h-80 bg-neutral-300 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-[20%] w-96 h-96 bg-neutral-200 rounded-full blur-[120px]" />
        </div>

        <div className="relative overflow-hidden rounded-[3rem] border border-white/40 bg-white/20 backdrop-blur-3xl p-10 md:p-16 group transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.04),inset_0_0_40px_rgba(255,255,255,0.3)]">
          {/* Grainy Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-6 leading-tight">
                Need a custom <br className="hidden md:block"/> port solution?
              </h2>
              <p className="text-neutral-500 text-lg font-light leading-relaxed">
                Our team in Jakarta and Batam is ready to handle specific operational challenges unique to your vessel type.
              </p>
            </div>
            
            <button className="whitespace-nowrap bg-neutral-900 text-white px-10 py-5 rounded-[2rem] text-sm font-bold shadow-2xl hover:bg-black transition-all duration-500 active:scale-95 border border-white/10">
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>
    </Container>
  );
}