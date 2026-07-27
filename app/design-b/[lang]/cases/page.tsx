import { DesignCaseDirectory } from "../../../_components/DesignPreviewPage";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <DesignCaseDirectory lang={lang} routePrefix="/design-b" />;
}
