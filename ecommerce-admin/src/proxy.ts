import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/api/auth", "/auth/callback"];
const TOKEN_KEY = "admin_token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bỏ qua các đường dẫn công khai
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Kiểm tra token trong Cookie
  const token = request.cookies.get(TOKEN_KEY)?.value;

  if (!token) {
    // Không có token -> chuyển về trang đăng nhập
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Áp dụng cho tất cả các route, trừ _next và static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
