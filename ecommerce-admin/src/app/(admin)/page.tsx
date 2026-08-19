import AdminHeader from "@/components/layout/Header";
import type { Product } from "@/services/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function fetchProductsServer(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.value ?? []);
  } catch {
    return [];
  }
}

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: string;
  color?: string;
}

function StatCard({ label, value, sub, trend, color = "bg-blue-50 text-blue-600" }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
        <div className="flex items-baseline gap-3">
          <p className="text-3xl font-bold text-gray-800 tracking-tight">{value}</p>
          {trend && (
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              {trend}
            </span>
          )}
        </div>
        {sub && <p className="text-xs text-gray-400 mt-2">{sub}</p>}
      </div>
      <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-50 ${color}`} />
    </div>
  );
}

export default async function DashboardPage() {
  const products = await fetchProductsServer();

  const withCategory = products.filter((p) => p.category !== null).length;

  return (
    <>
      <AdminHeader title="Tổng quan Showroom" />
      <main className="flex-1 p-6 bg-gray-50/50">
        
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Xin chào, Admin!</h1>
          <p className="text-gray-500 mt-1">Dưới đây là thống kê tình hình hoạt động của showroom Gỗ Trường Phát.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Sản phẩm trưng bày"
            value={products.length}
            sub={`${withCategory} sản phẩm đã phân loại`}
            color="bg-blue-100"
          />
          <StatCard
            label="Yêu cầu báo giá mới"
            value="12"
            trend="+3 hôm nay"
            sub="Cần phản hồi qua Zalo/SĐT"
            color="bg-amber-100"
          />
          <StatCard
            label="Lượt xem website"
            value="2,845"
            trend="+15%"
            sub="Trong 7 ngày qua"
            color="bg-purple-100"
          />
          <StatCard
            label="Lượt click Zalo"
            value="142"
            trend="+8%"
            sub="Tỷ lệ chuyển đổi tốt"
            color="bg-green-100"
          />
        </div>

        {/* Danh sách sản phẩm mới nhất */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Sản phẩm vừa cập nhật</h2>
            <a href="/products" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Quản lý sản phẩm →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-left text-xs text-gray-500 font-semibold px-6 py-3.5 uppercase tracking-wider">Tên sản phẩm</th>
                  <th className="text-left text-xs text-gray-500 font-semibold px-6 py-3.5 uppercase tracking-wider">Chất liệu</th>
                  <th className="text-left text-xs text-gray-500 font-semibold px-6 py-3.5 uppercase tracking-wider">Danh mục</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-400">Chưa có dữ liệu</td>
                  </tr>
                ) : (
                  products.slice(0, 5).map((p) => (
                    <tr key={p.productId} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{p.name}</td>
                      <td className="px-6 py-4 text-gray-500">{p.material || "—"}</td>
                      <td className="px-6 py-4">
                        {p.category ? (
                          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200">
                            {p.category}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">Chưa phân loại</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
