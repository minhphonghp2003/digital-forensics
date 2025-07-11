import AppContextProvider from "@/app/app-context-provider";
import NavBar from "@/components/layout/nav-bar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phong Digital Forensic",
  description: "Nguyen Minh Phong - AT18N0132 - Digital Forensic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <AppContextProvider>
          <Suspense>
            <NavBar />
            <div className="container mx-auto p-4 mt-16">
              {children}
            </div>
          </Suspense>
        </AppContextProvider>
        <Toaster richColors />

      </body>
    </html>
  );
}
