"use client";

import { useSession } from "next-auth/react";
import { UserCircle, Mail, Calendar, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="flex justify-center mt-20">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center mt-20">
        <p className="text-neutral-500 mb-4">Silakan login untuk melihat profil.</p>
        <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm">Login</a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[700px] px-6 py-12">
      {/* Header Profil */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold text-neutral-900">{session.user?.name}</h1>
          <p className="text-neutral-500">Student at Balancia Portal</p>
        </div>
        {session.user?.image ? (
          <img 
            src={session.user.image} 
            className="h-24 w-24 rounded-full border border-neutral-100 object-cover" 
            alt="profile" 
          />
        ) : (
          <UserCircle className="h-24 w-24 text-neutral-200" />
        )}
      </div>

      {/* Informasi Detail */}
      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">Account Details</h2>
          <div className="grid gap-4">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
              <Mail className="text-neutral-400" size={20} />
              <div>
                <p className="text-xs text-neutral-500">Email Address</p>
                <p className="text-sm font-medium">{session.user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
            <ShieldCheck className="text-neutral-400" size={20} />
            <div>
                <p className="text-xs text-neutral-500">Account Status</p>
                {/* Kita ganti jadi status umum */}
                <p className="text-sm font-medium text-neutral-600">Standard Member</p>
            </div>
            </div>
          </div>
        </section>

        {/* Statistik Belajar (Placeholder) */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">Learning Activity</h2>
          <div className="flex gap-4">
            <div className="flex-1 p-4 rounded-xl border border-neutral-100 text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-neutral-500">Courses Enrolled</p>
            </div>
            <div className="flex-1 p-4 rounded-xl border border-neutral-100 text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-neutral-500">Certificates</p>
            </div>
          </div>
        </section>

        <button className="text-sm text-blue-600 font-medium hover:underline">
          Edit Profile Information
        </button>
      </div>
    </div>
  );
}