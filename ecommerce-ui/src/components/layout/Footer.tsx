import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 pt-14 pb-8 text-sm mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-amber-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">GỖ TRƯỜNG PHÁT</span>
            </div>
            <p className="text-stone-400 leading-relaxed mb-4 max-w-sm">
              Xưởng sản xuất đồ gỗ nội thất cao cấp theo yêu cầu. Cam kết chất lượng từ vật liệu đến từng chi tiết hoàn thiện.
            </p>
            <div className="space-y-1.5 text-stone-400">
              <p>Địa chỉ: 123 Đường XYZ, Quận 1, TP. HCM</p>
              <p>Hotline: <a href="tel:0912345678" className="text-amber-500 hover:text-amber-400">0912 345 678</a></p>
              <p>Email: <a href="mailto:contact@gotruongphat.vn" className="text-amber-500 hover:text-amber-400">contact@gotruongphat.vn</a></p>
            </div>
          </div>

          {/* Danh mục */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Sản phẩm</h3>
            <ul className="space-y-2.5">
              {["Sofa - Salon", "Giường ngủ", "Tủ quần áo", "Bàn ăn", "Kệ Tivi"].map((name) => (
                <li key={name}>
                  <a href="#" className="hover:text-amber-500 transition-colors">{name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Chính sách */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Thông tin</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="hover:text-amber-500 transition-colors">Giới thiệu</Link></li>
              <li><Link href="/contact" className="hover:text-amber-500 transition-colors">Liên hệ</Link></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Vận chuyển & Lắp đặt</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-stone-500 text-xs">
          <p>© {new Date().getFullYear()} Gỗ Trường Phát. All rights reserved.</p>
          <p>Thiết kế & Sản xuất tại Việt Nam</p>
        </div>
      </div>
    </footer>
  );
}
