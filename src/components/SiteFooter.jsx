import { EMAIL, SocialLinks } from "@/components/FooterBar";
import { Reveal } from "@/components/Reveal";

export function SiteFooter() {
  return (
    <footer id="contact" aria-label="Contact" className="grid grid-cols-12 gap-6 px-20 pb-8 pt-14">
      <p className="col-start-1 col-end-7 m-0 mb-2 text-[length:max(12px,calc(var(--u)*12))] text-[#57544d]">Have a project in mind?</p>
      <Reveal
        as="a"
        href={`mailto:${EMAIL}`}
        className="col-start-1 col-end-9 text-u80 font-medium leading-[1.05] tracking-[-0.04em] max-md:text-[13vw]"
      >
        let’s talk →
      </Reveal>
      <div className="col-start-1 col-end-13 mt-10 grid grid-cols-12 gap-6 border-t border-line pt-5 text-[length:max(12px,calc(var(--u)*12))] text-[#57544d] max-md:mt-6 max-md:gap-3">
        <span className="col-start-1 col-end-5 break-all">{EMAIL}</span>
        <SocialLinks className="col-start-5 col-end-10 flex gap-6" />
        <span className="col-start-10 col-end-13 text-right max-md:text-left">© 2026 Aishwar</span>
      </div>
    </footer>
  );
}
