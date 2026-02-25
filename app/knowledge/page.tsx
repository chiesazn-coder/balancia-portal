import { Book, Shield, Anchor, Zap, FileText, ChevronRight, Search } from "lucide-react";
import Container from "@/components/Container";
import ArticleListItem from "@/components/ArticleListItem";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
// Import tipe asli dari portal
import { type Article as ContentArticle, type ArticleBlock } from "@/lib/content";

// Interface untuk data mentah dari Sanity
interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  updatedAt: string;
  categories?: { _id: string; title: string }[];
}

export default async function KnowledgePage() {
  // 1. Ambil data dari Sanity (Server Side)
  const rawArticles = await client.fetch<SanityPost[]>(
    POSTS_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  // 2. Transformasi data agar cocok dengan ArticleListItem
  const articles: ContentArticle[] = rawArticles.map((post) => {
    const validCategories = ["Port operations", "Operational risk", "Crew & welfare", "Communication"];
    const currentCat = post.categories?.[0]?.title || "";
    
    const finalCategory = validCategories.includes(currentCat) 
      ? (currentCat as ContentArticle["category"]) 
      : ("Port operations" as ContentArticle["category"]);

    return {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      updatedAt: post.updatedAt,
      category: finalCategory,
      minutes: 5,
      content: [] as ArticleBlock[], 
    };
  });

  return (
    <Container className="pt-20 pb-32 max-w-[1000px]">
      {/* Header Section */}
      <header className="mb-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-neutral-900 mb-6 tracking-tight leading-tight">
            Maritime Knowledge Base
          </h1>
          <p className="text-xl text-neutral-500 font-light leading-relaxed mb-10">
            The definitive reference for Indonesian port operations, regulatory frameworks, and maritime excellence.
          </p>
        </div>

        {/* Search Bar UI */}
        <div className="relative max-w-xl group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-neutral-900 transition-colors" size={22} />
          <input
            placeholder="Search procedures, ports, or regulations..."
            className="w-full bg-transparent border-b border-neutral-200 py-4 pl-10 pr-4 text-lg outline-none focus:border-neutral-900 transition-all font-light placeholder:text-neutral-300"
          />
        </div>
      </header>

      {/* Topics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-28">
        {[
          { title: "Port Procedures", desc: "SOP for Inaportnet, PKK, and Clearance processes.", icon: Zap },
          { title: "Port Directory", desc: "Technical specs for ID ports including Draft and LOA.", icon: Anchor },
          { title: "Regulations", desc: "Latest Ministerial & KSOP decrees for maritime law.", icon: Shield },
        ].map((item, i) => (
          <div key={i} className="group cursor-pointer border-t border-neutral-200 pt-8 hover:border-neutral-900 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
               <div className="p-2 bg-neutral-50 rounded-lg group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
                <item.icon size={20} />
               </div>
               <ChevronRight size={18} className="text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3 leading-snug">{item.title}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Article List Section */}
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-2">
          <FileText size={14} /> Latest Knowledge ({articles.length})
        </h2>
        <div className="h-[1px] w-full bg-neutral-100"></div>
      </div>

      <div className="space-y-12 mb-32">
        {articles.length > 0 ? (
          articles.map((a) => (
            <div key={a.slug} className="pb-12 border-b border-neutral-50 last:border-0">
              <ArticleListItem a={a} />
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-neutral-400 font-light italic">
            No articles found in Sanity. Please check your Studio.
          </div>
        )}
      </div>

      {/* Apple-Style Glassmorphism Glossary CTA */}
      <section className="relative mt-32">
        {/* Dekorasi Background - Memberikan objek untuk di-blur oleh efek glass */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-0 right-[10%] w-64 h-64 bg-blue-400/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-[10%] w-72 h-72 bg-indigo-300/20 rounded-full blur-[90px]" />
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-3xl p-8 md:p-14 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] group transition-all duration-500 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:border-white/80">
          {/* Efek Inner Glow pada Kaca */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-neutral-900 flex items-center justify-center shadow-lg shadow-neutral-900/20">
                  <Book size={20} className="text-white" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500/80">Resource Hub</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-serif mb-4 leading-tight text-neutral-900">
                Master the Local <span className="text-neutral-400 italic font-light tracking-tight">Maritime</span> Vocabulary
              </h3>
              
              <p className="text-neutral-500 text-lg font-light leading-relaxed">
                From &apos;Inaportnet&apos; to &apos;Deadweight Tonnage&apos;, navigate the local industry jargon with precision.
              </p>
            </div>
            
            <Link 
              href="/glossary" 
              className="group/btn relative inline-flex items-center gap-3 bg-neutral-900 text-white px-9 py-5 rounded-[2rem] text-sm font-bold shadow-2xl shadow-neutral-900/20 hover:bg-black hover:shadow-neutral-900/40 transition-all duration-300 active:scale-95"
            >
              <span>Explore Glossary</span>
              <ChevronRight size={18} className="transition-all duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}