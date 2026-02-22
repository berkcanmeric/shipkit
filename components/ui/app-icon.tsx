"use client";

import { useState, memo } from "react";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "w-6 h-6 rounded-[6px] text-[10px]",
  md: "w-8 h-8 rounded-[8px] text-xs",
  lg: "w-10 h-10 rounded-[10px] text-sm",
};

const sizePx = { sm: 24, md: 32, lg: 40 };

export const AppIcon = memo(function AppIcon({
  src,
  name,
  size = "md",
  className,
}: {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  // Fallback: show first letter with a gradient
  if (!src || failed) {
    return (
      <div
        className={cn(
          "shrink-0 flex items-center justify-center font-bold bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-white/70",
          sizeClasses[size],
          className
        )}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={sizePx[size]}
      height={sizePx[size]}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn(
        "shrink-0 object-contain bg-white/5",
        sizeClasses[size],
        className
      )}
    />
  );
});
