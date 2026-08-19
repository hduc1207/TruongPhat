/**
 * Quản lý Auth Token qua Cookie.
 * Lưu ý: Cookie này được đọc bởi proxy.ts (server-side) và verify-token.ts (API Routes).
 */

const TOKEN_KEY = "admin_token";
const USER_KEY = "admin_user";

// Thêm Secure flag khi chạy trên production (HTTPS)
const isProduction = process.env.NODE_ENV === "production";
const SECURE_FLAG = isProduction ? "; Secure" : "";

export interface AdminUser {
  username: string;
  role: string;
}

// Lưu token vào cookie (1 ngày - giảm từ 30 xuống để an toàn hơn)
export function setToken(token: string): void {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  document.cookie = `${TOKEN_KEY}=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${SECURE_FLAG}`;
}

// Lấy token từ cookie
export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${TOKEN_KEY}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

// Xóa token (Đăng xuất)
export function removeToken(): void {
  document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `${USER_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Lưu thông tin user
export function setUser(user: AdminUser): void {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  document.cookie = `${USER_KEY}=${encodeURIComponent(JSON.stringify(user))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${SECURE_FLAG}`;
}

// Lấy thông tin user
export function getUser(): AdminUser | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${USER_KEY}=([^;]*)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

// Kiểm tra đã đăng nhập chưa
export function isAuthenticated(): boolean {
  return !!getToken();
}
