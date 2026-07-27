import "../globals.css";

export default function EnterpriseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><div data-design="enterprise">{children}</div></body></html>;
}
