import { CSSProperties } from "react";
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
  driftSeconds: number;
  driftDistance: number;
  hideOnMobile?: boolean;
};

export function FloatingImage({
  spec,
  index,
  visible,
  reducedMotion,
  parallax,
}: {
  spec: FloatingImageSpec;
  index: number;
  visible: boolean;
  reducedMotion: boolean;
  parallax: { x: number; y: number };
}) {
  const innerStyle: CSSProperties = {
    transition: "transform 450ms cubic-bezier(0.16,1,0.3,1), opacity 700ms ease-out",
    transitionDelay: visible ? `${spec.delayMs}ms` : "0ms",
    transform: visible
      ? `translate(${parallax.x * spec.parallaxStrength}px, ${
          parallax.y * spec.parallaxStrength
        }px) rotate(${spec.rotate}deg) scale(1)`
      : `translateY(16px) rotate(${spec.rotate}deg) scale(0.96)`,
  };

  const driftStyle: CSSProperties = reducedMotion
    ? {}
    : {
        animation: `drift ${spec.driftSeconds}s ease-in-out infinite`,
        animationDelay: `${spec.delayMs}ms`,
        ["--drift-distance" as string]: `${spec.driftDistance}px`,
      };

  return (
    <div
      className={`absolute ${spec.hideOnMobile ? "hidden sm:block" : ""}`}
      style={{ top: spec.top, left: spec.left, width: spec.width, height: spec.height }}
    >
      <div className="h-full w-full" style={driftStyle}>
        <div
          className={`h-full w-full shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)] ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={innerStyle}
        >
          <PlaceholderTile seed={index} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
