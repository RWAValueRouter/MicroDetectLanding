import Link from "next/link";

const designs = [
  { slug: "design-a", index: "01", label: "Precision Industrial", chinese: "精密工业", description: "白色工程底板、细网格、克制紫色信号与严格的直角系统。", tone: "precision" },
  { slug: "design-b", index: "02", label: "Command Center", chinese: "指挥中心", description: "深色监测界面、青色数据光谱与更强的设备在线感。", tone: "command" },
  { slug: "design-c", index: "03", label: "Editorial Technology", chinese: "科技社论", description: "高端编辑排版、衬线标题、更多留白与蓝色专业强调。", tone: "editorial" },
  { slug: "design-d", index: "04", label: "Terminal Signal", chinese: "终端信号", description: "近黑技术终端、极少量电光绿与精密机械感动效。", tone: "terminal" },
  { slug: "design-e", index: "05", label: "Gallery Technology", chinese: "画廊科技", description: "暖白画廊、深琥珀强调与沉静、电影感的版式节奏。", tone: "gallery" },
  { slug: "design-f", index: "06", label: "Enterprise Signal", chinese: "企业信号", description: "深岩蓝信息界面、严格分区与仅用于重点的信号红。", tone: "enterprise" }
];

export const metadata = { title: "设计方案对比 | 析微探物", robots: { index: false, follow: false } };

export default function DesignComparisonPage() {
  return <main className="relative min-h-screen overflow-hidden bg-white px-5 pb-20 pt-28"><div className="pointer-events-none fixed inset-0 z-0 opacity-45"><div className="grid-plane absolute inset-0" /></div><section className="relative z-10 mx-auto max-w-7xl"><p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan">Design Review</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight text-white md:text-7xl">选择析微探物的网站视觉方向</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">六套方案共享完全相同的产品、解决方案、案例与咨询内容。请在同一信息结构下比较视觉语言与阅读体验。</p><div className="mt-14 grid gap-6 lg:grid-cols-3">{designs.map((design) => <article key={design.slug} className={`design-option design-option--${design.tone} border p-6`}><div className="flex items-center justify-between"><span className="font-mono text-sm text-cyan">{design.index}</span><span className="border px-3 py-1 text-xs font-semibold">{design.chinese}</span></div><div className="design-option__canvas mt-8"><span>MICRODETECT</span><strong>{design.label}</strong><i /></div><h2 className="mt-8 text-3xl font-semibold text-white">{design.label}</h2><p className="mt-4 leading-8 text-slate-300">{design.description}</p><div className="mt-8 flex gap-3"><Link href={`/${design.slug}/zh`} className="inline-flex bg-cyan px-5 py-3 font-semibold text-ink">查看中文站</Link><Link href={`/${design.slug}/en`} className="inline-flex border border-cyan/30 px-5 py-3 font-semibold text-cyan">EN</Link></div></article>)}</div></section></main>;
}
