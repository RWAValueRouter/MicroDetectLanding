"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Lang = "zh" | "en";

const navItemsByLang: Record<Lang, Array<{ label: string; href: string }>> = {
  zh: [
  { label: "技术优势", href: "#technology" },
  { label: "产品矩阵", href: "#products" },
  { label: "解决方案", href: "#architecture" },
  { label: "应用场景", href: "#applications" },
  { label: "联系咨询", href: "#contact" }
  ],
  en: [
    { label: "Technology", href: "#technology" },
    { label: "Products", href: "#products" },
    { label: "Solutions", href: "#architecture" },
    { label: "Applications", href: "#applications" },
    { label: "Contact", href: "#contact" }
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

const painPoints = [
  {
    title: "人工巡检风险高",
    text: "涉水、桥下、高边坡、高温腐蚀等场景危险，响应不及时。",
    tag: "现场风险"
  },
  {
    title: "接触式设备维护难",
    text: "易受粘附、堵塞、磨损、腐蚀影响，维护频次高。",
    tag: "高维护"
  },
  {
    title: "光学设备受环境限制",
    text: "雨雾、粉尘、弱光、黑夜、水面反光会影响稳定性。",
    tag: "弱适应"
  },
  {
    title: "单点设备难以闭环",
    text: "数据分散，难以及时形成趋势判断与风险预警。",
    tag: "难预警"
  }
];

const productLines = [
  {
    title: "水域监测",
    series: "毫米波雷达水流速计",
    models: "AR-FV100",
    problem: "河道、渠道、排水渠、桥涵断面水流速在线监测",
    customers: "水利、水务、防汛、灌区、交通水文",
    href: "#water-industrial"
  },
  {
    title: "工业过程监测",
    series: "工业雷达物/液位计",
    models: "AR-LS100 / AR-LS200 / AR-LS300 / AR-SL300",
    problem: "储罐、清水池、料仓、筒仓液位/物位/料位监测",
    customers: "化工、煤炭、水泥、电力、钢铁",
    href: "#water-industrial"
  },
  {
    title: "结构安全监测",
    series: "结构监测雷达",
    models: "SR-I100 / SR-M200 / SR-P300",
    problem: "桥梁、大坝、边坡、隧道、基坑形变与位移监测",
    customers: "交通、水利、城建、地灾防控、基础设施运维",
    href: "#structure"
  }
];

const selectorItems = [
  ["测河道/渠道/排水渠流速", "AR-FV100 水流速计"],
  ["普通液位/物位，预算敏感", "AR-LS100 标准监测型"],
  ["接入 PLC/DCS 或有防爆要求", "AR-LS200 防爆工业型"],
  ["高精度计量或进口替代", "AR-LS300 高精度计量型"],
  ["短距离结构位移监测", "SR-I100 近距离一体化雷达"],
  ["桥梁梁体/隧道局部形变", "SR-M200 中距离 MIMO 雷达"],
  ["大跨径桥梁/大坝/边坡远距离预警", "SR-P300 远距离相控阵雷达"]
];

const industrialProducts = [
  {
    name: "AR-FV100",
    title: "毫米波雷达水流速计",
    image: "/product/ar-fv100-flow-radar.jpeg",
    intro:
      "面向河道、渠道、排水渠、桥涵断面的非接触式水面流速在线监测设备，可安装在岸边、桥梁、支架、管渠井口或渠道边缘。",
    stats: ["0-20 m/s 流速范围", "±0.2 m/s 测量精度", "0.5-30 m 测量距离", "IP68 防护能力"],
    scenarios: ["山洪预警", "城市排水", "灌区计量", "桥涵水文"]
  },
  {
    name: "AR-LS100",
    title: "标准监测型物/液位计",
    image: "/product/ar-ls-industrial-level-radar.jpeg",
    intro:
      "适用于普通工业储罐、清水池和一般料仓，通信简单、成本可控、安装便捷。",
    stats: ["RS485 Modbus", "±5 mm", "普通环境", "低成本部署"],
    scenarios: ["清水池", "普通储罐", "一般料仓", "水务监测"]
  },
  {
    name: "AR-LS200",
    title: "防爆工业型物/液位计",
    image: "/product/ar-ls-industrial-level-radar.jpeg",
    intro:
      "面向煤矿、化工储罐、密闭排水管网等存在防爆要求的工业场景，支持 4-20mA + HART。",
    stats: ["4-20mA + HART", "可适配防爆版本", "IP67", "工业接口兼容"],
    scenarios: ["煤矿料仓", "化工储罐", "密闭管网", "工业园区"]
  },
  {
    name: "AR-LS300",
    title: "高精度计量型物/液位计",
    image: "/product/ar-ls-industrial-level-radar.jpeg",
    intro:
      "面向精细化工反应釜、高价值原料储罐和高精度料仓库存计量等关键场景，适合国产化替代项目。",
    stats: ["±1 mm 级测量", "全量程稳定", "关键工艺控制", "进口替代"],
    scenarios: ["精细化工", "关键储罐", "高精度料仓", "库存计量"]
  }
];

const structureProducts = [
  {
    name: "SR-I100",
    title: "近距离多参数一体化雷达",
    image: "/product/sr-i100-structure-radar.png",
    distance: "0-10 m",
    intro: "适用于桥梁伸缩缝、桥梁支座、建筑基坑、室内隧道、普通城市桥梁等短距离位移与形变监测。",
    capability: "实验室稳定条件下可达 0.05 mm 级位移识别能力"
  },
  {
    name: "SR-M200",
    title: "中距离 MIMO 监测雷达",
    image: "/product/sr-i100-structure-radar.png",
    distance: "10-60 m",
    intro: "面向桥梁梁体挠度、城市高架桥结构位移、工业厂区构筑物形变和隧道局部变形的长期在线监测。",
    capability: "实验室稳定条件下可达 0.03 mm 级位移识别能力"
  },
  {
    name: "SR-P300",
    title: "远距离相控阵雷达",
    image: "/product/sr-p300-phased-array-radar.png",
    distance: "60-300 m",
    intro: "适用于大跨径桥梁、水库大坝、高危边坡、重点文物桥梁和超长隧道等关键结构的长期在线安全预警。",
    capability: "实验室稳定条件下可达 0.01 mm 级位移识别能力"
  }
];

const architectureLayers = [
  ["感知层", "水流速计 / 液位雷达 / 工业物液位计 / 结构监测雷达"],
  ["传输层", "RS485 / HART / 4G/5G / LoRa / NB-IoT"],
  ["平台层", "数据采集 / 趋势分析 / 阈值管理 / 报表输出 / 设备管理"],
  ["应用层", "防汛预警 / 桥梁安全 / 工业计量 / 边坡大坝 / 应急指挥"]
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
  }
];

const values = [
  ["降成本", "减少人工巡检与现场维护，降低高风险场景作业成本。"],
  ["提效率", "自动采集、多站点集中管理，支持历史曲线与报表输出。"],
  ["强安全", "提前识别流速突增、液位超限和结构位移异常。"],
  ["促国产化", "核心硬件国产化，算法自主研发，供货与服务响应更可控。"],
  ["易落地", "设备、供电、通信、平台与告警可成套配置。"]
];

const painPointsEn = [
  {
    title: "Risky manual inspection",
    text: "Waterways, bridge undersides, steep slopes, heat and corrosive sites make manual inspection slow and unsafe.",
    tag: "Field Risk"
  },
  {
    title: "High maintenance sensors",
    text: "Contact sensors are prone to adhesion, blockage, wear and corrosion in harsh operating environments.",
    tag: "Maintenance"
  },
  {
    title: "Optical systems are limited",
    text: "Fog, dust, low light, night operation and water reflections can reduce measurement stability.",
    tag: "Low Robustness"
  },
  {
    title: "Disconnected single points",
    text: "Scattered data makes it harder to identify trends and trigger timely early warnings.",
    tag: "Weak Warning"
  }
];

const productLinesEn = [
  {
    title: "Water Monitoring",
    series: "Millimeter-wave radar flow velocity meter",
    models: "AR-FV100",
    problem: "Online flow velocity monitoring for rivers, canals, drainage channels and bridge culverts",
    customers: "Water resources, utilities, flood control, irrigation districts, transport hydrology",
    href: "#water-industrial"
  },
  {
    title: "Industrial Process Monitoring",
    series: "Industrial radar level instruments",
    models: "AR-LS100 / AR-LS200 / AR-LS300 / AR-SL300",
    problem: "Liquid level, material level and inventory monitoring for tanks, reservoirs, silos and bins",
    customers: "Chemical, coal, cement, power, steel and process industries",
    href: "#water-industrial"
  },
  {
    title: "Structural Safety Monitoring",
    series: "Structural monitoring radar",
    models: "SR-I100 / SR-M200 / SR-P300",
    problem: "Displacement and deformation monitoring for bridges, dams, slopes, tunnels and foundation pits",
    customers: "Transport, water infrastructure, urban assets, geohazard prevention, infrastructure O&M",
    href: "#structure"
  }
];

const selectorItemsEn = [
  ["River, canal or drainage flow velocity", "AR-FV100 Flow Radar"],
  ["Standard liquid/material level monitoring", "AR-LS100 Standard Level Radar"],
  ["PLC/DCS integration or explosion-proof sites", "AR-LS200 Industrial Explosion-proof Radar"],
  ["High-accuracy metering or import replacement", "AR-LS300 High-accuracy Metering Radar"],
  ["Short-range structural displacement", "SR-I100 Integrated Short-range Radar"],
  ["Bridge girder or tunnel local deformation", "SR-M200 Mid-range MIMO Radar"],
  ["Long-span bridges, dams or slope early warning", "SR-P300 Long-range Phased-array Radar"]
];

const industrialProductsEn = [
  {
    name: "AR-FV100",
    title: "Millimeter-wave Radar Flow Meter",
    image: "/product/ar-fv100-flow-radar.jpeg",
    intro:
      "A non-contact surface velocity monitoring device for rivers, canals, drainage channels and bridge culverts. It can be installed on banks, bridges, brackets, shaft openings or canal edges.",
    stats: ["0-20 m/s velocity range", "±0.2 m/s accuracy", "0.5-30 m range", "IP68 protection"],
    scenarios: ["Flash flood warning", "Urban drainage", "Irrigation metering", "Bridge hydrology"]
  },
  {
    name: "AR-LS100",
    title: "Standard Level Radar",
    image: "/product/ar-ls-industrial-level-radar.jpeg",
    intro:
      "Designed for standard tanks, clean-water reservoirs and general silos, with simple communication, controlled cost and easy installation.",
    stats: ["RS485 Modbus", "±5 mm", "Standard sites", "Cost-effective deployment"],
    scenarios: ["Clean-water tanks", "Standard tanks", "General silos", "Utility monitoring"]
  },
  {
    name: "AR-LS200",
    title: "Industrial Explosion-proof Level Radar",
    image: "/product/ar-ls-industrial-level-radar.jpeg",
    intro:
      "For coal, chemical tanks, enclosed drainage networks and other industrial sites with explosion-proof requirements. Supports 4-20mA + HART.",
    stats: ["4-20mA + HART", "Explosion-proof option", "IP67", "Industrial interfaces"],
    scenarios: ["Coal silos", "Chemical tanks", "Enclosed networks", "Industrial parks"]
  },
  {
    name: "AR-LS300",
    title: "High-accuracy Metering Level Radar",
    image: "/product/ar-ls-industrial-level-radar.jpeg",
    intro:
      "For fine-chemical reactors, high-value raw material tanks and high-accuracy inventory metering scenarios requiring stable performance.",
    stats: ["±1 mm level measurement", "Stable full-range output", "Process control", "Import replacement"],
    scenarios: ["Fine chemicals", "Critical tanks", "High-accuracy silos", "Inventory metering"]
  }
];

const structureProductsEn = [
  {
    name: "SR-I100",
    title: "Integrated Short-range Radar",
    image: "/product/sr-i100-structure-radar.png",
    distance: "0-10 m",
    intro: "For expansion joints, bridge bearings, foundation pits, indoor tunnels and short-range structural displacement monitoring.",
    capability: "Laboratory stable-condition displacement recognition down to the 0.05 mm level"
  },
  {
    name: "SR-M200",
    title: "Mid-range MIMO Monitoring Radar",
    image: "/product/sr-i100-structure-radar.png",
    distance: "10-60 m",
    intro: "For bridge girder deflection, urban viaduct displacement, industrial structures and local tunnel deformation monitoring.",
    capability: "Laboratory stable-condition displacement recognition down to the 0.03 mm level"
  },
  {
    name: "SR-P300",
    title: "Long-range Phased-array Radar",
    image: "/product/sr-p300-phased-array-radar.png",
    distance: "60-300 m",
    intro: "For long-span bridges, dams, high-risk slopes, heritage bridges and long tunnels requiring long-term safety early warning.",
    capability: "Laboratory stable-condition displacement recognition down to the 0.01 mm level"
  }
];

const architectureLayersEn = [
  ["Sensing Layer", "Flow radar / Level radar / Industrial level radar / Structural monitoring radar"],
  ["Transmission Layer", "RS485 / HART / 4G/5G / LoRa / NB-IoT"],
  ["Platform Layer", "Data acquisition / Trend analysis / Threshold management / Reports / Device management"],
  ["Application Layer", "Flood warning / Bridge safety / Industrial metering / Slopes and dams / Emergency command"]
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
  }
];

const valuesEn = [
  ["Lower Cost", "Reduce manual inspection and site maintenance in high-risk environments."],
  ["Higher Efficiency", "Automated acquisition, multi-site management, trend curves and report output."],
  ["Stronger Safety", "Identify flow surges, level exceedance and structural displacement anomalies earlier."],
  ["Domestic Control", "Localized hardware and self-developed algorithms improve supply and service responsiveness."],
  ["Easy Deployment", "Devices, power, communication, platform and alarms can be configured as one solution."]
];

const quickConditionsByLang: Record<Lang, string[]> = {
  zh: ["监测对象", "安装距离与视线", "目标反射条件", "复杂环境", "通信与供电", "平台对接"],
  en: ["Monitoring target", "Distance and line of sight", "Target reflection", "Harsh environment", "Power and communication", "Platform integration"]
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
    appsTitle: "面向真实现场的成套应用方案",
    appsText: "覆盖水利防汛、工业计量、桥梁养护和地灾预警等关键场景。",
    appLabels: ["部署位置", "监测内容", "推荐产品", "交付组合"],
    valueTitle: "从单点采集，到主动预警",
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
    appsTitle: "Turnkey solutions for real operating sites",
    appsText: "For flood warning, industrial metering, bridge maintenance and geohazard prevention.",
    appLabels: ["Deployment", "Monitoring", "Recommended Product", "Delivery Package"],
    valueTitle: "From data capture to proactive warning",
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
      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-cyan/20 blur-3xl" />
      <div className="absolute -bottom-20 right-6 h-52 w-52 rounded-full bg-mint/20 blur-3xl" />
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

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [industrialIndex, setIndustrialIndex] = useState(0);
  const [structureIndex, setStructureIndex] = useState(2);
  const [applicationIndex, setApplicationIndex] = useState(0);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    company: "",
    contact: "",
    scene: copy.zh.sceneOptions[0],
    message: ""
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    if (urlLang === "en" || urlLang === "zh") {
      setLang(urlLang);
      setContactForm((current) => ({
        ...current,
        scene: copy[urlLang].sceneOptions[0]
      }));
    }
  }, []);

  const t = copy[lang];
  const navItems = navItemsByLang[lang];
  const localizedPainPoints = lang === "zh" ? painPoints : painPointsEn;
  const localizedProductLines = lang === "zh" ? productLines : productLinesEn;
  const localizedSelectorItems = lang === "zh" ? selectorItems : selectorItemsEn;
  const localizedIndustrialProducts = lang === "zh" ? industrialProducts : industrialProductsEn;
  const localizedStructureProducts = lang === "zh" ? structureProducts : structureProductsEn;
  const localizedArchitectureLayers = lang === "zh" ? architectureLayers : architectureLayersEn;
  const localizedApplications = lang === "zh" ? applications : applicationsEn;
  const localizedValues = lang === "zh" ? values : valuesEn;
  const textWrapClass = lang === "zh" ? "cjk-wrap" : "";

  const currentIndustrial = localizedIndustrialProducts[industrialIndex];
  const currentStructure = localizedStructureProducts[structureIndex];
  const currentApplication = localizedApplications[applicationIndex];

  const quickConditions = useMemo(() => quickConditionsByLang[lang], [lang]);

  function switchLanguage(nextLang: Lang) {
    setLang(nextLang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLang);
    window.history.replaceState(null, "", url.toString());
    setContactForm((current) => ({
      ...current,
      scene: copy[nextLang].sceneOptions[0]
    }));
    setFormStatus("");
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

      <section className="relative z-10 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={t.painEyebrow}
            title={t.painTitle}
            text={t.painText}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {localizedPainPoints.map((point) => (
              <article key={point.title} className="hud-card scan-glow rounded-3xl p-6">
                <span className="rounded-full bg-amber/10 px-3 py-1 text-sm text-amber">{point.tag}</span>
                <h3 className="mt-6 text-xl font-semibold text-white">{point.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{point.text}</p>
                <div className="mt-8 h-24 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(109,40,217,0.12),transparent_45%),linear-gradient(45deg,transparent_42%,rgba(139,92,246,0.18)_43%,transparent_47%)]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="relative z-10 px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="Technology"
              title={t.techTitle}
              text={t.techText}
            />
            <WaveCard title={t.liveTrend} status={t.allDay} />
          </div>
          <div className="hud-card rounded-3xl p-5 md:p-7">
            <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-2 text-sm">
              {t.compareHeads.map((head) => (
                <div key={head} className="rounded-2xl bg-white/5 p-3 font-semibold text-white">
                  {head}
                </div>
              ))}
              {t.compareRows.map((row) =>
                row.map((cell, index) => (
                  <div
                    key={`${row[0]}-${cell}`}
                    className={`rounded-2xl border border-white/10 p-3 ${
                      index === 1 ? "bg-cyan/10 text-cyan" : "bg-black/20 text-slate-300"
                    }`}
                  >
                    {cell}
                  </div>
                ))
              )}
            </div>
          </div>
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
              <a key={line.title} href={line.href} className="hud-card scan-glow group rounded-3xl p-7 transition hover:-translate-y-1">
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

      <section id="water-industrial" className="relative z-10 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Water & Industrial"
            title={t.waterTitle}
            text={t.waterText}
          />
          <div className="hud-card grid gap-8 rounded-[32px] p-5 md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-white/10 bg-black/25 p-6">
              <div className="relative mx-auto flex h-80 max-w-sm items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-cyan/10 blur-3xl" />
                <Image
                  src={currentIndustrial.image}
                  alt={currentIndustrial.title}
                  width={620}
                  height={649}
                  className="relative max-h-72 w-auto object-contain drop-shadow-[0_24px_70px_rgba(109,40,217,0.16)]"
                />
              </div>
            </div>
            <div>
              <div className="mb-6 flex flex-wrap gap-3">
                {localizedIndustrialProducts.map((product, index) => (
                  <button
                    key={product.name}
                    onClick={() => setIndustrialIndex(index)}
                    className={`rounded-full px-4 py-2 font-mono text-sm transition ${
                      industrialIndex === index
                        ? "bg-cyan text-ink"
                        : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan/50 hover:text-cyan"
                    }`}
                  >
                    {product.name}
                  </button>
                ))}
              </div>
              <p className="font-mono text-sm uppercase tracking-[0.24em] text-mint">{currentIndustrial.name}</p>
              <h3 className="mt-3 text-3xl font-semibold">{currentIndustrial.title}</h3>
              <p className="mt-5 leading-8 text-slate-300">{currentIndustrial.intro}</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {currentIndustrial.stats.map((stat) => (
                  <div key={stat} className="rounded-2xl border border-cyan/15 bg-cyan/10 p-4 font-mono text-sm text-cyan">
                    {stat}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {currentIndustrial.scenarios.map((scenario) => (
                  <span key={scenario} className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-300">
                    {scenario}
                  </span>
                ))}
              </div>
              <p className="mt-6 rounded-2xl border border-amber/20 bg-amber/10 p-4 text-sm leading-6 text-amber">
                {t.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="structure" className="relative z-10 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Structure Safety"
            title={t.structureTitle}
            text={t.structureText}
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {localizedStructureProducts.map((product, index) => (
              <button
                key={product.name}
                onClick={() => setStructureIndex(index)}
                className={`hud-card rounded-3xl p-6 text-left transition hover:-translate-y-1 ${
                  structureIndex === index ? "border-cyan/60 shadow-glow" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-cyan">{product.name}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{product.title}</h3>
                  </div>
                  <span className="rounded-full bg-mint/10 px-3 py-1 font-mono text-sm text-mint">{product.distance}</span>
                </div>
                <p className="mt-5 leading-7 text-slate-400">{product.intro}</p>
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-8 rounded-[32px] border border-white/10 bg-white/[0.03] p-5 md:p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex items-center justify-center rounded-3xl bg-black/25 p-8">
              <Image
                src={currentStructure.image}
                alt={currentStructure.title}
                width={653}
                height={583}
                className="max-h-80 w-auto object-contain drop-shadow-[0_28px_70px_rgba(109,40,217,0.16)]"
              />
            </div>
            <div className="self-center">
              <p className="font-mono text-sm uppercase tracking-[0.24em] text-cyan">{currentStructure.name}</p>
              <h3 className="mt-3 text-4xl font-semibold">{currentStructure.title}</h3>
              <p className="mt-5 leading-8 text-slate-300">{currentStructure.intro}</p>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {t.structureEffects.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-2xl border border-amber/20 bg-amber/10 p-4 text-sm leading-6 text-amber">
                {currentStructure.capability}
                {lang === "zh" ? "；" : "; "}
                {t.structureDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="relative z-10 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Solution Architecture"
            title={t.architectureTitle}
            text={t.architectureText}
          />
          <div className="grid gap-5 md:grid-cols-4">
            {localizedArchitectureLayers.map(([layer, desc], index) => (
              <div key={layer} className="hud-card relative rounded-3xl p-6">
                <span className="font-mono text-sm text-cyan">0{index + 1}</span>
                <h3 className="mt-4 text-2xl font-semibold">{layer}</h3>
                <p className="mt-4 leading-7 text-slate-400">{desc}</p>
                {index < architectureLayers.length - 1 ? (
                  <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-cyan/50 md:block" />
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[32px] border border-cyan/20 bg-cyan/10 p-6 text-center text-lg font-semibold text-cyan">
            {t.architectureSummary}
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
            <div className="hud-card rounded-[32px] p-6 md:p-8">
              <p className="font-mono text-sm uppercase tracking-[0.24em] text-mint">Scenario</p>
              <h3 className="mt-3 text-3xl font-semibold">{currentApplication.name}</h3>
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
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Customer Value"
            title={t.valueTitle}
          />
          <div className="grid gap-4 md:grid-cols-5">
            {localizedValues.map(([title, text]) => (
              <div key={title} className="hud-card rounded-3xl p-6">
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[36px] border border-cyan/20 bg-[linear-gradient(135deg,rgba(109,40,217,0.14),rgba(167,139,250,0.12),rgba(255,255,255,0.9))] p-6 shadow-glow md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
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
