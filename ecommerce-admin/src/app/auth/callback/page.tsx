"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "error">("verifying");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.includes("access_token=")) {
      setStatus("error");
      setErrorMsg("Không tìm thấy token. Vui lòng thử đăng nhập lại.");
      return;
    }

    const params = new URLSearchParams(hash.substring(1));
    const token = params.get("access_token");
    if (!token) {
      setStatus("error");
      setErrorMsg("Token không hợp lệ.");
      return;
    }

    // Gửi token lên server để xác minh + kiểm tra quyền Admin
    fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          // Xóa hash khỏi URL rồi vào dashboard
          window.history.replaceState(null, "", "/");
          router.replace("/");
        } else {
          setStatus("error");
          setErrorMsg(data.error || "Bạn không có quyền truy cập trang quản trị.");
        }
      })
      .catch(() => {
        setStatus("error");
        setErrorMsg("Lỗi kết nối. Vui lòng thử lại.");
      });
  }, [router]);

  if (status === "error") {
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-8 text-center max-w-md w-full">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Truy cập bị từ chối</h2>
          <p className="text-sm text-gray-500 mb-6">{errorMsg}</p>
          <a
            href="/login"
            className="inline-block bg-amber-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-amber-800 transition-colors"
          >
            Đăng nhập lại
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-700 rounded-2xl mb-6 shadow-lg">
          <span className="text-white font-bold text-2xl">T</span>
        </div>
        <p className="text-gray-500 text-sm mb-6">Đang xác minh quyền truy cập...</p>
        <div className="flex justify-center gap-1.5">
          <span className="w-2 h-2 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
