"use client";

import { cn } from "@/lib/utils";

export function AnimatedBorder({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan/20 via-violet/20 to-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan/10 via-violet/10 to-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">{children}</div>
    </div>
  );
}
