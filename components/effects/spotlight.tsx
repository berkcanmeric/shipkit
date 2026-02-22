"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export function Spotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return; // skip if a frame is already queued
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      if (!divRef.current || !gradientRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gradientRef.current.style.background =
        `radial-gradient(800px circle at ${x}px ${y}px, rgba(0, 240, 255, 0.06), transparent 40%)`;
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (gradientRef.current) gradientRef.current.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (gradientRef.current) gradientRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        ref={gradientRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500"
      />
      {children}
    </div>
  );
}
