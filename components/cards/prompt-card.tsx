"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ChevronDown, ChevronUp, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import type { Prompt } from "@/data/prompts";

export function PromptCard({ prompt, index }: { prompt: Prompt; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(prompt.prompt, "Prompt");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group glass rounded-2xl p-5 hover:border-cyan/20 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base mb-1">{prompt.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {prompt.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            {prompt.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            <Badge variant="outline" className="text-xs text-cyan border-cyan/30">
              {prompt.bestWith}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="p-2.5 rounded-xl glass hover:bg-cyan/10 hover:border-cyan/30 transition-all duration-200"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground group-hover:text-cyan" />
            )}
          </button>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <ThumbsUp className="w-3 h-3" />
            {prompt.upvotes}
          </div>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {expanded ? (
          <>
            <ChevronUp className="w-3 h-3" /> Hide prompt
          </>
        ) : (
          <>
            <ChevronDown className="w-3 h-3" /> Show prompt
          </>
        )}
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3"
        >
          <div className="relative">
            <pre className="text-xs text-muted-foreground bg-background/50 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap border border-border/50 max-h-64 overflow-y-auto">
              {prompt.prompt}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-background/80 hover:bg-cyan/10 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
