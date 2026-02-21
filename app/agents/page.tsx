"use client";

import { PageHeader } from "@/components/sections/page-header";
import { AgentCard } from "@/components/cards/agent-card";
import { agents } from "@/data/agents";
import { GridBackground } from "@/components/effects/grid-background";

export default function AgentsPage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative max-w-5xl mx-auto px-6 py-8">
        <PageHeader
          title="AI Agents &"
          accent="Claude Skills"
          description="Pre-configured AI agent personas you can paste into system prompts. One-click copy, instant power."
        />

        <div className="space-y-4">
          {agents.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
