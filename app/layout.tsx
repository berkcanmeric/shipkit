import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/layout/providers";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const siteUrl = "https://shipkit.dev";

export const metadata: Metadata = {
  title: "ShipKit — The Vibe Coder's Toolkit",
  description:
    "Stop learning. Start shipping. Every tool, prompt, MCP, library, and shortcut you need to build and launch apps at lightning speed.",
  keywords: [
    "developer tools",
    "AI prompts",
    "MCP",
    "Claude",
    "Next.js",
    "React",
    "vibe coding",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "ShipKit — The Vibe Coder's Toolkit",
    description:
      "Stop learning. Start shipping. Every tool, prompt, MCP, library, and shortcut you need to build and launch apps at lightning speed.",
    url: siteUrl,
    siteName: "ShipKit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShipKit — The Vibe Coder's Toolkit",
    description:
      "Stop learning. Start shipping. Every tool, prompt, MCP, library, and shortcut you need to build and launch apps at lightning speed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${satoshi.variable} ${geistMono.variable} antialiased font-sans noise`}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
