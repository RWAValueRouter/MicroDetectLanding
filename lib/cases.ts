import type { Lang } from "../app/seo";

type LocalizedCaseContent = {
  category: string;
  title: string;
  summary: string;
  location: string;
  system: string;
  monitoring: string;
  deployment: string;
  results: Array<{ label: string; value: string }>;
  highlights: string[];
};

export type CaseStudy = {
  slug: string;
  image: string;
  gallery: string[];
  zh: LocalizedCaseContent;
  en: LocalizedCaseContent;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "g75-bridge-health-monitoring",
    image: "/cases/bridge-field-survey.png",
    gallery: ["/cases/bridge-field-survey.png", "/cases/bridge-health-platform.png", "/brochure/bridge-field-survey-portrait.png", "/brochure/bridge-radar-installation.jpeg", "/brochure/bridge-radar-field-installation.jpeg", "/brochure/bridge-monitoring-platform.png"],
    zh: {
      category: "桥梁结构健康监测",
      title: "G75 高速桥梁结构健康监测示范",
      summary: "采用 SR-I100 近距离多参数一体化雷达，对桥梁关键部位进行非接触式在线监测，并接入平台实现告警与趋势追踪。",
      location: "G75 兰海高速桥梁示范点",
      system: "SR-I100 + 通信模块 + 桥梁健康监测平台",
      monitoring: "桥梁姿态、关键点位位移与异常趋势",
      deployment: "桥下现场勘察、独立支撑布设、在线数据接入与告警规则配置。",
      results: [
        { label: "示范识别精度", value: "0.04 mm" },
        { label: "平均报警处理时间", value: "约 0.95 s" },
        { label: "运行方式", value: "非接触式长期在线" }
      ],
      highlights: ["桥下非接触部署", "连续趋势数据", "平台告警与追溯"]
    },
    en: {
      category: "Bridge Structural Health Monitoring",
      title: "G75 Highway Bridge Health Monitoring Demonstration",
      summary: "An SR-I100 near-range multi-parameter radar was deployed for non-contact online monitoring of key bridge points, with trend tracking and alerts on the platform.",
      location: "G75 Lanzhou-Haikou Expressway bridge demonstration site",
      system: "SR-I100 + communication module + bridge health monitoring platform",
      monitoring: "Bridge posture, key-point displacement and anomaly trends",
      deployment: "Under-bridge survey, independent support installation, online data connection and alert-rule configuration.",
      results: [
        { label: "Demonstration recognition", value: "0.04 mm" },
        { label: "Average alert handling", value: "Approx. 0.95 s" },
        { label: "Operation", value: "Long-term non-contact online" }
      ],
      highlights: ["Under-bridge non-contact deployment", "Continuous trend data", "Platform alerts and traceability"]
    }
  },
  {
    slug: "urban-bridge-dynamic-deflection",
    image: "/cases/bridge-deflection-test.png",
    gallery: ["/cases/bridge-deflection-test.png", "/cases/bridge-deflection-multi-point.png", "/brochure/bridge-deflection-run-one.png", "/brochure/bridge-deflection-run-two.png", "/brochure/bridge-temperature-displacement.png", "/brochure/bridge-relative-displacement.jpeg"],
    zh: {
      category: "桥梁动挠度测量",
      title: "重庆内环快速路桥梁动挠度雷达测量",
      summary: "采用 SR-M200 中距离 MIMO 监测雷达开展桥梁动挠度示范测量，验证单个截面多测点同步采集能力。",
      location: "重庆内环快速路桥梁示范点",
      system: "SR-M200 + 多反射目标 + 数据分析平台",
      monitoring: "车辆荷载下的主梁动挠度与多测点变化",
      deployment: "桥下中距离布设，针对主梁断面设置多个同步监测点。",
      results: [
        { label: "同步测点", value: "10 个" },
        { label: "既有荷载试验参考", value: "约 1.64 mm" },
        { label: "本次最大挠度", value: "约 1.61 mm" }
      ],
      highlights: ["多点同步测量", "动态挠度曲线", "与既有测试结果对照"]
    },
    en: {
      category: "Bridge Dynamic Deflection Measurement",
      title: "Chongqing Inner Ring Bridge Dynamic Deflection Measurement",
      summary: "An SR-M200 mid-range MIMO radar was used in a bridge dynamic deflection demonstration to verify synchronized multi-point sensing across one section.",
      location: "Chongqing Inner Ring Expressway bridge demonstration site",
      system: "SR-M200 + multiple reflective targets + data analysis platform",
      monitoring: "Girder dynamic deflection and multi-point response under vehicle loading",
      deployment: "Mid-range under-bridge installation with synchronized points across the girder section.",
      results: [
        { label: "Synchronized points", value: "10" },
        { label: "Reference load-test result", value: "Approx. 1.64 mm" },
        { label: "Measured peak deflection", value: "Approx. 1.61 mm" }
      ],
      highlights: ["Multi-point synchronized measurement", "Dynamic deflection curves", "Comparison with existing test data"]
    }
  },
  {
    slug: "beibei-bridge-online-monitoring",
    image: "/cases/tunnel-field-installation.jpeg",
    gallery: ["/cases/tunnel-field-installation.jpeg", "/cases/bridge-health-platform.png", "/brochure/tunnel-radar-installation.jpeg", "/brochure/tunnel-field-survey.jpeg"],
    zh: {
      category: "桥梁挠度在线监测",
      title: "重庆北碚桥梁挠度在线监测",
      summary: "采用 SR-P300 远距离相控阵雷达形成桥梁挠度连续趋势数据，为桥梁状态评估和风险预警提供依据。",
      location: "重庆市北碚区桥梁监测点",
      system: "SR-P300 + 远程通信 + 云监测平台",
      monitoring: "桥梁动挠度、长期趋势与异常变化",
      deployment: "面向远距离观测需求配置结构雷达、通信和云端阈值预警。",
      results: [
        { label: "推荐观测距离", value: "60-300 m" },
        { label: "监测方式", value: "多目标同步识别" },
        { label: "输出", value: "连续趋势与风险预警" }
      ],
      highlights: ["远距离观测", "多目标同步识别", "长期养护决策支持"]
    },
    en: {
      category: "Bridge Deflection Monitoring",
      title: "Chongqing Beibei Bridge Online Deflection Monitoring",
      summary: "An SR-P300 long-range phased-array radar generated continuous bridge-deflection trend data to support condition assessment and risk warning.",
      location: "Bridge monitoring site in Beibei, Chongqing",
      system: "SR-P300 + remote communication + cloud monitoring platform",
      monitoring: "Bridge dynamic deflection, long-term trends and abnormal change",
      deployment: "Structural radar, communication and cloud-based threshold alerts configured for long-range observation.",
      results: [
        { label: "Recommended observation range", value: "60-300 m" },
        { label: "Monitoring mode", value: "Multi-target synchronized sensing" },
        { label: "Output", value: "Continuous trends and risk alerts" }
      ],
      highlights: ["Long-range observation", "Multi-target synchronized sensing", "Long-term maintenance support"]
    }
  },
  {
    slug: "wanzhou-water-level-flow-monitoring",
    image: "/cases/drainage-installation-2.jpeg",
    gallery: ["/cases/drainage-installation-2.jpeg", "/cases/drainage-installation-1.jpeg", "/brochure/drainage-installation-wide.jpeg", "/brochure/drainage-installation-portrait.jpeg"],
    zh: {
      category: "水位流速一体化监测",
      title: "万州河道水位流速一体化在线监测",
      summary: "采用 AR-FV100 毫米波雷达水流速计，配套水位监测、太阳能供电和无线通信，为无人值守水文数据采集与防汛预警提供支撑。",
      location: "重庆万州智慧排水工程监测点",
      system: "AR-FV100 + 水位监测 + 太阳能供电 + 无线通信 + 平台预警",
      monitoring: "水流速、水位变化、趋势与异常突增",
      deployment: "面向野外无人值守点位，完成设备、供电、通信和平台的一体化部署。",
      results: [
        { label: "流速范围", value: "0-20 m/s" },
        { label: "部署方式", value: "非接触式在线监测" },
        { label: "站点能力", value: "太阳能与无线通信" }
      ],
      highlights: ["AR-FV100 水流速计", "水位流速协同监测", "无人值守防汛数据"]
    },
    en: {
      category: "Integrated Water Level and Flow Monitoring",
      title: "Wanzhou Online Water Level and Flow Monitoring",
      summary: "An AR-FV100 mmWave radar flow meter, paired with level monitoring, solar power and wireless communication, supports unattended hydrological data acquisition and flood warning.",
      location: "Wanzhou smart drainage monitoring site, Chongqing",
      system: "AR-FV100 + level monitoring + solar power + wireless communication + platform alerts",
      monitoring: "Surface velocity, level change, trends and abnormal surges",
      deployment: "Integrated device, power, communication and platform deployment for unattended field locations.",
      results: [
        { label: "Velocity range", value: "0-20 m/s" },
        { label: "Deployment", value: "Non-contact online monitoring" },
        { label: "Station capability", value: "Solar power and wireless communication" }
      ],
      highlights: ["AR-FV100 radar flow meter", "Combined level and flow sensing", "Unattended flood-control data"]
    }
  }
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getCasePath(caseStudy: CaseStudy, lang: Lang) {
  return `/${lang}/cases/${caseStudy.slug}`;
}
