"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  FlaskConical,
  Rocket,
  Palette,
  ClipboardList,
  Shield,
  FileText,
  Zap,
  Server,
  GitPullRequest,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import type { Agent } from "@/data/agents";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  FlaskConical,
  Rocket,
  Palette,
  ClipboardList,
  Shield,
  FileText,
  Zap,
  Server,
  GitPullRequest,
};

export function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const Icon = iconMap[agent.icon] || Code2;

  const handleCopy = async () => {
    await copyToClipboard(agent.systemPrompt, "System prompt");
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
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan/10 to-violet/10 border border-cyan/10 shrink-0">
          <Icon className="w-5 h-5 text-cyan" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-base">{agent.name}</h3>
            <Badge variant="outline" className="text-xs text-cyan border-cyan/30">
              {agent.recommendedModel}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-1">{agent.role}</p>
          <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {agent.starters.map((starter) => (
              <button
                key={starter}
                onClick={() => copyToClipboard(starter, "Starter")}
                className="text-xs px-3 py-1.5 rounded-lg glass hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
              >
                &quot;{starter}&quot;
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:bg-cyan/10 hover:border-cyan/30 text-sm transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy System Prompt
                </>
              )}
            </button>

            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" /> Hide
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" /> Preview
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mt-4"
        >
          <pre className="text-xs text-muted-foreground bg-background/50 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap border border-border/50 max-h-64 overflow-y-auto">
            {agent.systemPrompt}
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
}
