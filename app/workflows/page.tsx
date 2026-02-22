import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { GridBackground } from "@/components/effects/grid-background";
import { WorkflowsClient } from "./workflows-client";
import { workflows } from "@/data/workflows";

export const metadata: Metadata = {
  title: "Workflows & Recipes — ShipKit",
  description:
    "Step-by-step action sequences for common tasks. Not tutorials — quick recipes with copy-paste commands and prompts.",
  openGraph: {
    title: "Workflows & Recipes — ShipKit",
    description: "Step-by-step action sequences for common tasks. Not tutorials — quick recipes with copy-paste commands and prompts.",
  },
};

export default function WorkflowsPage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground colorTint="purple" />
      <div className="relative max-w-4xl mx-auto px-6 py-8">
        <PageHeader
          title="Workflows &"
          accent="Recipes"
          description="Step-by-step action sequences for common tasks. Not tutorials — quick recipes with copy-paste commands and prompts."
          stats={`${workflows.length} Workflows`}
        />
        <WorkflowsClient />
      </div>
    </div>
  );
}
