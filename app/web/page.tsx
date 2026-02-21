"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/sections/page-header";
import { CategoryFilter } from "@/components/sections/category-filter";
import { ToolCard } from "@/components/cards/tool-card";
import { webTools, webCategories } from "@/data/web-tools";
import { GridBackground } from "@/components/effects/grid-background";

export default function WebPage() {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () =>
      category === "all"
        ? webTools
        : webTools.filter((t) => t.category === category),
    [category]
  );

  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          title="Web Libraries &"
          accent="Components"
          description="Curated list of the best UI libraries, component kits, and web tools. Direct links, install commands, zero fluff."
        />

        <CategoryFilter
          categories={webCategories}
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
              tags={tool.tags}
              index={i}
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
