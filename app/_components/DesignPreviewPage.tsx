import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "../../lib/cases";
import { getSeoPage } from "../../lib/seo-pages";
import type { SeoPageKind } from "../../lib/seo-pages";
import { supportedLangs, type Lang } from "../seo";
import CaseDirectory from "./CaseDirectory";
import CaseStudyPage from "./CaseStudyPage";
import LandingPage from "./LandingPage";
import ProductDirectory from "./ProductDirectory";
import SeoDetailPage from "./SeoDetailPage";
import InsightsPage from "../(content)/insights/page";
import InsightArticlePage from "../(content)/insights/[slug]/page";

function getLang(lang: string): Lang {
  if (!supportedLangs.includes(lang as Lang)) notFound();
  return lang as Lang;
}

export function DesignLanding({ lang, routePrefix }: { lang: string; routePrefix: string }) {
  return <LandingPage initialLang={getLang(lang)} routePrefix={routePrefix} />;
}

export function DesignProductDirectory({ lang, routePrefix }: { lang: string; routePrefix: string }) {
  return <ProductDirectory lang={getLang(lang)} routePrefix={routePrefix} />;
}

export function DesignSeoDetail({ kind, lang, slug, routePrefix }: { kind: SeoPageKind; lang: string; slug: string; routePrefix: string }) {
  const locale = getLang(lang);
  const page = getSeoPage(kind, slug);
  if (!page) notFound();
  return <SeoDetailPage page={page} lang={locale} routePrefix={routePrefix} />;
}

export function DesignCaseDirectory({ lang, routePrefix }: { lang: string; routePrefix: string }) {
  return <CaseDirectory lang={getLang(lang)} routePrefix={routePrefix} />;
}

export function DesignCaseDetail({ lang, slug, routePrefix }: { lang: string; slug: string; routePrefix: string }) {
  const locale = getLang(lang);
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();
  return <CaseStudyPage caseStudy={caseStudy} lang={locale} routePrefix={routePrefix} />;
}

export async function DesignRoute({ segments, routePrefix }: { segments: string[]; routePrefix: string }) {
  const [first, second, third] = segments;

  if (first === "insights") {
    if (segments.length === 1) return <InsightsPage routePrefix={routePrefix} />;
    if (segments.length === 2 && second) {
      return <InsightArticlePage params={Promise.resolve({ slug: second })} routePrefix={routePrefix} />;
    }
    notFound();
  }

  const lang = getLang(first);
  if (segments.length === 1) return <LandingPage initialLang={lang} routePrefix={routePrefix} />;
  if (second === "products" && segments.length === 2) return <ProductDirectory lang={lang} routePrefix={routePrefix} />;
  if (second === "products" && third && segments.length === 3) return <DesignSeoDetail kind="products" lang={lang} slug={third} routePrefix={routePrefix} />;
  if (second === "solutions" && third && segments.length === 3) return <DesignSeoDetail kind="solutions" lang={lang} slug={third} routePrefix={routePrefix} />;
  if (second === "cases" && segments.length === 2) return <CaseDirectory lang={lang} routePrefix={routePrefix} />;
  if (second === "cases" && third && segments.length === 3) return <DesignCaseDetail lang={lang} slug={third} routePrefix={routePrefix} />;

  notFound();
}

export const previewCaseSlugs = caseStudies.map((caseStudy) => caseStudy.slug);
