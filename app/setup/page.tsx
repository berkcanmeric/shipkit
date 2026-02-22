import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { GridBackground } from "@/components/effects/grid-background";
import { SetupClient } from "./setup-client";
import { setupItems, setupCategories } from "@/data/setup";

export const metadata: Metadata = {
  title: "Mac Dev Setup — ShipKit",
  description:
    "The perfect Mac development environment. Checklist-style with links to official sites. Check them off as you go.",
  openGraph: {
    title: "Mac Dev Setup — ShipKit",
    description: "The perfect Mac development environment. Checklist-style with links to official sites. Check them off as you go.",
  },
};

export default function SetupPage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground colorTint="neutral" />
      <div className="relative max-w-4xl mx-auto px-6 py-8">
        <PageHeader
          title="Mac Dev"
          accent="Setup"
          description="The perfect Mac development environment. Checklist-style with links to official sites. Check them off as you go."
          stats={`${setupItems.length} Tools · ${setupCategories.length} Categories`}
        />
        <SetupClient />
      </div>
    </div>
  );
}
