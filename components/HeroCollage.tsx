"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import { FloatingImage, type FloatingImageSpec } from "./FloatingImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import forest from "@/assets/hero/forest.jpg";
import ocean from "@/assets/hero/ocean.jpg";
import fogMountains from "@/assets/hero/fog-mountains.jpg";
import sunriseRidge from "@/assets/hero/sunrise-ridge.jpg";
import aerialSurf from "@/assets/hero/aerial-surf.jpg";
import cliff from "@/assets/hero/cliff.jpg";

// All six tiles cut through this same set, offset per tile so every frame
// shows each photo exactly once, never a duplicate.
const HERO_IMAGES = [forest, ocean, fogMountains, sunriseRidge, aerialSurf, cliff];
// Very fast: tiles swap photos every SWAP_MS and run a short zoom cycle.
const SWAP_MS = 140;
const ZOOM_SEC = 1.3;

// Each tile gets its own travel path so the shrink/fade reads as composed
// rather than mechanically uniform, per the cinematic-transformation spec.
const TILES: FloatingImageSpec[] = [
  {
    id: "a",
    top: "6%",
    left: "4%",
    width: "9vw",
    height: "12vw",
    rotate: -4,
    parallaxStrength: 0.6,
    delayMs: 0,
    scrollScaleRange: [1, 0.45],
    scrollOpacityRange: [1, 0.25],
    scrollXRange: [0, -120],
    scrollYRange: [0, -90],
    scrollRotateRange: [0, -10],
  },
  {
    id: "b",
    top: "3%",
    left: "70%",
    width: "12vw",
    height: "8vw",
    rotate: 3,
    parallaxStrength: 0.8,
    delayMs: 120,
    scrollScaleRange: [1, 0.5],
    scrollOpacityRange: [1, 0.3],
    scrollXRange: [0, 140],
    scrollYRange: [0, -70],
    scrollRotateRange: [0, 8],
    hideOnMobile: true,
  },
  {
    id: "c",
    top: "38%",
    left: "84%",
    width: "7vw",
    height: "10vw",
    rotate: -2,
    parallaxStrength: 1,
    delayMs: 240,
    scrollScaleRange: [1, 0.35],
    scrollOpacityRange: [1, 0.2],
    scrollXRange: [0, 160],
    scrollYRange: [0, 40],
    scrollRotateRange: [0, -6],
  },
  {
    id: "d",
    top: "64%",
    left: "3%",
    width: "10vw",
    height: "7vw",
    rotate: 5,
    parallaxStrength: 0.7,
    delayMs: 360,
    scrollScaleRange: [1, 0.5],
    scrollOpacityRange: [1, 0.3],
    scrollXRange: [0, -100],
    scrollYRange: [0, 110],
    scrollRotateRange: [0, 9],
  },
  {
    id: "e",
    top: "70%",
    left: "66%",
    width: "9vw",
    height: "11vw",
    rotate: -3,
    parallaxStrength: 0.9,
    delayMs: 480,
    scrollScaleRange: [1, 0.4],
    scrollOpacityRange: [1, 0.25],
    scrollXRange: [0, 110],
    scrollYRange: [0, 130],
    scrollRotateRange: [0, -8],
  },
  {
    id: "f",
    top: "8%",
    left: "42%",
    width: "6vw",
    height: "6vw",
    rotate: 2,
    parallaxStrength: 0.5,
    delayMs: 600,
    scrollScaleRange: [1, 0.55],
    scrollOpacityRange: [1, 0.35],
    scrollXRange: [0, -60],
    scrollYRange: [0, -120],
    scrollRotateRange: [0, 7],
    hideOnMobile: true,
  },
];

export function HeroCollage({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Advance the shared step so all tiles swap photos together, in lockstep,
  // keeping the "each photo once" invariant. Off when motion is reduced.
  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => setStep((s) => s + 1), SWAP_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const node = containerRef.current;
    if (!node) return;

    let frame = 0;
    const handlePointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setParallax({ x: x * 20, y: y * 20 });
      });
    };

    node.addEventListener("pointermove", handlePointerMove);
    return () => {
      node.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0">
      {TILES.map((spec, index) => (
        <FloatingImage
          key={spec.id}
          spec={spec}
          index={index}
          image={HERO_IMAGES[(index + step) % HERO_IMAGES.length]}
          zoomDurationSec={ZOOM_SEC}
          visible={visible}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
          parallax={reducedMotion ? { x: 0, y: 0 } : parallax}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}
