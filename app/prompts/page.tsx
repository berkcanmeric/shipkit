"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/sections/page-header";
import { CategoryFilter } from "@/components/sections/category-filter";
import { PromptCard } from "@/components/cards/prompt-card";
import { prompts, promptCategories } from "@/data/prompts";
import { GridBackground } from "@/components/effects/grid-background";

export default function PromptsPage() {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () =>
      category === "all"
        ? prompts
        : prompts.filter((p) => p.category === category),
    [category]
  );

  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative max-w-5xl mx-auto px-6 py-8">
        <PageHeader
          title="AI Prompts"
          accent="Library"
          description="Copy-paste ready prompts organized by development phase. Every prompt tested and optimized for real projects."
        />

        <CategoryFilter
          categories={promptCategories}
          activeCategory={category}
          onCategoryChange={setCategory}
        />

        <div className="space-y-4">
          {filtered.map((prompt, i) => (
            <PromptCard key={prompt.id} prompt={prompt} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No prompts in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
