// The mono contact strip that closes About and the project detail
// page. The home page's footer (SiteFooter) adds the "let's talk" lockup
// above the same row.
export const EMAIL = "aishwar.r.mishra@gmail.com";

// GitHub's mark, drawn in the link's own colour and sized to its text.
function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" className="h-[1.25em] w-[1.25em] flex-none">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export const SOCIALS = [
  { label: "X", href: "https://x.com/aishwar_mr" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aishwar-mishra" },
  { label: "Medium", href: "https://medium.com/@aishwar.r.mishra" },
  { label: "GitHub", href: "https://github.com/aishwar-mr", icon: GitHubIcon },
];

export function SocialLinks({ className = "" }) {
  return (
    <span className={className}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          className={`nav-link ${s.icon ? "inline-flex items-center gap-1.5" : ""}`}
        >
          {s.icon ? <s.icon /> : null}
          {s.label}
        </a>
      ))}
    </span>
  );
}

export function FooterBar({ id = "contact", className = "" }) {
  return (
    <footer
      data-line-end
      id={id}
      aria-label="Contact"
      className={`g12 border-t border-line pb-8 pt-6 text-[length:max(12px,calc(var(--u)*12))] text-muted ${className}`}
    >
      <span className="font-mono col-start-1 col-end-5 break-all text-[length:max(11px,calc(var(--u)*11))] uppercase">
        <a href={`mailto:${EMAIL}`} className="nav-link">
          {EMAIL}
        </a>
      </span>
      <SocialLinks className="font-mono col-start-5 col-end-10 flex justify-center gap-6 text-[length:max(11px,calc(var(--u)*11))] uppercase max-md:justify-start" />
      <span className="font-mono col-start-10 col-end-13 text-right text-[length:max(11px,calc(var(--u)*11))] uppercase max-md:text-left">© 2026 Aishwar</span>
    </footer>
  );
}
