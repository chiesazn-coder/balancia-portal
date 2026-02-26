import Container from "@/components/Container";
import Link from "next/link";
import Image from "next/image"; 
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; 
import { POST_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";

function formatFullDate(iso: string) {
  if (!iso) return "N/A";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface PostSlug {
  slug: string;
}

export async function generateStaticParams() {
  const posts = await client.fetch<PostSlug[]>(POSTS_QUERY);
  return posts.map((p) => ({ 
    slug: p.slug 
  }));
}

export const dynamicParams = true;

type PostDetail = {
  title: string;
  excerpt?: string;
  updatedAt: string;
  body: PortableTextBlock[];
  categories?: { _id: string; title: string }[];
};

const ptComponents: PortableTextComponents = {
  types: {
    // Ini tetap dipertahankan agar gambar di dalam Body muncul
    image: ({ value }) => (
      <div className="my-12 overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || "Article image"}
          width={1200}
          height={700}
          className="w-full h-auto object-cover"
        />
        {value.caption && (
          <p className="mt-4 text-center text-sm font-sans text-neutral-500 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="mt-8 text-[20px] leading-[1.6] font-serif text-neutral-800 antialiased font-light">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-[28px] font-sans font-bold leading-tight tracking-tight text-neutral-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-[22px] font-sans font-bold leading-tight text-neutral-900">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-3 border-neutral-900 pl-6 text-[24px] font-serif italic leading-[1.4] text-neutral-500">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-8 list-disc space-y-4 pl-6 text-[20px] font-serif leading-[1.6] text-neutral-800 font-light">
        {children}
      </ul>
    ),
  },
};

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post: PostDetail | null = await client.fetch(
    POST_QUERY, 
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!post) {
    return notFound();
  }

  const category = post.categories?.[0]?.title;

  return (
    <Container className="pt-20 pb-32">
      <div className="mx-auto w-full max-w-[700px]">
        <header>
          <div className="flex items-center gap-2 mb-10">
            <Link 
              href="/knowledge" 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              Knowledge Base
            </Link>
            <span className="text-neutral-200 text-[10px]">/</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
              {category || "Article"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight leading-[1.1] text-neutral-900 antialiased">
            {post.title}
          </h1>

          {/* BAGIAN MAIN IMAGE DI SINI SUDAH DIHAPUS */}

          {post.excerpt && (
            <p className="mt-10 text-2xl leading-[1.4] text-neutral-500 font-light font-sans">
              {post.excerpt}
            </p>
          )}

          <div className="mt-10 flex items-center gap-4">
            <div className="h-11 w-11 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-400 uppercase">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-neutral-900">Balancia Editorial</span>
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-light">
                <span>{formatFullDate(post.updatedAt)}</span>
                <span>•</span>
                <span>5 min read</span>
              </div>
            </div>
          </div>

          <div className="mt-12 h-[1px] w-full bg-neutral-100" />
        </header>

        <article className="mt-4">
          {post.body ? (
            <PortableText value={post.body} components={ptComponents} />
          ) : (
            <p className="text-neutral-400 italic font-serif mt-10">This article has no content yet.</p>
          )}
        </article>

        <div className="mt-24 relative overflow-hidden rounded-[2.5rem] bg-neutral-900 p-10 md:p-14 text-white shadow-2xl">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Operational Support</span>
            </div>
            <h3 className="text-3xl font-serif font-medium mb-4 leading-tight">
              Discuss an Upcoming Port Call
            </h3>
            <p className="text-neutral-400 text-lg font-light leading-relaxed mb-10 max-w-lg">
              If operational clarification is needed regarding <span className="text-white italic underline underline-offset-4">{post.title}</span>, 
              a short discussion can be arranged without commercial pressure.
            </p>
            <Link
              href="/discuss"
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-bold text-neutral-900 hover:bg-neutral-200 transition-all active:scale-95 shadow-xl"
            >
              Request Operational Clarification
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}