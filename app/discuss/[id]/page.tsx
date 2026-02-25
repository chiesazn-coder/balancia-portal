"use client";

import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ThumbsUp, 
  Share2, 
  MessageCircle, 
  Send,
  MoreHorizontal,
  Clock
} from "lucide-react";
import { useState } from "react";
import Container from "@/components/Container";

// 1. Definisikan Interface untuk struktur Data Diskusi
interface Comment {
  id: number;
  author: string;
  role: string;
  text: string;
  time: string;
  likes: number;
}

interface ThreadDetail {
  author: string;
  role: string;
  title: string;
  content: string;
  category: string;
  port: string;
  time: string;
  likes: number;
  comments: Comment[];
}

// 2. Gunakan Record dengan Type ThreadDetail
const threads: Record<string, ThreadDetail> = {
  "1": {
    author: "Capt. Haryanto",
    role: "Ship Master",
    title: "Congestion at Cigading Pier 2 - Any updates?",
    content: "We've been at the anchorage for 24 hours. Anyone has info on the current discharge rate for bulk carriers? The agent mentioned some technical issues with the shore crane.",
    category: "Operations",
    port: "Cigading",
    time: "2h ago",
    likes: 8,
    comments: [
      { id: 101, author: "Budi Santoso", role: "Port Dispatcher", text: "Shore crane #3 is currently under maintenance. Expected to resume at 22:00 LT tonight.", time: "45m ago", likes: 3 },
      { id: 102, author: "Agus Pratama", role: "Ship Agent", text: "Confirmed. We are monitoring the queue. You are currently #2 in the line after MV Ocean Star.", time: "10m ago", likes: 1 }
    ]
  }
};

export default function DiscussionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const thread = threads[id as string];
  const [newComment, setNewComment] = useState("");

  if (!thread) return <Container className="py-20 text-center text-neutral-400">Discussion not found.</Container>;

  return (
    <Container className="pt-10 pb-20 max-w-[800px]">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-all mb-10"
      >
        <ArrowLeft size={16} /> Back to Feed
      </button>

      <article className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-500 border border-neutral-200">
              {thread.author[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900">{thread.author}</p>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{thread.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-neutral-300">
            <Clock size={14} />
            <span className="text-xs font-medium">{thread.time}</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-neutral-900 mb-6 leading-tight">
          {thread.title}
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
          {thread.content}
        </p>

        <div className="flex items-center gap-6 py-6 border-y border-neutral-50">
          <button className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-blue-600 transition-colors">
            <ThumbsUp size={18} /> {thread.likes}
          </button>
          <button className="flex items-center gap-2 text-sm font-bold text-neutral-500">
            <MessageCircle size={18} /> {thread.comments.length}
          </button>
          <button className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors ml-auto">
            <Share2 size={18} />
          </button>
        </div>
      </article>

      <section>
        <h2 className="text-sm font-black text-neutral-300 uppercase tracking-[0.2em] mb-8">
          Comments ({thread.comments.length})
        </h2>

        <div className="relative mb-12">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add to the discussion..."
            className="w-full bg-neutral-50 border border-neutral-100 rounded-[24px] p-6 text-sm outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 transition-all min-h-[120px] resize-none"
          />
          <button className="absolute bottom-4 right-4 h-10 w-10 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all">
            <Send size={18} />
          </button>
        </div>

        <div className="space-y-8">
          {/* 3. Mapping yang sekarang sudah Type-Safe (otomatis mendeteksi tipe Comment) */}
          {thread.comments.map((comment) => (
            <div key={comment.id} className="group">
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-400 flex-shrink-0">
                  {comment.author[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-neutral-900">{comment.author}</span>
                      <span className="text-[10px] font-bold text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded uppercase">
                        {comment.role}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-neutral-300">{comment.time}</span>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-3">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-blue-600">
                      <ThumbsUp size={12} /> {comment.likes}
                    </button>
                    <button className="text-xs font-bold text-neutral-300 hover:text-neutral-900">Reply</button>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-neutral-300 transition-opacity">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}