import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { GridBackground } from "@/components/effects/grid-background";
import { PromptsClient } from "./prompts-client";
import { prompts, promptCategories } from "@/data/prompts";

export const metadata: Metadata = {
  title: "AI Prompts Library — ShipKit",
  description:
    "Copy-paste ready prompts organized by development phase. Every prompt tested and optimized for real projects.",
  openGraph: {
    title: "AI Prompts Library — ShipKit",
    description: "Copy-paste ready prompts organized by development phase. Every prompt tested and optimized for real projects.",
  },
};

export default function PromptsPage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground colorTint="cyan" />
      <div className="relative max-w-5xl mx-auto px-6 py-8">
        <PageHeader
          title="AI Prompts"
          accent="Library"
          description="Copy-paste ready prompts organized by development phase. Every prompt tested and optimized for real projects."
          stats={`${prompts.length} Prompts · ${promptCategories.length - 1} Categories`}
        />
        <PromptsClient />
      </div>
    </div>
  );
}
