import InsightArticleContent from "../../../_components/InsightArticleContent";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <InsightArticleContent params={params} routePrefix="/design-c" />;
}
