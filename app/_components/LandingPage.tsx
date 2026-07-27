"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { caseStudies, getCasePath } from "../../lib/cases";

type Lang = "zh" | "en";

const navItemsByLang: Record<Lang, Array<{ label: string; href: string }>> = {
  zh: [
    { label: "产品矩阵", href: "/zh/products" },
    { label: "系统能力", href: "#capability" },
    { label: "解决方案", href: "#applications" },
    { label: "工程案例", href: "/zh/cases" },
    { label: "行业洞察", href: "/insights" }
  ],
  en: [
    { label: "Products", href: "/en/products" },
    { label: "Capabilities", href: "#capability" },
    { label: "Solutions", href: "#applications" },
    { label: "Case Studies", href: "/en/cases" },
    { label: "Insights", href: "/insights" }
  ]
};

const contactEmail = "luoxi23vr@gmail.com";

const heroSlides = [
  {
    src: "/hero/monitoring-bridges.png",
    alt: "毫米波雷达桥梁结构健康监测示意图",
    eyebrow: "Bridge Radar",
    label: { zh: "结构健康监测", en: "Structural health monitoring" },
    status: "ONLINE"
  },
  {
    src: "/hero/liquid-level.png",
    alt: "毫米波雷达非接触式液位监测示意图",
    eyebrow: "Liquid Level",
    label: { zh: "非接触式液位监测", en: "Non-contact liquid level monitoring" },
    status: "LIVE"
  }
];

const productLines = [
  {
    title: "水域监测",
    series: "毫米波雷达水流速计",
    models: "AR-FV100",
    problem: "河道、渠道、排水渠、桥涵断面水流速在线监测",
    customers: "水利、水务、防汛、灌区、交通水文",
    href: "/zh/products/radar-flow-meter"
  },
  {
    title: "工业过程监测",
    series: "工业雷达物/液位计",
    models: "AR-LS100 / AR-LS200 / AR-LS300 / AR-SL300",
    problem: "储罐、清水池、料仓、筒仓液位/物位/料位监测",
    customers: "化工、煤炭、水泥、电力、钢铁",
    href: "/zh/products/radar-level-meter"
  },
  {
    title: "结构安全监测",
    series: "结构监测雷达",
    models: "SR-I100 / SR-M200 / SR-P300",
    problem: "桥梁、大坝、边坡、隧道、基坑形变与位移监测",
    customers: "交通、水利、城建、地灾防控、基础设施运维",
    href: "/zh/solutions/bridge-monitoring"
  }
];

const selectorItems = [
  ["水流速与水文监测", "AR-FV100 水流速计"],
  ["液位、物位与料位监测", "AR-LS 工业雷达系列"],
  ["桥梁、大坝、边坡等结构监测", "SR-I100 / SR-M200 / SR-P300"]
];

const applications = [
  {
    name: "水利水文 / 山洪预警",
    deploy: "山区河道、小流域断面、桥涵断面、排水渠关键节点",
    monitor: "水流速、液位变化、流速趋势、异常突增",
    product: "AR-FV100，可配套液位雷达和无线通信模块",
    delivery: "雷达终端 + 太阳能供电 + 4G/5G 通信 + 平台预警 + 现场声光告警"
  },
  {
    name: "工业料仓 / 储罐物位监测",
    deploy: "煤仓、水泥库、焦仓、粉料仓、化工储罐、反应釜接口",
    monitor: "料位、液位、库存变化、满仓/空仓状态、异常波动",
    product: "AR-LS100/200/300 或 AR-SL300",
    delivery: "雷达终端 + 工业安装法兰 + 4-20mA/HART 或 RS485 + PLC/DCS/工业网关"
  },
  {
    name: "桥梁结构形变监测",
    deploy: "桥下、岸边、桥梁独立支架、跨中观测点、伸缩缝与支座附近",
    monitor: "梁体挠度、支座位移、伸缩缝变化、长期形变趋势、异常突变",
    product: "SR-I100 / SR-M200 / SR-P300",
    delivery: "结构监测雷达 + 独立支撑结构 + 无线通信 + 云平台 + 阈值预警 + 报表输出"
  },
  {
    name: "水库大坝 / 边坡地灾预警",
    deploy: "坝顶、坝坡、边坡对岸、道路边坡监测点、高危滑坡体周边",
    monitor: "坝体沉降、坝坡滑移、边坡位移、长期趋势、雨季异常变化",
    product: "SR-P300，必要时配合视频复核和现场声光告警",
    delivery: "远距离结构雷达 + 太阳能供电 + 4G/5G 通信 + 边坡/大坝预警平台 + 现场告警"
  },
  {
    name: "交通基础设施全天候感知",
    deploy: "道路、隧道、桥梁与交通运行关键节点",
    monitor: "目标距离、速度、方向与异常变化",
    product: "毫米波雷达感知设备，可选配边缘计算与视频复核",
    delivery: "雷达感知设备 + 边缘计算单元 + 视频复核 + 通信系统 + 交通管理平台"
  }
];

const productLinesEn = [
  {
    title: "Water Monitoring",
    series: "Millimeter-wave radar flow velocity meter",
    models: "AR-FV100",
    problem: "Online flow velocity monitoring for rivers, canals, drainage channels and bridge culverts",
    customers: "Water resources, utilities, flood control, irrigation districts, transport hydrology",
    href: "/en/products/radar-flow-meter"
  },
  {
    title: "Industrial Process Monitoring",
    series: "Industrial radar level instruments",
    models: "AR-LS100 / AR-LS200 / AR-LS300 / AR-SL300",
    problem: "Liquid level, material level and inventory monitoring for tanks, reservoirs, silos and bins",
    customers: "Chemical, coal, cement, power, steel and process industries",
    href: "/en/products/radar-level-meter"
  },
  {
    title: "Structural Safety Monitoring",
    series: "Structural monitoring radar",
    models: "SR-I100 / SR-M200 / SR-P300",
    problem: "Displacement and deformation monitoring for bridges, dams, slopes, tunnels and foundation pits",
    customers: "Transport, water infrastructure, urban assets, geohazard prevention, infrastructure O&M",
    href: "/en/solutions/bridge-monitoring"
  }
];

const selectorItemsEn = [
  ["Water flow and hydrology", "AR-FV100 Flow Radar"],
  ["Liquid, material and inventory level", "AR-LS Industrial Radar Series"],
  ["Bridges, dams, slopes and structural safety", "SR-I100 / SR-M200 / SR-P300"]
];

const applicationsEn = [
  {
    name: "Hydrology / Flash Flood Warning",
    deploy: "Mountain streams, small watershed sections, bridge culverts and drainage control points",
    monitor: "Flow velocity, level changes, trend shifts and abnormal surges",
    product: "AR-FV100 with optional level radar and wireless communication modules",
    delivery: "Radar terminal + solar power + 4G/5G communication + platform warning + on-site alarm"
  },
  {
    name: "Industrial Silo / Tank Level Monitoring",
    deploy: "Coal silos, cement warehouses, coke bins, powder silos, chemical tanks and reactor interfaces",
    monitor: "Material level, liquid level, inventory changes, full/empty status and abnormal fluctuations",
    product: "AR-LS100/200/300 or AR-SL300 depending on safety and accuracy requirements",
    delivery: "Radar terminal + industrial flange + 4-20mA/HART or RS485 + PLC/DCS/industrial gateway"
  },
  {
    name: "Bridge Structural Deformation Monitoring",
    deploy: "Bridge undersides, bankside brackets, mid-span points, expansion joints and bearing locations",
    monitor: "Girder deflection, bearing displacement, expansion joint change, long-term trends and sudden shifts",
    product: "SR-I100 / SR-M200 / SR-P300",
    delivery: "Structural radar + independent support + wireless communication + cloud platform + threshold warning + reports"
  },
  {
    name: "Dam / Slope Geohazard Warning",
    deploy: "Dam crests, dam slopes, opposite-slope observation points, roadside slopes and high-risk landslide areas",
    monitor: "Dam settlement, slope sliding, displacement trends and rainy-season abnormal changes",
    product: "SR-P300 with optional video verification and on-site alarm",
    delivery: "Long-range structural radar + solar power + 4G/5G communication + warning platform + on-site alarm"
  },
  {
    name: "All-weather Transport Infrastructure Sensing",
    deploy: "Roads, tunnels, bridges and key transport-operation nodes",
    monitor: "Target range, speed, direction and abnormal change",
    product: "mmWave sensing equipment with optional edge computing and video review",
    delivery: "Radar sensing + edge unit + video review + communication system + traffic management platform"
  }
];

const applicationDetailPathsByLang: Record<Lang, string[]> = {
  zh: [
    "/zh/solutions/flood-warning",
    "/zh/solutions/industrial-level-monitoring",
    "/zh/solutions/bridge-monitoring",
    "/zh/solutions/dam-slope-monitoring",
    "/zh/solutions/transport-infrastructure-sensing"
  ],
  en: [
    "/en/solutions/flood-warning",
    "/en/solutions/industrial-level-monitoring",
    "/en/solutions/bridge-monitoring",
    "/en/solutions/dam-slope-monitoring",
    "/en/solutions/transport-infrastructure-sensing"
  ]
};

const capabilityLayersByLang: Record<Lang, Array<[string, string]>> = {
  zh: [
    ["现场感知", "流速、液位、物位与结构形变等关键参数采集"],
    ["边缘处理", "滤波、目标提取、异常识别、本地缓存与状态诊断"],
    ["多制式传输", "RS485、HART、4-20mA、以太网、4G/5G、LoRa、NB-IoT"],
    ["平台分析", "实时监测、趋势曲线、阈值告警、报表与设备管理"],
    ["远程运维", "配置下发、算法升级、视频复核与服务响应"]
  ],
  en: [
    ["Field Sensing", "Capture flow velocity, level, material level and structural deformation."],
    ["Edge Processing", "Filtering, target extraction, anomaly detection, local caching and device diagnostics."],
    ["Flexible Transmission", "RS485, HART, 4-20mA, Ethernet, 4G/5G, LoRa and NB-IoT."],
    ["Platform Analytics", "Real-time monitoring, trends, alerts, reports and device management."],
    ["Remote O&M", "Configuration, algorithm updates, video review and service response."]
  ]
};

const deliveryStepsByLang: Record<Lang, Array<[string, string]>> = {
  zh: [
    ["现场勘察", "确认监测对象、安装、供电、通信与环境干扰。"],
    ["方案设计", "确定设备型号、布点位置、通信方式和平台功能。"],
    ["安装调试", "完成支架、设备、供电通信与参数标定。"],
    ["平台验证", "接入实时数据、趋势图、告警规则和报表。"],
    ["持续运维", "远程诊断、算法升级、故障响应与服务报告。"]
  ],
  en: [
    ["Site Survey", "Confirm targets, mounting, power, communications and interference."],
    ["Solution Design", "Define models, monitoring points, transmission and platform functions."],
    ["Installation and Calibration", "Deploy mounting, devices, power, communications and parameter calibration."],
    ["Platform Validation", "Connect real-time data, trends, alerts and reports."],
    ["Ongoing O&M", "Remote diagnostics, algorithm updates, response and service reporting."]
  ]
};

const quickConditionsByLang: Record<Lang, string[]> = {
  zh: ["监测对象与量程", "安装距离与视线", "环境、供电与通信", "已有平台或 PLC/DCS 接口"],
  en: ["Target and measurement range", "Distance and line of sight", "Environment, power and communication", "Existing platform or PLC/DCS interface"]
};

const copy = {
  zh: {
    companyShort: "析微探物",
    ctaSmall: "获取方案",
    badges: ["非接触式监测", "7x24 小时在线", "全栈自研", "国产化替代", "多场景一体交付"],
    heroEyebrow: "析微探物 · Millimeter Wave Radar",
    heroTitle: "毫米波雷达全域高精度监测系统",
    heroSubtitle: "面向水利水文、交通基建、工业自动化与结构安全的非接触式在线监测方案。",
    heroText: "重庆析微探物科技有限公司以自主毫米波感知技术，提供从现场采集到平台预警的一体化监测能力。",
    primaryCta: "获取行业解决方案",
    secondaryCta: "查看产品矩阵",
    audienceEyebrow: "Who We Serve",
    audienceTitle: "为真实工程现场提供可交付的监测能力",
    audienceText: "面向业主、运维单位、设计院、集成商与科研伙伴，匹配不同现场条件与系统接口。",
    painEyebrow: "Field Pain",
    painTitle: "复杂现场，需要比人工巡检更连续的感知能力",
    painText: "在涉水、粉尘、高空和远距离场景中，稳定的数据连续性决定预警质量。",
    techTitle: "用毫米波雷达，穿透复杂环境的不确定性",
    techText: "主动发射电磁波并接收目标回波，利用距离、速度、多普勒和相位信息，实现对水面流速、液位/物位高度、结构微小形变等参数的非接触式感知。",
    liveTrend: "多参数连续监测",
    allDay: "7x24 在线",
    compareHeads: ["对比维度", "毫米波雷达", "激光雷达", "可见光视觉"],
    compareRows: [
      ["探测方式", "距离/速度/相位", "光学测距", "图像识别"],
      ["环境适应性", "雨雾粉尘更强", "受强光影响", "依赖光照"],
      ["微小变化识别", "毫米级识别", "偏距离测量", "量化有限"],
      ["长期运维", "非接触低维护", "镜头需清洁", "需补光维护"],
      ["工程距离", "近中远覆盖", "复杂环境下降", "更适合近距"]
    ],
    productsTitle: "三大产品线，覆盖水域、工业与结构安全监测",
    productsText: "覆盖流速、液位、物位、料位和结构形变等核心监测对象。",
    fieldLabel: "适用领域",
    selectorTitle: "根据监测对象，快速匹配产品方案",
    selectorBadge: "快速选型",
    conditionsTitle: "选型前确认现场条件",
    waterTitle: "非接触式水流速、液位、物位与料位在线监测",
    waterText: "面向水利水文、市政排水、农业灌溉、公路桥涵、工业储罐、料仓与筒仓计量等场景。",
    disclaimer: "关键指标以产品版本、现场工况和技术协议为准。",
    structureTitle: "远距离、非接触、多点位结构形变监测",
    structureText: "面向公路桥梁、城市高架桥、隧道、水库大坝、山体边坡、建筑基坑和老旧病害建筑等长期在线监测场景。",
    structureEffects: ["实时持续采集", "长期形变曲线", "异常趋势预警", "多项目云端管理"],
    structureDisclaimer: "工程测量精度以现场安装、目标反射条件、标定方案和验收协议为准。",
    architectureTitle: "从现场感知到平台预警的一体化闭环",
    architectureText: "设备、通信、平台与告警联动，支撑长期在线运行和多站点统一管理。",
    architectureSummary: "从单点监测设备到行业级智能预警系统，构建“感知 - 传输 - 分析 - 预警”的完整闭环。",
    capabilityTitle: "端、边、云协同，让数据真正进入业务",
    capabilityText: "从现场采集到平台预警与远程运维，按工程条件灵活组合设备、通信、平台和服务。",
    appsTitle: "面向真实现场的成套应用方案",
    appsText: "覆盖水利防汛、工业计量、桥梁养护和地灾预警等关键场景。",
    appLabels: ["部署位置", "监测内容", "推荐产品", "交付组合"],
    valueTitle: "从单点采集，到主动预警",
    casesTitle: "真实项目，验证真实能力",
    casesText: "从桥梁挠度到河道水位流速，查看毫米波雷达在现场部署、数据接入和长期运行中的实践。",
    casesLink: "查看全部工程案例",
    deliveryTitle: "从勘察到运维，完成工程交付闭环",
    deliveryText: "不止提供设备，也协助完成选型、安装、平台接入、数据验证和后续运维。",
    contactTitle: "让监测更智能，让预警更及时，让管理更高效",
    contactText: "留下监测对象、现场环境和平台接口要求，析微探物将尽快与您联系。",
    contactBadges: ["前端感知", "远程传输", "平台分析", "异常预警"],
    formName: "姓名",
    formCompany: "公司/单位",
    formContact: "手机或邮箱",
    formScene: "关注场景",
    formMessage: "项目需求",
    formPlaceholder: "监测对象、项目地区、预计部署数量、平台接口要求等",
    sceneOptions: ["水域监测", "工业过程监测", "结构安全监测", "整体解决方案", "其他"],
    submit: "提交需求",
    submitting: "正在提交...",
    formDefault: "填写信息后，析微探物将尽快与您联系。",
    formRequired: "请填写姓名、公司/单位和联系方式。",
    formSuccess: "提交成功，析微探物将尽快与您联系。",
    formFallback: "请完成提交，析微探物将尽快与您联系。",
    formError: "提交失败，请稍后重试或直接联系析微探物。",
    footer: "重庆析微探物科技有限公司 · 以非接触式高精度感知，守护水利安全、交通安全与工业安全。"
  },
  en: {
    companyShort: "MicroDetect",
    ctaSmall: "Get Proposal",
    badges: ["Non-contact", "24/7 Online", "Full-stack R&D", "Domestic Alternative", "Turnkey Delivery"],
    heroEyebrow: "MicroDetect · Millimeter Wave Radar",
    heroTitle: "Millimeter-wave Radar Monitoring",
    heroSubtitle: "Non-contact online monitoring for water, infrastructure, industrial process and structural safety.",
    heroText: "Chongqing MicroDetect Technology delivers field sensing, data transmission and platform warnings through self-developed mmWave radar technology.",
    primaryCta: "Get Industry Solution",
    secondaryCta: "View Product Matrix",
    audienceEyebrow: "Who We Serve",
    audienceTitle: "Deployable monitoring for real operating sites",
    audienceText: "For asset owners, operators, design firms, integration partners and research organizations with different site and system requirements.",
    painEyebrow: "Field Pain",
    painTitle: "Complex sites need continuous sensing beyond manual inspection",
    painText: "In water, dust, high-altitude and long-distance environments, data continuity determines warning quality.",
    techTitle: "Millimeter-wave radar reduces uncertainty in harsh environments",
    techText: "By transmitting electromagnetic waves and receiving target echoes, radar uses distance, velocity, Doppler and phase information to sense flow velocity, liquid/material level and subtle structural deformation without contact.",
    liveTrend: "Continuous Multi-parameter Monitoring",
    allDay: "24/7 Online",
    compareHeads: ["Dimension", "mmWave Radar", "LiDAR", "Vision"],
    compareRows: [
      ["Sensing Method", "Distance / Velocity / Phase", "Optical ranging", "Image recognition"],
      ["Environment", "Stronger in fog and dust", "Sensitive to light", "Lighting dependent"],
      ["Small Change", "Millimeter-level recognition", "Distance focused", "Limited quantification"],
      ["Maintenance", "Non-contact, low maintenance", "Lens cleaning", "Lighting and lens upkeep"],
      ["Range", "Near, mid and long range", "Drops in harsh sites", "Better for short range"]
    ],
    productsTitle: "Three product lines for water, industrial and structural monitoring",
    productsText: "Covering flow velocity, liquid level, material level, inventory level and structural deformation.",
    fieldLabel: "Industries",
    selectorTitle: "Match products by monitoring target",
    selectorBadge: "Quick Selection",
    conditionsTitle: "Confirm site conditions before selection",
    waterTitle: "Non-contact flow, liquid level, material level and inventory monitoring",
    waterText: "For hydrology, municipal drainage, irrigation, bridge culverts, industrial tanks, silos and bin metering.",
    disclaimer: "Key specifications depend on product version, site conditions and technical agreement.",
    structureTitle: "Long-range, non-contact, multi-point structural deformation monitoring",
    structureText: "For highway bridges, urban viaducts, tunnels, dams, slopes, foundation pits and aging buildings.",
    structureEffects: ["Continuous acquisition", "Long-term deformation curves", "Anomaly trend warning", "Cloud-based multi-project management"],
    structureDisclaimer: "Engineering accuracy depends on installation, target reflection, calibration and acceptance agreement.",
    architectureTitle: "An integrated loop from field sensing to platform warning",
    architectureText: "Devices, communication, platform and alarms work together for long-term online operation and multi-site management.",
    architectureSummary: "From single-point devices to industry-grade warning systems: sensing - transmission - analysis - warning.",
    capabilityTitle: "Field, edge and cloud capability that puts data to work",
    capabilityText: "Combine sensing, communication, analytics and service around the constraints of each project site.",
    appsTitle: "Turnkey solutions for real operating sites",
    appsText: "For flood warning, industrial metering, bridge maintenance and geohazard prevention.",
    appLabels: ["Deployment", "Monitoring", "Recommended Product", "Delivery Package"],
    valueTitle: "From data capture to proactive warning",
    casesTitle: "Real projects, proven capabilities",
    casesText: "Explore practical deployments of mmWave radar for bridge deflection and online water level and flow monitoring.",
    casesLink: "View all case studies",
    deliveryTitle: "A delivery loop from survey to operation",
    deliveryText: "Beyond equipment supply: selection, installation, platform connection, data validation and ongoing O&M.",
    contactTitle: "Smarter monitoring, faster warning, more efficient management",
    contactText: "Tell us your target, site conditions and platform requirements. MicroDetect will contact you shortly.",
    contactBadges: ["Field Sensing", "Remote Transmission", "Platform Analytics", "Early Warning"],
    formName: "Name",
    formCompany: "Company / Organization",
    formContact: "Phone or Email",
    formScene: "Scenario",
    formMessage: "Project Needs",
    formPlaceholder: "Monitoring target, project location, expected quantity, platform interface requirements, etc.",
    sceneOptions: ["Water Monitoring", "Industrial Process Monitoring", "Structural Safety Monitoring", "Integrated Solution", "Other"],
    submit: "Submit Inquiry",
    submitting: "Submitting...",
    formDefault: "After submission, MicroDetect will contact you shortly.",
    formRequired: "Please enter your name, organization and contact information.",
    formSuccess: "Submitted successfully. MicroDetect will contact you shortly.",
    formFallback: "Please complete the submission. MicroDetect will contact you shortly.",
    formError: "Submission failed. Please try again later or contact MicroDetect directly.",
    footer: "Chongqing MicroDetect Technology Co., Ltd. · Non-contact high-precision sensing for water, transport and industrial safety."
  }
};

type ContactForm = {
  name: string;
  company: string;
  contact: string;
  scene: string;
  message: string;
};

function SectionHeading({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan">{eyebrow}</p>
      <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">{text}</p> : null}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-sm text-cyan shadow-glow">
      {children}
    </span>
  );
}

function RadarVisual({ lang }: { lang: Lang }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="hud-card relative mx-auto w-full max-w-[720px] overflow-hidden rounded-[32px] p-2 shadow-glow">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[26px] border border-cyan/15 bg-white">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 720px, 100vw"
            className={`object-cover transition-opacity duration-700 ease-out ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(109,40,217,0.08),transparent_38%,rgba(255,255,255,0.12))]" />
      </div>
      <div className="relative flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-400">{currentSlide.eyebrow}</p>
          <p className="mt-1 font-semibold text-white">{currentSlide.label[lang]}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-cyan/10 px-3 py-1 font-mono text-sm font-semibold text-cyan">
            {currentSlide.status}
          </span>
          <div className="flex gap-1.5">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                aria-label={lang === "zh" ? `显示${slide.label.zh}` : `Show ${slide.label.en}`}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === index ? "w-7 bg-cyan" : "w-2 bg-cyan/25 hover:bg-cyan/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WaveCard({ title, status }: { title: string; status: string }) {
  return (
    <div className="hud-card rounded-3xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan">Live Trend</p>
          <h3 className="mt-2 text-xl font-semibold">{title}</h3>
        </div>
        <span className="rounded-full bg-mint/10 px-3 py-1 text-sm text-mint">{status}</span>
      </div>
      <svg viewBox="0 0 480 170" className="h-40 w-full" role="img" aria-label="实时监测曲线">
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#6D28D9" />
            <stop offset="55%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#FFB020" />
          </linearGradient>
        </defs>
        {[30, 70, 110, 150].map((y) => (
          <line key={y} x1="0" x2="480" y1={y} y2={y} stroke="rgba(125,167,255,0.16)" />
        ))}
        <path
          className="metric-wave"
          d="M4 110 C48 48 89 145 132 92 C176 37 216 136 260 86 C306 32 350 126 395 76 C424 45 448 52 476 28"
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function LandingPage({ initialLang = "zh", routePrefix = "" }: { initialLang?: Lang; routePrefix?: string }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [applicationIndex, setApplicationIndex] = useState(0);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    company: "",
    contact: "",
    scene: copy[initialLang].sceneOptions[0],
    message: ""
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = copy[lang];
  const withRoutePrefix = (path: string) => (path.startsWith("/") ? `${routePrefix}${path}` : path);
  const navItems = navItemsByLang[lang].map((item) => ({ ...item, href: withRoutePrefix(item.href) }));
  const localizedProductLines = lang === "zh" ? productLines : productLinesEn;
  const localizedSelectorItems = lang === "zh" ? selectorItems : selectorItemsEn;
  const localizedApplications = lang === "zh" ? applications : applicationsEn;
  const localizedCapabilityLayers = capabilityLayersByLang[lang];
  const localizedDeliverySteps = deliveryStepsByLang[lang];
  const textWrapClass = lang === "zh" ? "cjk-wrap" : "";

  const currentApplication = localizedApplications[applicationIndex];
  const currentApplicationDetailPath = applicationDetailPathsByLang[lang][applicationIndex];
  const featuredCases = [caseStudies[0], caseStudies[1], caseStudies[3]];

  const quickConditions = useMemo(() => quickConditionsByLang[lang], [lang]);

  function switchLanguage(nextLang: Lang) {
    const url = new URL(window.location.href);
    url.pathname = `${routePrefix}/${nextLang}`;
    url.search = "";
    window.location.href = url.toString();
  }

  function updateContactForm(field: keyof ContactForm, value: string) {
    setContactForm((current) => ({ ...current, [field]: value }));
    if (formStatus) {
      setFormStatus("");
    }
  }

  function createMailtoUrl(form: ContactForm) {
    const subject = `析微探物官网咨询 - ${form.company.trim()}`;
    const body = [
      "官网咨询需求",
      "",
      `姓名：${form.name.trim()}`,
      `公司/单位：${form.company.trim()}`,
      `联系方式：${form.contact.trim()}`,
      `关注场景：${form.scene}`,
      "",
      "项目需求：",
      form.message.trim() || "未填写",
      "",
      "来源：重庆析微探物科技有限公司官网 Landing Page"
    ].join("\n");

    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!contactForm.name.trim() || !contactForm.company.trim() || !contactForm.contact.trim()) {
      setFormStatus(t.formRequired);
      return;
    }

    setIsSubmitting(true);
    setFormStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contactForm)
      });
      const result = (await response.json()) as { ok?: boolean; fallback?: boolean; message?: string };

      if (response.ok && result.ok) {
        setFormStatus(t.formSuccess);
        setContactForm({ name: "", company: "", contact: "", scene: t.sceneOptions[0], message: "" });
        return;
      }

      if (result.fallback) {
        window.location.href = createMailtoUrl(contactForm);
        setFormStatus(t.formFallback);
        return;
      }

      setFormStatus(t.formError);
    } catch {
      window.location.href = createMailtoUrl(contactForm);
      setFormStatus(t.formFallback);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-45">
        <div className="grid-plane absolute inset-0" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-3">
            <span className="relative h-10 w-24 overflow-hidden rounded-xl border border-cyan/15 bg-white shadow-sm">
              <Image src="/logo/md.jpg" alt="析微探物 Logo" fill sizes="96px" className="object-cover" priority />
            </span>
            <span className="text-sm font-semibold text-white md:text-base">{t.companyShort}</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-cyan">
                {item.label}
              </a>
            ))}
          </div>
          <div className="ml-auto mr-3 flex rounded-full border border-cyan/20 bg-white/70 p-1 shadow-sm md:ml-0">
            {(["zh", "en"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => switchLanguage(item)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  lang === item ? "bg-cyan text-white" : "text-cyan hover:bg-cyan/10"
                }`}
              >
                {item === "zh" ? "中文" : "EN"}
              </button>
            ))}
          </div>
          <a
            href="#contact"
            className="scan-glow hidden rounded-full border border-cyan/35 bg-cyan/10 px-4 py-2 text-sm font-medium text-cyan transition hover:border-cyan hover:bg-cyan/15 sm:inline-block"
          >
            {t.ctaSmall}
          </a>
        </nav>
      </header>

      <section className="relative z-10 px-5 pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0">
            <div className="mb-6 flex max-w-[22rem] flex-wrap gap-3 sm:max-w-none">
              {t.badges.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-mint">{t.heroEyebrow}</p>
            <h1 className={`${textWrapClass} mt-5 max-w-[21rem] text-[2.35rem] font-semibold leading-[1.12] text-white sm:max-w-4xl sm:text-5xl md:text-7xl`}>
              {t.heroTitle}
            </h1>
            <p className={`${textWrapClass} mt-6 max-w-[21rem] text-lg leading-8 text-slate-200 sm:max-w-2xl sm:text-xl sm:leading-9`}>
              {t.heroSubtitle}
            </p>
            <p className={`${textWrapClass} mt-5 max-w-[21rem] text-base leading-8 text-slate-400 sm:max-w-2xl`}>
              {t.heroText}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="scan-glow rounded-full bg-cyan px-7 py-4 text-center font-semibold text-ink shadow-glow transition hover:bg-mint"
              >
                {t.primaryCta}
              </a>
              <a
                href="#products"
                className="rounded-full border border-white/15 px-7 py-4 text-center font-semibold text-white transition hover:border-mint/60 hover:text-mint"
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>
          <RadarVisual lang={lang} />
        </div>
      </section>

      <section id="products" className="relative z-10 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Product System"
            title={t.productsTitle}
            text={t.productsText}
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {localizedProductLines.map((line) => (
              <a
                key={line.title}
                href={withRoutePrefix(line.href)}
                className="hud-card scan-glow group rounded-3xl p-7 transition hover:-translate-y-1"
              >
                <p className="font-mono text-sm text-cyan">{line.series}</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">{line.title}</h3>
                <p className="mt-5 rounded-2xl border border-mint/20 bg-mint/10 p-4 font-mono text-sm text-mint">
                  {line.models}
                </p>
                <p className="mt-5 leading-7 text-slate-300">{line.problem}</p>
                <p className="mt-4 text-sm text-slate-500">{t.fieldLabel}: {line.customers}</p>
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
            <div className="hud-card rounded-3xl p-6 md:p-8">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-sm uppercase tracking-[0.24em] text-cyan">Selector</p>
                  <h3 className="mt-2 text-2xl font-semibold">{t.selectorTitle}</h3>
                </div>
                <span className="hidden rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300 md:inline">{t.selectorBadge}</span>
              </div>
              <div className="grid gap-3">
                {localizedSelectorItems.map(([need, product], index) => (
                  <div key={need} className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-[2rem_1fr_0.9fr]">
                    <span className="font-mono text-cyan">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-slate-300">{need}</span>
                    <span className="font-semibold text-white">{product}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hud-card rounded-3xl p-6 md:p-8">
              <h3 className="text-2xl font-semibold">{t.conditionsTitle}</h3>
              <div className="mt-6 grid gap-3">
                {quickConditions.map((condition) => (
                  <div key={condition} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-mint shadow-[0_0_18px_rgba(139,92,246,0.55)]" />
                    <span className="text-slate-300">{condition}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capability" className="relative z-10 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Engineering Capability" title={t.capabilityTitle} text={t.capabilityText} />
          <div className="grid gap-4 md:grid-cols-5">
            {localizedCapabilityLayers.map(([title, text], index) => (
              <article key={title} className="hud-card relative rounded-3xl p-6">
                <p className="font-mono text-sm text-mint">0{index + 1}</p>
                <h3 className="mt-5 text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
                {index < localizedCapabilityLayers.length - 1 ? <span className="absolute -right-3 top-1/2 hidden h-px w-6 bg-cyan/50 md:block" /> : null}
              </article>
            ))}
          </div>
          <div className="mt-8 border-t border-white/10 pt-8">
            <p className="text-center text-sm font-semibold text-cyan">{t.deliveryTitle}</p>
            <div className="mt-5 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-5">
              {localizedDeliverySteps.map(([title, text], index) => (
                <div key={title} className="bg-white/70 p-4">
                  <span className="font-mono text-xs text-mint">0{index + 1}</span>
                  <p className="mt-3 font-semibold text-white">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="applications" className="relative z-10 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Applications"
            title={t.appsTitle}
            text={t.appsText}
          />
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="grid gap-3">
              {localizedApplications.map((app, index) => (
                <button
                  type="button"
                  key={app.name}
                  onClick={() => setApplicationIndex(index)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    applicationIndex === index
                      ? "border-cyan/60 bg-cyan/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan/35"
                  }`}
                >
                  {app.name}
                </button>
              ))}
            </div>
            <a
              key={`${lang}-${applicationIndex}`}
              href={withRoutePrefix(currentApplicationDetailPath)}
              className="hud-card group block rounded-[32px] p-6 transition hover:-translate-y-1 hover:border-cyan/45 md:p-8"
              aria-label={lang === "zh" ? `查看${currentApplication.name}详情` : `View ${currentApplication.name} details`}
            >
              <p className="font-mono text-sm uppercase tracking-[0.24em] text-mint">Scenario</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h3 className="text-3xl font-semibold">{currentApplication.name}</h3>
                <span className="text-sm font-semibold text-cyan opacity-80 transition group-hover:opacity-100">
                  {lang === "zh" ? "查看方案" : "View solution"}
                </span>
              </div>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {[
                  [t.appLabels[0], currentApplication.deploy],
                  [t.appLabels[1], currentApplication.monitor],
                  [t.appLabels[2], currentApplication.product],
                  [t.appLabels[3], currentApplication.delivery]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="font-mono text-sm text-cyan">{label}</p>
                    <p className="mt-3 leading-7 text-slate-300">{value}</p>
                  </div>
                ))}
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="cases" className="relative z-10 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Case Studies" title={t.casesTitle} text={t.casesText} />
          <div className="grid gap-5 md:grid-cols-2">
            {featuredCases.map((caseStudy) => {
              const caseContent = caseStudy[lang];
              return (
                <a key={caseStudy.slug} href={withRoutePrefix(getCasePath(caseStudy, lang))} className="hud-card scan-glow group overflow-hidden rounded-[28px] p-3 transition hover:-translate-y-1 hover:border-cyan/45">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] bg-white">
                    <Image src={caseStudy.image} alt={caseContent.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-4 pb-3">
                    <p className="font-mono text-sm text-cyan">{caseContent.category}</p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">{caseContent.title}</h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-400">{caseContent.summary}</p>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <a href={withRoutePrefix(`/${lang}/cases`)} className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-6 py-3 font-semibold text-cyan transition hover:bg-cyan hover:text-ink">{t.casesLink}</a>
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-cyan/20 bg-white p-6 shadow-glow md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="self-center">
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan">Get Proposal</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-6xl">{t.contactTitle}</h2>
            <p className="mt-6 leading-8 text-slate-300">
              {t.contactText}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {t.contactBadges.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
          <form className="hud-card rounded-3xl p-5 md:p-7" onSubmit={handleContactSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-300">
                {t.formName}
                <input
                  value={contactForm.name}
                  onChange={(event) => updateContactForm("name", event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                {t.formCompany}
                <input
                  value={contactForm.company}
                  onChange={(event) => updateContactForm("company", event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                {t.formContact}
                <input
                  value={contactForm.contact}
                  onChange={(event) => updateContactForm("contact", event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                {t.formScene}
                <select
                  value={contactForm.scene}
                  onChange={(event) => updateContactForm("scene", event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan"
                >
                  {t.sceneOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-slate-300 md:col-span-2">
                {t.formMessage}
                <textarea
                  rows={4}
                  value={contactForm.message}
                  onChange={(event) => updateContactForm("message", event.target.value)}
                  className="resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan"
                  placeholder={t.formPlaceholder}
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="scan-glow mt-5 w-full rounded-full bg-mint px-6 py-4 font-semibold text-ink transition hover:bg-cyan disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? t.submitting : t.submit}
            </button>
            <p className={`mt-4 text-center text-sm leading-6 ${formStatus ? "text-mint" : "text-slate-400"}`}>
              {formStatus || t.formDefault}
            </p>
          </form>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10 text-center text-sm text-slate-500">
        <p>{t.footer}</p>
        <p className="mt-3">{t.disclaimer}</p>
      </footer>
    </main>
  );
}
