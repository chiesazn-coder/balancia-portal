import Container from "@/components/Container";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { client } from "@/sanity/lib/client";
import { POST_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";

// Helper untuk format tanggal
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

/**
 * Pre-render semua slug yang ada di Sanity (SSG)
 */
export async function generateStaticParams() {
  // Berikan tipe data PostSlug[] pada fetch
  const posts = await client.fetch<PostSlug[]>(POSTS_QUERY);
  
  // Sekarang p.slug sudah dikenali sebagai string, bukan any
  return posts.map((p) => ({ 
    slug: p.slug 
  }));
}

// Ubah ke true agar artikel baru di Sanity otomatis muncul tanpa build ulang
export const dynamicParams = true;

// Definisi tipe data yang lebih aman
type PostDetail = {
  title: string;
  excerpt?: string;
  updatedAt: string;
  body: PortableTextBlock[];
  categories?: { _id: string; title: string }[];
};

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-[18px] leading-[1.85] text-neutral-800">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-[22px] font-semibold leading-snug tracking-tight text-neutral-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-[18px] font-semibold leading-snug text-neutral-900">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-neutral-200 pl-5 text-[18px] italic leading-[1.85] text-neutral-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-[18px] leading-[1.85] text-neutral-800">
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
  // 1. Await params (Wajib di Next.js 15)
  const { slug } = await params;

  // 2. Fetch data dengan cache revalidation (agar data fresh)
  const post: PostDetail | null = await client.fetch(
    POST_QUERY, 
    { slug },
    { next: { revalidate: 60 } } // Cache 60 detik
  );

  // 3. Jika post null, langsung lempar ke 404
  if (!post) {
    return notFound();
  }

  const category = post.categories?.[0]?.title;

  return (
    <Container className="pt-10 pb-16">
      <div className="mx-auto w-full max-w-2xl">
        <header>
          <div className="flex items-center gap-2 mb-6">
            <Link 
              href="/knowledge" 
              className="text-xs font-medium text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              Knowledge Base
            </Link>
            <span className="text-neutral-300 text-xs">/</span>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {category || "Article"}
            </span>
          </div>

          <h1 className="mt-3 text-4xl font-bold tracking-tight leading-tight text-neutral-900">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-xl leading-8 text-neutral-600 font-medium">
              {post.excerpt}
            </p>
          )}

          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <div className="h-1 w-1 rounded-full bg-neutral-300" />
            Updated {formatFullDate(post.updatedAt)}
          </div>

          <div className="mt-8 h-px w-full bg-neutral-100" />
        </header>

        {/* Article body dengan safety check */}
        <article className="mt-10">
          {post.body ? (
            <PortableText value={post.body} components={ptComponents} />
          ) : (
            <p className="text-neutral-400 italic">This article has no content yet.</p>
          )}
        </article>

        {/* CTA box */}
        <div className="mt-20 rounded-[32px] bg-neutral-50 border border-neutral-100 p-8">
          <h3 className="text-lg font-bold text-neutral-900">Discuss an Upcoming Port Call</h3>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            If operational clarification is needed regarding <strong>{post.title}</strong>, 
            a short discussion can be arranged without commercial pressure.
          </p>
          <div className="mt-6">
            <Link
              href="/discuss"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-bold text-white hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-200"
            >
              Request Operational Clarification
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}