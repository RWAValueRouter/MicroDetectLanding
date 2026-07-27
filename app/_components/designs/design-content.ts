export type DesignLang = "zh" | "en";
export type DesignVariant = "a" | "b" | "c" | "d" | "e" | "f";

type DesignCopy = {
  company: string;
  companyFull: string;
  nav: {
    products: string;
    solutions: string;
    cases: string;
    insights: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    primary: string;
    secondary: string;
  };
  section: {
    products: string;
    productsText: string;
    capabilities: string;
    capabilitiesText: string;
    solutions: string;
    solutionsText: string;
    cases: string;
    casesText: string;
    process: string;
    processText: string;
    contact: string;
    contactText: string;
  };
  labels: {
    viewProduct: string;
    viewSolution: string;
    viewCase: string;
    allProducts: string;
    allCases: string;
    live: string;
    online: string;
    model: string;
    application: string;
    monitoring: string;
    deployment: string;
    status: string;
    signal: string;
    system: string;
  };
  metrics: Array<{ value: string; label: string }>;
  capabilities: Array<{ index: string; title: string; text: string }>;
  process: Array<{ title: string; text: string }>;
  form: {
    name: string;
    company: string;
    contact: string;
    scene: string;
    message: string;
    submit: string;
    submitting: string;
    required: string;
    success: string;
    error: string;
    scenes: string[];
  };
};

export const designCopy: Record<DesignLang, DesignCopy> = {
  zh: {
    company: "析微探物",
    companyFull: "重庆析微探物科技有限公司",
    nav: {
      products: "产品",
      solutions: "方案",
      cases: "案例",
      insights: "行业洞察",
      contact: "项目咨询"
    },
    hero: {
      eyebrow: "Millimeter-wave Radar Intelligence",
      title: "毫米波雷达全域高精度监测",
      subtitle: "让复杂环境中的细微变化，成为可持续判断的数据。",
      description: "面向水利水文、工业过程与结构安全，提供从现场感知、边缘处理到平台预警的一体化监测能力。",
      primary: "获取行业方案",
      secondary: "浏览产品"
    },
    section: {
      products: "从监测对象出发，选择合适的雷达",
      productsText: "覆盖水流速、液位与物位，以及近、中、远距离结构形变监测。",
      capabilities: "从现场数据到业务预警",
      capabilitiesText: "设备、通信、平台与运维形成可长期运行的工程闭环。",
      solutions: "面向真实现场的成套方案",
      solutionsText: "针对部署距离、监测对象、供电通信与平台接口完成系统匹配。",
      cases: "工程结果，比参数更有说服力",
      casesText: "从桥梁挠度到河道水位流速，查看真实项目中的部署与数据价值。",
      process: "一套可以落地的交付路径",
      processText: "从现场勘察到长期运维，每一步都有明确输入和输出。",
      contact: "告诉我们现场条件，获得针对性方案",
      contactText: "提交监测对象、安装距离、供电通信和平台接口要求，析微探物将尽快联系您。"
    },
    labels: {
      viewProduct: "查看产品",
      viewSolution: "查看方案",
      viewCase: "查看案例",
      allProducts: "全部产品",
      allCases: "全部案例",
      live: "实时",
      online: "在线",
      model: "型号",
      application: "应用",
      monitoring: "监测内容",
      deployment: "部署",
      status: "状态",
      signal: "信号",
      system: "系统"
    },
    metrics: [
      { value: "0.01 mm", label: "实验室稳定条件位移识别" },
      { value: "0–300 m", label: "近中远距离产品覆盖" },
      { value: "24/7", label: "连续在线监测" },
      { value: "端·边·云", label: "一体化工程交付" }
    ],
    capabilities: [
      { index: "01", title: "现场感知", text: "流速、液位、物位与结构形变等关键参数采集。" },
      { index: "02", title: "边缘处理", text: "目标提取、异常识别、本地缓存与设备诊断。" },
      { index: "03", title: "多制式传输", text: "RS485、HART、4-20mA、以太网与无线通信。" },
      { index: "04", title: "平台分析", text: "实时趋势、阈值告警、报表与多站点管理。" }
    ],
    process: [
      { title: "现场勘察", text: "确认对象、距离、视线、供电、通信与环境干扰。" },
      { title: "方案设计", text: "完成设备选型、布点、接口和平台功能设计。" },
      { title: "安装标定", text: "完成支架、设备、通信部署和参数标定。" },
      { title: "平台验证", text: "验证实时数据、趋势、告警规则和报表。" },
      { title: "持续运维", text: "远程诊断、算法升级、故障响应与服务报告。" }
    ],
    form: {
      name: "姓名",
      company: "公司 / 单位",
      contact: "手机或邮箱",
      scene: "关注场景",
      message: "项目需求",
      submit: "提交需求",
      submitting: "正在提交",
      required: "请填写姓名、公司/单位和联系方式。",
      success: "提交成功，析微探物将尽快与您联系。",
      error: "提交失败，请稍后重试。",
      scenes: ["水域监测", "工业过程监测", "结构安全监测", "整体解决方案"]
    }
  },
  en: {
    company: "MicroDetect",
    companyFull: "Chongqing MicroDetect Technology Co., Ltd.",
    nav: {
      products: "Products",
      solutions: "Solutions",
      cases: "Cases",
      insights: "Insights",
      contact: "Contact"
    },
    hero: {
      eyebrow: "Millimeter-wave Radar Intelligence",
      title: "High-precision mmWave radar monitoring",
      subtitle: "Turn subtle change in harsh environments into continuous, actionable data.",
      description: "Integrated field sensing, edge processing and platform warning for water, industrial process and structural safety.",
      primary: "Get a solution",
      secondary: "Explore products"
    },
    section: {
      products: "Choose radar by monitoring target",
      productsText: "Flow velocity, liquid and material level, plus near-, mid- and long-range structural deformation monitoring.",
      capabilities: "From field data to operational warning",
      capabilitiesText: "Devices, communication, analytics and service form a system built for long-term operation.",
      solutions: "Turnkey systems for real operating sites",
      solutionsText: "Match observation range, target, power, communication and platform interfaces to each project.",
      cases: "Engineering results carry more weight than claims",
      casesText: "Explore real deployments from bridge deflection to integrated river level and flow monitoring.",
      process: "A delivery path built to reach operation",
      processText: "Every phase from survey to ongoing service has defined inputs and outputs.",
      contact: "Share your site conditions for a focused proposal",
      contactText: "Tell us the target, range, power, communication and platform requirements. We will contact you shortly."
    },
    labels: {
      viewProduct: "View product",
      viewSolution: "View solution",
      viewCase: "View case",
      allProducts: "All products",
      allCases: "All cases",
      live: "Live",
      online: "Online",
      model: "Model",
      application: "Application",
      monitoring: "Monitoring",
      deployment: "Deployment",
      status: "Status",
      signal: "Signal",
      system: "System"
    },
    metrics: [
      { value: "0.01 mm", label: "Displacement recognition under stable lab conditions" },
      { value: "0–300 m", label: "Near-, mid- and long-range portfolio" },
      { value: "24/7", label: "Continuous online monitoring" },
      { value: "Field·Edge·Cloud", label: "Integrated delivery" }
    ],
    capabilities: [
      { index: "01", title: "Field sensing", text: "Capture flow, level, material level and structural deformation." },
      { index: "02", title: "Edge processing", text: "Target extraction, anomaly detection, local caching and diagnostics." },
      { index: "03", title: "Flexible transmission", text: "RS485, HART, 4-20mA, Ethernet and wireless communication." },
      { index: "04", title: "Platform analytics", text: "Live trends, alerts, reports and multi-site management." }
    ],
    process: [
      { title: "Site survey", text: "Confirm target, distance, line of sight, power, communication and interference." },
      { title: "System design", text: "Define equipment, monitoring points, interfaces and platform functions." },
      { title: "Install and calibrate", text: "Deploy supports, devices and communication, then calibrate parameters." },
      { title: "Platform validation", text: "Verify live data, trends, alert rules and reports." },
      { title: "Ongoing service", text: "Remote diagnostics, algorithm updates, response and service reporting." }
    ],
    form: {
      name: "Name",
      company: "Company / Organization",
      contact: "Phone or email",
      scene: "Scenario",
      message: "Project needs",
      submit: "Submit inquiry",
      submitting: "Submitting",
      required: "Please enter your name, organization and contact information.",
      success: "Submitted successfully. MicroDetect will contact you shortly.",
      error: "Submission failed. Please try again later.",
      scenes: ["Water monitoring", "Industrial process", "Structural safety", "Integrated solution"]
    }
  }
};

export const featuredProductSlugs = ["radar-flow-meter", "ar-ls300", "sr-p300"] as const;
export const featuredSolutionSlugs = [
  "flood-warning",
  "industrial-level-monitoring",
  "bridge-monitoring",
  "dam-slope-monitoring"
] as const;
