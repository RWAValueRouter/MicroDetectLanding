import type { Metadata } from "next";
import "../globals.css";
import { languageLabels, seoByLang, siteUrl, type Lang } from "../seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoByLang.zh.title,
    template: "%s"
  },
  description: seoByLang.zh.description,
  icons: {
    icon: [{ url: "/favicon.png", sizes: "64x64", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  other: {
    "baidu-site-verification": "codeva-cXuoDODjm4"
  }
};

export default async function LocalizedLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const htmlLang = languageLabels[lang as Lang] || languageLabels.zh;

  return (
    <html lang={htmlLang}>
      <body>{children}</body>
    </html>
  );
}
