"use client";

import { useState, memo } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import type { Prompt } from "@/data/prompts";

const categoryColors: Record<string, string> = {
  setup: "bg-emerald-500",
  ui: "bg-violet",
  api: "bg-cyan",
  mobile: "bg-blue-500",
  testing: "bg-amber-500",
  deploy: "bg-orange-500",
  debug: "bg-red-500",
  docs: "bg-slate-400",
};

export const PromptCard = memo(function PromptCard({
  prompt,
  featured = false,
}: {
  prompt: Prompt;
  index: number;
  featured?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(prompt.prompt, "Prompt");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accentColor = categoryColors[prompt.category] || "bg-cyan";

  return (
    <div
      className={`group relative rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${
        featured
          ? "glass-prominent hover:border-cyan/30"
          : "glass hover:border-cyan/20"
      }`}
    >
      {/* Left accent stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${accentColor} opacity-60`} />

      <div className="flex items-center gap-3 px-4 pl-5 py-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold ${featured ? "text-base" : "text-sm"}`}>
              {prompt.title}
            </h3>
            <Badge variant="outline" className="text-[10px] text-cyan border-cyan/30 px-1.5 py-0">
              {prompt.bestWith}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
            {prompt.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-muted-foreground/60 flex items-center gap-0.5">
            <ThumbsUp className="w-2.5 h-2.5" />
            {prompt.upvotes}
          </span>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="p-2.5 rounded-lg glass-subtle hover:bg-cyan/10 transition-colors"
            aria-label={copied ? "Copied prompt" : `Copy ${prompt.title} prompt`}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground group-hover:text-cyan" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
});
