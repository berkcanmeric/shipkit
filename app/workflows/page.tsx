"use client";

import { PageHeader } from "@/components/sections/page-header";
import { WorkflowCard } from "@/components/cards/workflow-card";
import { workflows } from "@/data/workflows";
import { GridBackground } from "@/components/effects/grid-background";

export default function WorkflowsPage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative max-w-4xl mx-auto px-6 py-8">
        <PageHeader
          title="Workflows &"
          accent="Recipes"
          description="Step-by-step action sequences for common tasks. Not tutorials — quick recipes with copy-paste commands and prompts."
        />

        <div className="space-y-4">
          {workflows.map((workflow, i) => (
            <WorkflowCard key={workflow.id} workflow={workflow} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
