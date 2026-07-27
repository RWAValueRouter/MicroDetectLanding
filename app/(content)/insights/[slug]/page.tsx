import type { Metadata } from "next";
import InsightArticleContent from "../../../_components/InsightArticleContent";
import { getInsightBySlug, getInsightSlugs } from "../../../../lib/insights";

type PageProps = { params: Promise<{ slug: string }> };

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
      alternates: { canonical: `/insights/${slug}` },
      openGraph: {
        title: insight.meta.title,
        description: insight.meta.description,
        url: `/insights/${slug}`,
        siteName: "MicroDetect",
        locale: "zh_CN",
        type: "article",
        publishedTime: insight.meta.date,
        tags: insight.meta.tags,
        images: [{ url: insight.meta.coverImage, width: 1672, height: 941, alt: insight.meta.title }]
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

export default function InsightArticlePage({ params }: PageProps) {
  return <InsightArticleContent params={params} />;
}
