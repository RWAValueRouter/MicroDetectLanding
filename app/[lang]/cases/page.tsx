import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCasePath } from "../../../lib/cases";
import CaseDirectory from "../../_components/CaseDirectory";
import { absoluteUrl, supportedLangs, type Lang } from "../../seo";

type PageProps = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === "zh";
  const title = isZh ? "工程案例 | 析微探物" : "Case Studies | MicroDetect";
  const description = isZh
    ? "析微探物毫米波雷达在桥梁结构健康监测、水位流速在线监测与交通基础设施感知中的工程案例。"
    : "MicroDetect mmWave radar case studies for bridge health monitoring, online water level and flow monitoring, and transport infrastructure sensing.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/cases`,
      languages: { "zh-CN": "/zh/cases", en: "/en/cases", "x-default": "/zh/cases" }
    },
    openGraph: {
      title,
      description,
      url: `/${lang}/cases`,
      siteName: "MicroDetect",
      locale: isZh ? "zh_CN" : "en_US",
      type: "website",
      images: [{ url: "/cases/bridge-field-survey.png", width: 771, height: 1028, alt: title }]
    }
  };
}

export default async function CasesPage({ params }: PageProps) {
  const { lang } = await params;
  if (!supportedLangs.includes(lang as Lang)) notFound();

  const locale = lang as Lang;
  const isZh = locale === "zh";
  const title = isZh ? "工程案例" : "Case Studies";
  const description = isZh
    ? "从桥下现场勘察、雷达布设到平台告警，呈现毫米波雷达在真实项目中的部署方式与数据价值。"
    : "From field surveys and radar deployment to platform alerts, explore how mmWave radar is deployed in real projects.";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl(`/${locale}/cases`),
    inLanguage: isZh ? "zh-CN" : "en",
    hasPart: caseStudies.map((caseStudy) => ({
      "@type": "Article",
      headline: caseStudy[locale].title,
      description: caseStudy[locale].summary,
      url: absoluteUrl(getCasePath(caseStudy, locale)),
      image: absoluteUrl(caseStudy.image)
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <CaseDirectory lang={locale} />
    </>
  );
}
