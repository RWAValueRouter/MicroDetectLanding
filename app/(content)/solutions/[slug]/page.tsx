import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoDetailPage from "../../../_components/SeoDetailPage";
import { getSeoDetailMetadata, getSeoDetailStructuredData } from "../../../../lib/seo-page-metadata";
import { getSeoPage, getSeoPagesByKind } from "../../../../lib/seo-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getSeoPagesByKind("solutions").map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage("solutions", slug);

  if (!page) {
    return {};
  }

  return getSeoDetailMetadata(page, "zh");
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPage("solutions", slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSeoDetailStructuredData(page, "zh")).replace(/</g, "\\u003c")
        }}
      />
      <SeoDetailPage page={page} lang="zh" />
    </>
  );
}
