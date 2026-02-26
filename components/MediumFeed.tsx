"use client";

import Link from "next/link";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";
import { Bookmark, MoreHorizontal } from "lucide-react";

type PostItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  updatedAt: string;
  mainImage?: SanityImageSource;
  categories?: { _id: string; title: string }[];
};

function formatShortDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function MediumFeed({ items }: { items: PostItem[] }) {
  return (
    <div className="w-full">
      {/* Editorial Header Section */}
      <div className="border-b border-neutral-100 pb-12 mb-8 px-4 md:px-0">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight leading-[1.1] text-neutral-900">
            Indonesia Port Operations, <br className="hidden md:block"/>
            <span className="text-neutral-400 italic font-light">Explained Clearly.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-neutral-500 font-light">
            This portal is built as an operational reference. Practical context is shared
            to support ship operators and managers before any coordination starts.
          </p>

          <div className="mt-8">
            <Link
              href="/discuss"
              className="inline-flex rounded-full bg-neutral-900 px-6 py-3 text-sm font-bold text-white hover:bg-black transition-all shadow-lg shadow-neutral-200 active:scale-95"
            >
              Discuss an Upcoming Port Call
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs ala Medium - Minimalist Style */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-100 mb-8 px-4 md:px-0">
        <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
          <span className="border-b-2 border-neutral-900 py-4 text-neutral-900 cursor-pointer">For you</span>
          <span className="py-4 text-neutral-300 hover:text-neutral-600 cursor-pointer transition-colors">Featured</span>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-10 md:space-y-12 px-4 md:px-0">
        {items.map((p) => {
          const tag = p.categories?.[0]?.title;
          const cover = p.mainImage
            ? urlFor(p.mainImage).width(400).height(400).fit("crop").url()
            : null;

          return (
            <article key={p._id} className="group">
              {/* Layout Container: Flexbox tetap, tapi rasio berubah di mobile */}
              <div className="flex flex-row items-start justify-between gap-5 md:gap-12">
                
                <div className="flex-1 min-w-0">
                  {/* Author Meta */}
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <div className="h-5 w-5 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[8px] font-bold text-neutral-500 uppercase">
                      B
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-neutral-900">Balancia Editorial</span>
                    {tag && (
                      <>
                        <span className="text-neutral-200">•</span>
                        <span className="text-[9px] md:text-[10px] font-bold text-blue-600 uppercase tracking-widest">{tag}</span>
                      </>
                    )}
                  </div>

                  {/* Title: Lebih kecil di mobile supaya proporsional */}
                  <Link href={`/knowledge/${p.slug}`} className="no-underline block group">
                    <h2 className="text-xl md:text-3xl font-serif font-medium leading-snug text-neutral-900 group-hover:text-neutral-600 transition-colors mb-2 md:mb-3">
                      {p.title}
                    </h2>
                  </Link>

                  {/* Excerpt: Sembunyikan di layar sangat kecil jika perlu, atau tetap 2 baris */}
                  {p.excerpt ? (
                    <p className="line-clamp-2 text-sm md:text-lg font-light leading-relaxed text-neutral-500 mb-4 md:mb-6">
                      {p.excerpt}
                    </p>
                  ) : null}

                  {/* Post Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-[11px] font-medium text-neutral-400">
                      <span>{formatShortDate(p.updatedAt)}</span>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-neutral-300">
                      <Bookmark size={16} className="md:w-[18px] hover:text-neutral-900 cursor-pointer transition-colors" />
                      <MoreHorizontal size={16} className="md:w-[18px] hover:text-neutral-900 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Thumbnail: Muncul di Mobile (Square) & Desktop (Rect) */}
                {cover && (
                  <div className="shrink-0 mt-1">
                    <div className="relative 
                      h-16 w-16               /* Mobile: Kotak kecil (1:1) */
                      xs:h-20 xs:w-20 
                      sm:h-24 sm:w-32         /* Tablet: Mulai memanjang */
                      md:h-28 md:w-44         /* Desktop: Tetap seperti desain lama kamu */
                      overflow-hidden rounded-lg md:rounded-xl bg-neutral-50 border border-neutral-100 group-hover:shadow-md transition-all duration-500"
                    >
                      <Image 
                        src={cover} 
                        alt={p.title} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-10 md:mt-12 border-b border-neutral-50" />
            </article>
          );
        })}
      </div>
    </div>
  );
}