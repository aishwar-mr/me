const PALETTE = ["#C1521E", "#1F6E43", "#2B2E83", "#0E4D4A", "#6E1B3D", "#1E4B6B"];

export function PlaceholderTile({ seed = 0, label, className = "" }) {
  const colour = PALETTE[seed % PALETTE.length];
  return (
    <div
      className={`relative flex items-end overflow-hidden ${className}`}
      style={{ backgroundColor: colour }}
    >
      <span className="m-3 text-[10px] uppercase tracking-wide text-white">
        {label ?? "Placeholder"}
      </span>
    </div>
  );
}
