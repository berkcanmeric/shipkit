"use client";

import { useEffect, useMemo } from "react";
import { motion, stagger, useAnimate, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TextGenerateEffect({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const [scope, animate] = useAnimate();
  const wordsArray = useMemo(() => words.split(" "), [words]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      animate("span", { opacity: 1, filter: "blur(0px)" }, { duration: 0 });
    } else {
      animate(
        "span",
        { opacity: 1, filter: "blur(0px)" },
        { duration: 0.4, delay: stagger(0.08), ease: "easeOut" }
      );
    }
  }, [animate, prefersReducedMotion]);

  return (
    <motion.div ref={scope} className={cn("text-lg md:text-xl text-muted-foreground", className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          className={`inline-block mr-[0.3em] ${prefersReducedMotion ? "" : "opacity-0"}`}
          style={prefersReducedMotion ? undefined : { filter: "blur(4px)" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
