"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard } from "@/lib/copy-to-clipboard";

interface ToolCardProps {
  name: string;
  description: string;
  url: string;
  installCommand?: string;
  tags: string[];
  index: number;
  extra?: React.ReactNode;
}

export function ToolCard({
  name,
  description,
  url,
  installCommand,
  tags,
  index,
  extra,
}: ToolCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!installCommand) return;
    await copyToClipboard(installCommand, "Install command");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      className="group glass rounded-2xl p-5 hover:border-cyan/20 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-base">{name}</h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-cyan transition-colors shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <p className="text-sm text-muted-foreground mb-3 flex-1">{description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {extra}
      </div>

      {installCommand && (
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/50 border border-border/50 hover:border-cyan/30 hover:bg-cyan/5 transition-all group/btn w-full"
        >
          <code className="text-xs text-muted-foreground truncate flex-1 text-left font-mono">
            {installCommand}
          </code>
          {copied ? (
            <Check className="w-4 h-4 text-green-400 shrink-0" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground group-hover/btn:text-cyan shrink-0" />
          )}
        </button>
      )}
    </motion.div>
  );
}
