import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "CMS Admin",
  description: "Manage Your ChillMountStays",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-poppins antialiased`}>
        <div className="bg-zinc-100 h-full lg:flex lg:flex-row flex-col space-y-4 lg:space-y-0 lg:p-12 gap-8 p-3">
          <div className="lg:h-screen">
            <Navbar />
          </div>
          <div className="rounded-xl w-full">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
