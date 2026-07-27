import { DesignProductDirectory } from "../../../_components/DesignPreviewPage";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <DesignProductDirectory lang={lang} routePrefix="/design-c" />;
}
