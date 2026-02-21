"use client";

export function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Aurora blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[128px]" />
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-violet/5 rounded-full blur-[128px]" />
    </div>
  );
}
