import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { caseStudies, getCasePath } from "../../../lib/cases";
import { absoluteUrl, supportedLangs, type Lang } from "../../seo";

type PageProps = { params: Promise<{ lang: string }> };

export function generateStaticParams() { return supportedLangs.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === "zh";
  const title = isZh ? "工程案例 | 析微探物" : "Case Studies | MicroDetect";
  const description = isZh ? "析微探物毫米波雷达在桥梁结构健康监测、水位流速在线监测与交通基础设施感知中的工程案例。" : "MicroDetect mmWave radar case studies for bridge health monitoring, online water level and flow monitoring, and transport infrastructure sensing.";
  return { title, description, alternates: { canonical: `/${lang}/cases`, languages: { "zh-CN": "/zh/cases", en: "/en/cases", "x-default": "/zh/cases" } }, openGraph: { title, description, url: `/${lang}/cases`, siteName: "MicroDetect", locale: isZh ? "zh_CN" : "en_US", type: "website", images: [{ url: "/cases/bridge-field-survey.png", width: 771, height: 1028, alt: title }] } };
}

export default async function CasesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale: Lang = lang === "en" ? "en" : "zh";
  const isZh = locale === "zh";
  const title = isZh ? "工程案例" : "Case Studies";
  const description = isZh ? "从桥下现场勘察、雷达布设到平台告警，呈现毫米波雷达在真实项目中的部署方式与数据价值。" : "From field surveys and radar deployment to platform alerts, explore how mmWave radar is deployed in real projects.";
  const structuredData = { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: absoluteUrl(`/${locale}/cases`), inLanguage: isZh ? "zh-CN" : "en", hasPart: caseStudies.map((caseStudy) => ({ "@type": "Article", headline: caseStudy[locale].title, description: caseStudy[locale].summary, url: absoluteUrl(getCasePath(caseStudy, locale)), image: absoluteUrl(caseStudy.image) })) };

  return <main className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><div className="pointer-events-none fixed inset-0 z-0 opacity-45"><div className="grid-plane absolute inset-0" /></div><header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl"><nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><Link href={`/${locale}`} className="flex items-center gap-3"><span className="relative h-10 w-24 overflow-hidden rounded-xl border border-cyan/15 bg-white shadow-sm"><Image src="/logo/md.jpg" alt="MicroDetect Logo" fill sizes="96px" className="object-cover" priority /></span><span className="text-sm font-semibold text-white md:text-base">{isZh ? "析微探物" : "MicroDetect"}</span></Link><div className="flex items-center gap-3"><Link href={`/${locale}`} className="hidden text-sm font-medium text-slate-300 transition hover:text-cyan sm:inline">{isZh ? "返回首页" : "Home"}</Link><Link href={`/${locale === "zh" ? "en" : "zh"}/cases`} className="rounded-full border border-cyan/20 bg-white/70 px-4 py-2 text-sm font-semibold text-cyan">{isZh ? "EN" : "中文"}</Link></div></nav></header><section className="relative z-10 mx-auto max-w-7xl pt-16"><p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan">{isZh ? "Engineering Proof" : "Engineering Proof"}</p><h1 className="mt-5 text-5xl font-semibold leading-tight text-white md:text-7xl">{title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{description}</p></section><section className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2">{caseStudies.map((caseStudy, index) => { const content = caseStudy[locale]; return <article key={caseStudy.slug} className="hud-card scan-glow overflow-hidden rounded-[28px] p-3 transition hover:-translate-y-1"><div className="relative aspect-[16/9] overflow-hidden rounded-[22px] bg-white"><Image src={caseStudy.image} alt={content.title} fill priority={index === 0} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div><div className="p-4"><p className="font-mono text-sm text-cyan">{content.category}</p><h2 className="mt-3 text-3xl font-semibold leading-tight text-white">{content.title}</h2><p className="mt-4 leading-7 text-slate-300">{content.summary}</p><Link href={getCasePath(caseStudy, locale)} className="mt-6 inline-flex font-semibold text-cyan">{isZh ? "查看案例" : "View case study"}</Link></div></article>; })}</section></main>;
}
