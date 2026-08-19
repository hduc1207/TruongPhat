import { NextResponse } from "next/server";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { cookies } from "next/headers";

const ADMIN_GROUP = "ADMIN";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: "Thiếu token" }, { status: 400 });
    }

    const userPoolId = process.env.COGNITO_USER_POOL_ID;
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;

    if (!userPoolId || !clientId) {
      return NextResponse.json({ error: "Server chưa cấu hình Cognito" }, { status: 500 });
    }

    // Xác minh token bằng public key của AWS (không cần gọi lại AWS)
    const verifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse: "access",
      clientId,
    });

    const payload = await verifier.verify(token);

    // Kiểm tra user có thuộc Group Admins không
    const groups: string[] = (payload["cognito:groups"] as string[]) || [];
    if (!groups.includes(ADMIN_GROUP)) {
      return NextResponse.json(
        { error: "Tài khoản của bạn không có quyền truy cập trang quản trị." },
        { status: 403 }
      );
    }

    // Token hợp lệ và có quyền Admin → Set cookie an toàn
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      path: "/",
      maxAge: 60 * 60, // 1 giờ (bằng Access Token Cognito mặc định)
      sameSite: "lax",
      httpOnly: true, // Không cho JS đọc được cookie
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Token verification failed:", err?.message);
    return NextResponse.json(
      { error: "Token không hợp lệ hoặc đã hết hạn." },
      { status: 401 }
    );
  }
}
