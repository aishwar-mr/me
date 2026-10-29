import { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, type MotionValue, useTransform } from "motion/react";
import { PlaceholderTile } from "./PlaceholderTile";

export type FloatingImageSpec = {
  id: string;
  top: string;
  left: string;
  width: string;
  height: string;
  rotate: number;
  parallaxStrength: number;
  delayMs: number;
  /** Scroll-driven shrink/travel/fade targets: [start, end] over scroll progress 0→1. */
  scrollScaleRange: [number, number];
  scrollOpacityRange: [number, number];
  scrollXRange: [number, number];
  scrollYRange: [number, number];
  scrollRotateRange: [number, number];
  hideOnMobile?: boolean;
  /** Bundled photo for the tile. Falls back to a PlaceholderTile when absent. */
  image?: StaticImageData;
  /** Seconds for one in/out zoom cycle; staggered so tiles don't move in lockstep. */
  zoomDurationSec?: number;
};

export function FloatingImage({
  spec,
  index,
  image,
  zoomDurationSec,
  visible,
  reducedMotion,
  isMobile,
  parallax,
  scrollYProgress,
}: {
  spec: FloatingImageSpec;
  index: number;
  /** Current photo for this tile (parent rotates it so each shows once). */
  image?: StaticImageData;
  /** Seconds for one in/out zoom cycle. */
  zoomDurationSec?: number;
  visible: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  parallax: { x: number; y: number };
  scrollYProgress: MotionValue<number>;
}) {
  const photo = image ?? spec.image;
  const travelScale = isMobile ? 0.4 : 1;

  // Always compute the full animated values — useTransform's output range
  // is effectively fixed at creation, so branching the range itself on
  // reducedMotion silently fails if that flag resolves after first paint.
  // Instead we switch which style object motion.div receives, below.
  const scale = useTransform(scrollYProgress, [0, 1], spec.scrollScaleRange);
  const opacity = useTransform(scrollYProgress, [0, 1], spec.scrollOpacityRange);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    spec.scrollXRange.map((v) => v * travelScale)
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    spec.scrollYRange.map((v) => v * travelScale)
  );
  const scrollRotate = useTransform(scrollYProgress, [0, 1], spec.scrollRotateRange);

  const innerStyle: CSSProperties = {
    transition: "transform 450ms cubic-bezier(0.16,1,0.3,1), opacity 700ms ease-out",
    transitionDelay: visible ? `${spec.delayMs}ms` : "0ms",
    transform: visible
      ? `translate(${parallax.x * spec.parallaxStrength}px, ${
          parallax.y * spec.parallaxStrength
        }px) rotate(${spec.rotate}deg) scale(1)`
      : `translateY(16px) rotate(${spec.rotate}deg) scale(0.96)`,
  };

  return (
    <div
      className={`absolute ${spec.hideOnMobile ? "hidden sm:block" : ""}`}
      style={{ top: spec.top, left: spec.left, width: spec.width, height: spec.height }}
    >
      <motion.div
        className="h-full w-full"
        style={
          reducedMotion
            ? { scale: 1, opacity: 1, x: 0, y: 0, rotate: 0 }
            : { scale, opacity, x, y, rotate: scrollRotate }
        }
      >
        <div
          className={`relative h-full w-full overflow-hidden shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)] ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={innerStyle}
        >
          {photo ? (
            <Image
              src={photo}
              alt=""
              fill
              sizes="15vw"
              aria-hidden
              className="object-cover will-change-transform"
              style={{
                transformOrigin: "50% 50%",
                animation: reducedMotion
                  ? undefined
                  : `heroZoom ${zoomDurationSec ?? spec.zoomDurationSec ?? 8}s ease-in-out infinite alternate`,
              }}
            />
          ) : (
            <PlaceholderTile seed={index} className="h-full w-full" />
          )}
        </div>
      </motion.div>
    </div>
  );
}
