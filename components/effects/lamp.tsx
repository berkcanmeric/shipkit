"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LampContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Lamp cone */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0.3, width: "8rem" }}
          whileInView={{ opacity: 1, width: "20rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 h-48 bg-gradient-to-b from-cyan/30 to-transparent blur-2xl"
          style={{
            clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0% 100%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0.3, width: "12rem" }}
          whileInView={{ opacity: 1, width: "28rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 h-48 bg-gradient-to-b from-cyan/15 to-transparent blur-3xl"
          style={{
            clipPath: "polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
          }}
        />
        {/* Lamp glow line */}
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "16rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="h-[2px] bg-cyan shadow-[0_0_20px_rgba(0,240,255,0.5)]"
        />
      </div>
      <div className="relative pt-12">{children}</div>
    </div>
  );
}
