"use client";

import { useState } from "react";
import { 
  MessageSquare, 
  Search, 
  TrendingUp, 
  Plus, 
  MessageCircle, 
  ThumbsUp, 
  MoreHorizontal,
  X,
  Send,
  ChevronRight
} from "lucide-react";
import Container from "@/components/Container";
import Link from "next/link";

interface Thread {
  id: number;
  author: string;
  role: string;
  title: string;
  content: string;
  category: string;
  port: string;
  replies: number;
  likes: number;
  time: string;
}

export default function DiscussPage() {
  const [activeTab, setActiveTab] = useState("Latest");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [threads, setThreads] = useState<Thread[]>([
    {
      id: 1,
      author: "Capt. Haryanto",
      role: "Ship Master",
      title: "Congestion at Cigading Pier 2 - Any updates?",
      content: "We've been at the anchorage for 24 hours. Anyone has info on the current discharge rate for bulk carriers?",
      category: "Operations",
      port: "Cigading",
      replies: 12,
      likes: 8,
      time: "2h ago"
    },
    {
      id: 2,
      author: "Siti Aminah",
      role: "Port Agent",
      title: "New Inaportnet Update for Crew Change",
      content: "Just a heads up, there's a new mandatory field for crew vaccination certificates in the latest system update.",
      category: "Digital Tools",
      port: "All Ports",
      replies: 5,
      likes: 15,
      time: "5h ago"
    }
  ]);

  const [newPost, setNewPost] = useState({ title: "", content: "", category: "Operations" });

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return;
    const post: Thread = {
      id: Date.now(),
      author: "Guest User",
      role: "Professional",
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      port: "General",
      replies: 0,
      likes: 0,
      time: "Just now"
    };
    setThreads([post, ...threads]);
    setIsModalOpen(false);
    setNewPost({ title: "", content: "", category: "Operations" });
  };

  return (
    <Container className="pt-20 pb-32 max-w-[1000px]">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-neutral-900 text-white rounded-full flex items-center justify-center shadow-lg">
              <MessageSquare size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Community Feed</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-neutral-900 tracking-tight leading-tight">
            Discuss
          </h1>
          <p className="text-xl text-neutral-500 font-light leading-relaxed mt-4">
            Share updates, ask questions, and connect with maritime professionals.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-3 bg-neutral-900 text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-black transition-all shadow-xl shadow-neutral-900/10 active:scale-95 whitespace-nowrap"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Start Discussion
        </button>
      </header>

      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <nav className="flex gap-10 border-b border-neutral-100 mb-12">
            {["Latest", "Trending", "My Posts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-5 text-sm font-bold tracking-widest uppercase transition-all relative ${
                  activeTab === tab ? "text-neutral-900" : "text-neutral-300 hover:text-neutral-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
                )}
              </button>
            ))}
          </nav>

          <div className="space-y-16">
            {threads.map((thread) => (
              <Link href={`/discuss/${thread.id}`} key={thread.id} className="block group">
                <article>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-6 w-6 rounded-full bg-neutral-50 flex items-center justify-center text-[10px] font-black text-neutral-400 border border-neutral-100 uppercase">
                      {thread.author[0]}
                    </div>
                    <div className="text-[11px] uppercase tracking-widest font-black">
                      <span className="text-neutral-900">{thread.author}</span>
                      <span className="text-neutral-300 mx-2">•</span>
                      <span className="text-blue-600">{thread.category}</span>
                    </div>
                  </div>

                  <h2 className="text-3xl font-serif font-medium text-neutral-900 mb-3 leading-snug group-hover:text-neutral-600 transition-colors">
                    {thread.title}
                  </h2>
                  <p className="text-neutral-500 text-lg font-light leading-relaxed line-clamp-2 mb-6">
                    {thread.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                        <MessageCircle size={16} /> {thread.replies}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                        <ThumbsUp size={16} /> {thread.likes}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-200">{thread.time}</span>
                    </div>
                    <button className="text-neutral-300 hover:text-neutral-900 transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-12">
          <section>
            <h3 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <TrendingUp size={14} /> Trending Ports <div className="h-[1px] flex-grow bg-neutral-50" />
            </h3>
            <div className="space-y-6">
              {["Tanjung Priok", "Batam", "Cigading"].map((port, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-base font-serif font-medium text-neutral-800 group-hover:text-blue-600 transition-colors">{port}</span>
                  <ChevronRight size={14} className="text-neutral-200 group-hover:text-blue-600 transition-all" />
                </div>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[2.5rem] border border-neutral-100 bg-neutral-50/50 p-8 group">
            <div className="relative z-10">
              <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 mb-4 flex items-center gap-2">
                <Info size={14} /> Guidelines
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">
                Keep discussions professional. Focus on operational facts and mutual assistance.
              </p>
            </div>
          </section>

          <footer className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-widest text-neutral-300">
            <a href="#" className="hover:text-neutral-900">Privacy</a>
            <a href="#" className="hover:text-neutral-900">Terms</a>
            <a href="#" className="hover:text-neutral-900">Guidelines</a>
          </footer>
        </aside>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-neutral-900/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] p-12 animate-in fade-in zoom-in duration-500">
            <div className="relative z-10">
              <header className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-serif font-medium text-neutral-900">New Discussion</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-all">
                  <X size={24} className="text-neutral-400" />
                </button>
              </header>

              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-3 block ml-1">Topic Category</label>
                  <select 
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="w-full bg-transparent border-b border-neutral-200 py-3 text-lg font-medium outline-none focus:border-neutral-900 transition-all appearance-none cursor-pointer"
                  >
                    <option>Operations</option>
                    <option>Digital Tools</option>
                    <option>Regulations</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-3 block ml-1">Subject</label>
                  <input 
                    type="text" 
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    placeholder="What's happening?" 
                    className="w-full bg-transparent border-b border-neutral-200 py-3 text-2xl font-serif outline-none focus:border-neutral-900 transition-all placeholder:text-neutral-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-3 block ml-1">Details</label>
                  <textarea 
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    placeholder="Share the operational details..." 
                    className="w-full h-40 bg-neutral-50/50 rounded-[2rem] p-6 text-lg font-light outline-none border border-neutral-100 focus:border-neutral-900 focus:bg-white transition-all resize-none placeholder:text-neutral-300"
                  />
                </div>
              </div>
              <button onClick={handleCreatePost} className="w-full mt-12 bg-neutral-900 text-white py-6 rounded-[2rem] text-sm font-bold hover:bg-black transition-all flex items-center justify-center gap-3 shadow-2xl shadow-neutral-900/20 active:scale-[0.98]">
                Post to Feed <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

// Fixed Component Definition
function Info({ size, className = "" }: { size: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
  );
}