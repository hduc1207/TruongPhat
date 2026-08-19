import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Giới thiệu | Gỗ Trường Phát",
  description: "Tìm hiểu về xưởng sản xuất đồ gỗ nội thất Gỗ Trường Phát — 15 năm kinh nghiệm, sản phẩm thủ công từ gỗ tự nhiên.",
};

const STATS = [
  { value: "15+", label: "Năm kinh nghiệm" },
  { value: "2.000+", label: "Sản phẩm bàn giao" },
  { value: "98%", label: "Khách hàng hài lòng" },
  { value: "12", label: "Tháng bảo hành" },
];

const PROCESS = [
  { step: "01", title: "Tư vấn & Thiết kế", desc: "Gặp gỡ, lắng nghe yêu cầu và đề xuất phong cách phù hợp với không gian nhà bạn." },
  { step: "02", title: "Chọn vật liệu", desc: "Cùng bạn chọn loại gỗ, màu sơn, vải bọc phù hợp với ngân sách và thẩm mỹ." },
  { step: "03", title: "Sản xuất tại Xưởng", desc: "Thợ thủ công lành nghề gia công từng chi tiết, kiểm tra chất lượng từng công đoạn." },
  { step: "04", title: "Giao hàng & Lắp đặt", desc: "Vận chuyển và lắp đặt tận nơi, hướng dẫn bảo quản sản phẩm." },
];

export default function AboutPage() {
  return (
    <div className="bg-[#f9f6f2]">

      {/* Hero */}
      <section className="relative bg-stone-900 py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1600&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-stone-900/60" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4">Về chúng tôi</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Xưởng Gỗ Trường Phát
          </h1>
          <p className="text-stone-300 text-base max-w-2xl mx-auto leading-relaxed">
            15 năm chuyên tâm với nghề mộc thủ công — nơi từng miếng gỗ được lựa chọn kỹ lưỡng và từng đường nét được tạo ra với sự tỉ mỉ của người thợ lành nghề.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-stone-100">
              <p className="text-3xl font-bold text-amber-700 mb-1">{value}</p>
              <p className="text-stone-500 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-amber-700 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Câu chuyện của chúng tôi</p>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-5 leading-snug">
              Từ một xưởng nhỏ, đến hàng nghìn ngôi nhà
            </h2>
            <div className="space-y-4 text-stone-500 leading-relaxed text-sm">
              <p>
                Gỗ Trường Phát được thành lập năm 2009 bởi ông Nguyễn Trường Phát — người thợ mộc với hơn 20 năm trong nghề. Từ một xưởng nhỏ với vài người thợ, chúng tôi đã lớn lên cùng niềm tin của hàng nghìn khách hàng.
              </p>
              <p>
                Triết lý của chúng tôi luôn là: <strong className="text-stone-700">mỗi sản phẩm phải đẹp như chủ nhân của nó</strong>. Vì vậy, không sản phẩm nào được làm đại trà — tất cả đều được đo đạc, tư vấn và sản xuất theo đúng yêu cầu riêng của từng gia đình.
              </p>
              <p>
                Chúng tôi chỉ dùng gỗ tự nhiên có nguồn gốc rõ ràng, sơn PU thân thiện môi trường, và cam kết bảo hành 12 tháng cho mọi sản phẩm.
              </p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80"
              alt="Xưởng Gỗ Trường Phát"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-stone-800 py-16 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-center">Quy trình</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Từ ý tưởng đến sản phẩm
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <p className="text-5xl font-bold text-stone-700 mb-3">{step}</p>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-3">Sẵn sàng bắt đầu dự án?</h2>
        <p className="text-stone-500 mb-6 text-sm">Liên hệ để được tư vấn miễn phí và nhận báo giá chi tiết.</p>
        <Link
          href="/contact"
          className="inline-block bg-amber-700 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-amber-800 transition-colors text-sm"
        >
          Liên hệ ngay
        </Link>
      </section>
    </div>
  );
}
