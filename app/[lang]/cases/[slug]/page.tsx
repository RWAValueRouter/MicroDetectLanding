import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "../../../_components/CaseStudyPage";
import { caseStudies, getCasePath, getCaseStudy } from "../../../../lib/cases";
import { absoluteUrl, supportedLangs, type Lang } from "../../../seo";

type PageProps = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return supportedLangs.flatMap((lang) => caseStudies.map((caseStudy) => ({ lang, slug: caseStudy.slug }))); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy || !supportedLangs.includes(lang as Lang)) return {};
  const locale = lang as Lang;
  const content = caseStudy[locale];
  return { title: `${content.title} | ${locale === "zh" ? "析微探物" : "MicroDetect"}`, description: content.summary, alternates: { canonical: getCasePath(caseStudy, locale), languages: { "zh-CN": getCasePath(caseStudy, "zh"), en: getCasePath(caseStudy, "en"), "x-default": getCasePath(caseStudy, "zh") } }, openGraph: { title: content.title, description: content.summary, url: getCasePath(caseStudy, locale), siteName: "MicroDetect", locale: locale === "zh" ? "zh_CN" : "en_US", type: "article", images: [{ url: caseStudy.image, alt: content.title }] } };
}

export default async function CasePage({ params }: PageProps) {
  const { lang, slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy || !supportedLangs.includes(lang as Lang)) notFound();
  const locale = lang as Lang;
  const content = caseStudy[locale];
  const structuredData = { "@context": "https://schema.org", "@type": "Article", headline: content.title, description: content.summary, author: { "@type": "Organization", name: "Chongqing MicroDetect Technology Co., Ltd." }, publisher: { "@type": "Organization", name: "MicroDetect", logo: { "@type": "ImageObject", url: absoluteUrl("/logo/md.jpg") } }, mainEntityOfPage: absoluteUrl(getCasePath(caseStudy, locale)), image: absoluteUrl(caseStudy.image), inLanguage: locale === "zh" ? "zh-CN" : "en" };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><CaseStudyPage caseStudy={caseStudy} lang={locale} /></>;
}
