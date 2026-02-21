"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/sections/page-header";
import { CategoryFilter } from "@/components/sections/category-filter";
import { ToolCard } from "@/components/cards/tool-card";
import { mobileTools, mobileCategories } from "@/data/mobile-tools";
import { Badge } from "@/components/ui/badge";
import { GridBackground } from "@/components/effects/grid-background";

export default function MobilePage() {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () =>
      category === "all"
        ? mobileTools
        : mobileTools.filter((t) => t.category === category),
    [category]
  );

  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          title="Mobile SDKs &"
          accent="Tools"
          description="Everything you need to build and monetize mobile apps. Install commands ready, direct links to docs."
        />

        <CategoryFilter
          categories={mobileCategories}
          activeCategory={category}
          onCategoryChange={setCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool, i) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              description={tool.description}
              url={tool.url}
              installCommand={tool.installCommand}
              tags={tool.platforms}
              index={i}
              extra={
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    tool.pricing === "Free"
                      ? "text-green-400 border-green-400/30"
                      : tool.pricing === "Freemium"
                      ? "text-[#00f0ff] border-[#00f0ff]/30"
                      : "text-amber-400 border-amber-400/30"
                  }`}
                >
                  {tool.pricing}
                </Badge>
              }
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No tools in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
