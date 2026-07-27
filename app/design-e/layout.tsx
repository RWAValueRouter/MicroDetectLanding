import "../globals.css";

export default function GalleryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><div data-design="gallery">{children}</div></body></html>;
}
