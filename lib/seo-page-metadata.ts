import type { Metadata } from "next";
import { absoluteUrl, type Lang } from "../app/seo";
import { getSeoPagePath, type SeoPage } from "./seo-pages";

export function getSeoDetailMetadata(page: SeoPage, lang: Lang): Metadata {
  const content = page[lang];
  const path = getSeoPagePath(page, lang);

  return {
    title: `${content.title} | ${lang === "zh" ? "析微探物" : "MicroDetect"}`,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: path,
      languages: {
        "zh-CN": getSeoPagePath(page, "zh"),
        en: getSeoPagePath(page, "en"),
        "x-default": getSeoPagePath(page, "zh")
      }
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: path,
      siteName: "MicroDetect",
      locale: lang === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [
        {
          url: page.image,
          width: page.image.includes("/hero/") ? 1672 : 620,
          height: page.image.includes("/hero/") ? 941 : 649,
          alt: content.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [page.image]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export function getSeoDetailStructuredData(page: SeoPage, lang: Lang) {
  const content = page[lang];
  const pageUrl = absoluteUrl(getSeoPagePath(page, lang));

  return {
    "@context": "https://schema.org",
    "@type": page.kind === "products" ? "Product" : "Service",
    name: content.title,
    description: content.description,
    url: pageUrl,
    image: absoluteUrl(page.image),
    brand: {
      "@type": "Brand",
      name: "MicroDetect"
    },
    provider: {
      "@type": "Organization",
      name: lang === "zh" ? "重庆析微探物科技有限公司" : "Chongqing MicroDetect Technology Co., Ltd.",
      url: absoluteUrl("/")
    },
    category: page.kind === "products" ? "Millimeter-wave radar monitoring product" : "Millimeter-wave radar monitoring solution",
    inLanguage: lang === "zh" ? "zh-CN" : "en",
    additionalProperty: page.productModels.map((model) => ({
      "@type": "PropertyValue",
      name: "Model",
      value: model
    }))
  };
}
