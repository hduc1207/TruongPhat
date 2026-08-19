"use client";

export type SortOption = "default" | "name-asc" | "name-desc";

interface FilterSidebarProps {
  onSortChange: (sort: SortOption) => void;
  activeSort: SortOption;
}

export default function FilterSidebar({ onSortChange, activeSort }: FilterSidebarProps) {
  return (
    <aside className="space-y-4">
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Sắp xếp theo</h3>
        <select
          value={activeSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        >
          <option value="default">Mặc định</option>
          <option value="name-asc">Tên A - Z</option>
          <option value="name-desc">Tên Z - A</option>
        </select>
      </div>
    </aside>
  );
}
