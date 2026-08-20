import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ZaloWidget from "@/components/layout/ZaloWidget";
import { getCategories } from "@/services/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gá»— TrÆ°á»ng PhÃ¡t | XÆ°á»Ÿng Ná»™i Tháº¥t Gá»— Cao Cáº¥p",
  description:
    "Gá»— TrÆ°á»ng PhÃ¡t â€” XÆ°á»Ÿng sáº£n xuáº¥t Ä‘á»“ gá»— ná»™i tháº¥t cao cáº¥p theo yÃªu cáº§u. Sofa, giÆ°á»ng, tá»§, bÃ n Äƒn tá»« gá»— tá»± nhiÃªn. Báº£o hÃ nh 12 thÃ¡ng.",
  keywords: "ná»™i tháº¥t gá»—, Ä‘á»“ gá»— cao cáº¥p, xÆ°á»Ÿng gá»—, sofa gá»—, giÆ°á»ng gá»—, tá»§ gá»—",
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
