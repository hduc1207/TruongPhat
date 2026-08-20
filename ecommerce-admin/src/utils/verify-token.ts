import { CognitoJwtVerifier } from "aws-jwt-verify";
import { cookies } from "next/headers";

const TOKEN_KEY = "admin_token";

export async function verifyAdminToken(providedToken?: string): Promise<boolean> {
  let token = providedToken;
  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get("admin_id_token")?.value || cookieStore.get("admin_token")?.value;
  }

  if (!token) return false;

  const userPoolId = "ap-southeast-1_vUxgZPCdU";
  const clientId = "1n00iku2aqmicd0ctuq51ijk7b";
  if (!userPoolId || !clientId) {
    const { createHmac } = await import("crypto");
    const TOKEN_SECRET = "change_this_secret";
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

