import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { GridBackground } from "@/components/effects/grid-background";
import { WebClient } from "./web-client";
import { webTools, webCategories } from "@/data/web-tools";

export const metadata: Metadata = {
  title: "Web Libraries & Components — ShipKit",
  description:
    "Curated list of the best UI libraries, component kits, and web tools. Direct links, install commands, zero fluff.",
  openGraph: {
    title: "Web Libraries & Components — ShipKit",
    description: "Curated list of the best UI libraries, component kits, and web tools. Direct links, install commands, zero fluff.",
  },
};

export default function WebPage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground colorTint="emerald" />
      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          title="Web Libraries &"
          accent="Components"
          description="Curated list of the best UI libraries, component kits, and web tools. Direct links, install commands, zero fluff."
          stats={`${webTools.length} Libraries · ${webCategories.length - 1} Categories`}
        />
        <WebClient />
      </div>
    </div>
  );
}
