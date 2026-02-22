import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { GridBackground } from "@/components/effects/grid-background";
import { MobileClient } from "./mobile-client";
import { mobileTools, mobileCategories } from "@/data/mobile-tools";

export const metadata: Metadata = {
  title: "Mobile SDKs & Tools — ShipKit",
  description:
    "Everything you need to build and monetize mobile apps. Install commands ready, direct links to docs.",
  openGraph: {
    title: "Mobile SDKs & Tools — ShipKit",
    description: "Everything you need to build and monetize mobile apps. Install commands ready, direct links to docs.",
  },
};

export default function MobilePage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground colorTint="blue" />
      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          title="Mobile SDKs &"
          accent="Tools"
          description="Everything you need to build and monetize mobile apps. Install commands ready, direct links to docs."
          stats={`${mobileTools.length} Tools · ${mobileCategories.length - 1} Categories`}
        />
        <MobileClient />
      </div>
    </div>
  );
}
