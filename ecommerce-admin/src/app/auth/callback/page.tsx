"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "error">("verifying");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const verifier = sessionStorage.getItem("pkce_verifier");

    if (!code || !verifier) {
      setStatus("error");
      setErrorMsg("Không tìm thấy mã xác thực. Vui lòng đăng nhập lại.");
      return;
    }

    const domain = "https://ap-southeast-1vuxgzpcdu.auth.ap-southeast-1.amazoncognito.com";
    const clientId = "1n00iku2aqmicd0ctuq51ijk7b";
    const redirectUri = "https://d2gsjrw8qdxah8.cloudfront.net/auth/callback.html";

    const body = new URLSearchParams();
    body.append("grant_type", "authorization_code");
    body.append("client_id", clientId);
    body.append("code", code);
    body.append("redirect_uri", redirectUri);
    body.append("code_verifier", verifier);

    fetch(domain + "/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Đổi mã thất bại");
        return res.json();
      })
      .then((data) => {
        if (data.access_token) {
          document.cookie = "admin_token=" + data.access_token + "; path=/; max-age=3600; SameSite=Lax";
          document.cookie = "admin_id_token=" + data.id_token + "; path=/; max-age=3600; SameSite=Lax";
          sessionStorage.removeItem("pkce_verifier");
          window.location.href = "/";
        } else {
          setStatus("error");
          setErrorMsg("Không nhận được token.");
        }
      })
      .catch((err) => {
        setStatus("error");
        setErrorMsg(err.message || "Lỗi kết nối.");
      });
  }, [router]);

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-red-500">{errorMsg}</p>
        <button onClick={() => router.push("/login")} className="ml-4 underline">Thử lại</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <p>Đang xác minh...</p>
    </div>
  );
}
