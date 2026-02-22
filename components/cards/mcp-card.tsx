"use client";

import { useState, memo } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { AppIcon } from "@/components/ui/app-icon";
import type { MCP } from "@/data/mcps";

export const MCPCard = memo(function MCPCard({
  mcp,
  prominent = false,
}: {
  mcp: MCP;
  index: number;
  prominent?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(mcp.installCommand, "Install command");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 ${
        prominent
          ? "glass-prominent hover:border-cyan/30"
          : "glass hover:border-cyan/20"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <AppIcon src={mcp.iconUrl} name={mcp.name} size="md" />

        <h3 className="font-semibold text-sm flex-1">{mcp.name}</h3>

        {mcp.category === "essential" && (
          <Badge className="text-[10px] bg-cyan/10 text-cyan border-cyan/20 px-1.5 py-0">
            Essential
          </Badge>
        )}

        <a
          href={mcp.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground/50 hover:text-cyan transition-colors shrink-0 p-1"
          aria-label={`Open ${mcp.name} repository (opens in new tab)`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{mcp.description}</p>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-border/50 hover:border-cyan/30 hover:bg-cyan/5 transition-all group/btn w-full"
        aria-label={copied ? "Copied install command" : `Copy install command: ${mcp.installCommand}`}
      >
        <span className="text-green-400/60 text-xs font-mono">$</span>
        <code className="text-[11px] text-muted-foreground truncate flex-1 text-left font-mono">
          {mcp.installCommand}
        </code>
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-cyan shrink-0" />
        )}
      </motion.button>
    </div>
  );
});
