"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        Đã xảy ra lỗi
      </h2>
      <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
        {error.message || "Không thể tải dữ liệu. Vui lòng thử lại."}
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={reset}
          className="bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors text-sm"
        >
          Thử lại
        </button>
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-amber-600 transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
