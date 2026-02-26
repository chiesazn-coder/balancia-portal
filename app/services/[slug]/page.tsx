"use client";


import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  HelpCircle,
  MessageSquare,
  Ship,
  Users,
  ShieldCheck,
  LucideIcon,
  BookmarkPlus,
  Share2
} from "lucide-react";
import Container from "@/components/Container";

// Interface tetap dipertahankan sesuai logika awal
interface ServiceProcess {
  step: string;
  desc: string;
}

interface ServiceFAQ {
  q: string;
  a: string;
}

interface ServiceDetail {
  title: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  process: ServiceProcess[];
  faqs: ServiceFAQ[];
  author: string;
  readTime: string;
}

const serviceDetails: Record<string, ServiceDetail> = {
  "port-agency": {
    title: "Port Agency",
    icon: Ship,
    author: "Operational Excellence Team",
    readTime: "4 min read",
    tagline: "Efficient vessel clearance and port attendance in all major Indonesian ports.",
    description: "As your local partner, Balancia ensures that every port call is handled with maximum efficiency. We bridge the gap between ship owners, port authorities, and local vendors to ensure a seamless turnaround. Our approach minimizes bureaucratic delays and focuses on operational speed.",
    process: [
      { step: "Pre-Arrival Coordination", desc: "Handling all Inaportnet submissions and berth applications before the vessel arrives." },
      { step: "Vessel Clearance", desc: "Coordinating with CIQP (Customs, Immigration, Quarantine, and Port) authorities for immediate boarding." },
      { step: "Operations Monitoring", desc: "24/7 monitoring of cargo operations and vessel requirements while alongside." },
      { step: "Port Clearance Out", desc: "Ensuring all documents are finalized for a timely departure." }
    ],
    faqs: [
      { q: "How fast can you process Inaportnet?", a: "We typically submit all data within 2-4 hours after receiving complete documents." },
      { q: "Do you handle 24/7 operations?", a: "Yes, our team is available around the clock for all port call emergencies." }
    ]
  },
  "husbandry-services": {
    title: "Husbandry Services",
    icon: Users,
    author: "Crew Support Dept",
    readTime: "3 min read",
    tagline: "Reliable support for your crew and vessel requirements.",
    description: "We understand that crew welfare and vessel maintenance are critical. Balancia provides dedicated husbandry services to ensure your people and assets are well-cared for through professional logistics and care.",
    process: [
      { step: "Crew Change Logistics", desc: "Managing visa applications, airport transfers, and hotel accommodations." },
      { step: "Cash to Master (CTM)", desc: "Secure delivery of funds directly to the Master on board." },
      { step: "Medical Assistance", desc: "Fast-track medical attention for crew members in local hospitals." }
    ],
    faqs: [
      { q: "Can you handle visa on arrival?", a: "Yes, we coordinate with immigration for smooth crew transit visas." }
    ]
  }
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const service = serviceDetails[slug as string];

  if (!service) return <Container className="py-20 text-center">Service not found.</Container>;

  const Icon = service.icon;

  return (
    <Container className="pt-10 pb-20 max-w-[720px]">
      {/* Editorial Navigation */}
      <nav className="flex items-center justify-between mb-12">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={1.5} /> Back
        </button>
        <div className="flex items-center gap-4 text-neutral-400">
          <button className="hover:text-neutral-900 transition-colors"><BookmarkPlus size={20} strokeWidth={1.5} /></button>
          <button className="hover:text-neutral-900 transition-colors"><Share2 size={20} strokeWidth={1.5} /></button>
        </div>
      </nav>

      {/* Editorial Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6 leading-[1.15] tracking-tight">
          {service.title}
        </h1>
        
        <div className="flex items-center gap-3 mb-10 border-b border-neutral-100 pb-8">
          <div className="h-10 w-10 bg-neutral-900 rounded-full flex items-center justify-center text-white">
            <Icon size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-neutral-900 uppercase tracking-tight">{service.author}</span>
            <span className="text-xs text-neutral-500 font-serif italic">{service.readTime}</span>
          </div>
        </div>

        {/* Fix ESLint Error using HTML Entities */}
        <p className="text-2xl font-serif italic text-neutral-500 leading-relaxed mb-10 opacity-80">
          &ldquo;{service.tagline}&rdquo;
        </p>
      </header>

      {/* Article Body */}
      <article className="prose prose-neutral max-w-none">
        <p className="text-xl font-serif text-neutral-700 leading-[1.8] mb-12">
          {service.description}
        </p>
        
        <hr className="border-neutral-100 my-12" />

        <h2 className="text-sm font-black text-neutral-900 uppercase tracking-[0.2em] mb-10">
          Operational Process
        </h2>
        
        <div className="space-y-12 mb-20">
          {service.process.map((p, i) => (
            <div key={i} className="group flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-serif font-light text-neutral-200 group-hover:text-neutral-900 transition-colors leading-none">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-bold text-neutral-900">{p.step}</h3>
              </div>
              <p className="text-neutral-600 pl-[3.2rem] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <section className="bg-neutral-50 p-10 rounded-2xl border border-neutral-100 mb-20">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <HelpCircle size={22} strokeWidth={1.5} className="text-neutral-400" /> 
            Service FAQ
          </h2>
          <div className="space-y-8">
            {service.faqs.map((f, i) => (
              <div key={i}>
                <p className="font-bold text-neutral-900 mb-2">{f.q}</p>
                <p className="text-neutral-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* Footer CTA */}
      <footer className="border-t border-neutral-100 pt-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-neutral-900 p-12 rounded-[2rem] text-white">
          <div className="max-w-xs">
            <h3 className="text-2xl font-bold mb-2">Connect with an Agent</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-serif italic">
              Ready to coordinate your upcoming port call in Indonesia? Our team responds in under 15 minutes.
            </p>
          </div>
          <button className="whitespace-nowrap bg-white text-neutral-900 px-8 py-4 rounded-full font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2">
            <MessageSquare size={18} /> Inquire Details
          </button>
        </div>
      </footer>
    </Container>
  );
}