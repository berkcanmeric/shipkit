"use client";

import { motion } from "framer-motion";

export function PageHeader({
  title,
  description,
  accent,
}: {
  title: string;
  description: string;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
        {accent ? (
          <>
            {title}{" "}
            <span className="bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">
              {accent}
            </span>
          </>
        ) : (
          title
        )}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
    </motion.div>
  );
}
