import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { AuthProvider } from "@/context/AuthContext";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Seronel Properties | Premium Real Estate",
  description: "Discover your dream home with modern, premium real estate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 flex flex-col pt-20">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </AuthProvider>
      </body>
    </html>
  );
}
