"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { useState } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { CommandPalette } from "./command-palette";

export function Providers({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan focus:text-black focus:font-medium focus:text-sm"
      >
        Skip to content
      </a>
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      <main id="main-content" className="pt-20 sm:pt-24">{children}</main>
      <Footer />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#111113",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#fafafa",
          },
        }}
      />
    </ThemeProvider>
  );
}
