import Image from "next/image";
import Link from "next/link";
import type { Lang } from "../seo";
import MobileNavigationMenu from "./MobileNavigationMenu";

type ContentArea = "products" | "solutions" | "cases" | "insights";

type ContentNavigationProps = {
  lang: Lang;
  active: ContentArea;
  routePrefix?: string;
  languageHref?: string;
};

export default function ContentNavigation({ lang, active, routePrefix = "", languageHref }: ContentNavigationProps) {
  const isZh = lang === "zh";
  const alternateLang: Lang = isZh ? "en" : "zh";
  const homePath = routePrefix ? `${routePrefix}/${lang}` : `/${lang}`;
  const alternateHref = languageHref || (routePrefix ? `${routePrefix}/${alternateLang}` : `/${alternateLang}`);
  const navItems: Array<{ key: ContentArea | "capabilities"; label: string; href: string }> = [
    { key: "products", label: isZh ? "产品矩阵" : "Products", href: `${homePath}/products` },
    { key: "capabilities", label: isZh ? "系统能力" : "Capabilities", href: `${homePath}#capability` },
    { key: "solutions", label: isZh ? "解决方案" : "Solutions", href: `${homePath}#applications` },
    { key: "cases", label: isZh ? "工程案例" : "Case Studies", href: `${homePath}/cases` },
    { key: "insights", label: isZh ? "行业洞察" : "Insights", href: routePrefix ? `${routePrefix}/insights` : "/insights" }
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <nav aria-label={isZh ? "主导航" : "Primary navigation"} className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href={homePath} className="flex items-center gap-3">
          <span className="relative h-10 w-24 overflow-hidden rounded-xl border border-cyan/15 bg-white shadow-sm">
            <Image src="/logo/md.jpg" alt="MicroDetect Logo" fill sizes="96px" className="object-cover" priority />
          </span>
          <span className="hidden text-sm font-semibold text-white sm:inline md:text-base">{isZh ? "析微探物" : "MicroDetect"}</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const isActive = item.key === active;
            return <Link key={item.key} href={item.href} aria-current={isActive ? "page" : undefined} className={`text-sm transition hover:text-cyan ${isActive ? "font-semibold text-cyan" : "text-slate-300"}`}>{item.label}</Link>;
          })}
        </div>
        <div className="ml-auto mr-3 flex rounded-full border border-cyan/20 bg-white/70 p-1 shadow-sm md:ml-0">
          {isZh ? (
            <>
              <span className="rounded-full bg-cyan px-3 py-1.5 text-xs font-semibold text-white">中文</span>
              <Link href={alternateHref} className="rounded-full px-3 py-1.5 text-xs font-semibold text-cyan transition hover:bg-cyan/10">EN</Link>
            </>
          ) : (
            <>
              <Link href={alternateHref} className="rounded-full px-3 py-1.5 text-xs font-semibold text-cyan transition hover:bg-cyan/10">中文</Link>
              <span className="rounded-full bg-cyan px-3 py-1.5 text-xs font-semibold text-white">EN</span>
            </>
          )}
        </div>
        <Link href={`${homePath}#contact`} className="scan-glow hidden rounded-full border border-cyan/35 bg-cyan/10 px-4 py-2 text-sm font-medium text-cyan transition hover:border-cyan hover:bg-cyan/15 sm:inline-block">
          {isZh ? "联系咨询" : "Contact"}
        </Link>
        <MobileNavigationMenu
          items={navItems.map((item) => ({ ...item, active: item.key === active }))}
          contactHref={`${homePath}#contact`}
          contactLabel={isZh ? "联系咨询" : "Contact"}
          menuLabel={isZh ? "打开导航" : "Open navigation"}
          closeLabel={isZh ? "关闭导航" : "Close navigation"}
        />
      </nav>
    </header>
  );
}
