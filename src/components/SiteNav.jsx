import { Link, useLocation, useNavigate } from "react-router-dom";
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

const PAGE_LINKS = [
  { to: "/experience", label: "Experience", testId: "nav-experience-link" },
  { to: "/work", label: "Work", testId: "nav-work-link" },
];

export function SiteNav() {
  const lenis = useLenis();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";

  // On the home page, "Proof"/"Contact" smooth-scroll to their section via
  // Lenis. From any other page they navigate home and land on that section
  // (ScrollToTop picks up the hash once Home has mounted).
  const goToSection = (id) => (e) => {
    e.preventDefault();
    if (isHome) {
      lenis?.scrollTo(id, { duration: 1.4 });
    } else {
      navigate(`/${id}`);
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
        <Link to="/" data-testid="nav-logo" aria-label={`${NAME} · ${ROLE}`} className="flex items-center gap-3">
          <LogoMark />
          <span className="text-sm font-semibold tracking-tight text-ink">
            <span className="hidden sm:inline">{NAME}</span>{" "}
            <span className="hidden md:inline text-ink/70">· {ROLE}</span>
          </span>
        </Link>
        <div className="flex items-center gap-5 text-sm sm:gap-6">
          {PAGE_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-testid={link.testId}
              className="text-ink/70 transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#proof"
            onClick={goToSection("#proof")}
            data-testid="nav-proof-link"
            className="text-ink/70 transition-colors duration-300 hover:text-ink"
          >
            Proof
          </a>
          <a
            href="#contact"
            onClick={goToSection("#contact")}
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
