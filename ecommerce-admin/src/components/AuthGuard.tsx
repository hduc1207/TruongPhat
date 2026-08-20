"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const safePath = pathname || "";
    // Bỏ qua bảo vệ cho trang login và callback (kể cả có đuôi .html)
    if (safePath.startsWith("/login") || safePath.startsWith("/auth/callback")) {
      setAuthorized(true);
      return;
    }

    let isMounted = true;
    fetchAuthSession()
      .then((session) => {
        if (session.tokens?.accessToken) {
          if (isMounted) setAuthorized(true);
        } else {
          window.location.replace("/login.html");
        }
      })
      .catch(() => {
        window.location.replace("/login.html");
      });

    return () => { isMounted = false; };
  }, [pathname]);

  if (!authorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
