export function SectionLabel({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "h2";
}) {
  return (
    <Tag
      className={`flex items-center gap-2 text-[11px] font-normal uppercase tracking-[0.2em] text-text-muted ${className}`}
    >
      {children}
    </Tag>
  );
}
