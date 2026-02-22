"use client";

import { cn } from "@/lib/utils";

export function MovingBorder({
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  className,
  duration = 3000,
  ...props
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  className?: string;
  duration?: number;
} & Record<string, unknown>) {
  return (
    <Component
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-xl p-[1px]",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute top-1/2 left-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_var(--border-speed)_linear_infinite]",
          borderClassName
        )}
        style={{
          background: `conic-gradient(from 0deg, transparent 60%, #00f0ff 80%, #a855f7 90%, transparent 100%)`,
          "--border-speed": `${duration}ms`,
          willChange: "transform",
        } as React.CSSProperties}
      />
      <span
        className={cn(
          "relative z-10 flex items-center gap-2 rounded-[11px] px-6 py-3 text-sm font-semibold",
          className
        )}
      >
        {children}
      </span>
    </Component>
  );
}
