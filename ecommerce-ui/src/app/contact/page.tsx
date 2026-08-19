"use client";

import { useState } from "react";
import type { Metadata } from "next";

const INFO_ITEMS = [
  {
    label: "Địa chỉ",
    value: "123 Đường XYZ, Quận 1, TP. HCM",
    href: "https://maps.google.com",
  },
  { label: "Hotline", value: "0912 345 678", href: "tel:0912345678" },
  { label: "Email", value: "contact@gotruongphat.vn", href: "mailto:contact@gotruongphat.vn" },
  { label: "Giờ làm việc", value: "7:30 – 17:30 (Thứ 2 – Thứ 7)" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="bg-[#f9f6f2] min-h-screen">

      {/* Hero */}
      <section className="bg-stone-900 py-16 text-center">
        <p className="text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Liên hệ</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Hãy cho chúng tôi biết</h1>
        <p className="text-stone-400 text-sm max-w-md mx-auto">
          Chúng tôi luôn sẵn sàng lắng nghe và tư vấn miễn phí cho bạn.
        </p>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">

          {/* Info */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-stone-800">Thông tin liên hệ</h2>
            <div className="space-y-4">
              {INFO_ITEMS.map(({ label, value, href }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-stone-700 font-medium hover:text-amber-700 transition-colors text-sm">
                        {value}
                      </a>
                    ) : (
                      <p className="text-stone-700 font-medium text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-stone-100 shadow-sm h-52 bg-stone-200 flex items-center justify-center">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 text-sm hover:text-amber-700 transition-colors"
              >
                Xem trên Google Maps
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-stone-800 font-bold text-lg mb-2">Đã gửi!</h3>
                <p className="text-stone-500 text-sm">Chúng tôi sẽ liên hệ lại trong vòng 24 giờ.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-amber-700 text-sm font-medium hover:underline"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold text-stone-800 mb-6">Gửi yêu cầu tư vấn</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "name", label: "Họ tên *", placeholder: "Nguyễn Văn A", type: "text" },
                    { key: "phone", label: "Số điện thoại *", placeholder: "0912 345 678", type: "tel" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">{label}</label>
                      <input
                        type={type}
                        required
                        placeholder={placeholder}
                        value={(form as any)[key]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Lời nhắn</label>
                    <textarea
                      rows={4}
                      placeholder="Mô tả nhu cầu của bạn: loại sản phẩm, kích thước, phòng cần trang trí..."
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-700 text-white font-semibold py-3 rounded-xl hover:bg-amber-800 active:scale-[0.99] transition-all text-sm tracking-wide"
                  >
                    Gửi yêu cầu
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
