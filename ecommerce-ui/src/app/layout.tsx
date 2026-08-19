import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ZaloWidget from "@/components/layout/ZaloWidget";
import { getCategories } from "@/services/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gỗ Trường Phát | Xưởng Nội Thất Gỗ Cao Cấp",
  description:
    "Gỗ Trường Phát — Xưởng sản xuất đồ gỗ nội thất cao cấp theo yêu cầu. Sofa, giường, tủ, bàn ăn từ gỗ tự nhiên. Bảo hành 12 tháng.",
  keywords: "nội thất gỗ, đồ gỗ cao cấp, xưởng gỗ, sofa gỗ, giường gỗ, tủ gỗ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="vi">
      <body className={`${inter.className} flex flex-col min-h-screen bg-[#f9f6f2]`}>
        <Header categories={categories} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ZaloWidget />
      </body>
    </html>
  );
}