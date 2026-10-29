// Organisation mark for an experience/education entry, with an initials
// fallback for entries that don't have a logo file.
export function OrgLogo({ organisation, logo, size = 48 }) {
  const initials = organisation
    .replace(/\(.*\)/, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-ink/15 bg-paper"
      style={{ width: size, height: size }}
    >
      {logo ? (
        <img
          src={logo}
          alt={`${organisation} logo`}
          className="h-full w-full object-contain p-1.5"
          loading="lazy"
        />
      ) : (
        <span aria-hidden="true" className="text-sm font-semibold tracking-tight text-ink/70">
          {initials}
        </span>
      )}
    </div>
  );
}
