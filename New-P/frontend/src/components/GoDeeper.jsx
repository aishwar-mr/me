import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { EASE } from "@/motion";

const CARDS = [
  {
    to: "/experience",
    title: "Experience",
    desc: "Every role, every org — TCI, Lawxy AI, Ninjacart and more, with the full scope of each one.",
    testid: "go-deeper-experience",
  },
  {
    to: "/work",
    title: "Work",
    desc: "Hackathon builds, product teardowns and the odd piece of writing, each with the full case study.",
    testid: "go-deeper-work",
  },
];

export function GoDeeper() {
  return (
    <section className="px-6 pb-24 sm:px-10 lg:px-16" data-testid="go-deeper">
      <p className="label">Go deeper</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.to}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
          >
            <Link
              to={c.to}
              data-testid={c.testid}
              className="group flex h-full flex-col border border-ink/15 p-7 transition-colors duration-300 hover:border-ink/40"
            >
              <span className="flex items-center justify-between gap-4">
                <span className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  {c.title}
                </span>
                <ArrowUpRight
                  size={22}
                  className="shrink-0 text-ink/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-vermilion"
                />
              </span>
              <span className="mt-3 text-sm leading-relaxed text-ink/65">
                {c.desc}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
