import Image from "next/image";
import Link from "next/link";
import type { Lang } from "../seo";
import { getSeoPagePath, type SeoPage } from "../../lib/seo-pages";

export default function SeoDetailPage({ page, lang }: { page: SeoPage; lang: Lang }) {
  const content = page[lang];
  const alternateLang: Lang = lang === "zh" ? "en" : "zh";
  const alternateLabel = lang === "zh" ? "EN" : "中文";
  const homePath = lang === "zh" ? "/zh" : "/en";
  const contactPath = `${homePath}#contact`;
  const isProductImage = page.image.includes("/product/");

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-45">
        <div className="grid-plane absolute inset-0" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href={homePath} className="flex items-center gap-3">
            <span className="relative h-10 w-24 overflow-hidden rounded-xl border border-cyan/15 bg-white shadow-sm">
              <Image src="/logo/md.jpg" alt="MicroDetect Logo" fill sizes="96px" className="object-cover" priority />
            </span>
            <span className="text-sm font-semibold text-white md:text-base">
              {lang === "zh" ? "析微探物" : "MicroDetect"}
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/insights" className="hidden text-sm font-medium text-slate-300 transition hover:text-cyan sm:inline">
              {lang === "zh" ? "行业洞察" : "Insights"}
            </Link>
            <Link
              href={getSeoPagePath(page, alternateLang)}
              className="rounded-full border border-cyan/20 bg-white/70 px-4 py-2 text-sm font-semibold text-cyan transition hover:bg-cyan/10"
            >
              {alternateLabel}
            </Link>
            <Link
              href={contactPath}
              className="scan-glow rounded-full border border-cyan/35 bg-cyan/10 px-4 py-2 text-sm font-medium text-cyan transition hover:border-cyan hover:bg-cyan/15"
            >
              {lang === "zh" ? "联系咨询" : "Contact"}
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-10 pt-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan">{content.eyebrow}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-sm font-semibold text-cyan">
              {content.badge}
            </span>
            {page.productModels.map((model) => (
              <span key={model} className="rounded-full border border-white/10 bg-white/70 px-3 py-1 font-mono text-sm text-slate-400">
                {model}
              </span>
            ))}
          </div>
          <h1 className={`${lang === "zh" ? "cjk-wrap" : ""} mt-6 text-4xl font-semibold leading-tight text-white md:text-6xl`}>
            {content.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{content.description}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.bullets.map((bullet) => (
              <div key={bullet} className="rounded-2xl border border-cyan/15 bg-cyan/10 p-4 text-sm font-medium text-cyan">
                {bullet}
              </div>
            ))}
          </div>
        </div>
        <div className="hud-card rounded-[32px] p-3">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] border border-cyan/15 bg-white">
            <Image
              src={page.image}
              alt={content.title}
              fill
              priority
              sizes="(min-width: 1024px) 680px, 100vw"
              className={isProductImage ? "object-contain p-8" : "object-cover"}
            />
          </div>
          <p className="px-4 py-4 leading-8 text-slate-300">{content.intro}</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-12 max-w-7xl">
        <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-cyan">
              {lang === "zh" ? "Technical Specifications" : "Technical Specifications"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              {lang === "zh" ? "产品规格" : "Product Specifications"}
            </h2>
          </div>
          <span className="text-sm text-slate-500">{content.badge}</span>
        </div>
        <div className="overflow-x-auto border border-white/10 bg-white">
          <table className="min-w-full border-collapse text-left">
            <tbody>
              {content.specs.map((spec) => (
                <tr key={spec.label} className="border-b border-slate-200 last:border-b-0">
                  <th scope="row" className="w-[32%] bg-slate-50 px-5 py-4 font-mono text-sm font-medium text-cyan md:w-[25%]">
                    {spec.label}
                  </th>
                  <td className="px-5 py-4 leading-7 text-slate-300">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {page.gallery?.length ? (
        <section className="relative z-10 mx-auto mt-16 max-w-7xl">
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-cyan">
            {lang === "zh" ? "Product & Field Gallery" : "Product & Field Gallery"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            {lang === "zh" ? "产品与工程资料" : "Product and Field Materials"}
          </h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {page.gallery.map((image, index) => (
              <figure key={image} className="hud-card overflow-hidden p-3">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
                  <Image
                    src={image}
                    alt={`${content.title} ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain"
                  />
                </div>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="relative z-10 mx-auto mt-16 grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.75fr]">
        <div className="grid gap-5">
          {content.sections.map((section, index) => (
            <article key={section.title} className="hud-card rounded-[32px] p-6 md:p-8">
              <p className="font-mono text-sm text-cyan">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-white">{section.title}</h2>
              <p className="mt-5 leading-8 text-slate-300">{section.body}</p>
              {section.items ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <span key={item} className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-400">
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
        <aside className="hud-card h-fit rounded-[32px] p-6 md:p-8">
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-mint">
            {lang === "zh" ? "Typical Applications" : "Applications"}
          </p>
          <div className="mt-6 grid gap-3">
            {content.applications.map((application) => (
              <div key={application} className="rounded-2xl border border-white/10 bg-white/60 p-4 text-slate-300">
                {application}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-cyan/20 bg-cyan/10 p-5">
            <h2 className="text-2xl font-semibold text-white">{content.ctaTitle}</h2>
            <p className="mt-4 leading-7 text-slate-300">{content.ctaText}</p>
            <Link
              href={contactPath}
              className="scan-glow mt-6 inline-flex rounded-full bg-cyan px-6 py-3 font-semibold text-ink shadow-glow transition hover:bg-mint"
            >
              {lang === "zh" ? "获取方案" : "Get Proposal"}
            </Link>
          </div>
        </aside>
      </section>

      <footer className="relative z-10 mx-auto mt-16 max-w-7xl border-t border-white/10 pt-8 text-sm text-slate-500">
        <p>
          {lang === "zh"
            ? "关键指标以产品版本、现场工况和技术协议为准。"
            : "Key specifications depend on product version, site conditions and technical agreement."}
        </p>
      </footer>
    </main>
  );
}
