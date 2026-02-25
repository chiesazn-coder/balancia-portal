"use client";

import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  HelpCircle,
  MessageSquare,
  Ship,
  Users,
  ShieldCheck,
  LucideIcon
} from "lucide-react";
import Container from "@/components/Container";

// 1. Definisikan Interface agar tidak pakai 'any' lagi
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
}

// 2. Gunakan Record dengan Type yang sudah didefinisikan
const serviceDetails: Record<string, ServiceDetail> = {
  "port-agency": {
    title: "Port Agency",
    icon: Ship,
    tagline: "Efficient vessel clearance and port attendance in all major Indonesian ports.",
    description: "As your local partner, Balancia ensures that every port call is handled with maximum efficiency. We bridge the gap between ship owners, port authorities, and local vendors to ensure a seamless turnaround.",
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
    tagline: "Reliable support for your crew and vessel requirements.",
    description: "We understand that crew welfare and vessel maintenance are critical. Balancia provides dedicated husbandry services to ensure your people and assets are well-cared for.",
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
    <Container className="pt-10 pb-20 max-w-[1000px]">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-colors mb-12"
      >
        <ArrowLeft size={16} /> Back to Services
      </button>

      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <header className="mb-12">
            <div className="h-16 w-16 bg-blue-600 text-white rounded-[24px] flex items-center justify-center mb-8 shadow-xl shadow-blue-100">
              <Icon size={32} />
            </div>
            <h1 className="text-4xl font-extrabold text-neutral-900 mb-6 tracking-tight">
              {service.title}
            </h1>
            <p className="text-xl text-neutral-500 font-medium leading-relaxed italic border-l-4 border-blue-100 pl-6">
              {service.tagline}
            </p>
          </header>

          <section className="mb-16">
            <p className="text-lg text-neutral-700 leading-relaxed mb-10">
              {service.description}
            </p>
            
            <h2 className="text-sm font-black text-neutral-300 uppercase tracking-[0.2em] mb-8">Service Workflow</h2>
            <div className="space-y-6">
              {/* 3. Loop yang sudah Type-Safe */}
              {service.process.map((p, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-3xl border border-neutral-100 hover:bg-neutral-50/50 transition-all">
                  <div className="flex-shrink-0 h-10 w-10 bg-white border border-neutral-100 rounded-full flex items-center justify-center font-bold text-blue-600 shadow-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-1">{p.step}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-black text-neutral-300 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <HelpCircle size={18} /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {/* 4. FAQ Loop yang sudah Type-Safe */}
              {service.faqs.map((f, i) => (
                <div key={i} className="p-6 rounded-3xl bg-neutral-50 border border-neutral-100">
                  <p className="font-bold text-neutral-900 mb-2">{f.q}</p>
                  <p className="text-sm text-neutral-500 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-24">
            <div className="p-8 rounded-[40px] bg-neutral-900 text-white mb-8 shadow-2xl shadow-neutral-200">
              <h3 className="text-xl font-bold mb-4">Inquire Now</h3>
              <p className="text-sm text-neutral-400 mb-8 leading-relaxed">
                Connect with our operational team in Jakarta or Batam to discuss your upcoming port call.
              </p>
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 mb-4">
                <MessageSquare size={16} /> Contact Agent
              </button>
              <p className="text-[10px] text-center text-neutral-500 font-medium">Average response time: &lt; 15 mins</p>
            </div>

            <div className="p-8 rounded-[40px] border border-neutral-100 bg-white shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-emerald-500" size={20} />
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Reliability</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500 font-medium">Clearance Success</span>
                  <span className="text-sm font-bold text-neutral-900">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500 font-medium">Active Ports</span>
                  <span className="text-sm font-bold text-neutral-900">4+ Ports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}