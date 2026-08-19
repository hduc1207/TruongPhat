"use client";

import { useState } from "react";

const ZALO_URL = "https://zalo.me/0912345678";

export default function ZaloWidget() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <div
        className={`bg-stone-800 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
        }`}
      >
        Chat Zalo với chúng tôi
      </div>

      {/* Button */}
      <a
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-14 h-14 bg-[#0068FF] rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
        aria-label="Chat Zalo"
      >
        {/* Zalo "Z" text logo */}
        <span className="text-white font-bold text-xl tracking-tighter select-none">Z</span>

        {/* Pulse ring */}
        <span className="absolute w-14 h-14 rounded-full bg-[#0068FF] opacity-40 animate-ping" />
      </a>
    </div>
  );
}
