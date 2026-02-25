"use client";

import { Search, BookOpen, CreditCard, User, HelpCircle, MessageCircle } from "lucide-react";

export default function HelpPage() {
  const categories = [
    {
      title: "Getting Started",
      icon: <User className="h-6 w-6 text-blue-600" />,
      links: ["Cara mendaftar akun", "Masalah saat Login", "Mengatur profil student"]
    },
    {
      title: "Learning & Courses",
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      links: ["Cara akses video materi", "Mengunduh modul operasional", "Sertifikat penyelesaian"]
    },
    {
      title: "Payments",
      icon: <CreditCard className="h-6 w-6 text-orange-600" />,
      links: ["Metode pembayaran tersedia", "Cara konfirmasi pembayaran", "Kebijakan refund"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section ala Medium */}
      <div className="bg-neutral-50 py-20 px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">How can we help?</h1>
          <div className="relative max-w-[600px] mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input 
              type="text"
              placeholder="Search for articles (e.g. login, payment, certificate...)"
              className="w-full rounded-full border border-neutral-200 py-4 pl-12 pr-6 shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid Kategori */}
      <div className="mx-auto max-w-[1000px] px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {categories.map((cat, i) => (
            <div key={i} className="space-y-4">
              <div className="mb-4">{cat.icon}</div>
              <h2 className="text-xl font-bold text-neutral-900">{cat.title}</h2>
              <ul className="space-y-3">
                {cat.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-neutral-600 hover:text-blue-600 hover:underline transition-all">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="mt-20 rounded-2xl bg-blue-50 p-8 text-center">
          <MessageCircle className="mx-auto h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-bold text-neutral-900">Still need help?</h3>
          <p className="text-sm text-neutral-600 mb-6">Our team is ready to assist you with any operational questions.</p>
          <button className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}