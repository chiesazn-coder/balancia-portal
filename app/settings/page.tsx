"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { User, Mail, Lock, Bell, CreditCard } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Membership", icon: CreditCard },
  ];

  return (
    <div className="mx-auto max-w-[800px] px-6 py-12">
      <h1 className="text-4xl font-bold text-neutral-900 mb-8">Settings</h1>

      {/* Tab Navigation ala Medium */}
      <div className="flex gap-8 border-b border-neutral-100 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "border-b-2 border-neutral-900 text-neutral-900"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-10">
        {activeTab === "account" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-neutral-900">Email address</p>
                <p className="text-sm text-neutral-500">{session?.user?.email}</p>
              </div>
              <button className="text-sm text-neutral-500 hover:text-neutral-900 border border-neutral-200 px-3 py-1 rounded-full">
                Edit
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-neutral-900">Username</p>
                <p className="text-sm text-neutral-500">@{session?.user?.name?.toLowerCase().replace(/\s/g, "")}</p>
              </div>
              <button className="text-sm text-neutral-500 hover:text-neutral-900 border border-neutral-200 px-3 py-1 rounded-full">
                Edit
              </button>
            </div>

            <div className="pt-4">
              <p className="text-sm font-semibold text-red-600 mb-2">Danger Zone</p>
              <button className="text-sm text-red-500 hover:text-red-700">
                Delete account
              </button>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-neutral-900">Email Notifications</p>
                <p className="text-sm text-neutral-500">Get updates on new courses and port news.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-neutral-300 accent-blue-600" />
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="text-center py-12 border-2 border-dashed border-neutral-100 rounded-2xl animate-in fade-in duration-500">
            <CreditCard className="mx-auto h-12 w-12 text-neutral-200 mb-4" />
            <p className="text-neutral-500 text-sm">You are currently on a free plan.</p>
            <p className="text-xs text-neutral-400 mt-1">Upgrade to access premium courses.</p>
          </div>
        )}
      </div>
    </div>
  );
}