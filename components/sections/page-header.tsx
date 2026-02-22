export function PageHeader({
  title,
  description,
  accent,
  stats,
  children,
}: {
  title: string;
  description: string;
  accent?: string;
  stats?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
        {accent ? (
          <>
            {title}{" "}
            <span className="bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">
              {accent}
            </span>
          </>
        ) : (
          title
        )}
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground max-w-full sm:max-w-2xl">{description}</p>
      {stats && (
        <p className="text-sm text-muted-foreground/60 mt-2">{stats}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
