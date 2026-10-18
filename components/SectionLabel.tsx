export function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-text-muted ${className}`}
    >
      {children}
    </div>
  );
}
