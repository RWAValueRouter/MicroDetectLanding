# One-Shot Prompt For Rebuilding The MicroDetect Website

Copy the prompt below and send it to an AI coding agent that has an empty workspace and access to the provided assets.

---

You are an expert frontend engineer. Build a production-ready bilingual corporate website for Chongqing MicroDetect Technology Co., Ltd. / 重庆析微探物科技有限公司, abbreviated as MicroDetect / 析微探物.

The company sells millimeter-wave radar monitoring products and integrated solutions for hydrology, industrial level/material monitoring, and structural safety monitoring. The output should be a complete Next.js + Tailwind CSS project that can be deployed to Vercel at `https://www.microdetect.xyz`.

## Non-Negotiable Goals

1. Build the real website, not a marketing mockup.
2. Use Next.js App Router, TypeScript, Tailwind CSS, MDX for the blog/insights section.
3. Implement Chinese and English pages.
4. Use a clean purple + white high-tech visual system.
5. Use real provided images and logo assets.
6. Implement SEO infrastructure: metadata, sitemap, robots, JSON-LD, canonical URLs, hreflang alternates, Baidu verification, favicon/logo.
7. Implement contact form submission to `luoxi23vr@gmail.com` via Resend, with mailto fallback if env vars are missing.
8. Avoid React/Chrome browser-back issues by using normal `<a>` document navigation from the landing page to insights/product/solution detail pages, and add a small inline early script on `/zh` and `/en` that reloads the landing page once when the browser restores it via back/forward navigation.

## Tech Stack

Use:

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 3
- `@next/mdx`
- `pnpm`

Scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

Dependencies:

```json
{
  "@mdx-js/loader": "^3.1.1",
  "@mdx-js/react": "^3.1.1",
  "@next/mdx": "16.2.6",
  "@types/mdx": "^2.0.14",
  "next": "16.2.6",
  "react": "19.2.6",
  "react-dom": "19.2.6"
}
```

Dev dependencies:

```json
{
  "@types/node": "22.15.32",
  "@types/react": "19.1.8",
  "@types/react-dom": "19.1.6",
  "autoprefixer": "10.4.21",
  "postcss": "8.5.6",
  "tailwindcss": "3.4.17",
  "typescript": "5.8.3"
}
```

## Required Asset Placement

Place these files in `public/`:

```txt
public/logo/md.jpg
public/hero/monitoring-bridges.png
public/hero/liquid-level.png
public/product/ar-fv100-flow-radar.jpeg
public/product/ar-ls-industrial-level-radar.jpeg
public/product/sr-i100-structure-radar.png
public/product/sr-p300-phased-array-radar.png
public/favicon.png
public/apple-touch-icon.png
public/baidu_verify_codeva-cXuoDODjm4.html
```

The Baidu verification file content must be exactly:

```txt
4ceb4d73367af15009d91587bf5f6b4b
```

Also add this metadata to every root layout:

```html
<meta name="baidu-site-verification" content="codeva-cXuoDODjm4" />
```

In Next metadata, use:

```ts
other: {
  "baidu-site-verification": "codeva-cXuoDODjm4"
}
```

## Environment Variables

Create `.env.example`:

```env
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=https://www.microdetect.xyz
```

`RESEND_API_KEY`: Resend API key.

`CONTACT_FROM_EMAIL`: the verified sender email/domain configured in Resend, for example `MicroDetect <contact@microdetect.xyz>`.

`NEXT_PUBLIC_SITE_URL`: canonical production domain. Use `https://www.microdetect.xyz`.

## File Structure

Create this structure:

```txt
app/
  (content)/
    layout.tsx
    insights/page.tsx
    insights/[slug]/page.tsx
    products/[slug]/page.tsx
    solutions/[slug]/page.tsx
  (redirect)/
    layout.tsx
    page.tsx
  [lang]/
    layout.tsx
    page.tsx
    products/[slug]/page.tsx
    solutions/[slug]/page.tsx
  _components/
    LandingPage.tsx
    SeoDetailPage.tsx
  api/contact/route.ts
  globals.css
  robots.ts
  seo.ts
  sitemap.ts
content/insights/
  ar-fv100-radar-flow-velocity-meter.mdx
  mmwave-radar-integrated-online-monitoring-system.mdx
  mmwave-radar-non-contact-monitoring.mdx
lib/
  insights.ts
  seo-page-metadata.ts
  seo-pages.ts
mdx-components.tsx
next.config.ts
tailwind.config.ts
postcss.config.js
tsconfig.json
```

## Routing Requirements

Root:

- `/` should permanently redirect to `/zh` unless `?lang=en`, then redirect to `/en`.
- `/zh` is the Chinese landing page.
- `/en` is the English landing page.

Insights:

- `/insights`
- `/insights/[slug]`

Product pages:

- `/products/radar-flow-meter`
- `/products/radar-level-meter`
- `/zh/products/radar-flow-meter`
- `/zh/products/radar-level-meter`
- `/en/products/radar-flow-meter`
- `/en/products/radar-level-meter`

Solution pages:

- `/solutions/bridge-monitoring`
- `/solutions/flood-warning`
- `/solutions/industrial-level-monitoring`
- `/solutions/dam-slope-monitoring`
- `/zh/solutions/bridge-monitoring`
- `/zh/solutions/flood-warning`
- `/zh/solutions/industrial-level-monitoring`
- `/zh/solutions/dam-slope-monitoring`
- `/en/solutions/bridge-monitoring`
- `/en/solutions/flood-warning`
- `/en/solutions/industrial-level-monitoring`
- `/en/solutions/dam-slope-monitoring`

Important: the landing page should use normal `<a href>` for navigation to insights, products, and solutions. Do not use `next/link` inside `LandingPage.tsx`. This avoids Chrome App Router/bfcache browser-back interaction bugs.

## Chrome Browser-Back Workaround

On `/zh` and `/en`, add an early inline script before rendering the landing page. It should reload the landing page once when the browser returns via back/forward navigation.

Use this logic in `app/[lang]/page.tsx`:

```ts
const reloadAfterBrowserBackScript = `
(function () {
  var reloadKey = "microdetect:landing-back-reloaded";
  var navigation;

  try {
    navigation = window.performance && window.performance.getEntriesByType
      ? window.performance.getEntriesByType("navigation")[0]
      : null;
  } catch (error) {
    navigation = null;
  }

  if (!navigation || navigation.type !== "back_forward") {
    try {
      window.sessionStorage.removeItem(reloadKey);
    } catch (error) {}
  }

  function reloadOnceAfterBack() {
    try {
      if (window.sessionStorage.getItem(reloadKey) === "1") {
        return;
      }

      window.sessionStorage.setItem(reloadKey, "1");
    } catch (error) {}

    window.location.reload();
  }

  if (navigation && navigation.type === "back_forward") {
    reloadOnceAfterBack();
  }

  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      reloadOnceAfterBack();
    }
  });
})();
`;
```

Render it before structured data and before `<LandingPage />`:

```tsx
<script dangerouslySetInnerHTML={{ __html: reloadAfterBrowserBackScript }} />
```

## Visual Direction

Design style:

- Purple and white theme.
- Clean B2B high-tech / industrial monitoring feel.
- Do not use beige, brown, orange-heavy, dark-blue-heavy, or generic SaaS gradient palette.
- Use glass/HUD panels, fine grid background, subtle purple glow, restrained high-tech data styling.
- Do not create a landing page that is just a hero; build a full usable corporate/product website.
- Use real product and hero images.

Tailwind theme colors:

```ts
colors: {
  ink: "#FFFFFF",
  panel: "#F8F5FF",
  steel: "#F3F0FF",
  cyan: "#6D28D9",
  mint: "#8B5CF6",
  periwinkle: "#A78BFA",
  amber: "#FFB020"
}
```

Typography:

- Sans: Inter, PingFang SC, HarmonyOS Sans SC, Microsoft YaHei, sans-serif
- Mono: Roboto Mono, DIN, monospace

Global style:

- White/purple radial background.
- `grid-plane` background pattern.
- `.hud-card` glass panels.
- `.scan-glow` hover sweep.
- Chinese text should use `overflow-wrap: anywhere`, `word-break: break-all`, `line-break: anywhere` for hero/mobile safety.
- All text must remain readable on mobile.

## Landing Page Content

Company:

- Chinese full name: 重庆析微探物科技有限公司
- Chinese short name: 析微探物
- English name: Chongqing MicroDetect Technology Co., Ltd.
- English short name: MicroDetect

Hero:

Chinese:

- Eyebrow: `析微探物 · Millimeter Wave Radar`
- Title: `毫米波雷达全域高精度监测系统`
- Subtitle: `面向水利水文、交通基建、工业自动化与结构安全的非接触式在线监测方案。`
- Text: `重庆析微探物科技有限公司以自主毫米波感知技术，提供从现场采集到平台预警的一体化监测能力。`
- CTA: `获取行业解决方案`, `查看产品矩阵`

English:

- Eyebrow: `MicroDetect · Millimeter Wave Radar`
- Title: `Millimeter-wave Radar Monitoring`
- Subtitle: `Non-contact online monitoring for water, infrastructure, industrial process and structural safety.`
- Text: `Chongqing MicroDetect Technology delivers field sensing, data transmission and platform warnings through self-developed mmWave radar technology.`
- CTA: `Get Industry Solution`, `View Product Matrix`

Hero visual:

- A rotating/alternating image panel using:
  - `/hero/monitoring-bridges.png`
  - `/hero/liquid-level.png`
- Images alternate automatically every 5 seconds.
- Include small labels/dots to switch manually.

Landing sections:

1. Fixed header with logo, nav, language switch, CTA.
2. Hero.
3. Field pain points.
4. Technology advantage and comparison table.
5. Product system cards.
6. Quick selector.
7. Water and industrial product interactive selector.
8. Structural radar interactive selector.
9. Solution architecture.
10. Applications/Scenario selector.
11. Customer value.
12. Contact form.
13. Footer.

## Product Data For Landing Page

Product line cards:

Chinese:

- 水域监测, 毫米波雷达水流速计, AR-FV100, href `/zh/products/radar-flow-meter`
- 工业过程监测, 工业雷达物/液位计, AR-LS100 / AR-LS200 / AR-LS300 / AR-SL300, href `/zh/products/radar-level-meter`
- 结构安全监测, 结构监测雷达, SR-I100 / SR-M200 / SR-P300, href `/zh/solutions/bridge-monitoring`

English:

- Water Monitoring, Millimeter-wave radar flow velocity meter, AR-FV100, href `/en/products/radar-flow-meter`
- Industrial Process Monitoring, Industrial radar level instruments, AR-LS100 / AR-LS200 / AR-LS300 / AR-SL300, href `/en/products/radar-level-meter`
- Structural Safety Monitoring, Structural monitoring radar, SR-I100 / SR-M200 / SR-P300, href `/en/solutions/bridge-monitoring`

Industrial/water product selector:

- AR-FV100: image `/product/ar-fv100-flow-radar.jpeg`, title `毫米波雷达水流速计`
- AR-LS100: image `/product/ar-ls-industrial-level-radar.jpeg`, title `标准监测型物/液位计`
- AR-LS200: same image, title `防爆工业型物/液位计`
- AR-LS300: same image, title `高精度计量型物/液位计`

Structural selector:

- SR-I100: image `/product/sr-i100-structure-radar.png`, distance `0-10 m`
- SR-M200: image `/product/sr-i100-structure-radar.png`, distance `10-60 m`
- SR-P300: image `/product/sr-p300-phased-array-radar.png`, distance `60-300 m`

Applications selector:

Chinese names and target routes:

- `水利水文 / 山洪预警` -> `/zh/solutions/flood-warning`
- `工业料仓 / 储罐物位监测` -> `/zh/solutions/industrial-level-monitoring`
- `桥梁结构形变监测` -> `/zh/solutions/bridge-monitoring`
- `水库大坝 / 边坡地灾预警` -> `/zh/solutions/dam-slope-monitoring`

English names and target routes:

- `Hydrology / Flash Flood Warning` -> `/en/solutions/flood-warning`
- `Industrial Silo / Tank Level Monitoring` -> `/en/solutions/industrial-level-monitoring`
- `Bridge Structural Deformation Monitoring` -> `/en/solutions/bridge-monitoring`
- `Dam / Slope Geohazard Warning` -> `/en/solutions/dam-slope-monitoring`

Behavior:

- Clicking left-side application buttons must update the right-side Scenario details.
- Clicking the right-side Scenario card navigates to the corresponding solution detail page.
- Product selector buttons must update the product description/image/stats below.
- Structure selector buttons must update the structure radar details.

## Product And Solution Detail Pages

Create shared data in `lib/seo-pages.ts`.

Each SEO page object:

```ts
type SeoPage = {
  kind: "products" | "solutions";
  slug: string;
  image: string;
  productModels: string[];
  zh: SeoPageContent;
  en: SeoPageContent;
};
```

Create pages for:

Products:

1. `radar-flow-meter`: 毫米波雷达水流速计 / Millimeter-wave Radar Flow Meter
2. `radar-level-meter`: 雷达液位计 / 物位计 / Radar Level Meter / Material Level Radar

Solutions:

1. `bridge-monitoring`: 桥梁结构健康监测 / Bridge Structural Health Monitoring
2. `flood-warning`: 山洪预警 / 水利水文监测 / Flash Flood Warning / Hydrology Monitoring
3. `industrial-level-monitoring`: 工业储罐 / 料仓物位监测 / Industrial Tank / Silo Level Monitoring
4. `dam-slope-monitoring`: 水库大坝 / 边坡地灾预警 / Dam / Slope Geohazard Warning

Create a shared `SeoDetailPage` component:

- Fixed header with logo.
- Language switch linking to alternate detail page.
- Contact CTA to `/zh#contact` or `/en#contact`.
- Hero with image, badge, product models, title, description, bullets.
- Specs grid.
- Section cards.
- Applications list.
- CTA card.
- JSON-LD structured data per page.

## Insights / Blog

Feature name:

- English: Insights
- Chinese: 行业洞察
- URL: `/insights`

Use MDX content from `content/insights`.

Required article slugs:

- `mmwave-radar-non-contact-monitoring`
- `mmwave-radar-integrated-online-monitoring-system`
- `ar-fv100-radar-flow-velocity-meter`

Each MDX article should have frontmatter:

```yaml
title:
description:
date:
category:
tags:
readingTime:
```

Implement:

- `lib/insights.ts` to read MDX/frontmatter.
- `/insights` listing page.
- `/insights/[slug]` article page.
- Article JSON-LD.
- Related articles.

## Contact Form

Landing page contact form fields:

- name
- company / organization
- phone or email
- scenario
- project needs message

POST to `/api/contact`.

Route behavior:

- Validate `name`, `company`, `contact`.
- Use Resend if `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` exist.
- Send to `luoxi23vr@gmail.com`.
- `reply_to` should be set only when contact contains `@`.
- Subject: `析微探物官网咨询 - ${company}`
- Text body should include name, company, contact, scenario, message, and source.
- If env vars are missing, return `{ ok: false, fallback: true }`; frontend opens a `mailto:` draft to `luoxi23vr@gmail.com`.
- Do not show implementation notes like “will generate an email draft” on the landing page.

## SEO Requirements

Use `app/seo.ts`:

- `siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.microdetect.xyz").replace(/\/$/, "")`
- supported languages: `zh`, `en`
- default language: `zh`
- `absoluteUrl(path)`
- localized alternates for `/zh` and `/en`
- metadata helpers
- JSON-LD organization/service data

Metadata:

- Title Chinese: `析微探物 | 毫米波雷达全域高精度监测系统`
- Description Chinese: `重庆析微探物科技有限公司提供毫米波雷达非接触式在线监测方案，覆盖水利水文、工业物位与结构安全长期监测场景。`
- Title English: `MicroDetect | Millimeter-wave Radar Monitoring`
- Description English: `Chongqing MicroDetect Technology provides non-contact mmWave radar monitoring for water, industrial process, infrastructure and structural safety applications.`

Sitemap:

- `app/sitemap.ts`
- Include `/zh`, `/en`, all product pages, all solution pages, `/insights`, and all insight articles.
- Use absolute URLs with `https://www.microdetect.xyz`.
- Include hreflang alternates.

Robots:

- `app/robots.ts`
- Allow all.
- `host` should be `www.microdetect.xyz`.
- `sitemap` should be `https://www.microdetect.xyz/sitemap.xml`.

Important domain note:

- Production canonical should be `https://www.microdetect.xyz`.
- If Vercel redirects bare domain to `www`, the sitemap and robots must also use `www`.
- Vercel environment variable should be `NEXT_PUBLIC_SITE_URL=https://www.microdetect.xyz`.

## Root Layouts

This project uses multiple root layouts:

- `app/(redirect)/layout.tsx`
- `app/[lang]/layout.tsx`
- `app/(content)/layout.tsx`

Each layout must:

- import `../globals.css`
- set icons:
  - `/favicon.png`
  - `/apple-touch-icon.png`
- set `metadataBase` from `siteUrl`
- include Baidu verification metadata:

```ts
other: {
  "baidu-site-verification": "codeva-cXuoDODjm4"
}
```

## Navigation Rules

Use normal `<a>` tags inside the landing page for:

- `/insights`
- product card links
- Scenario solution links

Reason: Chrome may restore App Router client navigation from bfcache in a state where React interactions stop responding. Normal document navigation plus the inline `/zh` and `/en` reload-on-back script avoids that issue.

It is okay to use `next/link` in detail pages and insights pages.

## `.gitignore`

Include:

```txt
node_modules
.next
.env*.local
.DS_Store
.pnpm-store
landing_*_check*.png
insight*_desktop_check.png
insights_desktop_check.png
seo_*_check.png
```

## QA Checklist

Run:

```bash
pnpm install
pnpm exec tsc --noEmit
pnpm build
pnpm dev
```

Verify:

- `/zh` renders Chinese landing page.
- `/en` renders English landing page.
- Language toggle works.
- Hero images alternate every 5 seconds.
- Product selector buttons update product details.
- Structure selector buttons update structure details.
- Application buttons update right-side Scenario.
- Scenario card navigates to correct solution page.
- Browser back in Chrome from insights/product/solution detail page to landing page reloads once and interactions still work.
- Contact form validates required fields.
- Contact form sends through Resend when env vars exist.
- Contact form opens mailto fallback when env vars are missing.
- `/sitemap.xml` returns XML.
- `/robots.txt` includes `Sitemap: https://www.microdetect.xyz/sitemap.xml`.
- `/baidu_verify_codeva-cXuoDODjm4.html` returns `4ceb4d73367af15009d91587bf5f6b4b`.
- View source/head includes `<meta name="baidu-site-verification" content="codeva-cXuoDODjm4" />`.
- Mobile viewport has no overlapping text or clipped buttons.

## Deliverable

Deliver a complete, clean Next.js project. Do not leave TODOs. Do not require manual edits except adding real environment variables in Vercel.

At the end, report:

- files created
- routes implemented
- env vars needed
- verification commands run
- any deployment notes for Vercel and Google/Baidu Search Console

