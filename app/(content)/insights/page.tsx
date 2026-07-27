import type { Metadata } from "next";
import InsightsContent from "../../_components/InsightsContent";

export const metadata: Metadata = {
  title: "行业洞察 | 析微探物",
  description: "析微探物行业洞察聚焦毫米波雷达、水利水文监测、工业物位监测、桥梁结构健康监测和非接触式在线感知技术。",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "行业洞察 | 析微探物",
    description: "聚焦毫米波雷达监测、非接触式在线感知、工业物位与结构安全监测的行业文章。",
    url: "/insights",
    siteName: "MicroDetect",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/hero/liquid-level.png", width: 1672, height: 941, alt: "析微探物行业洞察" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "行业洞察 | 析微探物",
    description: "毫米波雷达监测、非接触式在线感知与结构安全监测行业文章。",
    images: ["/hero/liquid-level.png"]
  }
};

export default function InsightsPage() {
  return <InsightsContent />;
}
