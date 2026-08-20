"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/layout/Header";
import { getCategories, createCategory, updateCategory, deleteCategory, UnauthorizedError, type Category, type CategoryInput } from "@/services/api";

const EMPTY_FORM: CategoryInput = { name: "", slug: "", description: "" };

function toSlug(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<CategoryInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        window.location.replace("/login.html");
        return;
      }
      setError("Không thể tải danh mục từ server.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { load(); }, [load]);

  function openAdd() { setForm(EMPTY_FORM); setFormError(""); setEditing(null); setModal("add"); }
  
  function openEdit(c: Category) {
    setForm({ name: c.name, slug: c.slug, description: c.description });
    setFormError(""); setEditing(c); setModal("edit");
  }

  async function handleSave() {
    if (!form.name.trim()) { setFormError("Tên danh mục không được để trống."); return; }
    setSaving(true); setFormError("");
    try {
      const payload = { ...form, slug: form.slug || toSlug(form.name) };
      if (modal === "add") {
        const created = await createCategory(payload);
        setCategories((prev) => [created, ...prev]);
      } else if (editing) {
        const updated = await updateCategory(editing.categoryId, payload);
        setCategories((prev) => prev.map((c) => (c.categoryId === editing.categoryId ? updated : c)));
      }
      setModal(null);
    } catch (e) {
      if (e instanceof UnauthorizedError) { window.location.replace("/login.html"); return; }
      setFormError("Lưu thất bại. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Xóa danh mục "${name}"?`)) return;
    setDeleting(id);
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.categoryId !== id));
    } catch (e) {
      if (e instanceof UnauthorizedError) { window.location.replace("/login.html"); return; }
      alert("Xóa thất bại. Vui lòng thử lại.");
    } finally {
      setDeleting(null);
    }
  }

  const filtered = categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <AdminHeader title="Quản lý Danh mục" />
      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Tìm kiếm danh mục..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">{filtered.length} danh mục</span>
              <button onClick={load} className="px-3 py-2 border text-gray-600 text-sm rounded-lg hover:bg-gray-50">Tải lại</button>
              <button onClick={openAdd} className="px-4 py-2 bg-[#1e2532] text-white text-sm rounded-lg hover:bg-[#2a3347]">Thêm danh mục</button>
            </div>
          </div>
          {error && <div className="mx-6 mt-4 bg-amber-50 text-amber-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-400">Đang tải...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs text-gray-400 font-semibold px-6 py-3 uppercase">Tên danh mục</th>
                    <th className="text-left text-xs text-gray-400 font-semibold px-6 py-3 uppercase">Slug</th>
                    <th className="text-left text-xs text-gray-400 font-semibold px-6 py-3 uppercase">Mô tả</th>
                    <th className="text-right text-xs text-gray-400 font-semibold px-6 py-3 uppercase">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.length === 0 ? (
                    <tr><td colSpan={4} className="text-center py-12 text-gray-400">Chưa có danh mục nào.</td></tr>
                  ) : (
                    filtered.map((c) => (
                      <tr key={c.categoryId} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-medium text-gray-800">{c.name}</td>
                        <td className="px-6 py-4 text-gray-400 text-xs">{c.slug}</td>
                        <td className="px-6 py-4 text-gray-500">{c.description || "—"}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => openEdit(c)} className="text-xs text-blue-500 hover:underline mr-3">Sửa</button>
                          <button onClick={() => handleDelete(c.categoryId, c.name)} className="text-xs text-red-500 hover:underline">Xóa</button>
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

      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h2 className="font-semibold text-gray-800 mb-4">{modal === "add" ? "Thêm danh mục mới" : "Chỉnh sửa danh mục"}</h2>
            {formError && <div className="text-red-500 text-sm mb-4">{formError}</div>}
            <div className="space-y-4">
              <input type="text" placeholder="Tên danh mục" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="Slug (để trống tự tạo)" value={form.slug || ""} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              <textarea placeholder="Mô tả" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-600">Hủy</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#1e2532] text-white rounded-lg text-sm">{saving ? "Đang lưu..." : "Lưu"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
