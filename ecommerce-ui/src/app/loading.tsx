import SkeletonCard from "@/components/shared/SkeletonCard";

export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="h-64 md:h-96 bg-gray-200 animate-pulse" />

      {/* Products skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-8 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
