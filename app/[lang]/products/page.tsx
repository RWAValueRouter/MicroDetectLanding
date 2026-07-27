import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDirectory from "../../_components/ProductDirectory";
import { supportedLangs, type Lang } from "../../seo";

type PageProps = { params: Promise<{ lang: string }> };

function isSupportedLang(lang: string): lang is Lang {
  return supportedLangs.includes(lang as Lang);
}

export function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === "zh";
  return {
    title: isZh ? "产品中心 | 析微探物" : "Products | MicroDetect",
    description: isZh ? "析微探物毫米波雷达产品中心，覆盖水流速、工业液位物位与结构安全监测产品。" : "MicroDetect mmWave radar products for flow, industrial level and structural safety monitoring.",
    alternates: { canonical: `/${lang}/products`, languages: { "zh-CN": "/zh/products", en: "/en/products", "x-default": "/zh/products" } }
  };
}

export default async function ProductsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isSupportedLang(lang)) notFound();
  return <ProductDirectory lang={lang} />;
}
