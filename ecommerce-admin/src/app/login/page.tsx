"use client";
import { useEffect } from "react";

function generateRandomString(length: number) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const values = crypto.getRandomValues(new Uint8Array(length));
  for (let i = 0; i < length; i++) {
    result += charset[values[i] % charset.length];
  }
  return result;
}

async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function LoginPage() {
  useEffect(() => {
    async function initLogin() {
      const verifier = generateRandomString(128);
      const challenge = await generateCodeChallenge(verifier);

      sessionStorage.setItem("pkce_verifier", verifier);

      const domain = "https://ap-southeast-1vuxgzpcdu.auth.ap-southeast-1.amazoncognito.com";
      const clientId = "1n00iku2aqmicd0ctuq51ijk7b";
      const redirectUri = "https://d2gsjrw8qdxah8.cloudfront.net/auth/callback.html";

      const loginUrl = domain + "/login?client_id=" + clientId + "&response_type=code&scope=email+openid&redirect_uri=" + encodeURIComponent(redirectUri) + "&code_challenge=" + challenge + "&code_challenge_method=S256";
      
      window.location.href = loginUrl;
    }
    initLogin();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-gray-500 text-sm mb-6">Dang chuyen huong den trang dang nhap...</p>
      </div>
    </div>
  );
}
