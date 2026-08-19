export default function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-100 bg-white animate-pulse">
      {/* Ảnh */}
      <div className="aspect-square bg-gray-200" />
      {/* Nội dung */}
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mt-2" />
      </div>
    </div>
  );
}
