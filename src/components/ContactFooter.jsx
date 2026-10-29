import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CONTACT, EMAIL, NAME } from "@/content";
import { EASE } from "@/motion";

export function ContactFooter() {
  return (
    <footer
      id="contact"
      data-testid="contact-section"
      className="flex min-h-[85vh] flex-col justify-end px-6 pb-10 pt-28 sm:px-10 lg:px-16"
    >
      <div>
        <p className="label">Contact</p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-4 font-display text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink"
        >
          {CONTACT.headingLines[0]} {CONTACT.headingLines[1].replace(".", "")}
          <span className="text-vermilion">.</span>
        </motion.h2>
        <p
          data-testid="contact-note"
          className="mt-6 max-w-md text-base leading-relaxed text-ink/70"
        >
          {CONTACT.note}
        </p>
        <a
          href={`mailto:${EMAIL}`}
          data-testid="contact-email-link"
          className="group mt-10 inline-flex items-center gap-3 text-2xl font-medium tracking-tight text-ink sm:text-3xl"
        >
          <span className="underline decoration-ink/25 decoration-2 underline-offset-8 transition-colors duration-300 group-hover:decoration-vermilion">
            {EMAIL}
          </span>
          <ArrowUpRight
            size={26}
            className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </a>
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-ink/70">
          Click the email to open your mailbox
        </p>
      </div>

      <div className="mt-24 flex flex-col gap-2 border-t border-ink/15 pt-5 text-xs text-ink/70 sm:flex-row sm:items-center sm:justify-between">
        <p data-testid="footer-credit">&copy; {NAME} — One-Page Brief</p>
        <p data-testid="footer-note">{CONTACT.footerNote}</p>
      </div>
    </footer>
  );
}
