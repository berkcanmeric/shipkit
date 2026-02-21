"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink, CheckCircle2, Circle } from "lucide-react";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import type { SetupItem } from "@/data/setup";

export function SetupCard({ item, index }: { item: SetupItem; index: number }) {
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState(false);

  const handleCopy = async () => {
    if (!item.command) return;
    await copyToClipboard(item.command, "Command");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group flex items-start gap-4 glass rounded-2xl p-4 hover:border-cyan/20 transition-all duration-300"
    >
      <button
        onClick={() => setDone(!done)}
        className="mt-0.5 shrink-0 text-muted-foreground hover:text-cyan transition-colors"
      >
        {done ? (
          <CheckCircle2 className="w-5 h-5 text-green-400" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className={`font-semibold text-sm ${done ? "line-through text-muted-foreground" : ""}`}>
            {item.name}
          </h3>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-cyan transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-2">{item.description}</p>

        {item.command && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 border border-border/50 hover:border-cyan/30 hover:bg-cyan/5 transition-all group/btn w-full"
          >
            <code className="text-xs text-muted-foreground truncate flex-1 text-left font-mono">
              {item.command}
            </code>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-cyan shrink-0" />
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
