"use client";

import { useState, memo } from "react";
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
  Rocket, CreditCard, GitBranch, Layout, Lock, Server,
};

export const WorkflowCard = memo(function WorkflowCard({
  workflow,
  index,
  defaultExpanded = false,
}: {
  workflow: Workflow;
  index: number;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const Icon = iconMap[workflow.icon] || Rocket;

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepIndex)) next.delete(stepIndex);
      else next.add(stepIndex);
      return next;
    });
  };

  return (
    <div className="glass rounded-xl overflow-hidden hover:border-cyan/20 transition-all duration-200">

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center gap-3 text-left"
        aria-expanded={expanded}
        aria-label={`${workflow.title} workflow — ${expanded ? "collapse" : "expand"}`}
      >
        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan/10 to-violet/10 border border-cyan/10 shrink-0">
          <Icon className="w-4 h-4 text-cyan" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm">{workflow.title}</h3>
        </div>

        <Badge variant="secondary" className="text-[10px] gap-1 shrink-0">
          <Clock className="w-2.5 h-2.5" />
          {workflow.duration}
        </Badge>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
        )}
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="px-4 pb-4"
        >
          <div className="border-t border-border/50 pt-3 space-y-1.5">
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
    </div>
  );
});

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
    <div className="flex items-center gap-2.5">
      <button
        onClick={onToggle}
        role="checkbox"
        aria-checked={completed}
        aria-label={`Step ${stepNumber}: ${step.title}`}
        className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold transition-all ${
          completed
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-background border border-border/50 text-muted-foreground"
        }`}
      >
        {completed ? <Check className="w-3 h-3" /> : stepNumber}
      </button>

      <span className={`text-sm flex-1 ${completed ? "line-through text-muted-foreground" : ""}`}>
        {step.title}
      </span>

      <div className="flex items-center gap-1 shrink-0">
        {step.command && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyCmd}
            className="p-1.5 rounded-md hover:bg-cyan/10 transition-colors"
            aria-label={copiedCmd ? "Copied command" : `Copy command: ${step.command}`}
          >
            {copiedCmd ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-cyan" />
            )}
          </motion.button>
        )}

        {step.prompt && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyPrompt}
            className="p-1.5 rounded-md hover:bg-violet/10 transition-colors"
            aria-label={copiedPrompt ? "Copied prompt" : "Copy AI prompt"}
          >
            {copiedPrompt ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-violet/60 hover:text-violet" />
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
