"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { caseStudies } from "../../../lib/cases";
import { seoPages } from "../../../lib/seo-pages";
import {
  designCopy,
  featuredProductSlugs,
  featuredSolutionSlugs,
  type DesignLang,
  type DesignVariant
} from "./design-content";

type DesignLandingVariantsProps = {
  design: DesignVariant;
  initialLang: DesignLang;
  routePrefix: string;
};

type DesignTemplateProps = {
  lang: DesignLang;
  routePrefix: string;
};

type ContactValues = {
  name: string;
  company: string;
  contact: string;
  scene: string;
  message: string;
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useReveal(design: DesignVariant) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? []);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.setAttribute("data-visible", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [design]);

  return rootRef;
}

function useTypedText(text: string, reducedMotion: boolean) {
  const [value, setValue] = useState(reducedMotion ? text : "");

  useEffect(() => {
    if (reducedMotion) {
      setValue(text);
      return;
    }

    setValue("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, 42);
    return () => window.clearInterval(timer);
  }, [text, reducedMotion]);

  return value;
}

function Brand({ lang, compact = false }: { lang: DesignLang; compact?: boolean }) {
  return (
    <span className={`dv-brand ${compact ? "dv-brand--compact" : ""}`}>
      <span className="dv-brand__mark">
        <Image src="/logo/md.jpg" alt="MicroDetect" fill sizes="88px" className="object-cover" priority />
      </span>
      <span>{designCopy[lang].company}</span>
    </span>
  );
}

function LanguageLink({
  lang,
  routePrefix,
  className = ""
}: {
  lang: DesignLang;
  routePrefix: string;
  className?: string;
}) {
  const nextLang = lang === "zh" ? "en" : "zh";
  return (
    <Link className={`dv-language ${className}`} href={`${routePrefix}/${nextLang}`} aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}>
      {lang === "zh" ? "EN" : "中文"}
    </Link>
  );
}

function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`dv-arrow-link ${className}`}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

function ContactPanel({ lang }: { lang: DesignLang }) {
  const t = designCopy[lang];
  const [values, setValues] = useState<ContactValues>({
    name: "",
    company: "",
    contact: "",
    scene: t.form.scenes[0],
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "required">("idle");

  const update = (field: keyof ContactValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.name.trim() || !values.company.trim() || !values.contact.trim()) {
      setStatus("required");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!response.ok) throw new Error("Contact request failed");
      setStatus("success");
      setValues({ name: "", company: "", contact: "", scene: t.form.scenes[0], message: "" });
    } catch {
      setStatus("error");
    }
  };

  const statusText =
    status === "required" ? t.form.required : status === "success" ? t.form.success : status === "error" ? t.form.error : "";

  return (
    <form className="dv-contact-form" onSubmit={submit}>
      <div className="dv-contact-form__grid">
        <label>
          <span>{t.form.name}</span>
          <input value={values.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" />
        </label>
        <label>
          <span>{t.form.company}</span>
          <input value={values.company} onChange={(event) => update("company", event.target.value)} autoComplete="organization" />
        </label>
        <label>
          <span>{t.form.contact}</span>
          <input value={values.contact} onChange={(event) => update("contact", event.target.value)} autoComplete="email" />
        </label>
        <label>
          <span>{t.form.scene}</span>
          <select value={values.scene} onChange={(event) => update("scene", event.target.value)}>
            {t.form.scenes.map((scene) => <option key={scene}>{scene}</option>)}
          </select>
        </label>
        <label className="dv-contact-form__message">
          <span>{t.form.message}</span>
          <textarea rows={4} value={values.message} onChange={(event) => update("message", event.target.value)} />
        </label>
      </div>
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? t.form.submitting : t.form.submit}
      </button>
      <p className="dv-contact-form__status" role="status">{statusText}</p>
    </form>
  );
}

function useDesignData(lang: DesignLang, routePrefix: string) {
  return useMemo(() => {
    const products = featuredProductSlugs
      .map((slug) => seoPages.find((page) => page.kind === "products" && page.slug === slug))
      .filter((page): page is NonNullable<typeof page> => Boolean(page))
      .map((page) => ({
        ...page,
        content: page[lang],
        href: `${routePrefix}/${lang}/products/${page.slug}`
      }));

    const solutions = featuredSolutionSlugs
      .map((slug) => seoPages.find((page) => page.kind === "solutions" && page.slug === slug))
      .filter((page): page is NonNullable<typeof page> => Boolean(page))
      .map((page) => ({
        ...page,
        content: page[lang],
        href: `${routePrefix}/${lang}/solutions/${page.slug}`
      }));

    const cases = caseStudies.map((caseStudy) => ({
      ...caseStudy,
      content: caseStudy[lang],
      href: `${routePrefix}/${lang}/cases/${caseStudy.slug}`
    }));

    return { products, solutions, cases };
  }, [lang, routePrefix]);
}

function PrecisionAtlas({ lang, routePrefix }: DesignTemplateProps) {
  const t = designCopy[lang];
  const { products, solutions, cases } = useDesignData(lang, routePrefix);

  return (
    <div className="dv-a">
      <aside className="a-rail">
        <Link href={`${routePrefix}/${lang}`}><Brand lang={lang} compact /></Link>
        <nav aria-label="Primary navigation">
          <a href="#products">{t.nav.products}</a>
          <a href="#solutions">{t.nav.solutions}</a>
          <a href="#cases">{t.nav.cases}</a>
          <Link href={`${routePrefix}/insights`}>{t.nav.insights}</Link>
        </nav>
        <LanguageLink lang={lang} routePrefix={routePrefix} />
      </aside>

      <main className="a-canvas">
        <header className="a-mobile-nav">
          <Brand lang={lang} compact />
          <LanguageLink lang={lang} routePrefix={routePrefix} />
        </header>

        <section className="a-hero" data-reveal>
          <div className="a-hero__copy">
            <p className="dv-kicker">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="a-hero__subtitle">{t.hero.subtitle}</p>
            <p className="a-hero__text">{t.hero.description}</p>
            <div className="dv-actions">
              <a href="#contact" className="dv-primary">{t.hero.primary}</a>
              <a href="#products" className="dv-secondary">{t.hero.secondary}</a>
            </div>
          </div>
          <div className="a-hero__instrument">
            <div className="a-coordinates"><span>106.5516° E</span><span>29.5630° N</span></div>
            <Image src="/hero/monitoring-bridges.png" alt={t.hero.title} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" priority />
            <div className="a-reticle" aria-hidden="true"><span /><span /><i /></div>
            <div className="a-scan" aria-hidden="true" />
            <p><span>{t.labels.online}</span> BRIDGE / SR-P300</p>
          </div>
        </section>

        <section className="a-metrics" aria-label="Key metrics" data-reveal>
          {t.metrics.map((metric, index) => (
            <div key={metric.label}><span>0{index + 1}</span><strong>{metric.value}</strong><p>{metric.label}</p></div>
          ))}
        </section>

        <section id="products" className="a-products" data-reveal>
          <div className="dv-section-heading">
            <p className="dv-kicker">Product Atlas / 01</p>
            <h2>{t.section.products}</h2>
            <p>{t.section.productsText}</p>
          </div>
          <div className="a-product-grid">
            {products.map((product, index) => (
              <Link href={product.href} key={product.slug} className={`a-product a-product--${index + 1}`}>
                <span className="a-product__index">P-0{index + 1}</span>
                <div className="a-product__image">
                  <Image src={product.image} alt={product.content.title} fill sizes="(min-width: 1024px) 32vw, 100vw" className="object-contain" />
                </div>
                <div>
                  <p>{product.productModels.join(" / ")}</p>
                  <h3>{product.content.title}</h3>
                  <span>{t.labels.viewProduct} ↗</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="solutions" className="a-solutions" data-reveal>
          <div className="a-solutions__map">
            <span className="a-map__ring a-map__ring--one" />
            <span className="a-map__ring a-map__ring--two" />
            <span className="a-map__axis a-map__axis--x" />
            <span className="a-map__axis a-map__axis--y" />
            <div className="a-map__core">MD</div>
            {solutions.map((solution, index) => (
              <Link key={solution.slug} href={solution.href} className={`a-map__node a-map__node--${index + 1}`}>
                <span>0{index + 1}</span>{solution.content.title}
              </Link>
            ))}
          </div>
          <div className="a-solutions__copy">
            <p className="dv-kicker">Application Map / 02</p>
            <h2>{t.section.solutions}</h2>
            <p>{t.section.solutionsText}</p>
            {t.capabilities.map((capability) => (
              <div className="a-capability" key={capability.index}>
                <span>{capability.index}</span><div><h3>{capability.title}</h3><p>{capability.text}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="cases" className="a-cases" data-reveal>
          <div className="dv-section-heading">
            <p className="dv-kicker">Field Evidence / 03</p>
            <h2>{t.section.cases}</h2>
          </div>
          <div className="a-case-strip">
            {cases.slice(0, 3).map((item, index) => (
              <Link href={item.href} key={item.slug} className="a-case">
                <div><Image src={item.image} alt={item.content.title} fill sizes="33vw" className="object-cover" /></div>
                <span>0{index + 1}</span><h3>{item.content.title}</h3>
              </Link>
            ))}
          </div>
          <ArrowLink href={`${routePrefix}/${lang}/cases`}>{t.labels.allCases}</ArrowLink>
        </section>

        <section id="contact" className="a-contact" data-reveal>
          <div><p className="dv-kicker">Project Input / 04</p><h2>{t.section.contact}</h2><p>{t.section.contactText}</p></div>
          <ContactPanel lang={lang} />
        </section>
      </main>
    </div>
  );
}

function CinematicObservatory({ lang, routePrefix }: DesignTemplateProps) {
  const t = designCopy[lang];
  const { products, solutions, cases } = useDesignData(lang, routePrefix);
  const reducedMotion = useReducedMotion();

  return (
    <div className="dv-b">
      <header className="b-nav">
        <Link href={`${routePrefix}/${lang}`}><Brand lang={lang} /></Link>
        <nav>
          <a href="#b-story">{t.nav.solutions}</a>
          <a href="#products">{t.nav.products}</a>
          <a href="#cases">{t.nav.cases}</a>
          <Link href={`${routePrefix}/insights`}>{t.nav.insights}</Link>
        </nav>
        <LanguageLink lang={lang} routePrefix={routePrefix} />
      </header>

      <main>
        <section className="b-hero" data-reveal>
          <video autoPlay={!reducedMotion} muted loop playsInline poster="/hero/monitoring-bridges.png" aria-label={t.hero.title}>
            <source src="/hero/radar-editorial-loop.mp4" type="video/mp4" />
          </video>
          <div className="b-hero__veil" />
          <p className="b-side-label">MICRODETECT / CHONGQING / 2026</p>
          <div className="b-hero__copy">
            <p>{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="b-hero__subtitle">{t.hero.subtitle}</p>
            <a href="#b-story">{lang === "zh" ? "进入监测现场" : "Enter the field"} <span>↓</span></a>
          </div>
          <div className="b-hero__status"><i /><span>{t.labels.live} / 24 FPS</span></div>
        </section>

        <div className="b-marquee" aria-hidden="true">
          <div>
            {[...t.capabilities, ...t.capabilities].map((item, index) => <span key={`${item.index}-${index}`}>{item.title} ·</span>)}
          </div>
        </div>

        <section id="b-story" className="b-story" data-reveal>
          <div className="b-story__sticky">
            <p className="dv-kicker">01 / Observe</p>
            <h2>{t.section.capabilities}</h2>
            <p>{t.section.capabilitiesText}</p>
          </div>
          <div className="b-story__chapters">
            {t.capabilities.map((item, index) => (
              <article key={item.index}>
                <span>{item.index}</span>
                <div className="b-story__image">
                  <Image
                    src={index % 2 === 0 ? "/hero/liquid-level.png" : "/hero/monitoring-bridges.png"}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3>{item.title}</h3><p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="cases" className="b-case-feature" data-reveal>
          <div className="b-case-feature__copy">
            <p className="dv-kicker">02 / Evidence</p>
            <h2>{cases[1]?.content.title}</h2>
            <p>{cases[1]?.content.summary}</p>
            {cases[1] ? <ArrowLink href={cases[1].href}>{t.labels.viewCase}</ArrowLink> : null}
          </div>
          {cases[1] ? (
            <div className="b-case-feature__image">
              <Image src={cases[1].image} alt={cases[1].content.title} fill sizes="60vw" className="object-cover" />
            </div>
          ) : null}
        </section>

        <section id="products" className="b-products" data-reveal>
          <div className="b-products__heading"><p className="dv-kicker">03 / Instruments</p><h2>{t.section.products}</h2></div>
          <div className="b-products__track">
            {products.map((product, index) => (
              <Link href={product.href} key={product.slug} className="b-product">
                <span>0{index + 1}</span>
                <div><Image src={product.image} alt={product.content.title} fill sizes="420px" className="object-contain" /></div>
                <p>{product.productModels.join(" / ")}</p>
                <h3>{product.content.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="b-solutions" data-reveal>
          {solutions.map((solution, index) => (
            <Link href={solution.href} key={solution.slug}>
              <span>0{index + 1}</span><h3>{solution.content.title}</h3><p>{solution.content.description}</p><i>↗</i>
            </Link>
          ))}
        </section>

        <section id="contact" className="b-contact" data-reveal>
          <div><p className="dv-kicker">04 / Begin</p><h2>{t.section.contact}</h2><p>{t.section.contactText}</p></div>
          <ContactPanel lang={lang} />
        </section>
      </main>
    </div>
  );
}

function EditorialJournal({ lang, routePrefix }: DesignTemplateProps) {
  const t = designCopy[lang];
  const { products, solutions, cases } = useDesignData(lang, routePrefix);

  return (
    <div className="dv-c">
      <header className="c-masthead">
        <div className="c-masthead__top">
          <span>VOL. 01 / 2026</span>
          <Link href={`${routePrefix}/${lang}`}><Brand lang={lang} /></Link>
          <LanguageLink lang={lang} routePrefix={routePrefix} />
        </div>
        <nav>
          <a href="#products">{t.nav.products}</a>
          <a href="#solutions">{t.nav.solutions}</a>
          <a href="#cases">{t.nav.cases}</a>
          <Link href={`${routePrefix}/insights`}>{t.nav.insights}</Link>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
      </header>

      <main>
        <section className="c-cover" data-reveal>
          <p className="dv-kicker">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <div className="c-cover__dek"><p>{t.hero.subtitle}</p><span>{t.hero.description}</span></div>
          <div className="c-cover__image">
            <Image src="/hero/monitoring-bridges.png" alt={t.hero.title} fill sizes="100vw" className="object-cover" priority />
            <span>FIELD NOTE 001 — STRUCTURAL MONITORING</span>
          </div>
        </section>

        <section className="c-manifesto" data-reveal>
          <span className="c-dropcap">{lang === "zh" ? "析" : "M"}</span>
          <h2>{t.section.capabilities}</h2>
          <div><p>{t.section.capabilitiesText}</p><p>{t.hero.description}</p></div>
          <div className="c-manifesto__metrics">
            {t.metrics.map((metric) => <p key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></p>)}
          </div>
        </section>

        <section id="products" className="c-products" data-reveal>
          <header><p className="dv-kicker">The Instrument Index</p><h2>{t.section.products}</h2></header>
          {products.map((product, index) => (
            <article key={product.slug} className="c-product">
              <span className="c-product__number">0{index + 1}</span>
              <div className="c-product__image"><Image src={product.image} alt={product.content.title} fill sizes="360px" className="object-contain" /></div>
              <div><p>{product.productModels.join(" / ")}</p><h3>{product.content.title}</h3><span>{product.content.description}</span></div>
              <ArrowLink href={product.href}>{t.labels.viewProduct}</ArrowLink>
            </article>
          ))}
        </section>

        <section id="solutions" className="c-dispatches" data-reveal>
          <header><p className="dv-kicker">Dispatches From The Field</p><h2>{t.section.solutions}</h2></header>
          <div>
            {solutions.map((solution, index) => (
              <Link href={solution.href} key={solution.slug} className="c-dispatch">
                <span>{index + 1}</span>
                <h3>{solution.content.title}</h3>
                <p>{solution.content.description}</p>
                <i>{t.labels.viewSolution} →</i>
              </Link>
            ))}
          </div>
        </section>

        <section id="cases" className="c-case-mosaic" data-reveal>
          <header><p className="dv-kicker">Project Chronicle</p><h2>{t.section.cases}</h2><p>{t.section.casesText}</p></header>
          <div className="c-case-mosaic__grid">
            {cases.slice(0, 4).map((item, index) => (
              <Link href={item.href} key={item.slug} className={`c-case c-case--${index + 1}`}>
                <div><Image src={item.image} alt={item.content.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
                <p>{item.content.category}</p><h3>{item.content.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="c-process" data-reveal>
          <h2>{t.section.process}</h2>
          <ol>{t.process.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol>
        </section>

        <section id="contact" className="c-contact" data-reveal>
          <div><p className="dv-kicker">Project Correspondence</p><h2>{t.section.contact}</h2><p>{t.section.contactText}</p></div>
          <ContactPanel lang={lang} />
        </section>
      </main>
    </div>
  );
}

function TerminalDiagnostic({ lang, routePrefix }: DesignTemplateProps) {
  const t = designCopy[lang];
  const { products, solutions, cases } = useDesignData(lang, routePrefix);
  const reducedMotion = useReducedMotion();
  const typedTitle = useTypedText(t.hero.title, reducedMotion);
  const [activeProduct, setActiveProduct] = useState(0);
  const selected = products[activeProduct] ?? products[0];

  return (
    <div className="dv-d">
      <header className="d-topbar">
        <Link href={`${routePrefix}/${lang}`}><Brand lang={lang} compact /></Link>
        <div className="d-topbar__path">/systems/microdetect/monitoring</div>
        <div className="d-topbar__status"><i /> SYSTEM NOMINAL</div>
        <LanguageLink lang={lang} routePrefix={routePrefix} />
      </header>

      <main className="d-shell">
        <aside className="d-command-nav">
          <p>COMMANDS</p>
          <a href="#overview"><span>01</span> overview</a>
          <a href="#products"><span>02</span> instruments</a>
          <a href="#solutions"><span>03</span> scenarios</a>
          <a href="#cases"><span>04</span> field_logs</a>
          <Link href={`${routePrefix}/insights`}><span>05</span> insights</Link>
          <a href="#contact"><span>06</span> request</a>
        </aside>

        <div className="d-workspace">
          <section id="overview" className="d-hero" data-reveal>
            <div className="d-terminal">
              <div className="d-window-bar"><span /><span /><span /><p>md-radar — zsh — 120×40</p></div>
              <div className="d-terminal__body">
                <p><b>microdetect@field</b>:~$ initialize monitoring_stack</p>
                <p className="d-terminal__ok">[OK] radar array connected</p>
                <p className="d-terminal__ok">[OK] edge analytics online</p>
                <p className="d-terminal__ok">[OK] warning channel ready</p>
                <p className="d-terminal__eyebrow">&gt; {t.hero.eyebrow}</p>
                <h1>{typedTitle}<i aria-hidden="true" /></h1>
                <p className="d-terminal__description">{t.hero.description}</p>
                <div className="dv-actions">
                  <a href="#contact" className="dv-primary">./{t.hero.primary}</a>
                  <a href="#products" className="dv-secondary">ls ./products</a>
                </div>
              </div>
            </div>
            <div className="d-telemetry">
              <header><span>LIVE TELEMETRY</span><i /></header>
              <div className="d-wave" aria-hidden="true">{Array.from({ length: 44 }).map((_, index) => <span key={index} style={{ height: `${18 + ((index * 17) % 54)}%` }} />)}</div>
              {t.metrics.map((metric, index) => (
                <div className="d-metric" key={metric.label}><span>CH-0{index + 1}</span><strong>{metric.value}</strong><p>{metric.label}</p></div>
              ))}
            </div>
          </section>

          <section className="d-diagnostics" data-reveal>
            {t.capabilities.map((item) => (
              <article key={item.index}><header><span>{item.index}</span><i /></header><h2>{item.title}</h2><p>{item.text}</p><div><span /></div></article>
            ))}
          </section>

          <section id="products" className="d-products" data-reveal>
            <header className="d-section-header"><div><p>MODULE 02</p><h2>{t.section.products}</h2></div><span>SELECT INSTRUMENT</span></header>
            <div className="d-product-console">
              <div role="tablist" aria-label={t.section.products}>
                {products.map((product, index) => (
                  <button key={product.slug} role="tab" aria-selected={activeProduct === index} onClick={() => setActiveProduct(index)}>
                    <span>0{index + 1}</span>{product.productModels[0]}
                  </button>
                ))}
              </div>
              {selected ? (
                <div className="d-product-console__detail" role="tabpanel">
                  <div className="d-product-console__image"><Image src={selected.image} alt={selected.content.title} fill sizes="420px" className="object-contain" /></div>
                  <div><p>STATUS: AVAILABLE</p><h3>{selected.content.title}</h3><span>{selected.content.description}</span><ArrowLink href={selected.href}>{t.labels.viewProduct}</ArrowLink></div>
                </div>
              ) : null}
            </div>
          </section>

          <section id="solutions" className="d-solutions" data-reveal>
            <header className="d-section-header"><div><p>MODULE 03</p><h2>{t.section.solutions}</h2></div><span>RUN SCENARIO</span></header>
            <div>
              {solutions.map((solution, index) => (
                <Link href={solution.href} key={solution.slug}>
                  <span>run scenario_{String(index + 1).padStart(2, "0")}</span><h3>{solution.content.title}</h3><p>{solution.content.description}</p><i>EXECUTE ↗</i>
                </Link>
              ))}
            </div>
          </section>

          <section id="cases" className="d-logs" data-reveal>
            <header className="d-section-header"><div><p>MODULE 04</p><h2>FIELD_LOGS</h2></div><span>{cases.length} RECORDS</span></header>
            <div className="d-log-table">
              {cases.map((item, index) => (
                <Link href={item.href} key={item.slug}><span>LOG-{String(index + 1).padStart(3, "0")}</span><b>{item.content.title}</b><em>{item.content.location}</em><i>OPEN</i></Link>
              ))}
            </div>
          </section>

          <section id="contact" className="d-contact" data-reveal>
            <div><p>&gt; START PROJECT_REQUEST</p><h2>{t.section.contact}</h2><span>{t.section.contactText}</span></div>
            <ContactPanel lang={lang} />
          </section>
        </div>
      </main>
    </div>
  );
}

function GalleryTechnology({ lang, routePrefix }: DesignTemplateProps) {
  const t = designCopy[lang];
  const { products, solutions, cases } = useDesignData(lang, routePrefix);
  const reducedMotion = useReducedMotion();
  const [activeProduct, setActiveProduct] = useState(0);
  const [activeSolution, setActiveSolution] = useState(0);
  const product = products[activeProduct] ?? products[0];

  useEffect(() => {
    if (reducedMotion || products.length < 2) return;
    const timer = window.setInterval(() => setActiveProduct((current) => (current + 1) % products.length), 5000);
    return () => window.clearInterval(timer);
  }, [products.length, reducedMotion]);

  return (
    <div className="dv-e">
      <header className="e-nav">
        <Link href={`${routePrefix}/${lang}`}><Brand lang={lang} /></Link>
        <nav><a href="#collection">{t.nav.products}</a><a href="#solutions">{t.nav.solutions}</a><a href="#cases">{t.nav.cases}</a><Link href={`${routePrefix}/insights`}>{t.nav.insights}</Link></nav>
        <LanguageLink lang={lang} routePrefix={routePrefix} />
      </header>

      <main>
        <section className="e-hero" data-reveal>
          <p className="dv-kicker">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
          <div className="e-hero__image">
            <Image src="/brochure/structural-radar-sr-p300.png" alt="SR-P300" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-contain" priority />
            <span className="e-orbit e-orbit--one" /><span className="e-orbit e-orbit--two" />
          </div>
          <div className="e-hero__footer"><span>SR-P300 / STRUCTURAL RADAR</span><a href="#collection">{lang === "zh" ? "查看系列" : "View collection"} ↓</a></div>
        </section>

        <section id="collection" className="e-collection" data-reveal>
          <header><p className="dv-kicker">The Collection</p><h2>{t.section.products}</h2><p>{t.section.productsText}</p></header>
          {product ? (
            <div className="e-product-stage">
              <div className="e-product-stage__image" key={product.slug}><Image src={product.image} alt={product.content.title} fill sizes="50vw" className="object-contain" /></div>
              <div className="e-product-stage__copy">
                <span>0{activeProduct + 1} / 0{products.length}</span>
                <p>{product.productModels.join(" / ")}</p>
                <h3>{product.content.title}</h3>
                <div className="e-product-stage__specs">{product.content.specs.slice(0, 3).map((spec) => <p key={spec.label}><span>{spec.label}</span><strong>{spec.value}</strong></p>)}</div>
                <ArrowLink href={product.href}>{t.labels.viewProduct}</ArrowLink>
              </div>
            </div>
          ) : null}
          <div className="e-product-selector" role="tablist" aria-label={t.section.products}>
            {products.map((item, index) => (
              <button key={item.slug} role="tab" aria-selected={activeProduct === index} onClick={() => setActiveProduct(index)}>
                <span>0{index + 1}</span><b>{item.productModels[0]}</b><i />
              </button>
            ))}
          </div>
        </section>

        <section className="e-capabilities" data-reveal>
          <div><p className="dv-kicker">Designed As A System</p><h2>{t.section.capabilities}</h2></div>
          {t.capabilities.map((item, index) => (
            <article key={item.index} className={`e-capability e-capability--${index + 1}`}><span>{item.index}</span><h3>{item.title}</h3><p>{item.text}</p></article>
          ))}
        </section>

        <section id="solutions" className="e-solutions" data-reveal>
          <header><p className="dv-kicker">Applications</p><h2>{t.section.solutions}</h2></header>
          <div className="e-accordion">
            {solutions.map((solution, index) => (
              <article key={solution.slug} data-open={activeSolution === index}>
                <button onClick={() => setActiveSolution(index)} aria-expanded={activeSolution === index}>
                  <span>0{index + 1}</span><h3>{solution.content.title}</h3><i>{activeSolution === index ? "−" : "+"}</i>
                </button>
                <div className="e-accordion__panel">
                  <div><p>{solution.content.description}</p><ArrowLink href={solution.href}>{t.labels.viewSolution}</ArrowLink></div>
                  <div><Image src={solution.image} alt={solution.content.title} fill sizes="520px" className="object-cover" /></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="cases" className="e-cases" data-reveal>
          <header><p className="dv-kicker">Installed In The Field</p><h2>{t.section.cases}</h2></header>
          {cases.slice(0, 2).map((item, index) => (
            <Link href={item.href} key={item.slug} className={`e-case e-case--${index + 1}`}>
              <div><Image src={item.image} alt={item.content.title} fill sizes="100vw" className="object-cover" /></div>
              <span>{item.content.category}</span><h3>{item.content.title}</h3><p>{item.content.summary}</p>
            </Link>
          ))}
        </section>

        <section id="contact" className="e-contact" data-reveal>
          <div><p className="dv-kicker">Start A Project</p><h2>{t.section.contact}</h2><p>{t.section.contactText}</p></div>
          <ContactPanel lang={lang} />
        </section>
      </main>
    </div>
  );
}

function EnterpriseOperations({ lang, routePrefix }: DesignTemplateProps) {
  const t = designCopy[lang];
  const { products, solutions, cases } = useDesignData(lang, routePrefix);
  const [activeSolution, setActiveSolution] = useState(0);
  const selected = solutions[activeSolution] ?? solutions[0];

  return (
    <div className="dv-f">
      <aside className="f-sidebar">
        <Link href={`${routePrefix}/${lang}`}><Brand lang={lang} /></Link>
        <nav aria-label="Primary navigation">
          <a href="#overview"><span>01</span> Overview</a>
          <a href="#solutions"><span>02</span> {t.nav.solutions}</a>
          <a href="#products"><span>03</span> {t.nav.products}</a>
          <a href="#cases"><span>04</span> {t.nav.cases}</a>
          <Link href={`${routePrefix}/insights`}><span>05</span> {t.nav.insights}</Link>
        </nav>
        <div className="f-sidebar__system"><i /><p>{t.labels.system}</p><strong>{t.labels.online}</strong></div>
        <LanguageLink lang={lang} routePrefix={routePrefix} />
      </aside>

      <main className="f-main">
        <header className="f-topbar">
          <p>MICRODETECT / OPERATIONS</p>
          <div><span>UTC−06:00</span><a href="#contact">{t.nav.contact}</a></div>
        </header>

        <section id="overview" className="f-overview" data-reveal>
          <div className="f-overview__title"><p className="dv-kicker">Monitoring Infrastructure</p><h1>{t.hero.title}</h1><span>{t.hero.description}</span></div>
          <div className="f-overview__visual">
            <Image src="/hero/monitoring-bridges.png" alt={t.hero.title} fill sizes="52vw" className="object-cover" priority />
            <div className="f-target f-target--one"><i /><span>NODE 01</span></div>
            <div className="f-target f-target--two"><i /><span>NODE 02</span></div>
          </div>
          <div className="f-kpis">
            {t.metrics.map((metric, index) => <article key={metric.label}><span>KPI 0{index + 1}</span><strong>{metric.value}</strong><p>{metric.label}</p><i><b style={{ width: `${58 + index * 11}%` }} /></i></article>)}
          </div>
        </section>

        <section id="solutions" className="f-solution-panel" data-reveal>
          <header><div><p className="dv-kicker">Solution Control</p><h2>{t.section.solutions}</h2></div><span><i /> ALL SYSTEMS OPERATIONAL</span></header>
          <div className="f-tabs" role="tablist" aria-label={t.section.solutions}>
            {solutions.map((solution, index) => <button key={solution.slug} role="tab" aria-selected={activeSolution === index} onClick={() => setActiveSolution(index)}><span>0{index + 1}</span>{solution.content.title}</button>)}
          </div>
          {selected ? (
            <div className="f-solution-detail" role="tabpanel">
              <div className="f-solution-detail__image"><Image src={selected.image} alt={selected.content.title} fill sizes="45vw" className="object-cover" /></div>
              <div>
                <p>{selected.content.badge}</p><h3>{selected.content.title}</h3><span>{selected.content.description}</span>
                <dl>
                  {selected.content.specs.slice(0, 4).map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
                </dl>
                <ArrowLink href={selected.href}>{t.labels.viewSolution}</ArrowLink>
              </div>
            </div>
          ) : null}
        </section>

        <section id="products" className="f-products" data-reveal>
          <header><div><p className="dv-kicker">Product Matrix</p><h2>{t.section.products}</h2></div><ArrowLink href={`${routePrefix}/${lang}/products`}>{t.labels.allProducts}</ArrowLink></header>
          <div className="f-product-table">
            <div className="f-product-table__head"><span>{t.labels.model}</span><span>{t.labels.application}</span><span>{t.labels.monitoring}</span><span>{t.labels.status}</span></div>
            {products.map((product) => (
              <Link href={product.href} key={product.slug}>
                <strong>{product.productModels[0]}</strong><span>{product.content.title}</span><span>{product.content.applications.slice(0, 2).join(" / ")}</span><span className="f-online"><i /> {t.labels.online}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="f-deployment" data-reveal>
          <header><p className="dv-kicker">Delivery Timeline</p><h2>{t.section.process}</h2></header>
          <ol>{t.process.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><i /><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol>
        </section>

        <section id="cases" className="f-cases" data-reveal>
          <header><div><p className="dv-kicker">Operational Evidence</p><h2>{t.section.cases}</h2></div><ArrowLink href={`${routePrefix}/${lang}/cases`}>{t.labels.allCases}</ArrowLink></header>
          <div>{cases.slice(0, 3).map((item, index) => <Link href={item.href} key={item.slug}><span>CASE / 0{index + 1}</span><h3>{item.content.title}</h3><p>{item.content.summary}</p><i>VIEW REPORT ↗</i></Link>)}</div>
        </section>

        <section id="contact" className="f-contact" data-reveal>
          <div><p className="dv-kicker">Project Intake</p><h2>{t.section.contact}</h2><p>{t.section.contactText}</p></div>
          <ContactPanel lang={lang} />
        </section>
      </main>
    </div>
  );
}

export default function DesignLandingVariants({ design, initialLang, routePrefix }: DesignLandingVariantsProps) {
  const rootRef = useReveal(design);
  const props = { lang: initialLang, routePrefix };
  const Template = {
    a: PrecisionAtlas,
    b: CinematicObservatory,
    c: EditorialJournal,
    d: TerminalDiagnostic,
    e: GalleryTechnology,
    f: EnterpriseOperations
  }[design];

  return (
    <div ref={rootRef} className={`design-variant design-variant--${design}`}>
      <Template {...props} />
    </div>
  );
}
