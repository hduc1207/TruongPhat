"use client";

import { useState } from "react";
import { useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export default function ContactModal({ isOpen, onClose, productName }: ContactModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const defaultMessage = productName
    ? `Xin chào Gỗ Trường Phát, tôi muốn nhận báo giá cho sản phẩm: ${productName}.`
    : "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  function handleClose() {
    setSent(false);
    setForm({ name: "", phone: "", message: "" });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-800 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">Nhận Báo Giá</p>
            {productName && (
              <p className="text-stone-400 text-xs mt-0.5 truncate max-w-[260px]">{productName}</p>
            )}
          </div>
          <button onClick={handleClose} className="text-stone-400 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {sent ? (
          /* Success */
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-stone-800 font-bold text-lg mb-2">Đã gửi thành công!</h3>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              Gỗ Trường Phát sẽ liên hệ lại với bạn trong vòng 24 giờ để tư vấn và báo giá.
            </p>
            <button
              onClick={handleClose}
              className="bg-amber-700 text-white font-semibold px-8 py-2.5 rounded-xl hover:bg-amber-800 transition-colors text-sm"
            >
              Đóng
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                Họ tên *
              </label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                Số điện thoại *
              </label>
              <input
                type="tel"
                required
                placeholder="0912 345 678"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                Lời nhắn
              </label>
              <textarea
                rows={3}
                placeholder={defaultMessage || "Mô tả yêu cầu của bạn..."}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-700 text-white font-semibold py-3 rounded-xl hover:bg-amber-800 active:scale-[0.99] transition-all text-sm tracking-wide"
            >
              Gửi yêu cầu báo giá
            </button>
            <p className="text-center text-xs text-stone-400">
              Hoặc gọi trực tiếp:{" "}
              <a href="tel:0912345678" className="text-amber-700 font-semibold">
                0912 345 678
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
