"use client";

import { useEffect, useRef, useState } from "react";
import { FloatingImage, type FloatingImageSpec } from "./FloatingImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TILES: FloatingImageSpec[] = [
  { id: "a", top: "6%", left: "4%", width: "9vw", height: "12vw", rotate: -4, parallaxStrength: 0.6, delayMs: 0, driftSeconds: 7, driftDistance: -6 },
  { id: "b", top: "3%", left: "70%", width: "12vw", height: "8vw", rotate: 3, parallaxStrength: 0.8, delayMs: 120, driftSeconds: 8.5, driftDistance: 7, hideOnMobile: true },
  { id: "c", top: "38%", left: "84%", width: "7vw", height: "10vw", rotate: -2, parallaxStrength: 1, delayMs: 240, driftSeconds: 6.5, driftDistance: -5 },
  { id: "d", top: "64%", left: "3%", width: "10vw", height: "7vw", rotate: 5, parallaxStrength: 0.7, delayMs: 360, driftSeconds: 9, driftDistance: 6 },
  { id: "e", top: "70%", left: "66%", width: "9vw", height: "11vw", rotate: -3, parallaxStrength: 0.9, delayMs: 480, driftSeconds: 7.5, driftDistance: -7 },
  { id: "f", top: "8%", left: "42%", width: "6vw", height: "6vw", rotate: 2, parallaxStrength: 0.5, delayMs: 600, driftSeconds: 6, driftDistance: 5, hideOnMobile: true },
];

export function HeroCollage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

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
          visible={visible}
          reducedMotion={reducedMotion}
          parallax={reducedMotion ? { x: 0, y: 0 } : parallax}
        />
      ))}
    </div>
  );
}
