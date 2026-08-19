"use client";

import Link from "next/link";
import { Category } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export default function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
            <span className="text-stone-800 font-bold text-sm">Gỗ Trường Phát</span>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4">
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest px-3 mb-2">Menu</p>
          {[
            { href: "/", label: "Trang chủ" },
            { href: "/about", label: "Giới thiệu" },
            { href: "/contact", label: "Liên hệ" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="block px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700 rounded-lg transition-colors"
            >
              {label}
            </Link>
          ))}

          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest px-3 mt-5 mb-2">Sản phẩm</p>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              onClick={onClose}
              className="block px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700 rounded-lg transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-stone-100 space-y-2">
          <a
            href="tel:0912345678"
            onClick={onClose}
            className="block w-full text-center bg-amber-700 text-white text-sm font-semibold py-3 rounded-xl hover:bg-amber-800 transition-colors"
          >
            Gọi: 0912 345 678
          </a>
          <a
            href="https://zalo.me/0912345678"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block w-full text-center border border-stone-200 text-stone-700 text-sm font-semibold py-3 rounded-xl hover:bg-stone-50 transition-colors"
          >
            Chat Zalo
          </a>
        </div>
      </div>
    </>
  );
}
