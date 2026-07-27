import "../globals.css";

export default function CommandLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><div data-design="command">{children}</div></body></html>;
}
