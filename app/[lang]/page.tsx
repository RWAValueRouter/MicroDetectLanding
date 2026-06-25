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

const reloadAfterBrowserBackScript = `
(function () {
  var reloadKey = "microdetect:landing-back-reloaded";
  var navigation;

  try {
    navigation = window.performance && window.performance.getEntriesByType
      ? window.performance.getEntriesByType("navigation")[0]
      : null;
  } catch (error) {
    navigation = null;
  }

  if (!navigation || navigation.type !== "back_forward") {
    try {
      window.sessionStorage.removeItem(reloadKey);
    } catch (error) {}
  }

  function reloadOnceAfterBack() {
    try {
      if (window.sessionStorage.getItem(reloadKey) === "1") {
        return;
      }

      window.sessionStorage.setItem(reloadKey, "1");
    } catch (error) {}

    window.location.reload();
  }

  if (navigation && navigation.type === "back_forward") {
    reloadOnceAfterBack();
  }

  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      reloadOnceAfterBack();
    }
  });
})();
`;

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
      <script dangerouslySetInnerHTML={{ __html: reloadAfterBrowserBackScript }} />
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
