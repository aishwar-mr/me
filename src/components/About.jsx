import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section
      id="about"
      data-line
      aria-label="About"
      className="grid grid-cols-12 gap-6 border-b border-line px-20 pb-10 pt-16"
    >
      <Reveal as="h2" className="col-start-1 col-end-6 m-0 text-u44 font-medium leading-[1.1] tracking-[-0.03em] max-md:text-[32px]">
        Creative Direction
        <br />
        <span className="text-faint">at the</span> Intersection
        <br />
        <span className="text-faint">of</span> Technology <span className="text-faint">&amp;</span>
        <br />
        Ops
      </Reveal>
      <Reveal as="p" delay={120} className="col-start-7 col-end-10 m-0 text-[length:max(12px,calc(var(--u)*12))] leading-[1.5] text-soft max-md:text-[14px] max-md:leading-[1.6]">
        I’m Aishwar, a Business generalist with a keen interest in technology, design, and building scalable
        solutions. I aim to bridge the gap between ideas and execution, <br />
        whether through product, strategy, or operations.
      </Reveal>
    </section>
  );
}
