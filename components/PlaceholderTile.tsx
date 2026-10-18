const PALETTE = [
  "#C1521E", // rust
  "#1F6E43", // sage
  "#2B2E83", // indigo
  "#0E4D4A", // teal
  "#6E1B3D", // plum
  "#1E4B6B", // dusty blue
];

export function PlaceholderTile({
  seed = 0,
  label,
  className = "",
}: {
  seed?: number;
  label?: string;
  className?: string;
}) {
  const colour = PALETTE[seed % PALETTE.length];

  return (
    <div
      className={`relative flex items-end overflow-hidden ${className}`}
      style={{ backgroundColor: colour }}
    >
      <span className="m-2 text-[10px] uppercase tracking-wide text-white">
        {label ?? "Placeholder"}
      </span>
    </div>
  );
}
