import Image from "next/image";
import Link from "next/link";
import { getAllInsights } from "../../lib/insights";
import { absoluteUrl } from "../seo";
import ContentNavigation from "./ContentNavigation";

const description = "析微探物行业洞察聚焦毫米波雷达、水利水文监测、工业物位监测、桥梁结构健康监测和非接触式在线感知技术。";

export default async function InsightsContent({ routePrefix = "" }: { routePrefix?: string }) {
  const insights = await getAllInsights();
  const insightsPath = routePrefix ? `${routePrefix}/insights` : "/insights";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "行业洞察",
    description,
    url: absoluteUrl("/insights"),
    inLanguage: "zh-CN",
    hasPart: insights.map((insight) => ({
      "@type": "Article",
      headline: insight.title,
      description: insight.description,
      datePublished: insight.date,
      url: absoluteUrl(`/insights/${insight.slug}`),
      image: absoluteUrl(insight.coverImage)
    }))
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-45"><div className="grid-plane absolute inset-0" /></div>
      <ContentNavigation lang="zh" active="insights" routePrefix={routePrefix} />

      <section className="relative z-10 mx-auto max-w-7xl pt-16">
        <p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan">Insights</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h1 className="cjk-wrap text-5xl font-semibold leading-tight text-white md:text-7xl">行业洞察</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">关注毫米波雷达、非接触式在线监测、水利水文、工业物位与结构安全等场景的技术趋势和产品实践。</p>
          </div>
          <div className="hud-card rounded-[32px] p-6">
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-mint">MicroDetect Knowledge Base</p>
            <p className="mt-4 leading-8 text-slate-300">持续分享复杂环境在线监测、毫米波雷达工程应用和行业解决方案实践，帮助客户更快判断技术路线与部署方式。</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2">
        {insights.map((insight, index) => (
          <article key={insight.slug} className="hud-card scan-glow rounded-[28px] p-6 transition hover:-translate-y-1">
            <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-3xl border border-cyan/15 bg-white">
              <Image src={insight.coverImage} alt={insight.title} fill priority={index === 0} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-cyan/10 px-3 py-1 font-medium text-cyan">{insight.category}</span>
              <time className="text-slate-500" dateTime={insight.date}>{insight.date}</time>
              <span className="text-slate-500">{insight.readingTime}</span>
            </div>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-white">{insight.title}</h2>
            <p className="mt-4 leading-8 text-slate-300">{insight.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {insight.tags.map((tag) => <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-400">{tag}</span>)}
            </div>
            <Link href={`${insightsPath}/${insight.slug}`} className="mt-7 inline-flex font-semibold text-cyan">阅读文章</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
