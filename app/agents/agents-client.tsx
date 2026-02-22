"use client";

import { useState, useMemo } from "react";
import { Search, SearchX } from "lucide-react";
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
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = category === "all"
      ? agents
      : agents.filter((a) => agentCategoryMap[a.id] === category);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [category, search]);

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
      <div className="relative max-w-full sm:max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <label htmlFor="agent-search" className="sr-only">Search agents</label>
        <input
          id="agent-search"
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-cyan/30 transition-all"
        />
      </div>

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
          <p className="text-muted-foreground mb-1">
            {search.trim() ? `No agents matching "${search}"` : "No agents in this category yet."}
          </p>
          <p className="text-sm text-muted-foreground/60 mb-4">Try a different search term or browse another category.</p>
          <button
            onClick={() => { setSearch(""); setCategory("all"); }}
            className="text-sm text-cyan hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
