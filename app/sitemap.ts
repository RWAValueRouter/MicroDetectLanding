import type { MetadataRoute } from "next";
import { getAllInsights } from "../lib/insights";
import { getSeoPagePath, seoPages } from "../lib/seo-pages";
import { absoluteUrl, localizedAlternates, localizedPath, supportedLangs } from "./seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const alternates = localizedAlternates();

  const localizedPages = supportedLangs.map((lang) => ({
    url: absoluteUrl(localizedPath(lang)),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: lang === "zh" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        Object.entries(alternates).map(([locale, path]) => [locale, absoluteUrl(path)])
      )
    }
  }));

  const insights = await getAllInsights();
  const seoDetailPages: MetadataRoute.Sitemap = seoPages.flatMap((page) => [
    {
      url: absoluteUrl(getSeoPagePath(page, "zh")),
      lastModified,
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
      lastModified,
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
      lastModified,
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

  return [...localizedPages, ...seoDetailPages, ...insightPages];
}
