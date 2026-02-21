"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/sections/page-header";
import { CategoryFilter } from "@/components/sections/category-filter";
import { MCPCard } from "@/components/cards/mcp-card";
import { mcps, mcpCategories } from "@/data/mcps";
import { GridBackground } from "@/components/effects/grid-background";

export default function MCPsPage() {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () =>
      category === "all"
        ? mcps
        : mcps.filter((m) => m.category === category),
    [category]
  );

  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative max-w-5xl mx-auto px-6 py-8">
        <PageHeader
          title="MCPs &"
          accent="Extensions"
          description="The best Model Context Protocol servers and Claude extensions. Install in one click, supercharge your workflow."
        />

        <CategoryFilter
          categories={mcpCategories}
          activeCategory={category}
          onCategoryChange={setCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((mcp, i) => (
            <MCPCard key={mcp.id} mcp={mcp} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No MCPs in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
