import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { CONTACT, EMAIL, NAME } from "@/content";
import { Reveal } from "@/components/Reveal";

const SOCIALS = [
  {
    href: "https://github.com/aishwar-mr",
    label: "GitHub",
    Icon: Github,
    testId: "contact-github-link",
  },
  {
    href: "https://www.linkedin.com/in/aishwar-mishra",
    label: "LinkedIn",
    Icon: Linkedin,
    testId: "contact-linkedin-link",
  },
];

// Contact — one field, nothing else: a prompt, one field-shaped action (a
// mailto link dressed as the field this site has no backend to receive),
// and the footer close.
export function ContactFooter() {
  return (
    <footer id="contact" data-testid="contact-section" className="px-6 pb-10 pt-28 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[520px] flex-col items-center py-24 text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(2.25rem,1.4rem+3.5vw,3.5rem)] font-normal leading-[0.95] text-ink">
            {CONTACT.headingLines[0]} {CONTACT.headingLines[1].replace(".", "")}
            <span className="text-vermilion">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p data-testid="contact-note" className="mt-6 max-w-[40ch] font-text text-base leading-relaxed text-ink/70">
            {CONTACT.note}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10 w-full">
          <a
            href={`mailto:${EMAIL}`}
            data-testid="contact-email-link"
            className="group flex h-16 w-full items-center justify-between rounded-2xl bg-ink/[0.04] px-6 transition-colors duration-300 hover:bg-ink"
          >
            <span className="font-text text-lg text-ink transition-colors duration-300 group-hover:text-paper sm:text-xl">
              {EMAIL}
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <ArrowUpRight size={20} />
            </span>
          </a>
          <p className="mt-4 font-text text-sm text-ink/60">
            Opens your mailbox
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            {SOCIALS.map(({ href, label, Icon, testId }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                data-testid={testId}
                className="flex items-center gap-2 rounded-2xl bg-ink/[0.04] px-4 py-2.5 font-text text-sm text-ink/70 transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                <Icon size={17} />
                {label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col gap-2 rounded-2xl bg-ink/[0.03] px-6 py-5 font-text text-sm text-ink/70 sm:flex-row sm:items-center sm:justify-between">
        <p data-testid="footer-credit">&copy; {NAME}</p>
        <p data-testid="footer-note">{CONTACT.footerNote}</p>
      </div>
    </footer>
  );
}
