import { DesignRoute } from "../../_components/DesignPreviewPage";

export default async function Page({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  return <DesignRoute segments={segments} routePrefix="/design-d" />;
}
