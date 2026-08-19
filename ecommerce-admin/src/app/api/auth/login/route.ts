import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const MOCK_USERNAME = process.env.MOCK_ADMIN_USERNAME ?? "";
const MOCK_PASSWORD = process.env.MOCK_ADMIN_PASSWORD ?? "";
const TOKEN_SECRET = process.env.MOCK_TOKEN_SECRET ?? "change_this_secret";
const TOKEN_KEY = "admin_token";

/**
 * Tạo token có chữ ký HMAC-SHA256.
 * Format: base64(payload).signature
 */
function createSignedToken(username: string): string {
  const payload = Buffer.from(
    JSON.stringify({ username, role: "admin", iat: Date.now() })
  ).toString("base64url");
  const sig = createHmac("sha256", TOKEN_SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body ?? {};

    if (!username || !password) {
      return NextResponse.json({ error: "Thiếu thông tin đăng nhập" }, { status: 400 });
    }

    const bufUser = Buffer.from(username);
    const bufMockUser = Buffer.from(MOCK_USERNAME);
    const usernameMatch = bufUser.length === bufMockUser.length && timingSafeEqual(bufUser, bufMockUser);

    const bufPass = Buffer.from(password);
    const bufMockPass = Buffer.from(MOCK_PASSWORD);
    const passwordMatch = bufPass.length === bufMockPass.length && timingSafeEqual(bufPass, bufMockPass);

    if (!usernameMatch || !passwordMatch) {
      // Delay nhỏ để hạn chế brute-force
      await new Promise((r) => setTimeout(r, 500));
      return NextResponse.json({ error: "Sai thông tin đăng nhập" }, { status: 401 });
    }

    const token = createSignedToken(username);

    // Gửi token qua response body để client tự set cookie
    return NextResponse.json({ token, role: "admin" });
  } catch {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
