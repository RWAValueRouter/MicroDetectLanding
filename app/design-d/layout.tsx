import "../globals.css";

export default function TerminalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><div data-design="terminal">{children}</div></body></html>;
}
