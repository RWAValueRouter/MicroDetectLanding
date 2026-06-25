import type { MetadataRoute } from "next";
import { absoluteUrl, localizedAlternates, localizedPath, supportedLangs } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const alternates = localizedAlternates();

  return supportedLangs.map((lang) => ({
    url: absoluteUrl(localizedPath(lang)),
    lastModified,
    changeFrequency: "weekly",
    priority: lang === "zh" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        Object.entries(alternates).map(([locale, path]) => [locale, absoluteUrl(path)])
      )
    }
  }));
}
