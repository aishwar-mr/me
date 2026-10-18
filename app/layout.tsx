import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site, siteUrl } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Aishwar Mishra — Product & Strategy Expert";
const description =
  "Aishwar Mishra turns ambiguous problems into decisions people can act on — pricing models, programs, and product teardowns for fast-growing startups.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Aishwar Mishra",
  },
  description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Aishwar Mishra",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: site.socials.x.replace("https://x.com/", "@"),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-bg focus:px-4 focus:py-2 focus:text-sm focus:uppercase focus:tracking-widest focus:text-text focus:outline focus:outline-2 focus:outline-text"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
