export function InProgressTile({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 bg-border/50 px-6 text-center ${className}`}
    >
      <div
        aria-hidden
        className="h-10 w-10 animate-spin rounded-full border-2 border-text/15 border-t-text"
      />
      <p className="text-[11px] uppercase tracking-widest text-text">
        Work in progress — check back in some time
      </p>
    </div>
  );
}
