import type { ArticleBlock } from "@/lib/content";
import NextImage from "next/image";

export default function ArticleRenderer({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <article className="mt-10 text-neutral-900">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="mt-5 text-[18px] leading-[1.85] text-neutral-800">
                {block.text}
              </p>
            );

          case "h2":
            return (
              <h2 key={i} className="mt-10 text-[22px] font-semibold leading-snug tracking-tight">
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3 key={i} className="mt-8 text-[18px] font-semibold leading-snug">
                {block.text}
              </h3>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="my-8 border-l-4 border-neutral-200 pl-5 text-[18px] leading-[1.85] text-neutral-700"
              >
                {block.text}
              </blockquote>
            );

          case "ul":
            return (
              <ul key={i} className="mt-5 list-disc space-y-2 pl-6 text-[18px] leading-[1.85] text-neutral-800">
                {block.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            );

          case "image":
            return (
              <figure key={i} className="my-10">
                <div className="overflow-hidden rounded-2xl border border-neutral-200">
                  <NextImage
                    src={block.src}
                    alt={block.alt}
                    width={1200}
                    height={675}
                    className="h-auto w-full"
                    priority={i === 0}
                  />
                </div>
                {/* optional caption ala Medium */}
                {block.alt ? (
                  <figcaption className="mt-3 text-center text-xs leading-5 text-neutral-500">
                    {block.alt}
                  </figcaption>
                ) : null}
              </figure>
            );

          default:
            return null;
        }
      })}
    </article>
  );
}