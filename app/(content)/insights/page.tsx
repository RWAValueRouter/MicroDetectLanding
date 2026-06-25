import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllInsights } from "../../../lib/insights";
import { absoluteUrl } from "../../seo";

export const metadata: Metadata = {
  title: "行业洞察 | 析微探物",
  description:
    "析微探物行业洞察聚焦毫米波雷达、水利水文监测、工业物位监测、桥梁结构健康监测和非接触式在线感知技术。",
  alternates: {
    canonical: "/insights"
  },
  openGraph: {
    title: "行业洞察 | 析微探物",
    description:
      "聚焦毫米波雷达监测、非接触式在线感知、工业物位与结构安全监测的行业文章。",
    url: "/insights",
    siteName: "MicroDetect",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/hero/liquid-level.png",
        width: 1672,
        height: 941,
        alt: "析微探物行业洞察"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "行业洞察 | 析微探物",
    description: "毫米波雷达监测、非接触式在线感知与结构安全监测行业文章。",
    images: ["/hero/liquid-level.png"]
  }
};

export default async function InsightsPage() {
  const insights = await getAllInsights();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "行业洞察",
    description: metadata.description,
    url: absoluteUrl("/insights"),
    inLanguage: "zh-CN",
    hasPart: insights.map((insight) => ({
      "@type": "Article",
      headline: insight.title,
      description: insight.description,
      datePublished: insight.date,
      url: absoluteUrl(`/insights/${insight.slug}`)
    }))
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c")
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-45">
        <div className="grid-plane absolute inset-0" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/zh" className="flex items-center gap-3">
            <span className="relative h-10 w-24 overflow-hidden rounded-xl border border-cyan/15 bg-white shadow-sm">
              <Image src="/logo/md.jpg" alt="析微探物 Logo" fill sizes="96px" className="object-cover" priority />
            </span>
            <span className="text-sm font-semibold text-white md:text-base">析微探物</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/zh" className="text-sm font-medium text-slate-300 transition hover:text-cyan">
              返回首页
            </Link>
            <Link
              href="/zh#contact"
              className="scan-glow rounded-full border border-cyan/35 bg-cyan/10 px-4 py-2 text-sm font-medium text-cyan transition hover:border-cyan hover:bg-cyan/15"
            >
              联系咨询
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl pt-16">
        <p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan">Insights</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h1 className="cjk-wrap text-5xl font-semibold leading-tight text-white md:text-7xl">行业洞察</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              关注毫米波雷达、非接触式在线监测、水利水文、工业物位与结构安全等场景的技术趋势和产品实践。
            </p>
          </div>
          <div className="hud-card rounded-[32px] p-6">
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-mint">MicroDetect Knowledge Base</p>
            <p className="mt-4 leading-8 text-slate-300">
              持续分享复杂环境在线监测、毫米波雷达工程应用和行业解决方案实践，帮助客户更快判断技术路线与部署方式。
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2">
        {insights.map((insight) => (
          <article key={insight.slug} className="hud-card scan-glow rounded-[28px] p-6 transition hover:-translate-y-1">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-cyan/10 px-3 py-1 font-medium text-cyan">{insight.category}</span>
              <time className="text-slate-500" dateTime={insight.date}>
                {insight.date}
              </time>
              <span className="text-slate-500">{insight.readingTime}</span>
            </div>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-white">{insight.title}</h2>
            <p className="mt-4 leading-8 text-slate-300">{insight.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {insight.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/insights/${insight.slug}`} className="mt-7 inline-flex font-semibold text-cyan">
              阅读文章
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
