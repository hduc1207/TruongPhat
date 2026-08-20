import type { Metadata } from "next";
import "./globals.css";
import AmplifyConfigure from '@/components/AmplifyConfigure';
import AuthGuard from '@/components/AuthGuard';

export const metadata: Metadata = {
  title: "Admin Panel - Gỗ Trường Phát",
  description: "Trang quản trị nội bộ - Gỗ Trường Phát",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <AmplifyConfigure />
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
