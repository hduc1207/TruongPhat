"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const handleAuthEvent = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.tokens?.accessToken) {
          if (isMounted) window.location.replace("/");
        }
      } catch (err) {
        if (isMounted) setErrorMsg("Lỗi khi kiểm tra token.");
      }
    };

    // 1. Thử kiểm tra luôn xem đã có session chưa (đề phòng Amplify đổi mã cực nhanh)
    handleAuthEvent();

    // 2. Lắng nghe Hub để biết khi nào Amplify xử lý xong cái URL
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signInWithRedirect") {
        handleAuthEvent();
      } else if (payload.event === "signInWithRedirect_failure") {
        if (isMounted) setErrorMsg("Quá trình đăng nhập bị từ chối hoặc sai state.");
      }
    });

    // 3. Nếu sau 10 giây mà vẫn không có động tĩnh gì (Amplify bị lỗi im lặng), báo lỗi cho người dùng biết
    timeoutId = setTimeout(() => {
      if (isMounted) setErrorMsg("Quá thời gian chờ xử lý đăng nhập (10s). Vui lòng thử lại.");
    }, 10000);

    return () => {
      isMounted = false;
      unsubscribe();
      clearTimeout(timeoutId);
    };
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
