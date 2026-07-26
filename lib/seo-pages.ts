import type { Lang } from "../app/seo";

export type SeoPageKind = "products" | "solutions";

export type SeoPage = {
  kind: SeoPageKind;
  slug: string;
  image: string;
  gallery?: string[];
  productModels: string[];
  zh: SeoPageContent;
  en: SeoPageContent;
};

export type SeoPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  badge: string;
  intro: string;
  bullets: string[];
  sections: Array<{
    title: string;
    body: string;
    items?: string[];
  }>;
  specs: Array<{
    label: string;
    value: string;
  }>;
  applications: string[];
  ctaTitle: string;
  ctaText: string;
};

export const seoPages: SeoPage[] = [
  {
    kind: "products",
    slug: "radar-flow-meter",
    image: "/product/ar-fv100-flow-radar.jpeg",
    gallery: ["/brochure/ar-fv100-device.png", "/brochure/ar-fv100-installation.png", "/brochure/drainage-installation-wide.jpeg"],
    productModels: ["AR-FV100"],
    zh: {
      eyebrow: "产品页面",
      title: "毫米波雷达水流速计",
      description:
        "AR-FV100 毫米波雷达水流速计面向河道、渠道、排水渠和桥涵断面，提供非接触式水面流速在线监测能力。",
      keywords: ["毫米波雷达水流速计", "水流速在线监测", "非接触式流速计", "AR-FV100", "山洪预警"],
      badge: "AR-FV100",
      intro:
        "AR-FV100 通过毫米波回波中的运动信息解算水面流速，可安装在岸边、桥梁、支架、管渠井口或渠道边缘，适合长期在线运行和多站点集中管理。",
      bullets: ["非接触式测量", "适合河道与渠道断面", "支持在线监测与平台预警", "可配套太阳能与无线通信"],
      sections: [
        {
          title: "适用场景",
          body: "适用于山洪预警、城市排水、灌区计量、桥涵水文和小流域监测等需要连续流速数据的场景。",
          items: ["山区河道", "渠道与排水渠", "桥涵断面", "灌区计量节点"]
        },
        {
          title: "工程部署方式",
          body: "设备无需接触水面，可根据现场条件安装在岸边立杆、桥梁支架、管渠井口或渠道边缘，并与液位雷达、供电通信模块组成监测站点。"
        },
        {
          title: "数据与预警",
          body: "系统可持续采集流速变化和异常突增趋势，并通过 4G/5G、LoRa 或 NB-IoT 接入水利、防汛或城市排水平台。"
        },
        {
          title: "水位流速一体化监测",
          body: "AR-FV100 可与水位监测设备、太阳能供电、无线通信和平台预警组合部署，适合河道、渠道、桥涵断面和城市内涝点的无人值守监测。"
        }
      ],
      specs: [
        { label: "推荐型号", value: "AR-FV100" },
        { label: "监测对象", value: "水面流速、流速趋势、异常突增" },
        { label: "雷达频段", value: "24 GHz，具体以项目配置为准" },
        { label: "流速范围与精度", value: "0-20 m/s；±0.2 m/s，具体以现场工况为准" },
        { label: "测量距离", value: "0.5-30 m" },
        { label: "接口与供电", value: "RS485 / RS232 / 4-20mA；7-28 V DC" },
        { label: "防护与交付", value: "IP68；雷达终端 + 供电 + 通信 + 平台预警" }
      ],
      applications: ["山洪预警", "城市排水", "灌区计量", "桥涵水文"],
      ctaTitle: "需要评估水流速监测方案？",
      ctaText: "提供断面位置、安装高度、通信供电条件和平台接口要求，析微探物可协助完成产品选型。"
    },
    en: {
      eyebrow: "Product Page",
      title: "Millimeter-wave Radar Flow Meter",
      description:
        "The AR-FV100 radar flow meter provides non-contact surface velocity monitoring for rivers, canals, drainage channels and bridge culverts.",
      keywords: ["radar flow meter", "mmWave flow monitoring", "non-contact flow meter", "AR-FV100", "flood warning"],
      badge: "AR-FV100",
      intro:
        "AR-FV100 estimates surface velocity from millimeter-wave radar echoes and supports long-term online monitoring from banks, bridge brackets, shaft openings or canal edges.",
      bullets: ["Non-contact measurement", "For river and canal sections", "Online monitoring and platform warning", "Compatible with solar power and wireless communication"],
      sections: [
        {
          title: "Use Cases",
          body: "Designed for flash flood warning, urban drainage, irrigation metering, bridge hydrology and small watershed monitoring.",
          items: ["Mountain streams", "Canals and drainage channels", "Bridge culverts", "Irrigation metering points"]
        },
        {
          title: "Deployment",
          body: "The device does not contact the water surface and can be mounted on poles, bridge supports, shaft openings or canal-side brackets with optional level radar and communication modules."
        },
        {
          title: "Data and Warning",
          body: "Continuous velocity trends and abnormal surges can be transmitted through 4G/5G, LoRa or NB-IoT to flood control, water resources or drainage platforms."
        },
        {
          title: "Integrated Level and Flow Monitoring",
          body: "AR-FV100 can be deployed with level sensing, solar power, wireless communication and platform alerts for unattended monitoring at rivers, canals, culverts and urban flood-risk sites."
        }
      ],
      specs: [
        { label: "Recommended Model", value: "AR-FV100" },
        { label: "Monitoring Target", value: "Surface velocity, velocity trend and abnormal surge" },
        { label: "Radar Band", value: "24 GHz, subject to project configuration" },
        { label: "Velocity Range and Accuracy", value: "0-20 m/s; ±0.2 m/s, subject to site conditions" },
        { label: "Measurement Distance", value: "0.5-30 m" },
        { label: "Interfaces and Power", value: "RS485 / RS232 / 4-20mA; 7-28 V DC" },
        { label: "Protection and Delivery", value: "IP68; radar terminal + power + communication + platform warning" }
      ],
      applications: ["Flash flood warning", "Urban drainage", "Irrigation metering", "Bridge hydrology"],
      ctaTitle: "Need a flow monitoring assessment?",
      ctaText: "Share the section location, mounting height, power and communication conditions, and platform interface requirements for product selection."
    }
  },
  {
    kind: "products",
    slug: "radar-level-meter",
    image: "/product/ar-ls-industrial-level-radar.jpeg",
    gallery: ["/brochure/industrial-level-radar-device.png", "/brochure/industrial-level-installation.png"],
    productModels: ["AR-LS100", "AR-LS200", "AR-LS300", "AR-SL300"],
    zh: {
      eyebrow: "产品页面",
      title: "雷达液位计 / 物位计",
      description:
        "AR-LS 系列工业雷达液位计与物位计面向储罐、清水池、料仓和筒仓，支持非接触式液位、物位和料位在线监测。",
      keywords: ["雷达液位计", "雷达物位计", "工业物位监测", "储罐液位监测", "料仓料位监测"],
      badge: "AR-LS 系列",
      intro:
        "工业雷达物/液位计可对液体、粉料、颗粒料和块状物料进行非接触式高度测量，并将结果传输至 PLC、DCS、工业网关或远程管理平台。",
      bullets: ["适合液体、粉料和颗粒料", "支持工业接口接入", "可按场景选择标准、防爆或高精度版本", "适合国产化替代项目"],
      sections: [
        {
          title: "产品选型",
          body: "根据现场安全等级、精度要求、通信接口和预算，可以选择 AR-LS100、AR-LS200、AR-LS300 或 AR-SL300。",
          items: ["AR-LS100：普通储罐、清水池、一般料仓", "AR-LS200：煤矿、化工储罐、密闭管网", "AR-LS300：精细化工、关键储罐、高精度料仓", "AR-SL300：煤仓、水泥库、焦仓、粉料仓"]
        },
        {
          title: "工业系统接入",
          body: "支持 RS485 Modbus、4-20mA + HART 等工业接口，可接入 PLC、DCS、工业网关和远程平台。"
        },
        {
          title: "长期运行价值",
          body: "非接触式测量减少探头磨损、粘附和腐蚀问题，适合封闭、潮湿、粉尘和腐蚀性环境中的长期监测。"
        }
      ],
      specs: [
        { label: "推荐型号", value: "AR-LS100 / AR-LS200 / AR-LS300 / AR-SL300" },
        { label: "监测对象", value: "液位、物位、料位、库存变化" },
        { label: "接口能力", value: "RS485 Modbus、4-20mA + HART 等" },
        { label: "典型场景", value: "储罐、清水池、煤仓、水泥库、粉料仓" }
      ],
      applications: ["化工储罐", "煤仓料位", "水泥库", "清水池", "粉料仓"],
      ctaTitle: "需要匹配液位/物位计型号？",
      ctaText: "告诉我们介质类型、量程、接口、防爆要求和安装方式，我们可以协助判断推荐型号。"
    },
    en: {
      eyebrow: "Product Page",
      title: "Radar Level Meter / Material Level Radar",
      description:
        "The AR-LS industrial radar level series supports non-contact liquid, material and inventory level monitoring for tanks, reservoirs, silos and bins.",
      keywords: ["radar level meter", "material level radar", "industrial level monitoring", "tank level monitoring", "silo level radar"],
      badge: "AR-LS Series",
      intro:
        "Industrial radar level instruments measure liquids, powders, granules and bulk solids without contact and transmit results to PLC, DCS, industrial gateways or remote platforms.",
      bullets: ["For liquids, powders and granules", "Industrial interface integration", "Standard, explosion-proof and high-accuracy options", "Suitable for import replacement projects"],
      sections: [
        {
          title: "Product Selection",
          body: "Select AR-LS100, AR-LS200, AR-LS300 or AR-SL300 based on safety rating, accuracy requirement, interface and budget.",
          items: ["AR-LS100: standard tanks, reservoirs and general silos", "AR-LS200: coal, chemical tanks and enclosed networks", "AR-LS300: fine chemicals, critical tanks and high-accuracy silos", "AR-SL300: coal silos, cement warehouses and powder bins"]
        },
        {
          title: "Industrial Integration",
          body: "Supports interfaces such as RS485 Modbus and 4-20mA + HART for integration with PLC, DCS, gateways and remote management platforms."
        },
        {
          title: "Long-term Value",
          body: "Non-contact sensing reduces wear, adhesion and corrosion issues, making it suitable for enclosed, humid, dusty or corrosive operating environments."
        }
      ],
      specs: [
        { label: "Recommended Models", value: "AR-LS100 / AR-LS200 / AR-LS300 / AR-SL300" },
        { label: "Monitoring Target", value: "Liquid level, material level and inventory change" },
        { label: "Interfaces", value: "RS485 Modbus, 4-20mA + HART and more" },
        { label: "Typical Sites", value: "Tanks, reservoirs, coal silos, cement warehouses and powder bins" }
      ],
      applications: ["Chemical tanks", "Coal silos", "Cement warehouses", "Clean-water reservoirs", "Powder bins"],
      ctaTitle: "Need help selecting a level radar?",
      ctaText: "Share the medium, range, interface, explosion-proof requirement and mounting method for model recommendation."
    }
  },
  {
    kind: "solutions",
    slug: "bridge-monitoring",
    image: "/hero/monitoring-bridges.png",
    gallery: ["/brochure/bridge-monitoring-principle.png", "/brochure/bridge-monitoring-point-layout.jpeg", "/brochure/bridge-monitoring-platform.png", "/brochure/bridge-radar-installation.jpeg", "/brochure/bridge-radar-field-installation.jpeg"],
    productModels: ["SR-I100", "SR-M200", "SR-P300"],
    zh: {
      eyebrow: "解决方案",
      title: "桥梁结构健康监测",
      description:
        "基于毫米波雷达的桥梁结构健康监测方案，面向梁体挠度、支座位移、伸缩缝变化和长期形变趋势的非接触式在线监测。",
      keywords: ["桥梁结构健康监测", "桥梁挠度监测", "桥梁位移监测", "结构监测雷达", "SR-P300"],
      badge: "结构安全监测",
      intro:
        "结构监测雷达适用于桥下、岸边、独立支架、跨中观测点以及伸缩缝与支座附近，可实现桥梁关键部位的长期在线形变监测。",
      bullets: ["非接触式位移与形变监测", "覆盖近距、中距和远距场景", "支持长期趋势曲线", "适合多桥梁集中管理"],
      sections: [
        {
          title: "监测内容",
          body: "可持续采集梁体挠度、支座位移、伸缩缝变化、长期形变趋势和异常突变。",
          items: ["梁体挠度", "支座位移", "伸缩缝变化", "异常突变"]
        },
        {
          title: "推荐产品组合",
          body: "短距离点位可选 SR-I100，中距离梁体或隧道局部形变可选 SR-M200，大跨径桥梁和远距离观测可选 SR-P300。"
        },
        {
          title: "交付闭环",
          body: "结构监测雷达可结合独立支撑结构、无线通信、云平台、阈值预警和报表输出，形成长期运维闭环。"
        }
      ],
      specs: [
        { label: "推荐产品", value: "SR-I100 / SR-M200 / SR-P300" },
        { label: "部署位置", value: "桥下、岸边、跨中观测点、支座与伸缩缝附近" },
        { label: "监测指标", value: "挠度、位移、形变趋势、异常突变" },
        { label: "管理方式", value: "云平台、多项目集中管理、阈值预警" }
      ],
      applications: ["公路桥梁", "城市高架桥", "大跨径桥梁", "重点文物桥梁"],
      ctaTitle: "需要桥梁监测方案？",
      ctaText: "提供桥型、跨径、监测点位、安装距离和平台要求，析微探物可协助设计雷达监测方案。"
    },
    en: {
      eyebrow: "Solution",
      title: "Bridge Structural Health Monitoring",
      description:
        "A mmWave radar-based bridge monitoring solution for non-contact online sensing of girder deflection, bearing displacement, expansion joint change and deformation trends.",
      keywords: ["bridge structural health monitoring", "bridge deflection monitoring", "bridge displacement monitoring", "structural monitoring radar", "SR-P300"],
      badge: "Structural Safety",
      intro:
        "Structural monitoring radar can be deployed under bridges, along banks, on independent supports, at mid-span points and near expansion joints or bearings for long-term deformation monitoring.",
      bullets: ["Non-contact displacement and deformation monitoring", "Near, mid and long-range coverage", "Long-term trend curves", "Multi-bridge centralized management"],
      sections: [
        {
          title: "Monitoring Targets",
          body: "Continuously monitor girder deflection, bearing displacement, expansion joint change, long-term trends and sudden anomalies.",
          items: ["Girder deflection", "Bearing displacement", "Expansion joint change", "Sudden anomaly"]
        },
        {
          title: "Recommended Product Mix",
          body: "Use SR-I100 for short-range points, SR-M200 for mid-range girder or local tunnel deformation, and SR-P300 for long-span bridges and long-distance observation."
        },
        {
          title: "Delivery Loop",
          body: "Radar, independent support, wireless communication, cloud platform, threshold warning and reports form a long-term O&M loop."
        }
      ],
      specs: [
        { label: "Recommended Products", value: "SR-I100 / SR-M200 / SR-P300" },
        { label: "Deployment", value: "Bridge underside, bankside, mid-span, bearings and expansion joints" },
        { label: "Indicators", value: "Deflection, displacement, deformation trend and sudden anomaly" },
        { label: "Management", value: "Cloud platform, multi-project management and threshold warning" }
      ],
      applications: ["Highway bridges", "Urban viaducts", "Long-span bridges", "Heritage bridges"],
      ctaTitle: "Need a bridge monitoring solution?",
      ctaText: "Share bridge type, span, monitoring points, observation distance and platform requirements for solution design."
    }
  },
  {
    kind: "solutions",
    slug: "transport-infrastructure-sensing",
    image: "/cases/tunnel-field-installation.jpeg",
    gallery: ["/brochure/tunnel-radar-installation.jpeg", "/brochure/tunnel-field-survey.jpeg"],
    productModels: ["SR-M200", "SR-P300"],
    zh: {
      eyebrow: "解决方案",
      title: "交通基础设施全天候感知",
      description: "面向道路、隧道和桥梁运行环境的毫米波雷达感知方案，可对目标距离、速度、方向和异常变化进行全天候在线感知，并可联动视频与交通平台。",
      keywords: ["交通毫米波雷达", "道路交通感知", "隧道监测", "桥梁运行监测", "雷视融合"],
      badge: "交通基础设施",
      intro: "毫米波雷达可作为交通基础设施现场感知单元，与边缘计算、视频复核、通信系统和交通管理平台协同工作，提升复杂环境下的事件识别与响应效率。",
      bullets: ["全天候目标感知", "距离、速度与方向识别", "可选配边缘计算和视频复核", "支持交通管理平台接入"],
      sections: [
        { title: "适用位置", body: "适用于道路、隧道、桥梁和交通运行关键节点等需要长期在线感知的现场。", items: ["道路运行节点", "隧道出入口", "桥梁关键区域", "交通事件高发点"] },
        { title: "雷视与边缘协同", body: "雷达可持续输出目标距离、速度、方向和异常变化，视频模块用于现场复核，边缘计算单元可按规则完成本地处理与联动。" },
        { title: "系统接入", body: "可通过有线或无线通信接入客户已有交通管理平台、物联网平台或第三方业务系统，降低现有系统改造成本。" }
      ],
      specs: [
        { label: "推荐产品", value: "SR-M200 / SR-P300，按观测距离与目标数量选择" },
        { label: "监测对象", value: "目标距离、速度、方向、异常变化" },
        { label: "系统组合", value: "雷达 + 边缘计算 + 视频复核 + 通信 + 平台" },
        { label: "平台接入", value: "交通管理平台、物联网平台或第三方业务系统" }
      ],
      applications: ["道路运行监测", "隧道事件感知", "桥梁运行辅助监测", "交通应急联动"],
      ctaTitle: "需要交通基础设施感知方案？",
      ctaText: "提供现场距离、目标类型、供电通信条件和现有平台接口，我们可以协助完成设备与系统配置。"
    },
    en: {
      eyebrow: "Solution",
      title: "All-weather Transport Infrastructure Sensing",
      description: "A mmWave radar sensing solution for roads, tunnels and bridges that detects target range, speed, direction and abnormal changes in all weather, with optional video and traffic-platform integration.",
      keywords: ["traffic mmwave radar", "road sensing", "tunnel monitoring", "bridge operation monitoring", "radar video fusion"],
      badge: "Transport Infrastructure",
      intro: "mmWave radar can act as a field sensing unit for transport infrastructure, working with edge computing, video review, communications and traffic management platforms to improve event recognition and response in complex environments.",
      bullets: ["All-weather target sensing", "Range, speed and direction recognition", "Optional edge computing and video review", "Traffic platform integration"],
      sections: [
        { title: "Deployment Sites", body: "For roads, tunnels, bridges and other transport-operation nodes that require long-term online sensing.", items: ["Road operation nodes", "Tunnel portals", "Bridge key areas", "High-incident zones"] },
        { title: "Radar, Video and Edge", body: "Radar continuously outputs target range, speed, direction and abnormal changes. Video supports field review, while edge units can process local rules and integrations." },
        { title: "System Integration", body: "Wired or wireless communication can connect to existing traffic management platforms, IoT platforms or third-party systems, reducing integration effort." }
      ],
      specs: [
        { label: "Recommended Products", value: "SR-M200 / SR-P300, selected by observation range and target count" },
        { label: "Monitoring", value: "Target range, speed, direction and abnormal change" },
        { label: "System Package", value: "Radar + edge computing + video review + communication + platform" },
        { label: "Integration", value: "Traffic management, IoT or third-party business platforms" }
      ],
      applications: ["Road operation monitoring", "Tunnel event sensing", "Bridge operation support", "Traffic emergency linkage"],
      ctaTitle: "Need a transport sensing solution?",
      ctaText: "Share the observation distance, target types, power and communication conditions, and platform interfaces for system configuration."
    }
  },
  {
    kind: "solutions",
    slug: "flood-warning",
    image: "/hero/liquid-level.png",
    gallery: ["/brochure/ar-fv100-installation.png", "/brochure/drainage-installation-wide.jpeg", "/brochure/drainage-installation-portrait.jpeg"],
    productModels: ["AR-FV100"],
    zh: {
      eyebrow: "解决方案",
      title: "山洪预警 / 水利水文监测",
      description:
        "面向山区河道、小流域、桥涵断面和排水渠关键节点的水利水文监测方案，支持水流速、液位变化和异常突增预警。",
      keywords: ["山洪预警", "水利水文监测", "水流速监测", "液位监测", "防汛预警"],
      badge: "水利水文",
      intro:
        "山洪和防汛场景需要连续、稳定、远程可用的数据。毫米波雷达可对水面流速和液位变化进行非接触式监测，并接入平台完成趋势判断和告警联动。",
      bullets: ["流速与液位联动监测", "适合山区河道与小流域", "支持太阳能和无线通信", "平台预警与现场声光告警"],
      sections: [
        {
          title: "部署位置",
          body: "适用于山区河道、小流域断面、桥涵断面、排水渠关键节点和城市内涝风险点。",
          items: ["山区河道", "小流域断面", "桥涵断面", "排水渠关键节点"]
        },
        {
          title: "监测内容",
          body: "持续采集水流速、液位变化、流速趋势和异常突增，为防汛平台提供更连续的数据基础。"
        },
        {
          title: "交付组合",
          body: "可采用雷达终端、太阳能供电、4G/5G 通信、平台预警和现场声光告警的成套部署方式。"
        }
      ],
      specs: [
        { label: "推荐产品", value: "AR-FV100，可配套液位雷达和无线通信模块" },
        { label: "监测内容", value: "水流速、液位变化、流速趋势、异常突增" },
        { label: "通信方式", value: "4G/5G、LoRa、NB-IoT 等" },
        { label: "平台对接", value: "水利、防汛、排水和应急指挥平台" }
      ],
      applications: ["山洪预警", "小流域监测", "城市排水", "桥涵水文"],
      ctaTitle: "需要建设水利水文监测点？",
      ctaText: "提供断面类型、站点数量、供电通信条件和平台接口要求，我们可以协助形成监测点配置。"
    },
    en: {
      eyebrow: "Solution",
      title: "Flash Flood Warning / Hydrology Monitoring",
      description:
        "A hydrology monitoring solution for mountain streams, small watersheds, bridge culverts and drainage nodes, supporting flow velocity, level change and abnormal surge warnings.",
      keywords: ["flash flood warning", "hydrology monitoring", "flow velocity monitoring", "water level monitoring", "flood control warning"],
      badge: "Hydrology",
      intro:
        "Flood warning requires continuous, stable and remotely available data. mmWave radar can monitor surface velocity and level changes without contact and support platform-based trend analysis and alarms.",
      bullets: ["Flow and level monitoring", "For mountain streams and watersheds", "Solar power and wireless communication", "Platform warning and on-site alarm"],
      sections: [
        {
          title: "Deployment Locations",
          body: "Applicable to mountain streams, small watershed sections, bridge culverts, drainage nodes and urban flooding risk points.",
          items: ["Mountain streams", "Small watershed sections", "Bridge culverts", "Drainage nodes"]
        },
        {
          title: "Monitoring Targets",
          body: "Continuously collect velocity, level changes, velocity trends and abnormal surges to provide a stronger data basis for flood-control platforms."
        },
        {
          title: "Delivery Package",
          body: "Radar terminal, solar power, 4G/5G communication, platform warning and on-site audible/visual alarms can be delivered as a complete setup."
        }
      ],
      specs: [
        { label: "Recommended Product", value: "AR-FV100 with optional level radar and wireless modules" },
        { label: "Monitoring", value: "Velocity, level change, trend and abnormal surge" },
        { label: "Communication", value: "4G/5G, LoRa, NB-IoT and more" },
        { label: "Platform", value: "Water resources, flood control, drainage and emergency command platforms" }
      ],
      applications: ["Flash flood warning", "Small watershed monitoring", "Urban drainage", "Bridge hydrology"],
      ctaTitle: "Need hydrology monitoring sites?",
      ctaText: "Share section type, site quantity, power/communication conditions and platform interfaces for station configuration."
    }
  },
  {
    kind: "solutions",
    slug: "industrial-level-monitoring",
    image: "/product/ar-ls-industrial-level-radar.jpeg",
    gallery: ["/brochure/industrial-level-radar-device.png", "/brochure/industrial-level-installation.png"],
    productModels: ["AR-LS100", "AR-LS200", "AR-LS300", "AR-SL300"],
    zh: {
      eyebrow: "解决方案",
      title: "工业储罐 / 料仓物位监测",
      description:
        "面向化工储罐、反应釜、煤仓、水泥库、粉料仓和筒仓的工业物位监测方案，支持液位、料位、库存变化和异常波动监测。",
      keywords: ["工业物位监测", "储罐液位监测", "料仓料位监测", "雷达物位计", "雷达液位计"],
      badge: "工业过程监测",
      intro:
        "工业储罐和料仓通常存在粉尘、腐蚀、密闭、高温或防爆要求。工业雷达物/液位计可实现非接触式高度测量，并接入 PLC、DCS 或远程平台。",
      bullets: ["适合储罐、反应釜和料仓", "支持库存变化监测", "可接入 PLC/DCS", "可按项目适配防爆和高精度版本"],
      sections: [
        {
          title: "典型现场",
          body: "适用于煤仓、水泥库、焦仓、粉料仓、化工储罐、反应釜接口和工业园区水务监测。",
          items: ["化工储罐", "煤仓与焦仓", "水泥库", "粉料仓", "反应釜接口"]
        },
        {
          title: "监测内容",
          body: "持续监测料位、液位、库存变化、满仓/空仓状态和异常波动，为生产调度和安全管理提供数据支撑。"
        },
        {
          title: "系统集成",
          body: "支持工业安装法兰、4-20mA/HART、RS485、PLC/DCS 和工业网关接入，适合新建项目和国产化替代。"
        }
      ],
      specs: [
        { label: "推荐产品", value: "AR-LS100/200/300 或 AR-SL300" },
        { label: "监测内容", value: "料位、液位、库存变化、满仓/空仓状态、异常波动" },
        { label: "接口", value: "RS485、4-20mA/HART、PLC/DCS、工业网关" },
        { label: "现场条件", value: "粉尘、密闭、腐蚀、防爆或高精度计量场景" }
      ],
      applications: ["化工储罐", "煤仓", "水泥库", "反应釜", "粉料仓"],
      ctaTitle: "需要工业物位监测方案？",
      ctaText: "提供介质、量程、安装口、接口协议、防爆要求和平台接入方式，我们可以协助完成方案配置。"
    },
    en: {
      eyebrow: "Solution",
      title: "Industrial Tank / Silo Level Monitoring",
      description:
        "An industrial level monitoring solution for chemical tanks, reactors, coal silos, cement warehouses, powder bins and silos, covering level, inventory and abnormal fluctuation monitoring.",
      keywords: ["industrial level monitoring", "tank level monitoring", "silo level monitoring", "radar level meter", "material level radar"],
      badge: "Industrial Process",
      intro:
        "Industrial tanks and silos often involve dust, corrosion, enclosed spaces, heat or explosion-proof requirements. Radar level instruments measure height without contact and integrate with PLC, DCS or remote platforms.",
      bullets: ["For tanks, reactors and silos", "Inventory change monitoring", "PLC/DCS integration", "Explosion-proof and high-accuracy options"],
      sections: [
        {
          title: "Typical Sites",
          body: "Applicable to coal silos, cement warehouses, coke bins, powder silos, chemical tanks, reactor interfaces and industrial utility monitoring.",
          items: ["Chemical tanks", "Coal and coke bins", "Cement warehouses", "Powder silos", "Reactor interfaces"]
        },
        {
          title: "Monitoring Targets",
          body: "Continuously monitor material level, liquid level, inventory change, full/empty status and abnormal fluctuations for production scheduling and safety management."
        },
        {
          title: "System Integration",
          body: "Supports industrial flanges, 4-20mA/HART, RS485, PLC/DCS and industrial gateways for new projects and import replacement."
        }
      ],
      specs: [
        { label: "Recommended Products", value: "AR-LS100/200/300 or AR-SL300" },
        { label: "Monitoring", value: "Material level, liquid level, inventory change, full/empty status and abnormal fluctuation" },
        { label: "Interfaces", value: "RS485, 4-20mA/HART, PLC/DCS and industrial gateway" },
        { label: "Site Conditions", value: "Dusty, enclosed, corrosive, explosion-proof or high-accuracy metering sites" }
      ],
      applications: ["Chemical tanks", "Coal silos", "Cement warehouses", "Reactors", "Powder bins"],
      ctaTitle: "Need an industrial level monitoring solution?",
      ctaText: "Share medium, range, mounting port, interface protocol, explosion-proof requirement and platform integration needs."
    }
  },
  {
    kind: "solutions",
    slug: "dam-slope-monitoring",
    image: "/product/sr-p300-phased-array-radar.png",
    gallery: ["/brochure/structural-radar-sr-p300.png", "/brochure/bridge-monitoring-principle.png"],
    productModels: ["SR-P300"],
    zh: {
      eyebrow: "解决方案",
      title: "水库大坝 / 边坡地灾预警",
      description:
        "面向水库大坝、高危边坡、道路边坡和滑坡体周边的远距离非接触式位移与形变趋势监测方案。",
      keywords: ["水库大坝监测", "边坡地灾预警", "边坡位移监测", "大坝安全监测", "SR-P300"],
      badge: "地灾预警",
      intro:
        "SR-P300 远距离相控阵结构雷达可部署在坝顶、坝坡、对岸观测点或高危边坡周边，对坝体沉降、边坡滑移和长期形变趋势进行在线监测。",
      bullets: ["远距离非接触式监测", "适合大坝与高危边坡", "长期形变趋势分析", "支持平台预警与现场告警"],
      sections: [
        {
          title: "部署位置",
          body: "可部署在坝顶、坝坡、边坡对岸、道路边坡监测点和高危滑坡体周边。",
          items: ["水库大坝", "高危边坡", "道路边坡", "滑坡体周边"]
        },
        {
          title: "监测内容",
          body: "持续识别坝体沉降、坝坡滑移、边坡位移、长期趋势和雨季异常变化。"
        },
        {
          title: "预警闭环",
          body: "远距离结构雷达可配合太阳能供电、4G/5G 通信、边坡/大坝预警平台和现场声光告警，形成长期在线预警能力。"
        }
      ],
      specs: [
        { label: "推荐产品", value: "SR-P300" },
        { label: "监测对象", value: "坝体沉降、坝坡滑移、边坡位移、长期趋势" },
        { label: "部署方式", value: "坝顶、坝坡、对岸观测点、道路边坡监测点" },
        { label: "交付组合", value: "远距离结构雷达 + 供电通信 + 平台预警 + 现场告警" }
      ],
      applications: ["水库大坝", "高危边坡", "道路边坡", "滑坡体周边"],
      ctaTitle: "需要大坝或边坡预警方案？",
      ctaText: "提供监测对象、观测距离、安装位置、供电通信条件和平台接口要求，我们可以协助完成方案配置。"
    },
    en: {
      eyebrow: "Solution",
      title: "Dam / Slope Geohazard Warning",
      description:
        "A long-range non-contact displacement and deformation trend monitoring solution for dams, high-risk slopes, roadside slopes and landslide areas.",
      keywords: ["dam monitoring", "slope geohazard warning", "slope displacement monitoring", "dam safety monitoring", "SR-P300"],
      badge: "Geohazard Warning",
      intro:
        "The SR-P300 long-range phased-array structural radar can be deployed on dam crests, dam slopes, opposite observation points or high-risk slope areas to monitor settlement, sliding and long-term deformation trends.",
      bullets: ["Long-range non-contact monitoring", "For dams and high-risk slopes", "Long-term deformation trend analysis", "Platform warning and on-site alarm"],
      sections: [
        {
          title: "Deployment Locations",
          body: "Deploy on dam crests, dam slopes, opposite-slope observation points, roadside slope monitoring sites and around high-risk landslide areas.",
          items: ["Reservoir dams", "High-risk slopes", "Roadside slopes", "Landslide areas"]
        },
        {
          title: "Monitoring Targets",
          body: "Continuously identify dam settlement, slope sliding, displacement trends and abnormal rainy-season changes."
        },
        {
          title: "Warning Loop",
          body: "Long-range structural radar can work with solar power, 4G/5G communication, dam or slope warning platforms and on-site alarms for continuous early warning."
        }
      ],
      specs: [
        { label: "Recommended Product", value: "SR-P300" },
        { label: "Monitoring Target", value: "Dam settlement, slope sliding, displacement and long-term trends" },
        { label: "Deployment", value: "Dam crest, dam slope, opposite observation point and roadside slope site" },
        { label: "Delivery Package", value: "Long-range structural radar + power/communication + platform warning + on-site alarm" }
      ],
      applications: ["Reservoir dams", "High-risk slopes", "Roadside slopes", "Landslide areas"],
      ctaTitle: "Need a dam or slope warning solution?",
      ctaText: "Share the target, observation distance, mounting location, power and communication conditions, and platform interface requirements."
    }
  }
];

const standaloneProductPages: SeoPage[] = [
  {
    kind: "products",
    slug: "ar-ls100",
    image: "/brochure/industrial-level-radar-device.png",
    gallery: ["/brochure/industrial-level-radar-device.png", "/brochure/industrial-level-installation.png"],
    productModels: ["AR-LS100"],
    zh: {
      eyebrow: "产品页面", title: "AR-LS100 标准型工业雷达物/液位计", description: "面向普通储罐、清水池和一般料仓的非接触式液位、物位与料位在线监测设备。", keywords: ["AR-LS100", "雷达液位计", "标准型物位计"], badge: "标准监测型", intro: "AR-LS100 适用于无防爆要求的常规工业环境，以 RS485 Modbus 接入方式支持成本可控、安装便捷的长期在线监测。", bullets: ["常规液位与物位监测", "RS485 Modbus", "±5 mm 级精度", "IP67 防护"], sections: [{ title: "适用工况", body: "适合普通工业储罐、清水池、一般料仓和水务监测等无爆炸风险场景。", items: ["清水池", "普通储罐", "一般料仓", "水务监测"] }, { title: "部署与接入", body: "设备安装于储罐或料仓顶部，通过 RS485 Modbus 对接 PLC、工业网关或远程管理平台。" }, { title: "选型提示", body: "适用于预算敏感、强调易部署的常规监测项目；防爆、HART 或更高精度要求请选用 AR-LS200 或 AR-LS300。" }], specs: [{ label: "产品型号", value: "AR-LS100" }, { label: "版本定位", value: "常规液位 / 物位在线监测" }, { label: "通信输出", value: "RS485 Modbus" }, { label: "测量精度", value: "±5 mm，具体以项目配置和现场工况为准" }, { label: "防护等级", value: "IP67" }, { label: "防爆能力", value: "无防爆认证" }, { label: "典型场景", value: "清水池、普通储罐、普通料仓" }], applications: ["清水池", "普通储罐", "一般料仓", "水务监测"], ctaTitle: "需要常规液位监测方案？", ctaText: "提供介质、量程、安装接口和通信要求，可协助确认 AR-LS100 是否适配。"
    },
    en: {
      eyebrow: "Product Page", title: "AR-LS100 Standard Industrial Radar Level Meter", description: "A non-contact level instrument for standard tanks, reservoirs and general silos.", keywords: ["AR-LS100", "radar level meter", "standard material level radar"], badge: "Standard Monitoring", intro: "AR-LS100 is designed for conventional non-hazardous industrial sites, with RS485 Modbus for cost-controlled and straightforward long-term monitoring.", bullets: ["Standard level monitoring", "RS485 Modbus", "±5 mm accuracy", "IP67 protection"], sections: [{ title: "Suitable Sites", body: "For standard tanks, clean-water reservoirs, general silos and utility monitoring where explosion protection is not required.", items: ["Clean-water reservoirs", "Standard tanks", "General silos", "Utility monitoring"] }, { title: "Deployment and Integration", body: "Mount on the top of a tank or silo and connect to PLCs, industrial gateways or remote platforms through RS485 Modbus." }, { title: "Selection Note", body: "For economical, easy-to-deploy monitoring. Choose AR-LS200 or AR-LS300 when explosion-proof, HART or higher-accuracy capability is required." }], specs: [{ label: "Model", value: "AR-LS100" }, { label: "Positioning", value: "Standard online level and material level monitoring" }, { label: "Output", value: "RS485 Modbus" }, { label: "Accuracy", value: "±5 mm, subject to project configuration and site conditions" }, { label: "Protection", value: "IP67" }, { label: "Explosion Protection", value: "No explosion-proof certification" }, { label: "Typical Sites", value: "Clean-water reservoirs, standard tanks and general silos" }], applications: ["Clean-water reservoirs", "Standard tanks", "General silos", "Utility monitoring"], ctaTitle: "Need a standard level-monitoring solution?", ctaText: "Share the medium, range, mounting interface and communication requirement to confirm AR-LS100 suitability."
    }
  },
  {
    kind: "products",
    slug: "ar-ls200",
    image: "/brochure/industrial-level-radar-device.png",
    gallery: ["/brochure/industrial-level-radar-device.png", "/brochure/industrial-level-installation.png"],
    productModels: ["AR-LS200"],
    zh: {
      eyebrow: "产品页面", title: "AR-LS200 防爆型工业雷达物/液位计", description: "面向煤矿、化工储罐和密闭管网等危险工业场景的非接触式物/液位监测设备。", keywords: ["AR-LS200", "防爆雷达液位计", "HART 物位计"], badge: "防爆工业型", intro: "AR-LS200 支持 4-20mA + HART 工业标准输出，可按项目适配本安防爆认证版本，用于复杂工业过程监测。", bullets: ["4-20mA + HART", "防爆版本可选", "±5 mm 级精度", "IP67 防护"], sections: [{ title: "适用工况", body: "适用于煤矿料仓、化工储罐、密闭排水管网和有防爆要求的工业园区。", items: ["煤矿料仓", "化工储罐", "密闭管网", "工业园区"] }, { title: "工业系统接入", body: "采用 4-20mA + HART 输出，可对接 PLC、DCS 或工业网关，满足工业现场标准化接入需要。" }, { title: "防爆说明", body: "可按项目适配 Ex ia IIC T6 Gb 等本安防爆认证版本；具体认证状态和防爆等级以产品版本、证书和项目技术协议为准。" }], specs: [{ label: "产品型号", value: "AR-LS200" }, { label: "版本定位", value: "防爆工业场景物 / 液位监测" }, { label: "通信输出", value: "4-20mA + HART" }, { label: "测量精度", value: "±5 mm，具体以项目配置和现场工况为准" }, { label: "防护等级", value: "IP67" }, { label: "防爆能力", value: "可按项目适配 Ex ia IIC T6 Gb 等本安防爆认证版本" }, { label: "典型场景", value: "煤矿料仓、化工储罐、密闭管网" }], applications: ["煤矿料仓", "化工储罐", "密闭管网", "危险工业环境"], ctaTitle: "需要防爆物位监测方案？", ctaText: "提供介质、防爆等级、量程、接口和安装方式，可协助完成型号与认证版本判断。"
    },
    en: {
      eyebrow: "Product Page", title: "AR-LS200 Explosion-proof Industrial Radar Level Meter", description: "A non-contact level instrument for coal, chemical tanks and enclosed networks that require industrial explosion-protection options.", keywords: ["AR-LS200", "explosion-proof radar level meter", "HART level radar"], badge: "Explosion-proof Industrial", intro: "AR-LS200 supports standard 4-20mA + HART output and can be configured with intrinsically safe explosion-proof versions for industrial process monitoring.", bullets: ["4-20mA + HART", "Explosion-proof option", "±5 mm accuracy", "IP67 protection"], sections: [{ title: "Suitable Sites", body: "For coal silos, chemical tanks, enclosed drainage networks and industrial sites with explosion-protection requirements.", items: ["Coal silos", "Chemical tanks", "Enclosed networks", "Industrial parks"] }, { title: "Industrial Integration", body: "Uses 4-20mA + HART for standardized integration with PLCs, DCS systems and industrial gateways." }, { title: "Explosion-protection Note", body: "Versions adaptable to Ex ia IIC T6 Gb and similar intrinsically safe requirements are available by project. Certification status and rating depend on the product version, certificate and agreement." }], specs: [{ label: "Model", value: "AR-LS200" }, { label: "Positioning", value: "Industrial level monitoring for hazardous sites" }, { label: "Output", value: "4-20mA + HART" }, { label: "Accuracy", value: "±5 mm, subject to project configuration and site conditions" }, { label: "Protection", value: "IP67" }, { label: "Explosion Protection", value: "Can be configured for Ex ia IIC T6 Gb and similar requirements" }, { label: "Typical Sites", value: "Coal silos, chemical tanks and enclosed networks" }], applications: ["Coal silos", "Chemical tanks", "Enclosed networks", "Hazardous industrial sites"], ctaTitle: "Need an explosion-proof level-monitoring solution?", ctaText: "Share the medium, required protection rating, range, interface and mounting method for model and certification guidance."
    }
  },
  {
    kind: "products",
    slug: "ar-ls300",
    image: "/brochure/industrial-level-radar-device.png",
    gallery: ["/brochure/industrial-level-radar-device.png", "/brochure/industrial-level-installation.png"],
    productModels: ["AR-LS300"],
    zh: {
      eyebrow: "产品页面", title: "AR-LS300 高精度型工业雷达物/液位计", description: "面向精细化工、关键储罐与高精度料仓库存计量的高精度非接触式物/液位监测设备。", keywords: ["AR-LS300", "高精度雷达液位计", "库存计量"], badge: "高精度计量型", intro: "AR-LS300 适合关键工艺控制和库存计量场景，提供 4-20mA + HART 输出和全量程稳定的高精度测量能力。", bullets: ["±1 mm 级测量", "30 m 全量程恒定精度", "4-20mA + HART", "IP67 防护"], sections: [{ title: "适用工况", body: "适用于精细化工反应釜、高价值原料储罐、高精度料仓和关键库存计量点。", items: ["精细化工", "关键储罐", "高精度料仓", "库存计量"] }, { title: "计量与控制", body: "高精度输出可支撑关键工艺控制、库存管理和国产化替代项目中的连续数据采集。" }, { title: "工程说明", body: "精度等级、防爆版本和最终测量性能需结合具体产品版本、安装条件、介质特性和现场标定方案确认。" }], specs: [{ label: "产品型号", value: "AR-LS300" }, { label: "版本定位", value: "高精度计量级物 / 液位测量" }, { label: "通信输出", value: "4-20mA + HART" }, { label: "测量精度", value: "±1 mm；30 m 全量程恒定精度，具体以项目配置为准" }, { label: "防护等级", value: "IP67" }, { label: "防爆能力", value: "可按项目适配 Ex ia IIC T6 Gb 等本安防爆认证版本" }, { label: "典型场景", value: "精细化工、关键储罐、高精度料仓" }], applications: ["精细化工", "关键储罐", "高精度料仓", "库存计量"], ctaTitle: "需要高精度计量方案？", ctaText: "提供介质、量程、目标精度、接口与安装条件，可协助评估 AR-LS300 的项目适配性。"
    },
    en: {
      eyebrow: "Product Page", title: "AR-LS300 High-accuracy Industrial Radar Level Meter", description: "A high-accuracy non-contact level instrument for fine chemicals, critical tanks and precision silo inventory measurement.", keywords: ["AR-LS300", "high accuracy radar level meter", "inventory metering"], badge: "High-accuracy Metering", intro: "AR-LS300 is designed for critical process control and inventory metering, with 4-20mA + HART and stable high-accuracy measurement across the range.", bullets: ["±1 mm measurement", "30 m constant full-range accuracy", "4-20mA + HART", "IP67 protection"], sections: [{ title: "Suitable Sites", body: "For fine-chemical reactors, high-value raw-material tanks, high-accuracy silos and critical inventory points.", items: ["Fine chemicals", "Critical tanks", "High-accuracy silos", "Inventory metering"] }, { title: "Metering and Control", body: "High-accuracy output supports continuous data collection for critical process control, inventory management and import-replacement projects." }, { title: "Engineering Note", body: "Accuracy, explosion-protection configuration and final performance depend on product version, installation, medium characteristics and site calibration." }], specs: [{ label: "Model", value: "AR-LS300" }, { label: "Positioning", value: "High-accuracy level and material-level metering" }, { label: "Output", value: "4-20mA + HART" }, { label: "Accuracy", value: "±1 mm; 30 m constant full-range accuracy, subject to project configuration" }, { label: "Protection", value: "IP67" }, { label: "Explosion Protection", value: "Can be configured for Ex ia IIC T6 Gb and similar requirements" }, { label: "Typical Sites", value: "Fine chemicals, critical tanks and high-accuracy silos" }], applications: ["Fine chemicals", "Critical tanks", "High-accuracy silos", "Inventory metering"], ctaTitle: "Need a high-accuracy metering solution?", ctaText: "Share the medium, range, target accuracy, interface and mounting condition to evaluate AR-LS300 suitability."
    }
  },
  {
    kind: "products",
    slug: "ar-sl300",
    image: "/brochure/industrial-level-radar-device.png",
    gallery: ["/brochure/industrial-level-radar-device.png", "/brochure/industrial-level-installation.png"],
    productModels: ["AR-SL300"],
    zh: {
      eyebrow: "产品页面", title: "AR-SL300 长量程固体物位计", description: "面向煤仓、水泥库、焦仓和粉料仓等固体物料场景的远距离非接触式物位测量设备。", keywords: ["AR-SL300", "固体物位计", "料仓雷达"], badge: "长量程固体物位", intro: "AR-SL300 面向粉料、颗粒料和块状物料的料仓与筒仓高度测量，可与工业接口、网关和远程平台组合部署。", bullets: ["固体料仓测量", "非接触低维护", "工业接口接入", "适应粉尘环境"], sections: [{ title: "适用工况", body: "适用于煤仓、水泥库、焦仓、粉料仓和筒仓等需要远距离料位测量的现场。", items: ["煤仓", "水泥库", "焦仓", "粉料仓"] }, { title: "安装与系统接入", body: "安装在料仓或筒仓顶部，可通过工业接口接入 PLC、DCS 或工业网关，支撑库存变化、满仓和空仓状态监测。" }, { title: "复杂工况", body: "针对粉尘、宽料仓和复杂反射场景，可按目标与安装环境选择适配的射频前端与部署方式。" }], specs: [{ label: "产品型号", value: "AR-SL300" }, { label: "版本定位", value: "固体料仓、筒仓远距离物位测量" }, { label: "监测对象", value: "粉料、颗粒料、块状物料高度与库存变化" }, { label: "通信能力", value: "可按项目配置 RS485、4-20mA + HART 等接口" }, { label: "部署方式", value: "料仓 / 筒仓顶部非接触安装" }, { label: "典型场景", value: "煤仓、水泥库、焦仓、粉料仓" }], applications: ["煤仓", "水泥库", "焦仓", "粉料仓"], ctaTitle: "需要固体料仓物位方案？", ctaText: "提供物料类型、仓体尺寸、安装位置、粉尘情况和接口要求，可协助完成部署建议。"
    },
    en: {
      eyebrow: "Product Page", title: "AR-SL300 Long-range Solid Material Level Meter", description: "A non-contact material-level instrument for coal silos, cement warehouses, coke bins and powder silos.", keywords: ["AR-SL300", "solid material level meter", "silo radar"], badge: "Long-range Solid Level", intro: "AR-SL300 measures powders, granules and bulk solids in silos and bins, with options for industrial interfaces, gateways and remote platforms.", bullets: ["Solid-material silo measurement", "Non-contact, low maintenance", "Industrial integration", "For dusty environments"], sections: [{ title: "Suitable Sites", body: "For coal silos, cement warehouses, coke bins, powder silos and other sites requiring long-range solid-level monitoring.", items: ["Coal silos", "Cement warehouses", "Coke bins", "Powder silos"] }, { title: "Installation and Integration", body: "Mount at the top of a silo or bin and connect to PLC, DCS or industrial gateways for inventory, full and empty status monitoring." }, { title: "Complex Conditions", body: "RF front-end and deployment can be matched to the target and installation environment for dust, wide silos and complex reflections." }], specs: [{ label: "Model", value: "AR-SL300" }, { label: "Positioning", value: "Long-range material level measurement for solid silos and bins" }, { label: "Monitoring Target", value: "Powders, granules, bulk-solid height and inventory change" }, { label: "Interfaces", value: "RS485, 4-20mA + HART and other project-configured options" }, { label: "Deployment", value: "Non-contact mounting on the top of a silo or bin" }, { label: "Typical Sites", value: "Coal silos, cement warehouses, coke bins and powder silos" }], applications: ["Coal silos", "Cement warehouses", "Coke bins", "Powder silos"], ctaTitle: "Need a solid-silo level solution?", ctaText: "Share the material, vessel dimensions, mounting position, dust conditions and interface requirements for deployment guidance."
    }
  },
  {
    kind: "products",
    slug: "sr-i100",
    image: "/brochure/structural-radar-sr-i100.png",
    gallery: ["/brochure/structural-radar-sr-i100.png", "/brochure/bridge-monitoring-principle.png", "/brochure/bridge-field-survey-portrait.png"],
    productModels: ["SR-I100"],
    zh: {
      eyebrow: "产品页面", title: "SR-I100 近距离多参数一体化雷达", description: "面向桥梁伸缩缝、支座、建筑基坑和室内隧道等 0-10 m 近距离结构位移与形变监测。", keywords: ["SR-I100", "近距离结构监测雷达", "桥梁支座位移监测"], badge: "近距离结构监测", intro: "SR-I100 结构紧凑、集成度高，适合多点位快速布设、短期专项检测和普通结构的长期在线监测。", bullets: ["0-10 m 监测距离", "0.05 mm 级位移识别", "RS485 Modbus", "IP67 防护"], sections: [{ title: "适用工况", body: "适用于桥梁伸缩缝、桥梁支座、建筑基坑、室内隧道和普通城市桥梁等短距离结构监测。", items: ["伸缩缝位移", "支座局部位移", "基坑形变", "隧道局部收敛"] }, { title: "轻量化部署", body: "小型化一体化结构便于独立支撑和多点位快速安装，无需在被测结构上大规模布设接触式传感器。" }, { title: "数据应用", body: "可持续输出关键点位变化和异常趋势，并接入桥梁健康监测平台或项目级云端平台。" }], specs: [{ label: "产品型号", value: "SR-I100" }, { label: "有效监测距离", value: "0-10 m" }, { label: "通信方式", value: "RS485 Modbus" }, { label: "位移识别能力", value: "实验室稳定条件下可达 0.05 mm 级" }, { label: "工程测量精度", value: "以现场安装、目标反射条件、标定方案和验收协议为准" }, { label: "防护等级", value: "IP67" }, { label: "多目标能力", value: "单点 / 少量点位" }], applications: ["桥梁伸缩缝", "桥梁支座", "建筑基坑", "室内隧道"], ctaTitle: "需要近距离结构监测方案？", ctaText: "提供监测对象、安装距离、视线条件和数据接口要求，可协助确认 SR-I100 部署方案。"
    },
    en: {
      eyebrow: "Product Page", title: "SR-I100 Integrated Short-range Structural Radar", description: "For 0-10 m structural displacement and deformation monitoring at expansion joints, bearings, foundation pits and indoor tunnels.", keywords: ["SR-I100", "short range structural radar", "bridge bearing displacement monitoring"], badge: "Short-range Structural Monitoring", intro: "SR-I100 has a compact integrated structure for rapid multi-point deployment, short-term inspections and long-term online monitoring of standard structures.", bullets: ["0-10 m range", "0.05 mm-level displacement recognition", "RS485 Modbus", "IP67 protection"], sections: [{ title: "Suitable Sites", body: "For bridge expansion joints, bearings, foundation pits, indoor tunnels and standard urban bridges.", items: ["Expansion joints", "Bridge bearings", "Foundation pits", "Indoor tunnels"] }, { title: "Lightweight Deployment", body: "The integrated form factor supports independent mounting and rapid multi-point deployment without extensive contact sensors on the target structure." }, { title: "Data Use", body: "Continuously outputs key-point changes and anomaly trends for bridge health platforms or project cloud platforms." }], specs: [{ label: "Model", value: "SR-I100" }, { label: "Effective Range", value: "0-10 m" }, { label: "Communication", value: "RS485 Modbus" }, { label: "Displacement Recognition", value: "Down to the 0.05 mm level under stable laboratory conditions" }, { label: "Engineering Accuracy", value: "Subject to installation, target reflection, calibration and acceptance agreement" }, { label: "Protection", value: "IP67" }, { label: "Multi-target Capability", value: "Single point / limited points" }], applications: ["Bridge expansion joints", "Bridge bearings", "Foundation pits", "Indoor tunnels"], ctaTitle: "Need a short-range structural-monitoring solution?", ctaText: "Share the target, observation distance, line-of-sight conditions and data-interface requirements for SR-I100 deployment guidance."
    }
  },
  {
    kind: "products",
    slug: "sr-m200",
    image: "/brochure/structural-radar-sr-m200.png",
    gallery: ["/brochure/structural-radar-sr-m200.png", "/brochure/bridge-monitoring-principle.png", "/brochure/bridge-deflection-run-one.png", "/brochure/bridge-deflection-run-two.png"],
    productModels: ["SR-M200"],
    zh: {
      eyebrow: "产品页面", title: "SR-M200 中距离 MIMO 监测雷达", description: "面向桥梁梁体、高架桥、厂区构筑物和隧道局部形变的 10-60 m 多点位在线监测。", keywords: ["SR-M200", "MIMO 监测雷达", "桥梁挠度监测"], badge: "中距离多点位监测", intro: "SR-M200 采用 MIMO 阵列感知方式，在监测精度、覆盖范围和工程部署便利性之间取得平衡。", bullets: ["10-60 m 监测距离", "0.03 mm 级位移识别", "多点位监测", "4-20mA + HART"], sections: [{ title: "适用工况", body: "适用于桥梁梁体跨中挠度、城市高架桥长期安全、厂区构筑物和隧道局部变形监测。", items: ["桥梁跨中挠度", "城市高架桥", "厂区构筑物", "隧道局部变形"] }, { title: "多点位感知", body: "可服务中等距离、多目标、多点位监测任务，适合需要同步观察同一截面多个反射目标的工程测试与长期运行。" }, { title: "系统交付", body: "可组合独立支撑、通信、云平台、阈值预警与报表输出，形成工程化在线监测闭环。" }], specs: [{ label: "产品型号", value: "SR-M200" }, { label: "有效监测距离", value: "10-60 m" }, { label: "通信方式", value: "4-20mA + HART" }, { label: "位移识别能力", value: "实验室稳定条件下可达 0.03 mm 级" }, { label: "工程测量精度", value: "以现场安装、目标反射条件、标定方案和验收协议为准" }, { label: "防护等级", value: "IP67" }, { label: "多目标能力", value: "多点位监测" }], applications: ["桥梁梁体", "城市高架桥", "厂区构筑物", "隧道局部变形"], ctaTitle: "需要中距离多点位监测方案？", ctaText: "提供观测距离、结构类型、目标数量、安装条件和平台要求，可协助完成 SR-M200 配置。"
    },
    en: {
      eyebrow: "Product Page", title: "SR-M200 Mid-range MIMO Monitoring Radar", description: "For 10-60 m multi-point online monitoring of bridge girders, viaducts, industrial structures and local tunnel deformation.", keywords: ["SR-M200", "MIMO monitoring radar", "bridge deflection monitoring"], badge: "Mid-range Multi-point Monitoring", intro: "SR-M200 uses MIMO array sensing to balance monitoring accuracy, coverage and practical engineering deployment.", bullets: ["10-60 m range", "0.03 mm-level displacement recognition", "Multi-point monitoring", "4-20mA + HART"], sections: [{ title: "Suitable Sites", body: "For mid-span bridge deflection, long-term viaduct safety, industrial structures and local tunnel deformation.", items: ["Bridge mid-span deflection", "Urban viaducts", "Industrial structures", "Local tunnel deformation"] }, { title: "Multi-point Sensing", body: "Supports mid-range, multi-target and multi-point work, including synchronized observation of reflective targets across one structural section." }, { title: "System Delivery", body: "Can be combined with independent mounting, communications, cloud platforms, threshold alerts and reports for an engineered online monitoring loop." }], specs: [{ label: "Model", value: "SR-M200" }, { label: "Effective Range", value: "10-60 m" }, { label: "Communication", value: "4-20mA + HART" }, { label: "Displacement Recognition", value: "Down to the 0.03 mm level under stable laboratory conditions" }, { label: "Engineering Accuracy", value: "Subject to installation, target reflection, calibration and acceptance agreement" }, { label: "Protection", value: "IP67" }, { label: "Multi-target Capability", value: "Multi-point monitoring" }], applications: ["Bridge girders", "Urban viaducts", "Industrial structures", "Local tunnel deformation"], ctaTitle: "Need a mid-range multi-point monitoring solution?", ctaText: "Share observation distance, structure type, number of targets, mounting conditions and platform requirements for SR-M200 configuration."
    }
  },
  {
    kind: "products",
    slug: "sr-p300",
    image: "/brochure/structural-radar-sr-p300.png",
    gallery: ["/brochure/structural-radar-sr-p300.png", "/brochure/bridge-monitoring-principle.png", "/brochure/bridge-monitoring-platform.png", "/brochure/bridge-radar-installation.jpeg"],
    productModels: ["SR-P300"],
    zh: {
      eyebrow: "产品页面", title: "SR-P300 远距离相控阵雷达", description: "面向大跨径桥梁、水库大坝、高危边坡和超长隧道的 60-300 m 远距离结构安全监测与预警。", keywords: ["SR-P300", "相控阵雷达", "远距离结构监测", "边坡监测"], badge: "远距离多目标预警", intro: "SR-P300 支持远距离探测与多目标同步识别，可在单台设备覆盖多个监测点位的情况下持续跟踪结构形变趋势。", bullets: ["60-300 m 监测距离", "0.01 mm 级位移识别", "多目标同步识别", "IP67 防护"], sections: [{ title: "适用工况", body: "适用于大跨径桥梁挠度、水库大坝沉降与滑移、山区高危边坡位移、重点文物桥梁和超长隧道。", items: ["大跨径桥梁", "水库大坝", "高危边坡", "超长隧道"] }, { title: "远距离多目标能力", body: "在单台设备覆盖多个监测点位的条件下，支持结构形变趋势跟踪和异常预警，降低远距离和高风险区域的人工巡检压力。" }, { title: "长期预警闭环", body: "可配合太阳能供电、4G/5G 通信、视频复核、云监测平台和现场告警设备，用于长期无人值守项目。" }], specs: [{ label: "产品型号", value: "SR-P300" }, { label: "有效监测距离", value: "60-300 m" }, { label: "通信方式", value: "4-20mA + HART" }, { label: "位移识别能力", value: "实验室稳定条件下可达 0.01 mm 级" }, { label: "工程测量精度", value: "以现场安装、目标反射条件、标定方案和验收协议为准" }, { label: "防护等级", value: "IP67" }, { label: "多目标能力", value: "多目标同步识别" }], applications: ["大跨径桥梁", "水库大坝", "高危边坡", "超长隧道"], ctaTitle: "需要远距离结构预警方案？", ctaText: "提供结构类型、观测距离、目标数量、安装位置与通信供电条件，可协助完成 SR-P300 方案设计。"
    },
    en: {
      eyebrow: "Product Page", title: "SR-P300 Long-range Phased-array Radar", description: "For 60-300 m structural safety monitoring and warning at long-span bridges, dams, high-risk slopes and long tunnels.", keywords: ["SR-P300", "phased array radar", "long range structural monitoring", "slope monitoring"], badge: "Long-range Multi-target Warning", intro: "SR-P300 supports long-range sensing and synchronized multi-target recognition, tracking structural deformation trends across multiple monitoring points with one device.", bullets: ["60-300 m range", "0.01 mm-level displacement recognition", "Synchronized multi-target sensing", "IP67 protection"], sections: [{ title: "Suitable Sites", body: "For long-span bridge deflection, dam settlement and sliding, high-risk slope displacement, heritage bridges and long tunnels.", items: ["Long-span bridges", "Reservoir dams", "High-risk slopes", "Long tunnels"] }, { title: "Long-range Multi-target Capability", body: "One device can cover multiple points for deformation-trend tracking and anomaly warning, reducing manual inspection pressure in distant or high-risk areas." }, { title: "Long-term Warning Loop", body: "Can work with solar power, 4G/5G, video review, cloud monitoring platforms and on-site alarms for unattended projects." }], specs: [{ label: "Model", value: "SR-P300" }, { label: "Effective Range", value: "60-300 m" }, { label: "Communication", value: "4-20mA + HART" }, { label: "Displacement Recognition", value: "Down to the 0.01 mm level under stable laboratory conditions" }, { label: "Engineering Accuracy", value: "Subject to installation, target reflection, calibration and acceptance agreement" }, { label: "Protection", value: "IP67" }, { label: "Multi-target Capability", value: "Synchronized multi-target recognition" }], applications: ["Long-span bridges", "Reservoir dams", "High-risk slopes", "Long tunnels"], ctaTitle: "Need a long-range structural-warning solution?", ctaText: "Share the structure type, observation distance, number of targets, mounting location, power and communication conditions for SR-P300 solution design."
    }
  }
];

seoPages.push(...standaloneProductPages);

export function getSeoPage(kind: SeoPageKind, slug: string) {
  return seoPages.find((page) => page.kind === kind && page.slug === slug);
}

export function getSeoPagesByKind(kind: SeoPageKind) {
  return seoPages.filter((page) => page.kind === kind);
}

export function getSeoPagePath(page: Pick<SeoPage, "kind" | "slug">, lang: Lang = "zh") {
  const basePath = `/${page.kind}/${page.slug}`;
  return lang === "en" ? `/en${basePath}` : basePath;
}
