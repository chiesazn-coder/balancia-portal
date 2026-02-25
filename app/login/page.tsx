"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)]">
      <div className="w-full max-w-sm p-8 border border-neutral-200 rounded-2xl shadow-sm bg-white">
        <h1 className="text-2xl font-bold mb-6 text-neutral-900">Sign In</h1>
        
        {/* Form Credentials kamu yang lama di sini... */}
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neutral-200"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-neutral-500">Or continue with</span></div>
        </div>

        {/* Tombol Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-all"
        >
          <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-5 w-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}