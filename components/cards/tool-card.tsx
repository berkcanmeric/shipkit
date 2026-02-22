"use client";

import { memo } from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AppIcon } from "@/components/ui/app-icon";

interface ToolCardProps {
  name: string;
  description: string;
  url: string;
  tags: string[];
  index: number;
  extra?: React.ReactNode;
  featured?: boolean;
  iconUrl?: string;
}

export const ToolCard = memo(function ToolCard({
  name,
  description,
  url,
  tags,
  extra,
  featured = false,
  iconUrl,
}: ToolCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group rounded-xl p-4 flex flex-col transition-all duration-200 hover:-translate-y-0.5 ${
        featured
          ? "glass-prominent hover:border-cyan/30"
          : "glass hover:border-cyan/20"
      }`}
    >
      <div className="flex items-center gap-2.5 mb-1">
        <AppIcon src={iconUrl} name={name} size="sm" />
        <h3 className="font-semibold text-sm flex-1">{name}</h3>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-cyan transition-colors shrink-0" aria-hidden="true" />
      </div>

      <p className="text-xs text-muted-foreground mb-2 line-clamp-1 flex-1">{description}</p>

      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
            {tag}
          </Badge>
        ))}
        {extra}
      </div>
    </a>
  );
});
