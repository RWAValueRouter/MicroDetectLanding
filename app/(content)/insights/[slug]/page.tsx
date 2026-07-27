import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllInsights, getInsightBySlug, getInsightSlugs } from "../../../../lib/insights";
import { absoluteUrl, siteUrl } from "../../../seo";

type PageProps = {
  params: Promise<{ slug: string }>;
  routePrefix?: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const insight = await getInsightBySlug(slug);

    return {
      title: `${insight.meta.title} | 行业洞察 | 析微探物`,
      description: insight.meta.description,
      alternates: {
        canonical: `/insights/${slug}`
      },
      openGraph: {
        title: insight.meta.title,
        description: insight.meta.description,
        url: `/insights/${slug}`,
        siteName: "MicroDetect",
        locale: "zh_CN",
        type: "article",
        publishedTime: insight.meta.date,
        tags: insight.meta.tags,
        images: [
          {
            url: insight.meta.coverImage,
            width: 1672,
            height: 941,
            alt: insight.meta.title
          }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title: insight.meta.title,
        description: insight.meta.description,
        images: [insight.meta.coverImage]
      }
    };
  } catch {
    return {};
  }
}

export default async function InsightArticlePage({ params, routePrefix = "" }: PageProps) {
  const { slug } = await params;
  const relatedInsights = (await getAllInsights()).filter((insight) => insight.slug !== slug).slice(0, 3);

  let insight: Awaited<ReturnType<typeof getInsightBySlug>>;

  try {
    insight = await getInsightBySlug(slug);
  } catch {
    notFound();
  }

  const { Component, meta } = insight;
  const homePath = routePrefix ? `${routePrefix}/zh` : "/zh";
  const insightsPath = routePrefix ? `${routePrefix}/insights` : "/insights";
  const articleUrl = absoluteUrl(`/insights/${slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    author: {
      "@type": "Organization",
      name: "重庆析微探物科技有限公司"
    },
    publisher: {
      "@type": "Organization",
      name: "重庆析微探物科技有限公司",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo/md.jpg")
      }
    },
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    image: absoluteUrl(meta.coverImage),
    inLanguage: "zh-CN"
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
          <Link href={homePath} className="flex items-center gap-3">
            <span className="relative h-10 w-24 overflow-hidden rounded-xl border border-cyan/15 bg-white shadow-sm">
              <Image src="/logo/md.jpg" alt="析微探物 Logo" fill sizes="96px" className="object-cover" priority />
            </span>
            <span className="text-sm font-semibold text-white md:text-base">析微探物</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href={insightsPath} className="text-sm font-medium text-slate-300 transition hover:text-cyan">
              行业洞察
            </Link>
            <Link
              href={`${homePath}#contact`}
              className="scan-glow rounded-full border border-cyan/35 bg-cyan/10 px-4 py-2 text-sm font-medium text-cyan transition hover:border-cyan hover:bg-cyan/15"
            >
              联系咨询
            </Link>
          </div>
        </nav>
      </header>

      <article className="relative z-10 mx-auto max-w-4xl pt-14">
        <Link href={insightsPath} className="font-medium text-cyan transition hover:underline">
          返回行业洞察
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-cyan/10 px-3 py-1 font-medium text-cyan">{meta.category}</span>
          <time className="text-slate-500" dateTime={meta.date}>
            {meta.date}
          </time>
          <span className="text-slate-500">{meta.readingTime}</span>
        </div>
        <h1 className="cjk-wrap mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">{meta.title}</h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">{meta.description}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-400">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-10 overflow-hidden rounded-[32px] border border-cyan/15">
          <Image
            src={meta.coverImage}
            alt={meta.title}
            width={1672}
            height={941}
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        <div className="hud-card mt-10 rounded-[32px] p-6 md:p-10">
          <Component />
        </div>
      </article>

      {relatedInsights.length ? (
        <section className="relative z-10 mx-auto mt-14 max-w-4xl">
          <h2 className="text-3xl font-semibold text-white">更多行业洞察</h2>
          <div className="mt-6 grid gap-4">
            {relatedInsights.map((related) => (
              <Link
                key={related.slug}
                href={`${insightsPath}/${related.slug}`}
                className="rounded-3xl border border-white/10 bg-white/60 p-5 transition hover:border-cyan/35"
              >
                <p className="text-sm text-cyan">{related.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{related.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{related.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <footer className="relative z-10 mx-auto mt-16 max-w-4xl border-t border-white/10 pt-8 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} 重庆析微探物科技有限公司 · {siteUrl}</p>
      </footer>
    </main>
  );
}
