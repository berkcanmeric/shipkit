"use client";

import { useState, memo } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  ChevronDown,
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
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import type { Agent } from "@/data/agents";

const iconMap: Record<string, React.ElementType> = {
  Code2, FlaskConical, Rocket, Palette, ClipboardList,
  Shield, FileText, Zap, Server, GitPullRequest,
};

const roleColors: Record<string, { bg: string; border: string; text: string }> = {
  Code2: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
  FlaskConical: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400" },
  Rocket: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" },
  Palette: { bg: "bg-violet/10", border: "border-violet/20", text: "text-violet" },
  ClipboardList: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
  Shield: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400" },
  FileText: { bg: "bg-slate-400/10", border: "border-slate-400/20", text: "text-slate-400" },
  Zap: { bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400" },
  Server: { bg: "bg-cyan/10", border: "border-cyan/20", text: "text-cyan" },
  GitPullRequest: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" },
};

const defaultColor = { bg: "bg-cyan/10", border: "border-cyan/20", text: "text-cyan" };

export const AgentCard = memo(function AgentCard({ agent }: { agent: Agent; index: number }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[agent.icon] || Code2;
  const color = roleColors[agent.icon] || defaultColor;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await copyToClipboard(agent.systemPrompt, "System prompt");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group glass rounded-xl hover:border-cyan/20 transition-all duration-200 hover:-translate-y-0.5">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-3 p-4 cursor-pointer"
      >
        <div className={`p-2.5 rounded-lg ${color.bg} border ${color.border} shrink-0`}>
          <Icon className={`w-5 h-5 ${color.text}`} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm">{agent.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{agent.role}</p>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground/40 transition-transform duration-200 shrink-0 ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="shrink-0 p-2.5 rounded-lg glass-subtle hover:bg-cyan/10 transition-colors"
          aria-label={copied ? "Copied system prompt" : `Copy ${agent.name} system prompt`}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground group-hover:text-cyan" />
          )}
        </motion.button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 -mt-1 space-y-3">
          <pre className="text-xs text-muted-foreground bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 whitespace-pre-wrap max-h-64 overflow-y-auto">
            {agent.systemPrompt}
          </pre>

          {agent.starters.length > 0 && (
            <div>
              <p className="text-[11px] text-muted-foreground/60 mb-2 uppercase tracking-wider">Try saying</p>
              <div className="flex flex-wrap gap-1.5">
                {agent.starters.map((starter) => (
                  <button
                    key={starter}
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(starter, "Starter prompt");
                    }}
                    className="text-[11px] text-muted-foreground px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-cyan/20 hover:text-cyan transition-colors"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
