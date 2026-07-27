import { DesignSeoDetail } from "../../../../_components/DesignPreviewPage";

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  return <DesignSeoDetail kind="solutions" lang={lang} slug={slug} routePrefix="/design-a" />;
}
