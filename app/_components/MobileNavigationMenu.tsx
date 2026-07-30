"use client";

import Link from "next/link";
import { useId, useState } from "react";

type NavigationItem = {
  label: string;
  href: string;
  active?: boolean;
};

type MobileNavigationMenuProps = {
  items: NavigationItem[];
  contactHref: string;
  contactLabel: string;
  menuLabel: string;
  closeLabel: string;
};

export default function MobileNavigationMenu({
  items,
  contactHref,
  contactLabel,
  menuLabel,
  closeLabel
}: MobileNavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? closeLabel : menuLabel}
        aria-controls={menuId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-cyan/30 bg-white/5 text-cyan transition hover:border-cyan hover:bg-cyan/10"
      >
        <span className={`h-px w-4 bg-current transition ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
        <span className={`h-px w-4 bg-current transition ${isOpen ? "opacity-0" : ""}`} />
        <span className={`h-px w-4 bg-current transition ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
      </button>

      {isOpen ? (
        <div id={menuId} className="fixed inset-x-0 top-[73px] border-b border-white/10 bg-ink/95 px-5 pb-6 pt-2 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto grid max-w-7xl border-t border-white/10">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                onClick={() => setIsOpen(false)}
                className={`border-b border-white/10 py-4 text-base transition hover:text-cyan ${
                  item.active ? "font-semibold text-cyan" : "text-slate-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={contactHref}
              onClick={() => setIsOpen(false)}
              className="mt-5 border border-cyan/35 bg-cyan/10 px-4 py-3 text-center text-sm font-semibold text-cyan transition hover:border-cyan hover:bg-cyan/15"
            >
              {contactLabel}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
