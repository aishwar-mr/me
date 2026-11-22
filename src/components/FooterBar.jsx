// The mono contact strip that closes About and the project detail
// page. The home page's footer (SiteFooter) adds the "let's talk" lockup
// above the same row.
export const EMAIL = "aishwar.r.mishra@gmail.com";

export const SOCIALS = [
  { label: "X", href: "https://x.com/aishwar_mr" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aishwar-mishra" },
  { label: "Medium", href: "https://medium.com/@aishwar.r.mishra" },
];

export function SocialLinks({ className = "" }) {
  return (
    <span className={className}>
      {SOCIALS.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="nav-link">
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
