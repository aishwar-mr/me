export function InProgressTile({ className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 bg-ink/5 text-center ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-2 border-ink/20 border-t-vermilion"
      />
      <p className="max-w-[16rem] text-xs uppercase tracking-[0.2em] text-ink/70">
        Work in progress — check back in some time
      </p>
    </div>
  );
}
