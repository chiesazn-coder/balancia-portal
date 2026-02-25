"use client";

import { SessionProvider } from "next-auth/react";
import React from "react"; // Tambahkan import React

// Tentukan tipe untuk props-nya
interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}