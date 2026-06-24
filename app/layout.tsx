import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "析微探物 | 毫米波雷达全域高精度监测系统",
  description:
    "重庆析微探物科技有限公司提供毫米波雷达非接触式在线监测方案，覆盖水利水文、工业物位与结构安全长期监测场景。",
  keywords: [
    "毫米波雷达监测",
    "水流速计",
    "雷达液位计",
    "工业物位计",
    "桥梁结构监测",
    "边坡位移监测",
    "大坝安全监测",
    "非接触式在线监测",
    "国产化替代"
  ],
  icons: {
    icon: [{ url: "/favicon.png", sizes: "64x64", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
