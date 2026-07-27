import { DesignCaseDetail } from "../../../../_components/DesignPreviewPage";

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  return <DesignCaseDetail lang={lang} slug={slug} routePrefix="/design-b" />;
}
