"use client";

import { useState } from "react";
import { Product, Category } from "@/types";
import ContactModal from "@/components/shared/ContactModal";

interface ProductInfoProps {
  product: Product;
  category?: Category;
}

export default function ProductInfo({ product, category }: ProductInfoProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const specs = [
    { label: "Chất liệu", value: product.material },
    { label: "Màu sắc", value: product.color },
    { label: "Kích thước", value: product.dimensions },
    { label: "Danh mục", value: category?.name },
  ].filter((s) => s.value);

  return (
    <>
      <div className="flex flex-col gap-6">

        {/* Title */}
        <div>
          {category && (
            <p className="text-xs text-amber-700 font-semibold tracking-widest uppercase mb-2">
              {category.name}
            </p>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-stone-800 leading-tight">
            {product.name}
          </h1>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-stone-500 text-sm leading-relaxed border-l-2 border-amber-600 pl-4">
            {product.description}
          </p>
        )}

        {/* Spec table */}
        {specs.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
              Thông số kỹ thuật
            </h3>
            <div className="rounded-xl overflow-hidden border border-stone-100">
              {specs.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`flex text-sm ${i % 2 === 0 ? "bg-stone-50" : "bg-white"}`}
                >
                  <span className="text-stone-400 font-medium px-4 py-3 min-w-[120px] border-r border-stone-100">
                    {label}
                  </span>
                  <span className="text-stone-700 px-4 py-3 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="border-t border-stone-100 pt-6 space-y-3">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full bg-amber-700 text-white font-semibold py-3.5 rounded-xl hover:bg-amber-800 active:scale-[0.99] transition-all text-sm tracking-wide"
          >
            Nhận Báo Giá
          </button>
          <a
            href="https://zalo.me/0912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 border border-stone-200 text-stone-700 font-semibold py-3.5 rounded-xl hover:bg-stone-50 transition-colors text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5H15l-2-3-2 3H9.5l3-4.5-3-4.5H11l2 3 2-3h1.5l-3 4.5 3 4.5z"/>
            </svg>
            Tư vấn qua Zalo
          </a>
        </div>

        {/* Policy strip */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs text-stone-500">
          {[
            ["Gỗ tự nhiên", "100% nguyên khối"],
            ["Bảo hành", "12 tháng"],
            ["Thiết kế", "Theo yêu cầu"],
          ].map(([title, sub]) => (
            <div key={title} className="bg-stone-50 rounded-lg py-3 px-2">
              <p className="font-semibold text-stone-700 mb-0.5">{title}</p>
              <p>{sub}</p>
            </div>
          ))}
        </div>
      </div>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={product.name}
      />
    </>
  );
}
