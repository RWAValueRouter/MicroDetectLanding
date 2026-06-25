import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-12 text-3xl font-semibold leading-tight text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 text-2xl font-semibold leading-tight text-white">{children}</h3>
    ),
    p: ({ children }) => <p className="mt-5 leading-8 text-slate-300">{children}</p>,
    ul: ({ children }) => <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-slate-300">{children}</ul>,
    ol: ({ children }) => <ol className="mt-5 list-decimal space-y-3 pl-6 leading-8 text-slate-300">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    a: ({ children, href }) => (
      <a className="font-medium text-cyan underline-offset-4 transition hover:underline" href={href}>
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-4 border-cyan/60 bg-cyan/10 px-5 py-4 text-slate-300">
        {children}
      </blockquote>
    ),
    ...components
  };
}
