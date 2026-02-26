"use client";
export const runtime = 'edge';

import { useParams, useRouter } from "next/navigation";
import { 
  Anchor, MapPin, Phone, Mail, ShieldAlert, 
  Clock, Info, ArrowLeft, ExternalLink, Ship 
} from "lucide-react";
import Container from "@/components/Container";

// 1. Definisikan Interface agar tidak pakai 'any' lagi
interface PortContact {
  role: string;
  phone: string;
  email: string;
}

interface PortSpecs {
  maxDraft: string;
  maxLoa: string;
  tidalRange: string;
  pilotage: string;
  tugage: string;
}

interface PortDetail {
  name: string;
  location: string;
  coordinates: string;
  description: string;
  specs: PortSpecs;
  contacts: PortContact[];
  anchorage: string;
}

const portDetails: Record<string, PortDetail> = {
  "tanjung-priok": {
    name: "Tanjung Priok",
    location: "Jakarta, Indonesia",
    coordinates: "06° 06' S / 106° 53' E",
    description: "The largest and busiest Indonesian seaport, handling over 50% of Indonesia's trans-shipment cargo traffic.",
    specs: {
      maxDraft: "14.0 m",
      maxLoa: "300 m",
      tidalRange: "0.9 m",
      pilotage: "Compulsory (24/7)",
      tugage: "Compulsory for vessels > 70m"
    },
    contacts: [
      { role: "KSOP (Port Authority)", phone: "+62 21 4393xxxx", email: "ksop.priok@dephub.go.id" },
      { role: "Health Office (KKP)", phone: "+62 21 437xxxx", email: "kkp.priok@kemkes.go.id" },
      { role: "VTS Center", phone: "+62 21 439xxxx", email: "vts.priok@dephub.go.id" }
    ],
    anchorage: "Outer Anchorage is located 3-5 NM North of the breakwater. Good holding ground with mud bottom."
  },
 "batam-(batu-ampar)": { 
    name: "Batam (Batu Ampar)",
    location: "Batam Island, Riau Archipelago",
    coordinates: "01° 09' N / 103° 59' E",
    description: "Strategically located near Singapore, Batu Ampar is the main gateway for industrial and trans-shipment activities in the Batam Free Trade Zone. Balancia's key branch operates here.",
    specs: {
      maxDraft: "12.0 m",
      maxLoa: "250 m",
      tidalRange: "2.2 m",
      pilotage: "Compulsory",
      tugage: "Available on request"
    },
    contacts: [
      { role: "BUP Batam (Port Authority)", phone: "+62 778 45xxxx", email: "info@bupbatam.id" },
      { role: "Balancia Batam Branch", phone: "+62 811 xxxx xxxx", email: "batam@balancia.id" },
      { role: "VTS Batam", phone: "+62 778 41xxxx", email: "vts.batam@dephub.go.id" }
    ],
    anchorage: "Anchorage area is available at Batu Ampar bay. Beware of high traffic in the Singapore Strait nearby."
  },
  "cigading": {
    name: "Cigading",
    location: "Banten, Sunda Strait",
    coordinates: "06° 01' S / 105° 57' E",
    description: "Deep-water port specialized in bulk cargo, serving as the main hub for industrial materials in Western Java.",
    specs: {
      maxDraft: "18.5 m",
      maxLoa: "350 m",
      tidalRange: "1.0 m",
      pilotage: "Compulsory",
      tugage: "Compulsory"
    },
    contacts: [
      { role: "KSOP Banten", phone: "+62 254 57xxxx", email: "ksop.banten@dephub.go.id" },
      { role: "Port Dispatcher", phone: "+62 254 57xxxx", email: "ops.cigading@krakatausteel.com" }
    ],
    anchorage: "Safe anchorage at Merak or Cigading roadstead. High currents during tide changes."
  },
  "tanjung-perak": {
    name: "Tanjung Perak",
    location: "Surabaya, East Java",
    coordinates: "07° 12' S / 112° 44' E",
    description: "The main gateway for Eastern Indonesia, connecting Java with the rest of the archipelago through a complex channel system.",
    specs: {
      maxDraft: "12.0 m",
      maxLoa: "260 m",
      tidalRange: "1.5 m",
      pilotage: "Compulsory (Long Route)",
      tugage: "Compulsory"
    },
    contacts: [
      { role: "KSOP Tanjung Perak", phone: "+62 31 329xxxx", email: "ksop.perak@dephub.go.id" },
      { role: "VTS Surabaya", phone: "+62 31 328xxxx", email: "vts.surabaya@dephub.go.id" }
    ],
    anchorage: "Outer anchorage at Gresik or Surabaya roadstead. Channel navigation is restricted to specific hours for large vessels."
  }
};

export default function PortDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const port = portDetails[slug as string];

  if (!port) return <Container className="py-20 text-center">Port not found.</Container>;

  return (
    <Container className="pt-10 pb-20 max-w-[1000px]">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-colors mb-8"
      >
        <ArrowLeft size={16} /> Back to Directory
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900">{port.name}</h1>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100">
              International Hub
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-neutral-500 font-medium mb-8">
            <span className="flex items-center gap-1.5"><MapPin size={16} /> {port.location}</span>
            <span className="flex items-center gap-1.5"><Anchor size={16} /> {port.coordinates}</span>
          </div>

          <p className="text-lg text-neutral-600 leading-relaxed mb-12">
            {port.description}
          </p>

          <section className="mb-12">
            <h2 className="text-sm font-black text-neutral-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Ship size={18} /> Technical Specifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* 3. Mapping Specs dengan Type-Safe */}
              {(Object.keys(port.specs) as Array<keyof PortSpecs>).map((key) => (
                <div key={key} className="p-4 rounded-2xl border border-neutral-100 bg-neutral-50/30">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="font-bold text-neutral-900">{port.specs[key]}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-black text-neutral-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Info size={18} /> Anchorage & Navigation
            </h2>
            <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 text-blue-900 leading-relaxed italic">
              {/* 4. Perbaikan tanda kutip menggunakan &quot; */}
              &quot;{port.anchorage}&quot;
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-[32px] border border-neutral-100 bg-white shadow-sm">
            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <ShieldAlert size={18} className="text-red-500" /> Port Contacts
            </h3>
            <div className="space-y-6">
              {port.contacts.map((contact, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-xs font-bold text-neutral-400 uppercase">{contact.role}</p>
                  <div className="flex flex-col gap-1">
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-blue-600">
                      <Phone size={14} /> {contact.phone}
                    </a>
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-blue-600">
                      <Mail size={14} /> {contact.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-[32px] bg-neutral-900 text-white">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Clock size={16} className="text-blue-400" /> Need Assistance?
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Our agents are available 24/7 for vessel clearance in this port.
            </p>
            <button className="w-full py-3 bg-white text-neutral-900 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
              Contact Local Agent <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}