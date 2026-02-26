import Container from "@/components/Container";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GlossaryPage() {
  // Contoh data glossary (Nanti bisa dipindah ke Sanity)
  const terms = [
    { term: "Inaportnet", desc: "Sistem layanan tunggal berbasis internet untuk pelayanan kapal dan barang di pelabuhan." },
    { term: "PKK", desc: "Pemberitahuan Kedatangan Kapal - Dokumen wajib sebelum kapal sandar." },
    { term: "LOA", desc: "Length Over All - Panjang keseluruhan kapal dari ujung depan ke belakang." },
    { term: "Draft", desc: "Jarak vertikal antara garis air sampai bagian terbawah dari lunas kapal." },
  ];

  return (
    <Container className="pt-20 pb-32 max-w-[1000px]">
      <Link href="/knowledge" className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors mb-12 text-sm font-medium group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Knowledge
      </Link>

      <header className="mb-16">
        <h1 className="text-5xl font-serif font-medium text-neutral-900 mb-6 tracking-tight">Maritime Glossary</h1>
        <p className="text-xl text-neutral-500 font-light max-w-2xl leading-relaxed">
          Comprehensive dictionary of Indonesian maritime terms, port operations, and technical jargon.
        </p>
      </header>

      {/* Search Mini */}
      <div className="relative max-w-md mb-20 group">
        <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-neutral-900 transition-colors" size={20} />
        <input
          placeholder="Find a term..."
          className="w-full bg-transparent border-b border-neutral-200 py-3 pl-8 pr-4 outline-none focus:border-neutral-900 transition-all font-light"
        />
      </div>

      <div className="grid gap-12">
        {terms.map((item, idx) => (
          <div key={idx} className="group">
            <h3 className="text-2xl font-serif font-medium text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
              {item.term}
            </h3>
            <p className="text-neutral-500 font-light leading-relaxed max-w-3xl">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}