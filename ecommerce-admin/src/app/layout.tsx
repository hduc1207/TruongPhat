import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Panel - Gá»— TrÆ°á»ng PhÃ¡t",
  description: "Trang quáº£n trá»‹ ná»™i bá»™ - Gá»— TrÆ°á»ng PhÃ¡t",
  robots: "noindex, nofollow",
};

import AmplifyConfigure from '@/components/AmplifyConfigure';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <AmplifyConfigure />
        {children}
      </body>
    </html>
  );
}

