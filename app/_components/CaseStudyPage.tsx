import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "../../lib/cases";
import type { Lang } from "../seo";

export default function CaseStudyPage({ caseStudy, lang, routePrefix = "" }: { caseStudy: CaseStudy; lang: Lang; routePrefix?: string }) {
  const content = caseStudy[lang];
  const homePath = routePrefix ? `${routePrefix}/${lang}` : `/${lang}`;
  const casesPath = `${homePath}/cases`;
  const alternateLang: Lang = lang === "zh" ? "en" : "zh";
  const alternatePath = routePrefix ? `${routePrefix}/${alternateLang}/cases/${caseStudy.slug}` : `/${alternateLang}/cases/${caseStudy.slug}`;

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-45"><div className="grid-plane absolute inset-0" /></div>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href={homePath} className="flex items-center gap-3">
            <span className="relative h-10 w-24 overflow-hidden rounded-xl border border-cyan/15 bg-white shadow-sm"><Image src="/logo/md.jpg" alt="MicroDetect Logo" fill sizes="96px" className="object-cover" priority /></span>
            <span className="text-sm font-semibold text-white md:text-base">{lang === "zh" ? "析微探物" : "MicroDetect"}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href={casesPath} className="hidden text-sm font-medium text-slate-300 transition hover:text-cyan sm:inline">{lang === "zh" ? "工程案例" : "Case Studies"}</Link>
            <Link href={alternatePath} className="rounded-full border border-cyan/20 bg-white/70 px-4 py-2 text-sm font-semibold text-cyan transition hover:bg-cyan/10">{lang === "zh" ? "EN" : "中文"}</Link>
            <Link href={`${homePath}#contact`} className="scan-glow rounded-full border border-cyan/35 bg-cyan/10 px-4 py-2 text-sm font-medium text-cyan transition hover:border-cyan hover:bg-cyan/15">{lang === "zh" ? "联系咨询" : "Contact"}</Link>
          </div>
        </nav>
      </header>

      <article className="relative z-10 mx-auto max-w-7xl pt-14">
        <Link href={casesPath} className="font-medium text-cyan transition hover:underline">{lang === "zh" ? "返回工程案例" : "Back to case studies"}</Link>
        <div className="mt-8 grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan">{content.category}</p>
            <h1 className="cjk-wrap mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">{content.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{content.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2">{content.highlights.map((highlight) => <span key={highlight} className="rounded-full bg-cyan/10 px-3 py-1 text-sm text-cyan">{highlight}</span>)}</div>
          </div>
          <div className="hud-card overflow-hidden rounded-[32px] p-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] border border-cyan/15 bg-white"><Image src={caseStudy.image} alt={content.title} fill priority loading="eager" sizes="(min-width: 1024px) 680px, 100vw" className="object-cover" /></div>
          </div>
        </div>

        <section className="mt-12 grid gap-5 md:grid-cols-3">{content.results.map((result) => <div key={result.label} className="hud-card rounded-3xl p-6"><p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">{result.label}</p><p className="mt-4 text-2xl font-semibold text-white">{result.value}</p></div>)}</section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="hud-card h-fit rounded-[32px] p-6 md:p-8">
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-mint">{lang === "zh" ? "Project Brief" : "Project Brief"}</p>
            <dl className="mt-6 grid gap-5">
              {[[lang === "zh" ? "项目地点" : "Location", content.location], [lang === "zh" ? "系统组成" : "System", content.system], [lang === "zh" ? "监测内容" : "Monitoring", content.monitoring]].map(([label, value]) => <div key={label}><dt className="text-sm text-cyan">{label}</dt><dd className="mt-2 leading-7 text-slate-300">{value}</dd></div>)}
            </dl>
          </aside>
          <div className="hud-card rounded-[32px] p-6 md:p-8">
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-mint">{lang === "zh" ? "Deployment" : "Deployment"}</p>
            <p className="mt-5 text-lg leading-8 text-slate-300">{content.deployment}</p>
            <p className="mt-8 rounded-2xl border border-amber/20 bg-amber/10 p-4 text-sm leading-6 text-amber">{lang === "zh" ? "案例数据用于展示相应示范项目的测试与部署情况，实际指标以现场条件、项目配置和技术协议为准。" : "Case figures describe the relevant demonstration project. Actual performance depends on site conditions, project configuration and the technical agreement."}</p>
          </div>
        </section>

        <section className="mt-16"><p className="font-mono text-sm uppercase tracking-[0.24em] text-cyan">{lang === "zh" ? "现场与数据" : "Field and Data"}</p><div className="mt-6 grid gap-5 md:grid-cols-2">{caseStudy.gallery.filter((image) => image !== caseStudy.image).map((image, index) => <div key={image} className="hud-card overflow-hidden rounded-[28px] p-3"><div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-white"><Image src={image} alt={`${content.title} ${index + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div></div>)}</div></section>
      </article>
    </main>
  );
}
