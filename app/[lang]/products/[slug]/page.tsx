import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoDetailPage from "../../../_components/SeoDetailPage";
import { supportedLangs, type Lang } from "../../../seo";
import { getSeoDetailMetadata, getSeoDetailStructuredData } from "../../../../lib/seo-page-metadata";
import { getSeoPage, getSeoPagesByKind } from "../../../../lib/seo-pages";

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLangs.flatMap((lang) => getSeoPagesByKind("products").map((page) => ({ lang, slug: page.slug })));
}

function isSupportedLang(lang: string): lang is Lang {
  return supportedLangs.includes(lang as Lang);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = getSeoPage("products", slug);

  if (!isSupportedLang(lang) || !page) {
    return {};
  }

  return getSeoDetailMetadata(page, lang);
}

export default async function LocalizedProductPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const page = getSeoPage("products", slug);

  if (!isSupportedLang(lang) || !page) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSeoDetailStructuredData(page, lang)).replace(/</g, "\\u003c")
        }}
      />
      <SeoDetailPage page={page} lang={lang} />
    </>
  );
}
