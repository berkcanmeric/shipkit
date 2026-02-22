"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquareText,
  Bot,
  Puzzle,
  Globe,
  Smartphone,
  Monitor,
  Workflow,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/navigation";

const iconMap: Record<string, React.ElementType> = {
  MessageSquareText,
  Bot,
  Puzzle,
  Globe,
  Smartphone,
  Monitor,
  Workflow,
};

export function Navbar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="mx-auto max-w-7xl px-4 pt-4">
          <nav className="rounded-2xl px-4 py-3 flex items-center justify-between bg-background/80 backdrop-blur-xl border border-white/[0.08]">
            <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="ShipKit home">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-violet flex items-center justify-center" aria-hidden="true">
                <span className="text-sm font-bold text-black">S</span>
              </div>
              <span className="font-bold text-lg tracking-tight">ShipKit</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = iconMap[item.icon];
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                  className={cn(
                      "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5",
                      isActive
                        ? "text-cyan bg-cyan/10 border border-cyan/20"
                        : "text-muted-foreground hover:text-foreground border border-transparent"
                    )}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg glass transition-colors"
                aria-label="Search (⌘K)"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-background/50 px-1.5 text-[10px] font-medium text-muted-foreground" aria-hidden="true">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 text-muted-foreground hover:text-foreground"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-20 z-40 mx-4 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <nav className="glass rounded-2xl p-4 space-y-1" aria-label="Mobile navigation">
            <button
              onClick={() => { setMobileOpen(false); onOpenSearch(); }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors w-full"
            >
              <Search className="w-4 h-4" />
              Search...
            </button>
            <div className="border-t border-white/[0.06] my-1" />
            {navItems.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "text-cyan bg-cyan/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
