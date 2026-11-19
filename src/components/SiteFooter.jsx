import { EMAIL, SocialLinks } from "@/components/FooterBar";
import { Reveal } from "@/components/Reveal";

export function SiteFooter() {
  return (
    <footer id="contact" aria-label="Contact" className="grid grid-cols-12 gap-6 px-20 pb-8 pt-14">
      <p className="col-start-1 col-end-7 m-0 mb-2 text-[12px] text-[#57544d]">Have a project in mind?</p>
      <Reveal
        as="a"
        href={`mailto:${EMAIL}`}
        className="col-start-1 col-end-9 text-[80px] font-medium leading-[1.05] tracking-[-0.04em]"
      >
        let’s talk →
      </Reveal>
      <div className="col-start-1 col-end-13 mt-10 grid grid-cols-12 gap-6 border-t border-line pt-5 text-[12px] text-[#57544d]">
        <span className="col-start-1 col-end-5">{EMAIL}</span>
        <SocialLinks className="col-start-5 col-end-10 flex gap-6" />
        <span className="col-start-10 col-end-13 text-right">© 2026 Aishwar</span>
      </div>
    </footer>
  );
}
