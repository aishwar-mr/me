import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EMAIL } from "@/content";

// A brown bear napping beside "Let's talk." Click it and it stirs, rises,
// turns to face you and looks at you with a calm, curious gaze, then turns
// away and settles back to sleep.
//
// Drawn as SVG, aiming for natural rather than cartoon: real brown-bear
// proportions (shoulder hump, long snout, small ears and eyes), colours
// sampled from wildlife footage, and fur built with SVG filters — fractal
// noise roughens every edge into fur, and a second, directional noise layer
// adds strand texture. Motion is slow and weighted: long eases, no bounce.
//
// Phases: sleep → stir → rise → turn → look → turnBack → settle → sleep

const DURATION = { stir: 900, rise: 1400, turn: 1200, turnBack: 1000, settle: 1200 };
const NEXT = { stir: "rise", rise: "turn", turn: "look", turnBack: "settle", settle: "sleep" };
const LOOK_HOLD_MS = 9000;
const WEIGHTED = [0.45, 0, 0.2, 1];

// Spoken and written versions of the greeting must match exactly.
const GREETING = "Oh, hello! Aishwar wants to talk to you.";

// Picks a warm-sounding English voice if the browser offers one. Voice
// lists load asynchronously in some browsers, so this may see an empty
// list on the very first call — that's fine, it just falls back to
// whatever default voice the browser would otherwise use.
function pickVoice(synth) {
  const voices = synth.getVoices();
  if (!voices.length) return undefined;
  const english = voices.filter((v) => /^en/i.test(v.lang));
  const pool = english.length ? english : voices;
  return (
    pool.find((v) => /natural|premium|enhanced|neural/i.test(v.name)) ??
    pool.find((v) => /^en-(US|GB)/i.test(v.lang)) ??
    pool[0]
  );
}

// Speaks the greeting once, cancelling anything already in progress so
// repeated triggers never stack. Silently does nothing where the Web
// Speech API isn't available — the on-screen bubble never depends on this.
function speakGreeting() {
  const synth = window.speechSynthesis;
  if (!synth || typeof window.SpeechSynthesisUtterance !== "function") return;
  synth.cancel();
  const utterance = new window.SpeechSynthesisUtterance(GREETING);
  utterance.rate = 0.9;
  utterance.pitch = 0.85;
  const voice = pickVoice(synth);
  if (voice) utterance.voice = voice;
  synth.speak(utterance);
}

// Origins pinned in SVG units so they hold even while a view is squashed.
const origin = (x, y) => ({ transformBox: "view-box", transformOrigin: `${x}px ${y}px` });
const GROUND = origin(120, 230);

const FUR = "url(#bear-fur-grad)";
const FUR_SHADE = "url(#bear-fur-shade)";
const MUZZLE = "url(#bear-muzzle)";

function Defs() {
  return (
    <defs>
      {/* Golden-brown coat, lit from upper left */}
      <radialGradient id="bear-fur-grad" cx="35%" cy="25%" r="85%">
        <stop offset="0%" stopColor="#c9955a" />
        <stop offset="45%" stopColor="#9c6a37" />
        <stop offset="100%" stopColor="#5a3a1d" />
      </radialGradient>
      <radialGradient id="bear-fur-shade" cx="50%" cy="20%" r="90%">
        <stop offset="0%" stopColor="#a87443" />
        <stop offset="100%" stopColor="#4a2f17" />
      </radialGradient>
      <radialGradient id="bear-muzzle" cx="45%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#d2ae84" />
        <stop offset="65%" stopColor="#a98256" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#8a6440" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="bear-eye" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#5a3a22" />
        <stop offset="100%" stopColor="#120b06" />
      </radialGradient>
      <linearGradient id="bear-ground-light" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
      </linearGradient>

      {/* Fur: ragged edges + strand texture */}
      <filter id="bear-fur" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="4" result="edgeNoise" />
        <feDisplacementMap in="SourceGraphic" in2="edgeNoise" scale="6" xChannelSelector="R" yChannelSelector="G" result="ragged" />
        <feTurbulence type="fractalNoise" baseFrequency="0.9 0.07" numOctaves="2" seed="11" result="strands" />
        <feColorMatrix
          in="strands"
          type="matrix"
          values="0 0 0 0 0.12  0 0 0 0 0.07  0 0 0 0 0.03  0 0 0 -1.1 0.68"
          result="darkStrands"
        />
        <feComposite in="darkStrands" in2="ragged" operator="in" result="strandsOnFur" />
        <feTurbulence type="fractalNoise" baseFrequency="1.1 0.09" numOctaves="2" seed="23" result="lightNoise" />
        <feColorMatrix
          in="lightNoise"
          type="matrix"
          values="0 0 0 0 1  0 0 0 0 0.86  0 0 0 0 0.62  0 0 0 -1.3 0.72"
          result="lightStrands"
        />
        <feComposite in="lightStrands" in2="ragged" operator="in" result="highlightsOnFur" />
        <feMerge>
          <feMergeNode in="ragged" />
          <feMergeNode in="strandsOnFur" />
          <feMergeNode in="highlightsOnFur" />
        </feMerge>
      </filter>
      {/* Lighter touch for the face so features stay crisp */}
      <filter id="bear-fur-fine" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="bear-soft" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
  );
}

/* ---------- Back view (seated → standing) ---------- */

function BackView({ phase, reduced }) {
  const standing = ["rise", "turn", "turnBack"].includes(phase);
  const stirring = phase === "stir";
  const sleeping = phase === "sleep" && !reduced;
  const gone = phase === "look";

  const pose = standing
    ? { y: -22, scaleY: 1.1, scaleX: 0.93, rotate: 0 }
    : stirring
      ? { y: -3, scaleY: 1.02, scaleX: 1, rotate: -1.5 }
      : { y: 0, scaleY: 1, scaleX: 1, rotate: 0 };

  return (
    <motion.g
      style={GROUND}
      initial={false}
      animate={{
        ...pose,
        scaleX: phase === "turn" ? 0 : pose.scaleX,
        opacity: gone ? 0 : 1,
      }}
      transition={{
        duration: reduced ? 0 : phase === "turn" ? 0.55 : phase === "rise" ? 1.3 : phase === "settle" ? 1.1 : 0.8,
        ease: phase === "turn" ? [0.5, 0, 0.75, 0.3] : WEIGHTED,
        opacity: { duration: 0.01, delay: phase === "turn" && !reduced ? 0.55 : 0 },
      }}
    >
      <g filter="url(#bear-fur)">
        {/* Hind legs, visible once upright */}
        <motion.g initial={false} animate={{ opacity: standing ? 1 : 0 }} transition={{ duration: 0.4 }}>
          <path d="M92 196 C86 214 88 232 98 236 L112 236 C114 222 112 206 108 196 Z" fill={FUR_SHADE} />
          <path d="M148 196 C154 214 152 232 142 236 L128 236 C126 222 128 206 132 196 Z" fill={FUR_SHADE} />
        </motion.g>

        {/* Breathing body: haunches, back and shoulder hump */}
        <motion.g
          style={GROUND}
          animate={sleeping ? { scaleY: [1, 1.028, 1], scaleX: [1, 1.012, 1] } : { scaleY: 1, scaleX: 1 }}
          transition={sleeping ? { duration: 4.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.6 }}
        >
          {/* Hind feet splayed to the sides while seated */}
          <motion.g initial={false} animate={{ opacity: standing ? 0 : 1 }} transition={{ duration: 0.4 }}>
            <ellipse cx="56" cy="220" rx="22" ry="10" fill={FUR_SHADE} />
            <ellipse cx="184" cy="220" rx="22" ry="10" fill={FUR_SHADE} />
          </motion.g>
          <path
            d="M44 214 C30 168 52 118 92 100 C104 94 136 94 148 100 C188 118 210 168 196 214 C170 230 70 230 44 214 Z"
            fill={FUR}
          />
          {/* Shoulder hump, catching the light */}
          <ellipse cx="114" cy="112" rx="40" ry="18" fill="#c9955a" opacity="0.35" />
          {/* Spine shadow and haunch shading */}
          <path d="M120 106 C122 140 121 176 120 214" stroke="#3b2412" strokeWidth="5" opacity="0.18" fill="none" strokeLinecap="round" />
          <ellipse cx="72" cy="196" rx="26" ry="20" fill="#3b2412" opacity="0.18" />
          <ellipse cx="168" cy="196" rx="26" ry="20" fill="#3b2412" opacity="0.22" />
          {/* Short tail */}
          <ellipse cx="120" cy="212" rx="8" ry="6" fill="#7d5229" />
        </motion.g>

        {/* Back of the head, lowered while asleep */}
        <motion.g
          style={origin(120, 104)}
          animate={
            sleeping
              ? { y: [6, 8, 6], rotate: [0, -1.5, 0] }
              : { y: stirring ? -2 : standing ? 0 : 6, rotate: 0 }
          }
          transition={
            sleeping ? { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 } : { duration: 0.9, ease: WEIGHTED }
          }
        >
          <Ear cx={96} cy={58} twitch={sleeping || stirring} delay={0} back />
          <Ear cx={144} cy={58} twitch={sleeping || stirring} delay={2.6} back />
          <ellipse cx="120" cy="80" rx="34" ry="30" fill={FUR} />
          <ellipse cx="110" cy="68" rx="16" ry="9" fill="#d4a26a" opacity="0.3" />
        </motion.g>
      </g>
    </motion.g>
  );
}

function Ear({ cx, cy, twitch, delay, back = false }) {
  return (
    <motion.g
      style={origin(cx, cy + 8)}
      animate={twitch ? { rotate: [0, 0, -9, 4, 0, 0] } : { rotate: 0 }}
      transition={twitch ? { duration: 6, repeat: Infinity, times: [0, 0.82, 0.86, 0.9, 0.94, 1], delay } : { duration: 0.3 }}
    >
      <circle cx={cx} cy={cy} r="11" fill={FUR_SHADE} />
      {!back && <circle cx={cx} cy={cy + 1} r="6" fill="#3d2614" />}
    </motion.g>
  );
}

/* ---------- Front view (upright, facing the viewer) ---------- */

function FrontView({ phase, reduced }) {
  const looking = phase === "look";
  const arriving = phase === "turn";
  const shown = looking || arriving;
  const idle = looking && !reduced;

  return (
    <motion.g
      style={GROUND}
      initial={false}
      animate={{
        scaleX: shown ? (reduced ? 1 : [0, 1.03, 1]) : 0,
        opacity: shown ? 1 : 0,
        y: -18,
      }}
      transition={{
        scaleX: shown
          ? { duration: reduced ? 0 : 0.65, delay: arriving && !reduced ? 0.55 : 0, ease: [0.2, 0.7, 0.3, 1], times: [0, 0.75, 1] }
          : { duration: reduced ? 0 : 0.45, ease: [0.5, 0, 0.75, 0.3] },
        opacity: { duration: 0.01, delay: arriving && !reduced ? 0.55 : 0 },
      }}
    >
      {/* Slow breathing while upright */}
      <motion.g
        style={GROUND}
        animate={idle ? { scaleY: [1, 1.018, 1], scaleX: [1, 1.01, 1] } : { scaleY: 1, scaleX: 1 }}
        transition={idle ? { duration: 3.6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }}
      >
        <g filter="url(#bear-fur)">
          {/* Hind legs */}
          <path d="M94 196 C86 214 88 234 100 238 L114 238 C116 222 114 206 110 196 Z" fill={FUR_SHADE} />
          <path d="M146 196 C154 214 152 234 140 238 L126 238 C124 222 126 206 130 196 Z" fill={FUR_SHADE} />
          {/* Torso */}
          <path
            d="M64 120 C54 152 60 190 84 208 C102 220 138 220 156 208 C180 190 186 152 176 120 C168 100 146 90 120 90 C94 90 72 100 64 120 Z"
            fill={FUR}
          />
          {/* Chest a touch lighter, belly in shadow */}
          <ellipse cx="120" cy="134" rx="30" ry="22" fill="#c9955a" opacity="0.28" />
          <ellipse cx="120" cy="196" rx="40" ry="14" fill="#2e1c0d" opacity="0.25" />
          {/* Forelegs hanging in front, paws curled */}
          <path d="M78 120 C68 146 72 170 84 182 C90 186 98 184 98 176 C96 158 94 138 92 122 Z" fill={FUR_SHADE} />
          <path d="M162 120 C172 146 168 170 156 182 C150 186 142 184 142 176 C144 158 146 138 148 122 Z" fill={FUR_SHADE} />
        </g>
        {/* Claws */}
        <g stroke="#d9c6a6" strokeWidth="1.4" strokeLinecap="round" opacity="0.85">
          <path d="M84 183 l-1 5 M89 185 l0 5 M94 184 l1 5" />
          <path d="M156 183 l1 5 M151 185 l0 5 M146 184 l-1 5" />
        </g>

        {/* Head: curious slow tilt + occasional sniff */}
        <motion.g
          style={origin(120, 104)}
          animate={idle ? { rotate: [0, -7, -7, 3, 3, 0], y: [0, -1, -1, 0, 0, 0] } : { rotate: 0, y: 0 }}
          transition={idle ? { duration: 7, repeat: Infinity, ease: "easeInOut", times: [0, 0.18, 0.45, 0.6, 0.85, 1], delay: 0.8 } : { duration: 0.5 }}
        >
          <g filter="url(#bear-fur)">
            <Ear cx={84} cy={40} twitch={idle} delay={1.2} />
            <Ear cx={156} cy={40} twitch={idle} delay={3.4} />
            <ellipse cx="120" cy="70" rx="42" ry="37" fill={FUR} />
            {/* Brow shadow and under-jaw shadow give the skull some depth */}
            <ellipse cx="120" cy="56" rx="30" ry="8" fill="#3b2412" opacity="0.18" />
            <ellipse cx="120" cy="102" rx="30" ry="9" fill="#2e1c0d" opacity="0.3" />
          </g>
          <g filter="url(#bear-fur-fine)">
            {/* Long snout: lighter bridge into a broad muzzle */}
            <path d="M110 62 C108 74 104 84 104 92 C104 102 136 102 136 92 C136 84 132 74 130 62 Z" fill={MUZZLE} />
            <ellipse cx="120" cy="94" rx="17" ry="12" fill={MUZZLE} />
          </g>
          {/* Nose: broad, dark, wet highlight; sniffs now and then */}
          <motion.g
            style={origin(120, 88)}
            animate={idle ? { scale: [1, 1, 1.06, 1, 1.06, 1], y: [0, 0, -0.6, 0, -0.6, 0] } : { scale: 1, y: 0 }}
            transition={idle ? { duration: 5, repeat: Infinity, times: [0, 0.7, 0.75, 0.8, 0.85, 1], delay: 2 } : { duration: 0.2 }}
          >
            <path d="M109 87 C109 81 131 81 131 87 C131 93 124 96 120 96 C116 96 109 93 109 87 Z" fill="#1b120c" />
            <ellipse cx="114.5" cy="90" rx="2.6" ry="1.7" fill="#000" opacity="0.6" />
            <ellipse cx="125.5" cy="90" rx="2.6" ry="1.7" fill="#000" opacity="0.6" />
            <ellipse cx="117" cy="84.5" rx="4" ry="1.4" fill="#fff" opacity="0.35" />
          </motion.g>
          {/* Mouth line */}
          <path d="M112 102 Q120 106 128 102" stroke="#2a1a0e" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7" />
          {/* Small, deep-set eyes with a slow blink */}
          <motion.g
            style={origin(120, 68)}
            animate={idle ? { scaleY: [1, 1, 0.08, 1] } : { scaleY: 1 }}
            transition={idle ? { duration: 4.6, repeat: Infinity, times: [0, 0.9, 0.95, 1], delay: 1 } : { duration: 0.1 }}
          >
            <ellipse cx="104" cy="68" rx="4" ry="4.3" fill="url(#bear-eye)" />
            <ellipse cx="136" cy="68" rx="4" ry="4.3" fill="url(#bear-eye)" />
            <circle cx="105.3" cy="66.6" r="1.2" fill="#fff" opacity="0.85" />
            <circle cx="137.3" cy="66.6" r="1.2" fill="#fff" opacity="0.85" />
          </motion.g>
        </motion.g>
      </motion.g>
    </motion.g>
  );
}

export function BearMascot({ className = "" }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState("sleep");

  const wake = useCallback(() => setPhase((p) => (p === "sleep" ? (reduced ? "look" : "stir") : p)), [reduced]);
  const sleep = useCallback(() => setPhase((p) => (p === "look" ? (reduced ? "sleep" : "turnBack") : p)), [reduced]);

  useEffect(() => {
    if (phase === "sleep") return undefined;
    const ms = phase === "look" ? LOOK_HOLD_MS : DURATION[phase];
    const next = phase === "look" ? (reduced ? "sleep" : "turnBack") : NEXT[phase];
    const id = window.setTimeout(() => setPhase(next), ms);
    return () => window.clearTimeout(id);
  }, [phase, reduced]);

  useEffect(() => {
    if (phase !== "look") return undefined;
    const onKey = (e) => e.key === "Escape" && sleep();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, sleep]);

  // Speaks the greeting exactly when the bubble's text appears (both are
  // gated on the same "look" phase, so they start together), and stops it
  // the moment that phase ends — on dismiss, on timeout, or on unmount.
  useEffect(() => {
    if (phase !== "look") return undefined;
    speakGreeting();
    return () => window.speechSynthesis?.cancel();
  }, [phase]);

  const looking = phase === "look";

  return (
    <div data-testid="bear-mascot" className={`relative aspect-square w-[clamp(84px,9vw,128px)] shrink-0 select-none ${className}`}>
      <AnimatePresence>
        {looking && (
          <motion.div
            role="status"
            data-testid="bear-bubble"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut", delay: reduced ? 0 : 0.6 }}
            className="absolute bottom-[100%] right-[20%] z-10 w-max max-w-[14rem] rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-left text-sm leading-snug text-ink shadow-[0_10px_30px_-12px_rgba(10,10,10,0.35)]"
          >
            <p className="font-medium">{GREETING}</p>
            <p className="mt-1 text-ink/70">
              <a
                href={`mailto:${EMAIL}`}
                className="font-medium text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-vermilion"
              >
                Say hello →
              </a>
            </p>
            <span aria-hidden="true" className="absolute -bottom-[7px] right-6 h-3 w-3 rotate-45 border-b border-r border-ink/15 bg-paper" />
          </motion.div>
        )}
      </AnimatePresence>

      <svg viewBox="0 0 240 240" className="h-full w-full overflow-visible" aria-hidden="true">
        <Defs />
        {/* Soft contact shadow */}
        <ellipse cx="120" cy="232" rx="86" ry="9" fill="#1a1008" opacity="0.22" filter="url(#bear-soft)" />
        <BackView phase={phase} reduced={reduced} />
        <FrontView phase={phase} reduced={reduced} />
      </svg>

      {(phase === "sleep" || looking) && (
        <button
          type="button"
          onClick={looking ? sleep : wake}
          data-testid="bear-button"
          aria-label={looking ? "Let the bear go back to sleep" : "Wake the sleeping bear"}
          title={looking ? undefined : "A sleeping bear — wake it?"}
          className="absolute inset-[8%] cursor-pointer rounded-[40%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        />
      )}
    </div>
  );
}
