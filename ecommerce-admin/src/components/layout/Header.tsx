"use client";

import { useEffect, useState } from "react";
import { getUser, type AdminUser } from "@/utils/auth";

interface AdminHeaderProps {
  title: string;
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">{user?.username ?? "Admin"}</p>
          <p className="text-xs text-gray-400 capitalize">{user?.role ?? "Quản trị viên"}</p>
        </div>
        <div className="w-9 h-9 bg-[#1e2532] rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">
            {(user?.username ?? "A")[0].toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  );
}
