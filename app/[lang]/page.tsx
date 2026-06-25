import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPage from "../_components/LandingPage";
import { getPageMetadata, getStructuredData, supportedLangs, type Lang } from "../seo";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }));
}

function isSupportedLang(lang: string): lang is Lang {
  return supportedLangs.includes(lang as Lang);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return {};
  }

  return getPageMetadata(lang);
}

export default async function LocalizedPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData(lang)).replace(/</g, "\\u003c")
        }}
      />
      <LandingPage initialLang={lang} />
    </>
  );
}
