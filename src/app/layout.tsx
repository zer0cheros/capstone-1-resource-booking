import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import Navbar from "@/shared/components/layout/navbar";
import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import Footer from "@/shared/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resource Booking",
  description: "List and book resources",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-brand-light`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            {session?.user && <Navbar user={session?.user}/>}
            <main className="flex-1">
              {children}
            </main>
            {session?.user && <Footer />}
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
