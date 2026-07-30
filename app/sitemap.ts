import type { MetadataRoute } from "next";
import { caseStudies, getCasePath } from "../lib/cases";
import { getAllInsights } from "../lib/insights";
import { getSeoPagePath, seoPages } from "../lib/seo-pages";
import { absoluteUrl, localizedAlternates, localizedPath, supportedLangs } from "./seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Keep static URLs stable between deployments. Update this when the core site content changes.
  const staticLastModified = new Date("2026-07-30T00:00:00.000Z");
  const alternates = localizedAlternates();

  const localizedPages = supportedLangs.map((lang) => ({
    url: absoluteUrl(localizedPath(lang)),
    lastModified: staticLastModified,
    changeFrequency: "weekly" as const,
    priority: lang === "zh" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        Object.entries(alternates).map(([locale, path]) => [locale, absoluteUrl(path)])
      )
    }
  }));

  const insights = await getAllInsights();
  const latestInsightDate = insights.reduce(
    (latestDate, insight) => {
      const publishedAt = new Date(insight.date);
      return publishedAt > latestDate ? publishedAt : latestDate;
    },
    staticLastModified
  );
  const productIndexPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/zh/products"),
      lastModified: staticLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: { languages: { "zh-CN": absoluteUrl("/zh/products"), en: absoluteUrl("/en/products"), "x-default": absoluteUrl("/zh/products") } }
    },
    {
      url: absoluteUrl("/en/products"),
      lastModified: staticLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.84,
      alternates: { languages: { "zh-CN": absoluteUrl("/zh/products"), en: absoluteUrl("/en/products"), "x-default": absoluteUrl("/zh/products") } }
    }
  ];
  const seoDetailPages: MetadataRoute.Sitemap = seoPages.flatMap((page) => [
    {
      url: absoluteUrl(getSeoPagePath(page, "zh")),
      lastModified: staticLastModified,
      changeFrequency: "monthly" as const,
      priority: page.kind === "products" ? 0.85 : 0.8,
      alternates: {
        languages: {
          "zh-CN": absoluteUrl(getSeoPagePath(page, "zh")),
          en: absoluteUrl(getSeoPagePath(page, "en")),
          "x-default": absoluteUrl(getSeoPagePath(page, "zh"))
        }
      }
    },
    {
      url: absoluteUrl(getSeoPagePath(page, "en")),
      lastModified: staticLastModified,
      changeFrequency: "monthly" as const,
      priority: page.kind === "products" ? 0.8 : 0.75,
      alternates: {
        languages: {
          "zh-CN": absoluteUrl(getSeoPagePath(page, "zh")),
          en: absoluteUrl(getSeoPagePath(page, "en")),
          "x-default": absoluteUrl(getSeoPagePath(page, "zh"))
        }
      }
    }
  ]);

  const insightPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/insights"),
      lastModified: latestInsightDate,
      changeFrequency: "weekly" as const,
      priority: 0.8
    },
    ...insights.map((insight) => ({
      url: absoluteUrl(`/insights/${insight.slug}`),
      lastModified: new Date(insight.date),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];

  const caseIndexPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/zh/cases"),
      lastModified: staticLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.82,
      alternates: { languages: { "zh-CN": absoluteUrl("/zh/cases"), en: absoluteUrl("/en/cases"), "x-default": absoluteUrl("/zh/cases") } }
    },
    {
      url: absoluteUrl("/en/cases"),
      lastModified: staticLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.76,
      alternates: { languages: { "zh-CN": absoluteUrl("/zh/cases"), en: absoluteUrl("/en/cases"), "x-default": absoluteUrl("/zh/cases") } }
    }
  ];

  const casePages: MetadataRoute.Sitemap = caseStudies.flatMap((caseStudy) => [
    {
      url: absoluteUrl(getCasePath(caseStudy, "zh")),
      lastModified: staticLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.78,
      alternates: { languages: { "zh-CN": absoluteUrl(getCasePath(caseStudy, "zh")), en: absoluteUrl(getCasePath(caseStudy, "en")), "x-default": absoluteUrl(getCasePath(caseStudy, "zh")) } }
    },
    {
      url: absoluteUrl(getCasePath(caseStudy, "en")),
      lastModified: staticLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.73,
      alternates: { languages: { "zh-CN": absoluteUrl(getCasePath(caseStudy, "zh")), en: absoluteUrl(getCasePath(caseStudy, "en")), "x-default": absoluteUrl(getCasePath(caseStudy, "zh")) } }
    }
  ]);

  return [...localizedPages, ...productIndexPages, ...seoDetailPages, ...insightPages, ...caseIndexPages, ...casePages];
}
