"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/layout/Header";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  UnauthorizedError,
  type Product,
  type ProductInput,
} from "@/services/api";

const EMPTY_FORM: ProductInput = {
  name: "",
  slug: "",
  description: "",
  material: "",
  color: "",
  dimensions: "",
  price: 0,
  category: null,
};

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Modal state
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        router.replace("/login?redirect=/products");
        return;
      }
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { load(); }, [load]);

  // ── Mở modal ──────────────────────────────────────────────────────────────
  function openAdd() {
    setForm(EMPTY_FORM);
    setFormError("");
    setEditing(null);
    setModal("add");
  }

  function openEdit(p: Product) {
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      material: p.material,
      color: p.color,
      dimensions: p.dimensions,
      price: p.price,
      category: p.category,
    });
    setFormError("");
    setEditing(p);
    setModal("edit");
  }

  // ── Lưu ───────────────────────────────────────────────────────────────────
  async function handleSave() {
    if (!form.name.trim()) { setFormError("Tên sản phẩm không được để trống."); return; }
    setSaving(true);
    setFormError("");
    try {
      const payload = { ...form, slug: form.slug || toSlug(form.name) };
      if (modal === "add") {
        const created = await createProduct(payload);
        setProducts((prev) => [created, ...prev]);
      } else if (editing) {
        const updated = await updateProduct(editing.productId, payload);
        setProducts((prev) =>
          prev.map((p) => (p.productId === editing.productId ? updated : p))
        );
      }
      setModal(null);
    } catch (e) {
      if (e instanceof UnauthorizedError) { router.replace("/login"); return; }
      setFormError("Lưu thất bại. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  }

  // ── Xóa ───────────────────────────────────────────────────────────────────
  async function handleDelete(id: string, name: string) {
    if (!confirm(`Xóa sản phẩm "${name}"?`)) return;
    setDeleting(id);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.productId !== id));
    } catch (e) {
      if (e instanceof UnauthorizedError) { router.replace("/login"); return; }
      alert("Xóa thất bại. Vui lòng thử lại.");
    } finally {
      setDeleting(null);
    }
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.material ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AdminHeader title="Quản lý Sản phẩm" />
      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
            <div className="relative w-full sm:w-72">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm text-gray-400">{filtered.length} sản phẩm</span>
              <button onClick={load} className="px-3 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                Tải lại
              </button>
              <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2 bg-[#1e2532] text-white text-sm font-medium rounded-lg hover:bg-[#2a3347] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                Thêm sản phẩm
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-6 mt-4 bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-600">{error}</div>
          )}

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs text-gray-400 font-semibold px-6 py-3 uppercase tracking-wider">Tên sản phẩm</th>
                    <th className="text-left text-xs text-gray-400 font-semibold px-6 py-3 uppercase tracking-wider hidden md:table-cell">Chất liệu</th>
                    <th className="text-left text-xs text-gray-400 font-semibold px-6 py-3 uppercase tracking-wider hidden lg:table-cell">Kích thước</th>
                    <th className="text-left text-xs text-gray-400 font-semibold px-6 py-3 uppercase tracking-wider hidden md:table-cell">Danh mục</th>
                    <th className="text-right text-xs text-gray-400 font-semibold px-6 py-3 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-gray-400 text-sm">
                        {search ? "Không tìm thấy sản phẩm phù hợp." : "Chưa có sản phẩm nào."}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((p) => (
                      <tr key={p.productId} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-800">{p.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[220px]">{p.description}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{p.material || "—"}</td>
                        <td className="px-6 py-4 text-gray-500 hidden lg:table-cell font-mono text-xs">{p.dimensions || "—"}</td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          {p.category
                            ? <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">{p.category}</span>
                            : <span className="bg-gray-100 text-gray-400 text-xs font-medium px-2.5 py-1 rounded-full">Chưa phân loại</span>}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => openEdit(p)}
                              className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors"
                            >
                              Sửa
                            </button>
                            <button
                              onClick={() => handleDelete(p.productId, p.name)}
                              disabled={deleting === p.productId}
                              className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors disabled:opacity-40"
                            >
                              {deleting === p.productId ? "Đang xóa..." : "Xóa"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal Thêm / Sửa */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">
                {modal === "add" ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
              </h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-600">{formError}</div>
              )}

              {/* Upload Image Mock UI */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Hình ảnh sản phẩm</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Kéo thả ảnh vào đây, hoặc <span className="text-blue-600">chọn file</span></p>
                  <p className="text-xs text-gray-400 mb-4">Hỗ trợ JPG, PNG (Tối đa 5MB)</p>
                  
                  {/* Fallback to text input for now since no backend S3 */}
                  <div className="relative mt-2" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      placeholder="Hoặc nhập Link ảnh tạm thời..."
                      value={(form as any).image ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                    />
                  </div>
                </div>
              </div>

              {[
                { key: "name", label: "Tên sản phẩm *", placeholder: "VD: Sofa gỗ teak 3 chỗ", type: "text" },
                { key: "slug", label: "Slug (để trống sẽ tự tạo)", placeholder: "vd: sofa-go-teak-3-cho", type: "text" },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={(form as any)[key] ?? ""}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, [key]: e.target.value || null }));
                      if (key === "name" && formError) setFormError(""); // Clear error on type
                    }}
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                      key === "name" && formError ? "border-red-300 focus:ring-red-500 bg-red-50" : "border-gray-200 focus:ring-blue-500"
                    }`}
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "category", label: "Danh mục", placeholder: "VD: sofa-salon" },
                  { key: "material", label: "Chất liệu", placeholder: "VD: Gỗ teak nguyên khối" },
                  { key: "color", label: "Màu sắc", placeholder: "VD: Nâu tự nhiên" },
                  { key: "dimensions", label: "Kích thước", placeholder: "VD: D220 x R90 x C85 cm" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={(form as any)[key] ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value || null }))}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mô tả chi tiết</label>
                <textarea
                  placeholder="Mô tả sản phẩm, ưu điểm, không gian phù hợp..."
                  value={form.description ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-[#1e2532] text-white text-sm font-medium rounded-lg hover:bg-[#2a3347] transition-colors disabled:opacity-60"
              >
                {saving ? "Đang lưu..." : modal === "add" ? "Thêm sản phẩm" : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
