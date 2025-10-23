import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  title: "Linkly - URL Shortener",
  description: "Create short links in seconds with Linkly - A modern, fast URL shortener",
  keywords: ["url shortener", "short link", "link shortener", "shorten url", "tiny url"],
  authors: [{ name: "Linkly" }],
  creator: "Linkly",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Linkly - URL Shortener",
    description: "Create short links in seconds with Linkly - A modern, fast URL shortener",
    siteName: "Linkly",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkly - URL Shortener",
    description: "Create short links in seconds with Linkly - A modern, fast URL shortener",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
