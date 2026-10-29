import { motion } from "framer-motion";
import { EASE } from "@/motion";

// Shared fade/slide-up entrance, matching the pattern already used inline in
// ProofSection and HowIWork, for the newer pages.
export function Reveal({ children, delay = 0, as = "div", className = "", ...rest }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}
