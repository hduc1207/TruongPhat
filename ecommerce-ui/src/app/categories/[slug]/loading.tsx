import SkeletonCard from "@/components/shared/SkeletonCard";

export default function CategoryLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-3 bg-gray-200 rounded w-40 mb-6" />
      <div className="h-8 bg-gray-200 rounded w-56 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-8 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-24 mt-4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded" />
          ))}
        </div>
        {/* Grid skeleton */}
        <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
