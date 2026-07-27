import "../globals.css";

export default function EditorialLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><div data-design="editorial">{children}</div></body></html>;
}
