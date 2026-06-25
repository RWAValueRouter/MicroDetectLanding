import { permanentRedirect } from "next/navigation";

export default async function Home({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const params = (await searchParams) || {};
  const requestedLang = Array.isArray(params.lang) ? params.lang[0] : params.lang;

  permanentRedirect(requestedLang === "en" ? "/en" : "/zh");
}
