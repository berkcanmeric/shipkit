"use client";

import { useState } from "react";
import { WorkflowCard } from "@/components/cards/workflow-card";
import { workflows } from "@/data/workflows";

export function WorkflowsClient() {
  // Track which workflow is expanded — only one at a time
  const [expandedId] = useState<string>(workflows[0]?.id || "");

  return (
    <div className="space-y-4">
      {workflows.map((workflow, i) => (
        <WorkflowCard
          key={workflow.id}
          workflow={workflow}
          index={i}
          defaultExpanded={workflow.id === expandedId}
        />
      ))}
    </div>
  );
}
