import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar"; 
import { Providers } from "@/components/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-white text-neutral-900 antialiased">
        <Providers>
          <Navbar />
          {/* Container utama untuk membagi Sidebar dan Content */}
          <div className="mx-auto flex max-w-[1400px]">
            <Sidebar /> 
            <main className="flex-1 min-h-[calc(100vh-56px)] border-l border-neutral-100 bg-white">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}