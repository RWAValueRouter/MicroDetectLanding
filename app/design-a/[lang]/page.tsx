import { DesignLanding } from "../../_components/DesignPreviewPage";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <DesignLanding lang={lang} routePrefix="/design-a" />;
}
