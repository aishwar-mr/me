import { Reveal } from "@/components/Reveal";

const ITEMS = [
  { num: "01", title: "Product\nThinking", text: "Turning ideas into impactful products and solutions." },
  { num: "03", title: "Strategy", text: "Crafting strategies for sustainable growth." },
  { num: "02", title: "Analytics", text: "Finding insights in data to drive decisions." },
  { num: "04", title: "Operations", text: "Building efficient systems for scale." },
];

function ApproachItem({ num, title, text, last }) {
  return (
    <Reveal
      as="div"
      className={`col-span-6 grid grid-cols-6 items-end gap-6 py-10 pb-6 max-md:grid-cols-[56px_1fr] max-md:items-start max-md:gap-4 max-md:py-7 ${last ? "" : "border-b border-line"}`}
    >
      <span className="col-start-1 col-end-2 text-right text-u44 leading-none text-[#85827a] max-md:col-auto max-md:text-left max-md:text-[32px]">{num}</span>
      <div className="col-start-2 col-end-5 max-md:col-auto">
        <h3 className="m-0 mb-3 whitespace-pre-line text-[length:max(22px,calc(var(--u)*22))] font-medium leading-[1.2]">{title}</h3>
        <p className="m-0 text-[length:max(12px,calc(var(--u)*12))] leading-[1.45] text-[#57544d]">{text}</p>
      </div>
    </Reveal>
  );
}

export function Approach() {
  return (
    <section id="approach" aria-label="Services" className="grid grid-cols-12 gap-6 border-b border-line px-20 max-md:gap-0">
      <div className="col-start-1 col-end-7 grid grid-cols-6 gap-6 border-r-0">
        <ApproachItem {...ITEMS[0]} />
        <ApproachItem {...ITEMS[2]} last />
      </div>
      <div className="col-start-7 col-end-13 grid grid-cols-6 gap-6">
        <ApproachItem {...ITEMS[1]} />
        <ApproachItem {...ITEMS[3]} last />
      </div>
    </section>
  );
}
