"use client";

import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    const cognitoUrl = process.env.NEXT_PUBLIC_COGNITO_ADMIN_HOSTED_UI_URL;
    if (cognitoUrl) {
      window.location.href = cognitoUrl;
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-700 rounded-2xl mb-6 shadow-lg">
          <span className="text-white font-bold text-2xl">T</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">Go Truong Phat</h1>
        <p className="text-gray-500 text-sm mb-6">Dang chuyen huong den trang dang nhap...</p>
        <div className="flex justify-center gap-1.5">
          <span className="w-2 h-2 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        {!process.env.NEXT_PUBLIC_COGNITO_ADMIN_HOSTED_UI_URL && (
          <p className="text-red-500 text-xs mt-6">
            Chua cau hinh NEXT_PUBLIC_COGNITO_ADMIN_HOSTED_UI_URL trong .env.local
          </p>
        )}
      </div>
    </div>
  );
}
