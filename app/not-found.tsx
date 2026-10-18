import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex min-h-screen flex-col items-center justify-center gap-6 px-[4vw] text-center">
        <span className="text-xs uppercase tracking-widest text-text-muted">404</span>
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-none tracking-tight">
          Page not found
        </h1>
        <p className="max-w-md text-base text-text-muted">
          That page doesn&apos;t exist, or it may have moved.
        </p>
        <div className="mt-4 flex gap-8 text-xs uppercase tracking-widest">
          <Link href="/" className="transition-colors hover:text-text-muted">
            Home
          </Link>
          <Link href="/work" className="transition-colors hover:text-text-muted">
            All work
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
