import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Providers } from "@/components/layout/providers";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistMono.variable} antialiased font-sans noise`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
