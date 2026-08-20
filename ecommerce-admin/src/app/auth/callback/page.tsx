"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;
    
    const checkSession = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.tokens?.accessToken) {
          if (isMounted) window.location.replace("/");
        } else {
          setTimeout(async () => {
            try {
              const retrySession = await fetchAuthSession();
              if (retrySession.tokens?.accessToken && isMounted) {
                window.location.replace("/");
              } else {
                if (isMounted) setErrorMsg("Đăng nhập thất bại.");
              }
            } catch (e) {
              if (isMounted) setErrorMsg("Lỗi xác minh phiên làm việc.");
            }
          }, 2000);
        }
      } catch (err) {
        if (isMounted) setErrorMsg("Xác minh thất bại.");
      }
    };
    
    checkSession();
    return () => { isMounted = false; };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {errorMsg ? (
        <div>
          <p className="text-red-500">{errorMsg}</p>
          <button onClick={() => router.push("/login")} className="underline mt-4 text-blue-500">Thử lại</button>
        </div>
      ) : (
        <p>Đang xử lý đăng nhập...</p>
      )}
    </div>
  );
}
