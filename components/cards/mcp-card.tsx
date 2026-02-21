"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink, Puzzle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import type { MCP } from "@/data/mcps";

export function MCPCard({ mcp, index }: { mcp: MCP; index: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(mcp.installCommand, "Install command");
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
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan/10 to-violet/10 border border-cyan/10 shrink-0">
          <Puzzle className="w-5 h-5 text-cyan" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-base">{mcp.name}</h3>
            <a
              href={mcp.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-cyan transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{mcp.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {mcp.compatibility.map((c) => (
              <Badge key={c} variant="secondary" className="text-xs">
                {c}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-background/50 border border-border/50 hover:border-cyan/30 hover:bg-cyan/5 transition-all group/btn"
            >
              <code className="text-xs text-muted-foreground truncate flex-1 text-left font-mono">
                {mcp.installCommand}
              </code>
              {copied ? (
                <Check className="w-4 h-4 text-green-400 shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground group-hover/btn:text-cyan shrink-0" />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
