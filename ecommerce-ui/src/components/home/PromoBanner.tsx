import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="relative rounded-2xl overflow-hidden bg-stone-800 p-8 md:p-12 border border-stone-700 shadow-xl">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&w=1200&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-800/90 to-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl">
          <div>
            <p className="text-amber-500 text-xs font-semibold tracking-widest uppercase mb-2">
              Dịch vụ đặc quyền
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug">
              Miễn phí thiết kế 3D <br className="hidden md:block" />khi thi công nội thất nguyên căn
            </h3>
            <p className="text-stone-300 text-sm max-w-md leading-relaxed">
              Trải nghiệm không gian sống thực tế ảo trước khi sản xuất. Đội ngũ kiến trúc sư của Gỗ Trường Phát sẽ đồng hành cùng bạn từ ý tưởng đến hoàn thiện.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-amber-700 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-amber-800 active:scale-95 transition-all text-sm tracking-wide shadow-lg shadow-amber-900/20"
          >
            Nhận Tư Vấn Ngay
          </Link>
        </div>
      </div>
    </section>
  );
}
