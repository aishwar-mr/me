"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import { Reveal } from "./Reveal";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "blocked">("idle");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("blocked");
  };

  return (
    <section className="px-[4vw] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <Reveal>
          <h2 className="mb-6 text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-none tracking-tight">
            Get in
            <br />
            touch
          </h2>
          <div className="flex flex-col gap-1 text-sm text-text-muted">
            <a href={`mailto:${site.email}`} className="hover:text-text">
              {site.email}
            </a>
            <span>{site.phone}</span>
            <div className="mt-4 flex gap-4 text-xs uppercase tracking-widest">
              <a href={site.socials.linkedin} className="hover:text-text">
                LinkedIn
              </a>
              <a href={site.socials.github} className="hover:text-text">
                GitHub
              </a>
              <a href={site.socials.x} className="hover:text-text">
                X
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <SectionField label="Full name" name="name" type="text" />
            <SectionField label="Email" name="email" type="email" />
            <SectionField label="Message" name="message" type="textarea" />

            <button
              type="submit"
              className="mt-2 w-fit border border-text px-8 py-3 text-xs uppercase tracking-widest transition-colors hover:bg-text hover:text-bg"
            >
              Send a message
            </button>

            {status === "blocked" && (
              <p className="text-xs text-text-muted">
                This form isn&apos;t connected to a submission endpoint yet — it
                will send once that&apos;s configured.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function SectionField({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "textarea";
}) {
  const baseClasses =
    "w-full border-b border-border bg-transparent py-2 text-base outline-none transition-colors focus:border-text";

  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-widest text-text-muted">
        {label}
      </span>
      {type === "textarea" ? (
        <textarea name={name} required rows={3} className={baseClasses} />
      ) : (
        <input name={name} type={type} required className={baseClasses} />
      )}
    </label>
  );
}
