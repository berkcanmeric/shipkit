import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { GridBackground } from "@/components/effects/grid-background";
import { MCPsClient } from "./mcps-client";
import { mcps, mcpCategories } from "@/data/mcps";

export const metadata: Metadata = {
  title: "MCPs & Extensions — ShipKit",
  description:
    "The best Model Context Protocol servers and Claude extensions. Install in one click, supercharge your workflow.",
  openGraph: {
    title: "MCPs & Extensions — ShipKit",
    description: "The best Model Context Protocol servers and Claude extensions. Install in one click, supercharge your workflow.",
  },
};

export default function MCPsPage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground colorTint="violet" />
      <div className="relative max-w-5xl mx-auto px-6 py-8">
        <PageHeader
          title="MCPs &"
          accent="Extensions"
          description="The best Model Context Protocol servers and Claude extensions. Install in one click, supercharge your workflow."
          stats={`${mcps.length} MCPs · ${mcpCategories.length - 1} Categories`}
        />
        <MCPsClient />
      </div>
    </div>
  );
}
