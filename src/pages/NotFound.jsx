import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper font-sans text-ink">
      <p className="text-[88px] font-medium leading-none tracking-[-0.04em]">404</p>
      <Link to="/" className="text-[13px] underline">
        Back home
      </Link>
    </div>
  );
}
