import type { Metadata } from "next";
import "../globals.css";
import { seoByLang, siteUrl } from "../seo";

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

export default function ContentLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
