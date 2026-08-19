import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative min-h-[85vh] bg-stone-900 flex items-center overflow-hidden">

      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl">

          {/* Label */}
          <p className="text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            Xưởng Gỗ Trường Phát
          </p>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.12] mb-6">
            Nội Thất Gỗ
            <span className="block text-amber-400 mt-1">Theo Yêu Cầu</span>
          </h1>

          {/* Sub */}
          <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-10 max-w-md">
            Từng sản phẩm được làm thủ công từ gỗ tự nhiên, thiết kế theo đúng kích thước và phong cách của ngôi nhà bạn.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/categories/sofa-salon"
              className="bg-amber-600 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-amber-700 transition-colors text-sm tracking-wide"
            >
              Khám phá bộ sưu tập
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Nhận tư vấn miễn phí
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-12 text-stone-400 text-xs">
            {[
              "Gỗ tự nhiên 100%",
              "Bảo hành 12 tháng",
              "Thiết kế theo yêu cầu",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-500">
        <span className="text-[10px] tracking-widest uppercase">Cuộn xuống</span>
        <div className="w-0.5 h-6 bg-gradient-to-b from-stone-500 to-transparent" />
      </div>
    </section>
  );
}
