import { cn } from "@/lib/utils";

const tintMap: Record<string, { primary: string; secondary: string }> = {
  cyan: { primary: "rgba(0,240,255,0.06)", secondary: "rgba(168,85,247,0.04)" },
  amber: { primary: "rgba(245,158,11,0.06)", secondary: "rgba(234,179,8,0.04)" },
  violet: { primary: "rgba(168,85,247,0.06)", secondary: "rgba(139,92,246,0.04)" },
  emerald: { primary: "rgba(16,185,129,0.06)", secondary: "rgba(0,240,255,0.04)" },
  blue: { primary: "rgba(59,130,246,0.06)", secondary: "rgba(0,240,255,0.04)" },
  neutral: { primary: "rgba(255,255,255,0.03)", secondary: "rgba(255,255,255,0.02)" },
  purple: { primary: "rgba(147,51,234,0.06)", secondary: "rgba(168,85,247,0.04)" },
};

export function BackgroundBeams({
  className,
  colorTint = "cyan",
}: {
  className?: string;
  colorTint?: "cyan" | "amber" | "violet" | "emerald" | "blue" | "neutral" | "purple";
}) {
  const tint = tintMap[colorTint] || tintMap.cyan;

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Beam lines — reduced from 6 to 3 */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.15]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`beam-grad-${colorTint}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={tint.primary} />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="100%" stopColor={tint.secondary} />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1={`${10 + i * 35}%`}
            y1="0"
            x2={`${5 + i * 30}%`}
            y2="100%"
            stroke={`url(#beam-grad-${colorTint})`}
            strokeWidth="1"
            className="animate-beam"
            style={{ animationDelay: `${i * -2.6}s` }}
          />
        ))}
      </svg>

      {/* Tinted gradient blobs — reduced blur from 128px to 80px */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[80px]"
        style={{ background: tint.primary }}
      />
      <div
        className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full blur-[80px]"
        style={{ background: tint.secondary }}
      />

      {/* Fade to background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
