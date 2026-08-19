"use client";

import { useState, useMemo } from "react";
import { Product, Category } from "@/types";
import ProductCard from "@/components/shared/ProductCard";
import FilterSidebar, { SortOption } from "@/components/category/FilterSidebar";

interface CategoryContentProps {
  category: Category;
  products: Product[];
}

export default function CategoryContent({ category, products }: CategoryContentProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    if (sort === "name-asc") {
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-desc") {
      return [...products].sort((a, b) => b.name.localeCompare(a.name));
    }
    return products;
  }, [products, sort]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <p className="text-sm text-gray-500 mb-6">
        Trang chủ / <span className="text-gray-800 font-medium">{category.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-56 shrink-0">
          <FilterSidebar activeSort={sort} onSortChange={setSort} />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">{category.name}</h1>
            <span className="text-sm text-gray-500">{filtered.length} sản phẩm</span>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-16">Không có sản phẩm nào trong danh mục này.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
