"use client";

import { useState, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ThumbsUp, ChevronDown, ChevronRight } from "lucide-react";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import type { Prompt } from "@/data/prompts";

const categoryColors: Record<string, string> = {
  audit: "bg-cyan",
  setup: "bg-emerald-500",
  ui: "bg-violet",
  api: "bg-cyan",
  mobile: "bg-blue-500",
  testing: "bg-amber-500",
  deploy: "bg-orange-500",
  debug: "bg-red-500",
  docs: "bg-slate-400",
};

/**
 * Parse a prompt string into an intro block + named sections.
 * Splits on ## headings — each section gets a title and body.
 */
function parsePromptSections(raw: string) {
  const lines = raw.split("\n");
  const sections: { title: string; body: string }[] = [];
  let currentTitle = "";
  let currentLines: string[] = [];

  const flush = () => {
    const body = currentLines.join("\n").trim();
    if (currentTitle || body) {
      sections.push({ title: currentTitle, body });
    }
    currentLines = [];
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      currentTitle = line.replace(/^##\s+/, "");
    } else {
      currentLines.push(line);
    }
  }
  flush();

  return sections;
}

function PromptSection({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);

  // No title means it's the intro block — always show
  if (!title) {
    return (
      <div className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
        {body}
      </div>
    );
  }

  return (
    <div className="border border-white/[0.06] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-white/[0.03] transition-colors"
      >
        {open ? (
          <ChevronDown className="w-3 h-3 text-muted-foreground/50 shrink-0" />
        ) : (
          <ChevronRight className="w-3 h-3 text-muted-foreground/50 shrink-0" />
        )}
        <span className="text-xs font-medium text-foreground/80">{title}</span>
      </button>
      {open && (
        <div className="px-3 pb-3 pt-0">
          <pre className="text-[11px] text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {body}
          </pre>
        </div>
      )}
    </div>
  );
}

export const PromptCard = memo(function PromptCard({
  prompt,
  featured = false,
}: {
  prompt: Prompt;
  index: number;
  featured?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const sections = useMemo(() => parsePromptSections(prompt.prompt), [prompt.prompt]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
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

      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-3 px-4 pl-5 py-3 cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold ${featured ? "text-base" : "text-sm"}`}>
            {prompt.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
            {prompt.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-muted-foreground/60 flex items-center gap-0.5">
            <ThumbsUp className="w-2.5 h-2.5" />
            {prompt.upvotes}
          </span>

          <ChevronDown
            className={`w-3.5 h-3.5 text-muted-foreground/40 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />

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

      {expanded && (
        <div className="px-5 pb-4 space-y-2">
          {sections.map((section, i) => (
            <PromptSection key={i} title={section.title} body={section.body} />
          ))}
        </div>
      )}
    </div>
  );
});
