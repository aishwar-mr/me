import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { PROOF } from "@/content";
import { EASE } from "@/motion";

function ProofItem({ item, isOpen, onToggle }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE }}
      data-testid={`proof-item-${item.num}`}
      className="border-t border-ink/15 last:border-b"
    >
      <button
        data-testid={`dig-deeper-toggle-${item.num}`}
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 py-7 text-left md:grid-cols-[3rem_1.2fr_1fr_2rem] md:gap-8"
      >
        <span className="text-xs tabular-nums text-ink/40">{item.num}</span>
        <span className="font-display text-xl font-bold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1.5 sm:text-2xl lg:text-3xl">
          {item.title}
        </span>
        <span className="hidden text-sm text-ink/55 md:block">
          {item.teaser}
        </span>
        <span
          className="justify-self-end text-ink transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
        >
          <Plus size={20} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            data-testid={`dig-deeper-panel-${item.num}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-4 pb-9 md:grid-cols-[3rem_1fr] md:gap-8">
              <span className="hidden md:block" />
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.25em] text-vermilion">
                  {item.tag}
                </p>
                <p className="mt-3 leading-relaxed text-ink/75">{item.deep}</p>
                <p className="mt-4 text-sm italic text-ink/45">
                  [Replace with the real story — keep it to 3-4 sentences.]
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function ProofSection() {
  const [open, setOpen] = useState(null);

  return (
    <section
      id="proof"
      data-testid="proof-section"
      className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <header className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label">Proof</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            The 30-second proof<span className="text-vermilion">.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-ink/60">
          Four stories that show the range. Open one to dig deeper.
        </p>
      </header>
      <ul>
        {PROOF.map((item) => (
          <ProofItem
            key={item.num}
            item={item}
            isOpen={open === item.num}
            onToggle={() => setOpen(open === item.num ? null : item.num)}
          />
        ))}
      </ul>
    </section>
  );
}
