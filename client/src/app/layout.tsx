import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/sections/Navbar";
// import { Footer } from "@/sections/Footer";
import { MyProvider } from "@/context/MyContext";
import { AuthProvider } from "@/context/AuthContext";
// import { ClerkProvider } from "@clerk/nextjs"; // Temporarily disabled

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Career Compass",
  description:
    "Career Compass - Honest career guidance for NEET/JEE/UPSC aspirants. Get realistic success predictions, explore backup options, and make informed career decisions.",
  openGraph: {
    title: "Career Compass",
    description:
      "Career Compass - Honest career guidance for NEET/JEE/UPSC aspirants. Get realistic success predictions, explore backup options, and make informed career decisions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <MyProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            suppressHydrationWarning={true}
          >
            <Navbar />
            {children}
          </body>
        </html>
      </MyProvider>
    </AuthProvider>
  );
}
