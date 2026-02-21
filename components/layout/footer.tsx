"use client";

import Link from "next/link";
import { navItems } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-32">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
                <span className="text-sm font-bold text-black">S</span>
              </div>
              <span className="font-bold text-lg tracking-tight">ShipKit</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Stop learning. Start shipping.
              <br />
              Every tool. Every prompt. Every shortcut.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2">
              {navItems.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Tools</h4>
            <ul className="space-y-2">
              {navItems.slice(4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Built With</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Next.js</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>shadcn/ui</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Built for vibe coders who ship fast.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with Claude Code
          </p>
        </div>
      </div>
    </footer>
  );
}
