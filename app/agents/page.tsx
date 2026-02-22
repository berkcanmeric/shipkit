import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { GridBackground } from "@/components/effects/grid-background";
import { AgentsClient } from "./agents-client";
import { agents } from "@/data/agents";

export const metadata: Metadata = {
  title: "AI Agents & Claude Skills — ShipKit",
  description:
    "Pre-configured AI agent personas you can paste into system prompts. One-click copy, instant power.",
  openGraph: {
    title: "AI Agents & Claude Skills — ShipKit",
    description: "Pre-configured AI agent personas you can paste into system prompts. One-click copy, instant power.",
  },
};

export default function AgentsPage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground colorTint="amber" />
      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          title="AI Agents &"
          accent="Claude Skills"
          description="Pre-configured AI agent personas you can paste into system prompts. One-click copy, instant power."
          stats={`${agents.length} Agents · 5 Roles`}
        />
        <AgentsClient />
      </div>
    </div>
  );
}
