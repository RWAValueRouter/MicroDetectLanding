import type { Metadata } from "next";

export type Lang = "zh" | "en";

export const supportedLangs: Lang[] = ["zh", "en"];

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://microdetect.xyz").replace(/\/$/, "");

export const defaultLang: Lang = "zh";

export const languageLabels: Record<Lang, string> = {
  zh: "zh-CN",
  en: "en"
};

export const seoByLang: Record<
  Lang,
  {
    title: string;
    description: string;
    keywords: string[];
    ogLocale: string;
    companyName: string;
    serviceName: string;
  }
> = {
  zh: {
    title: "析微探物 | 毫米波雷达全域高精度监测系统",
    description:
      "重庆析微探物科技有限公司提供毫米波雷达非接触式在线监测方案，覆盖水利水文、工业物位与结构安全长期监测场景。",
    keywords: [
      "毫米波雷达监测",
      "水流速计",
      "雷达液位计",
      "工业物位计",
      "桥梁结构监测",
      "边坡位移监测",
      "大坝安全监测",
      "非接触式在线监测",
      "国产化替代"
    ],
    ogLocale: "zh_CN",
    companyName: "重庆析微探物科技有限公司",
    serviceName: "毫米波雷达全域高精度监测系统"
  },
  en: {
    title: "MicroDetect | Millimeter-wave Radar Monitoring",
    description:
      "Chongqing MicroDetect Technology provides non-contact mmWave radar monitoring for water, industrial process, infrastructure and structural safety applications.",
    keywords: [
      "millimeter-wave radar monitoring",
      "radar flow meter",
      "radar level meter",
      "industrial level radar",
      "bridge structural monitoring",
      "slope displacement monitoring",
      "dam safety monitoring",
      "non-contact online monitoring"
    ],
    ogLocale: "en_US",
    companyName: "Chongqing MicroDetect Technology Co., Ltd.",
    serviceName: "Millimeter-wave Radar Monitoring System"
  }
};

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localizedPath(lang: Lang) {
  return `/${lang}`;
}

export function localizedAlternates() {
  return {
    "zh-CN": localizedPath("zh"),
    en: localizedPath("en"),
    "x-default": localizedPath(defaultLang)
  };
}

export function getPageMetadata(lang: Lang): Metadata {
  const seo = seoByLang[lang];
  const canonical = localizedPath(lang);
  const image = "/hero/monitoring-bridges.png";

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical,
      languages: localizedAlternates()
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: "MicroDetect",
      locale: seo.ogLocale,
      type: "website",
      images: [
        {
          url: image,
          width: 1672,
          height: 941,
          alt: lang === "zh" ? "析微探物毫米波雷达桥梁结构健康监测" : "MicroDetect mmWave radar bridge structural health monitoring"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    }
  };
}

export function getStructuredData(lang: Lang) {
  const seo = seoByLang[lang];
  const pageUrl = absoluteUrl(localizedPath(lang));
  const logoUrl = absoluteUrl("/logo/md.jpg");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: seo.companyName,
        alternateName: ["MicroDetect", "析微探物"],
        url: siteUrl,
        logo: logoUrl,
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: "luoxi23vr@gmail.com",
            contactType: "sales",
            availableLanguage: ["zh-CN", "en"]
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "MicroDetect",
        url: siteUrl,
        publisher: {
          "@id": `${siteUrl}/#organization`
        },
        inLanguage: languageLabels[lang]
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: seo.serviceName,
        description: seo.description,
        provider: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: "CN",
        serviceType: [
          "Millimeter-wave radar monitoring",
          "Water flow monitoring",
          "Industrial level monitoring",
          "Structural safety monitoring"
        ],
        url: pageUrl,
        inLanguage: languageLabels[lang]
      }
    ]
  };
}
