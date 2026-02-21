"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Rocket,
  CreditCard,
  GitBranch,
  Layout,
  Lock,
  Server,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import type { Workflow } from "@/data/workflows";

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  CreditCard,
  GitBranch,
  Layout,
  Lock,
  Server,
};

export function WorkflowCard({
  workflow,
  index,
}: {
  workflow: Workflow;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const Icon = iconMap[workflow.icon] || Rocket;

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepIndex)) {
        next.delete(stepIndex);
      } else {
        next.add(stepIndex);
      }
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass rounded-2xl overflow-hidden hover:border-cyan/20 transition-all duration-300"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center gap-4 text-left"
      >
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan/10 to-violet/10 border border-cyan/10 shrink-0">
          <Icon className="w-5 h-5 text-cyan" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base mb-0.5">{workflow.title}</h3>
          <p className="text-sm text-muted-foreground">{workflow.description}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Badge variant="secondary" className="text-xs gap-1">
            <Clock className="w-3 h-3" />
            {workflow.duration}
          </Badge>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="px-5 pb-5"
        >
          <div className="border-t border-border/50 pt-4 space-y-3">
            {workflow.steps.map((step, stepIndex) => (
              <WorkflowStep
                key={stepIndex}
                step={step}
                stepNumber={stepIndex + 1}
                completed={completedSteps.has(stepIndex)}
                onToggle={() => toggleStep(stepIndex)}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function WorkflowStep({
  step,
  stepNumber,
  completed,
  onToggle,
}: {
  step: { title: string; description: string; command?: string; prompt?: string };
  stepNumber: number;
  completed: boolean;
  onToggle: () => void;
}) {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopyCmd = async () => {
    if (!step.command) return;
    await copyToClipboard(step.command, "Command");
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleCopyPrompt = async () => {
    if (!step.prompt) return;
    await copyToClipboard(step.prompt, "Prompt");
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={onToggle}
        className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold transition-all ${
          completed
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-background/50 text-muted-foreground border border-border/50"
        }`}
      >
        {completed ? <Check className="w-3.5 h-3.5" /> : stepNumber}
      </button>

      <div className="flex-1 min-w-0">
        <h4
          className={`text-sm font-medium mb-0.5 ${
            completed ? "line-through text-muted-foreground" : ""
          }`}
        >
          {step.title}
        </h4>
        <p className="text-xs text-muted-foreground mb-2">{step.description}</p>

        {step.command && (
          <button
            onClick={handleCopyCmd}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 border border-border/50 hover:border-cyan/30 hover:bg-cyan/5 transition-all group/btn w-full mb-2"
          >
            <code className="text-xs text-muted-foreground truncate flex-1 text-left font-mono">
              {step.command}
            </code>
            {copiedCmd ? (
              <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-cyan shrink-0" />
            )}
          </button>
        )}

        {step.prompt && (
          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet/5 border border-violet/20 hover:border-violet/40 hover:bg-violet/10 transition-all group/btn w-full text-left"
          >
            <span className="text-xs text-violet truncate flex-1 font-mono">
              Copy AI Prompt
            </span>
            {copiedPrompt ? (
              <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-violet/60 group-hover/btn:text-violet shrink-0" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
