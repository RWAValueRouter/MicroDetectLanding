import InsightArticlePage from "../../../(content)/insights/[slug]/page";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <InsightArticlePage params={params} routePrefix="/design-b" />;
}
