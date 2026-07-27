import Image from "next/image";
import Link from "next/link";
import { caseStudies, getCasePath } from "../../lib/cases";
import type { Lang } from "../seo";
import ContentNavigation from "./ContentNavigation";

export default function CaseDirectory({ lang, routePrefix = "" }: { lang: Lang; routePrefix?: string }) {
  const isZh = lang === "zh";
  const title = isZh ? "工程案例" : "Case Studies";
  const description = isZh ? "从桥下现场勘察、雷达布设到平台告警，呈现毫米波雷达在真实项目中的部署方式与数据价值。" : "From field surveys and radar deployment to platform alerts, explore how mmWave radar is deployed in real projects.";
  const casePath = (slug: string) => routePrefix ? `${routePrefix}/${lang}/cases/${slug}` : getCasePath({ slug } as (typeof caseStudies)[number], lang);

  return <main className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28"><div className="pointer-events-none fixed inset-0 z-0 opacity-45"><div className="grid-plane absolute inset-0" /></div><ContentNavigation lang={lang} active="cases" routePrefix={routePrefix} languageHref={routePrefix ? `${routePrefix}/${lang === "zh" ? "en" : "zh"}/cases` : `/${lang === "zh" ? "en" : "zh"}/cases`} /><section className="relative z-10 mx-auto max-w-7xl pt-16"><p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan">Engineering Proof</p><h1 className="mt-5 text-5xl font-semibold leading-tight text-white md:text-7xl">{title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{description}</p></section><section className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2">{caseStudies.map((caseStudy, index) => { const content = caseStudy[lang]; return <article key={caseStudy.slug} className="hud-card scan-glow overflow-hidden rounded-[28px] p-3 transition hover:-translate-y-1"><div className="relative aspect-[16/9] overflow-hidden rounded-[22px] bg-white"><Image src={caseStudy.image} alt={content.title} fill priority={index === 0} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div><div className="p-4"><p className="font-mono text-sm text-cyan">{content.category}</p><h2 className="mt-3 text-3xl font-semibold leading-tight text-white">{content.title}</h2><p className="mt-4 leading-7 text-slate-300">{content.summary}</p><Link href={casePath(caseStudy.slug)} className="mt-6 inline-flex font-semibold text-cyan">{isZh ? "查看案例" : "View case study"}</Link></div></article>; })}</section></main>;
}
