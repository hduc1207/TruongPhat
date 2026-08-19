import { CognitoJwtVerifier } from "aws-jwt-verify";
import { cookies } from "next/headers";

const TOKEN_KEY = "admin_token";

/**
 * Xác thực admin_token cookie bằng Public Key của AWS Cognito.
 * Không cần gọi lên AWS — thư viện tự cache Public Key.
 */
export async function verifyAdminToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_KEY)?.value;

  if (!token) return false;

  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;

  // Fallback: Nếu chưa cấu hình Cognito, dùng lại HMAC cũ để không break
  if (!userPoolId || !clientId) {
    const { createHmac } = await import("crypto");
    const TOKEN_SECRET = process.env.MOCK_TOKEN_SECRET ?? "change_this_secret";
    try {
      const [payload, sig] = token.split(".");
      if (!payload || !sig) return false;
      const expectedSig = createHmac("sha256", TOKEN_SECRET).update(payload).digest("hex");
      return sig === expectedSig;
    } catch {
      return false;
    }
  }

  try {
    const verifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse: "access",
      clientId,
    });
    const payload = await verifier.verify(token);
    // Phải thuộc group Admins
    const groups: string[] = (payload["cognito:groups"] as string[]) || [];
    return groups.includes("ADMIN");
  } catch {
    return false;
  }
}

