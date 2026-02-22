import { cn } from "@/lib/utils";

export function AuroraBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[40%] -left-[20%] h-[80vh] w-[60vw] rounded-full opacity-30 blur-[80px] animate-aurora will-change-transform [background:radial-gradient(ellipse,rgba(0,240,255,0.15),transparent_70%)]" />
        <div className="absolute -top-[20%] -right-[20%] h-[70vh] w-[50vw] rounded-full opacity-25 blur-[80px] animate-aurora will-change-transform [animation-delay:-3s] [animation-direction:reverse] [background:radial-gradient(ellipse,rgba(168,85,247,0.12),transparent_70%)]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
