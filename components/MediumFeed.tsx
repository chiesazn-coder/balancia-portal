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
      <div className="border-b border-neutral-100 pb-12 mb-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight leading-[1.1] text-neutral-900">
            Indonesia Port Operations, <br/>
            <span className="text-neutral-400 italic font-light">Explained Clearly.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-500 font-light">
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
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-100 mb-8">
        <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
          <span className="border-b-2 border-neutral-900 py-4 text-neutral-900 cursor-pointer">For you</span>
          <span className="py-4 text-neutral-300 hover:text-neutral-600 cursor-pointer transition-colors">Featured</span>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-12">
        {items.map((p) => {
          const tag = p.categories?.[0]?.title;
          const cover = p.mainImage
            ? urlFor(p.mainImage).width(400).height(250).fit("crop").url()
            : null;

          return (
            <article key={p._id} className="group">
              <div className="flex items-start justify-between gap-8 md:gap-12">
                <div className="flex-1 min-w-0">
                  {/* Author Meta */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-5 w-5 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[8px] font-bold text-neutral-500 uppercase">
                      B
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-900">Balancia Editorial</span>
                    {tag && (
                      <>
                        <span className="text-neutral-200">•</span>
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{tag}</span>
                      </>
                    )}
                  </div>

                  <Link href={`/knowledge/${p.slug}`} className="no-underline block group">
                    <h2 className="text-2xl md:text-3xl font-serif font-medium leading-snug text-neutral-900 group-hover:text-neutral-600 transition-colors mb-3">
                      {p.title}
                    </h2>
                  </Link>

                  {p.excerpt ? (
                    <p className="line-clamp-2 text-lg font-light leading-relaxed text-neutral-500 mb-6">
                      {p.excerpt}
                    </p>
                  ) : null}

                  {/* Post Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[11px] font-medium text-neutral-400">
                      <span>{formatShortDate(p.updatedAt)}</span>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-neutral-300">
                      <Bookmark size={18} className="hover:text-neutral-900 cursor-pointer transition-colors" />
                      <MoreHorizontal size={18} className="hover:text-neutral-900 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Thumbnail ala Medium */}
                {cover && (
                  <div className="hidden sm:block shrink-0">
                    <div className="relative h-28 w-44 overflow-hidden rounded-xl bg-neutral-50 border border-neutral-100 group-hover:shadow-md transition-all duration-500">
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
              <div className="mt-12 border-b border-neutral-50" />
            </article>
          );
        })}
      </div>
    </div>
  );
}