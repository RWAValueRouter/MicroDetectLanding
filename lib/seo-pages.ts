import type { Lang } from "../app/seo";

export type SeoPageKind = "products" | "solutions";

export type SeoPage = {
  kind: SeoPageKind;
  slug: string;
  image: string;
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
        }
      ],
      specs: [
        { label: "推荐型号", value: "AR-FV100" },
        { label: "监测对象", value: "水面流速、流速趋势、异常突增" },
        { label: "典型范围", value: "0-20 m/s，具体以产品版本和现场工况为准" },
        { label: "交付组合", value: "雷达终端 + 供电 + 通信 + 平台预警" }
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
        }
      ],
      specs: [
        { label: "Recommended Model", value: "AR-FV100" },
        { label: "Monitoring Target", value: "Surface velocity, velocity trend and abnormal surge" },
        { label: "Typical Range", value: "0-20 m/s, subject to product version and site conditions" },
        { label: "Delivery Package", value: "Radar terminal + power + communication + platform warning" }
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
    slug: "flood-warning",
    image: "/hero/liquid-level.png",
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
