import { useLocation, useNavigate, Link } from "react-router-dom";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { EASE } from "@/motion";
import { NAME, ROLE } from "@/content";

export function LogoMark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0A0A0A" />
      <text
        x="30"
        y="46"
        fontSize="40"
        fontFamily="Georgia, 'Times New Roman', serif"
        fill="#F4F0EA"
        textAnchor="middle"
      >
        &para;
      </text>
      <circle cx="49" cy="15" r="7" fill="#D94A38" />
    </svg>
  );
}

export function SiteNav() {
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();

  const go = (id) => (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      lenis?.scrollTo(id, { duration: 1.4 });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
      className="fixed inset-x-0 top-0 z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-md"
    >
      <nav className="flex items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-3">
          <LogoMark />
          <span className="text-sm font-semibold tracking-tight text-ink">
            <span className="hidden sm:inline">{NAME}</span>{" "}
            <span className="hidden text-ink/50 md:inline">· {ROLE}</span>
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm sm:gap-6">
          <a
            href="#proof"
            onClick={go("#proof")}
            data-testid="nav-proof-link"
            className="hidden text-ink/70 transition-colors duration-300 hover:text-ink sm:inline"
          >
            Proof
          </a>
          <Link
            to="/experience"
            data-testid="nav-experience-link"
            className="text-ink/70 transition-colors duration-300 hover:text-ink"
          >
            Experience
          </Link>
          <Link
            to="/work"
            data-testid="nav-work-link"
            className="text-ink/70 transition-colors duration-300 hover:text-ink"
          >
            Work
          </Link>
          <a
            href="#contact"
            onClick={go("#contact")}
            data-testid="nav-contact-link"
            className="rounded-full bg-ink px-4 py-1.5 text-paper transition-colors duration-300 hover:bg-vermilion"
          >
            Contact
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
