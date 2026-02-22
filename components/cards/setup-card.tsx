"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { ExternalLink, CheckCircle2, Circle, ChevronDown } from "lucide-react";
import { AppIcon } from "@/components/ui/app-icon";
import type { SetupItem } from "@/data/setup";

function usePersistedState(key: string, defaultValue: boolean): [boolean, (v: boolean) => void] {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) setValue(JSON.parse(stored));
    } catch {}
  }, [key]);

  const setAndPersist = useCallback((v: boolean) => {
    setValue(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key]);

  return [value, setAndPersist];
}

export const SetupCard = memo(function SetupCard({
  item,
  onToggle,
}: {
  item: SetupItem;
  index: number;
  onToggle?: () => void;
}) {
  const [done, setDone] = usePersistedState(`setup-done-${item.id}`, false);
  const [expanded, setExpanded] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDone(!done);
    onToggle?.();
  };

  return (
    <div className={`glass rounded-xl hover:border-cyan/20 transition-all duration-200 ${done ? "opacity-50" : ""}`}>
      <div
        onClick={() => setExpanded(!expanded)}
        className="group flex items-center gap-3 px-4 py-2.5 cursor-pointer"
      >
        <button
          onClick={handleToggle}
          role="checkbox"
          aria-checked={done}
          aria-label={`Mark ${item.name} as ${done ? "incomplete" : "complete"}`}
          className="shrink-0 p-1 text-muted-foreground hover:text-cyan transition-colors"
        >
          {done ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : (
            <Circle className="w-4 h-4" />
          )}
        </button>

        <AppIcon src={item.iconUrl} name={item.name} size="sm" />

        <span className={`text-sm font-medium flex-1 ${done ? "line-through text-muted-foreground" : ""}`}>
          {item.name}
        </span>

        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground/40 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 p-1 text-muted-foreground/50 hover:text-cyan transition-colors"
          aria-label={`Open ${item.name} website (opens in new tab)`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {expanded && (
        <div className="px-4 pb-2.5 pl-[4.25rem] -mt-1">
          <p className="text-xs text-muted-foreground">{item.description}</p>
        </div>
      )}
    </div>
  );
});
