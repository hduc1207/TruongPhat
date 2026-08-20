"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { signInWithRedirect, signOut, fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

interface HeaderProps {
  categories?: any[];
}

export default function Header({ categories = [] }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [displayName, setDisplayName] = useState("Tài khoản");

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.tokens?.accessToken) {
          if (isMounted) {
            setIsLoggedIn(true);
            const groups = session.tokens.accessToken.payload["cognito:groups"] as string[] | undefined;
            setIsAdmin(groups?.includes("ADMIN") ?? false);
          }
          const user = await getCurrentUser();
          if (user && isMounted) {
            setDisplayName(user.signInDetails?.loginId || user.username);
          }
        } else {
          if (isMounted) setIsLoggedIn(false);
        }
      } catch (err) {
        if (isMounted) setIsLoggedIn(false);
      }
    };

    // Kiểm tra lúc mới load trang
    checkUser();

    // Lắng nghe sự kiện Auth từ Hub
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
        case "signedIn":
          checkUser();
          break;
        case "signedOut":
          setIsLoggedIn(false);
          setIsAdmin(false);
          setDisplayName("Tài khoản");
          break;
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    signInWithRedirect();
  };

  const handleLogout = () => {
    signOut();
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-white border-b border-stone-100 sticky top-0 z-50">
      <div className="bg-stone-800 text-stone-300 py-1.5 text-xs text-center font-medium tracking-wide">
        Xưởng gỗ nội thất cao cấp - Đặt theo yêu cầu - Bảo hành 12 tháng
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-stone-700 hover:text-amber-700 transition-colors"
            aria-label="Mở menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-amber-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div className="leading-tight">
              <p className="text-base font-bold text-stone-800 tracking-tight">GỖ TRƯỜNG PHÁT</p>
              <p className="text-[10px] text-stone-400 tracking-widest uppercase">Nội thất cao cấp</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <Link href="/" className="hover:text-amber-700 transition-colors">Trang chủ</Link>
            {categories.slice(0, 5).map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.slug}`} className="hover:text-amber-700 transition-colors whitespace-nowrap">
                {cat.name}
              </Link>
            ))}
            <Link href="/about" className="hover:text-amber-700 transition-colors">Giới thiệu</Link>
          </nav>


          <div className="flex items-center gap-3 shrink-0">
            {isLoggedIn ? (
              <div className="hidden lg:flex items-center gap-3">
                {isAdmin && (
                  <a
                    href="https://d2gsjrw8qdxah8.cloudfront.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Quản trị
                  </a>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-7 h-7 bg-stone-100 border border-stone-200 rounded-full flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <span className="text-stone-600 max-w-[130px] truncate text-xs">{displayName}</span>
                  <button onClick={handleLogout} className="text-stone-400 hover:text-red-500 transition-colors" title="Đăng xuất">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  </button>
                </div>
              </div>
            ) : (
              <a
                href="#"
                onClick={handleLoginClick}
                className="hidden lg:inline-flex items-center gap-1.5 text-stone-500 hover:text-amber-700 text-sm font-medium mr-2 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Đăng nhập</span>
              </a>
            )}

            <Link href="/contact" className="hidden md:inline-flex items-center gap-2 border border-amber-700 text-amber-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-700 hover:text-white transition-all">
              Liên hệ
            </Link>
            <a href="tel:0912345678" className="hidden md:inline-flex items-center gap-2 bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors">
              0912 345 678
            </a>
          </div>

        </div>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} categories={categories} />
    </header>
  );
}