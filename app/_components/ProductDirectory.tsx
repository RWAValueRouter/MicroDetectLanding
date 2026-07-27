import Image from "next/image";
import Link from "next/link";
import { getSeoPagePath, getSeoPagesByKind } from "../../lib/seo-pages";
import type { Lang } from "../seo";
import ContentNavigation from "./ContentNavigation";

export default function ProductDirectory({ lang, routePrefix = "" }: { lang: Lang; routePrefix?: string }) {
  const isZh = lang === "zh";
  const products = getSeoPagesByKind("products").filter((product) => product.productModels.length === 1);
  const groups = [
    { title: isZh ? "水域监测" : "Water Monitoring", models: ["AR-FV100"] },
    { title: isZh ? "工业过程监测" : "Industrial Process Monitoring", models: ["AR-LS100", "AR-LS200", "AR-LS300", "AR-SL300"] },
    { title: isZh ? "结构安全监测" : "Structural Safety Monitoring", models: ["SR-I100", "SR-M200", "SR-P300"] }
  ];
  const homePath = routePrefix ? `${routePrefix}/${lang}` : `/${lang}`;
  const productPath = (slug: string) => routePrefix ? `${routePrefix}/${lang}/products/${slug}` : getSeoPagePath({ kind: "products", slug }, lang);

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-45"><div className="grid-plane absolute inset-0" /></div>
      <ContentNavigation lang={lang} active="products" routePrefix={routePrefix} languageHref={routePrefix ? `${routePrefix}/${lang === "zh" ? "en" : "zh"}/products` : `/${lang === "zh" ? "en" : "zh"}/products`} />
      <section className="relative z-10 mx-auto max-w-7xl pt-16"><p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan">Product Center</p><h1 className="mt-5 text-5xl font-semibold leading-tight text-white md:text-7xl">{isZh ? "毫米波雷达产品中心" : "Millimeter-wave Radar Products"}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{isZh ? "按监测对象与工程距离选择产品型号；每个型号页面提供产品资料、适用场景与技术规格。" : "Select by monitoring target and observation range. Each model page includes product materials, applications and technical specifications."}</p></section>
      <div className="relative z-10 mx-auto mt-14 max-w-7xl space-y-16">{groups.map((group) => <section key={group.title}><h2 className="border-l-2 border-cyan pl-4 text-3xl font-semibold text-white">{group.title}</h2><div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{products.filter((product) => group.models.includes(product.productModels[0])).map((product) => { const content = product[lang]; return <Link key={product.slug} href={productPath(product.slug)} className="hud-card group block overflow-hidden p-3 transition hover:-translate-y-1 hover:border-cyan/45"><div className="relative aspect-[4/3] overflow-hidden bg-slate-50"><Image src={product.image} alt={content.title} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-contain p-5 transition duration-300 group-hover:scale-[1.03]" /></div><div className="p-3"><p className="font-mono text-sm text-cyan">{product.productModels[0]}</p><h3 className="mt-3 text-xl font-semibold leading-tight text-white">{content.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{content.description}</p></div></Link>; })}</div></section>)}</div>
    </main>
  );
}
