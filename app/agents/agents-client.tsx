"use client";

import { useState, useMemo } from "react";
import { SearchX } from "lucide-react";
import { CategoryFilter } from "@/components/sections/category-filter";
import { AgentCard } from "@/components/cards/agent-card";
import { agents } from "@/data/agents";

const agentCategories = [
  { id: "all", label: "All" },
  { id: "code", label: "Code" },
  { id: "testing", label: "Testing" },
  { id: "design", label: "Design" },
  { id: "ops", label: "DevOps" },
  { id: "product", label: "Product" },
] as const;

// Map agents to categories based on their role
const agentCategoryMap: Record<string, string> = {
  "senior-dev": "code",
  "code-reviewer": "code",
  "qa-tester": "testing",
  "security-auditor": "testing",
  "ui-designer": "design",
  "release-manager": "ops",
  "devops-engineer": "ops",
  "perf-engineer": "code",
  "tech-writer": "product",
  "product-manager": "product",
};

export function AgentsClient() {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () =>
      category === "all"
        ? agents
        : agents.filter((a) => agentCategoryMap[a.id] === category),
    [category]
  );

  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = { all: agents.length };
    for (const a of agents) {
      const cat = agentCategoryMap[a.id] || "code";
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <>
      <CategoryFilter
        categories={agentCategories}
        activeCategory={category}
        onCategoryChange={setCategory}
        itemCounts={itemCounts}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((agent, i) => (
          <AgentCard key={agent.id} agent={agent} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <SearchX className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground mb-1">No agents in this category yet.</p>
          <p className="text-sm text-muted-foreground/60 mb-4">Try browsing a different role category.</p>
          <button
            onClick={() => setCategory("all")}
            className="text-sm text-cyan hover:underline"
          >
            View all agents
          </button>
        </div>
      )}
    </>
  );
}
