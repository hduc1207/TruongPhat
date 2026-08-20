"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/layout/Header";
import { UnauthorizedError } from "@/services/api";

interface Category {
  categoryId: string;
  name: string;
  slug: string;
  description: string;
}

type CategoryInput = Omit<Category, "categoryId">;

const EMPTY_FORM: CategoryInput = { name: "", slug: "", description: "" };

const BASE_URL = "https://z5m5voxdhc.execute-api.ap-southeast-1.amazonaws.com/Stage";

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/Ä‘/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getToken() {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(^| )admin_token=([^;]+)/);
  if (match) return match[2];
  return null;
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  if (!token) throw new UnauthorizedError();
  
  const headers = new Headers(init?.headers);
  headers.set('Authorization', 'Bearer ' + token);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const directPath = path.replace(/^\/api/, '');
  const res = await fetch(BASE_URL + directPath, { ...init, headers });
  
  if (res.status === 401) throw new UnauthorizedError();
  if (!res.ok) throw new Error("HTTP " + res.status);
  
  const data = await res.json();
  if (directPath === '/categories' && (!init || init.method === 'GET')) {
    return (Array.isArray(data) ? data : (data.value ?? [])) as T;
  }
  return data;
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
      const data = await apiRequest<Category[]>("/api/categories", { cache: "no-store" });
      setCategories(data);
    } catch (e) {
      if (e instanceof UnauthorizedError) { router.replace("/login"); return; }
      setError("API Danh má»¥c chÆ°a sáºµn sÃ ng hoáº·c khÃ´ng thá»ƒ káº¿t ná»‘i.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { load(); }, [load]);

  function openAdd() {
    setForm(EMPTY_FORM);
    setFormError("");
    setEditing(null);
    setModal("add");
  }

  function openEdit(c: Category) {
    setForm({ name: c.name, slug: c.slug, description: c.description });
    setFormError("");
    setEditing(c);
    setModal("edit");
  }

  async function handleSave() {
    if (!form.name.trim()) { setFormError("TÃªn danh má»¥c khÃ´ng Ä‘Æ°á»£c Ä‘á»ƒ trá»‘ng."); return; }
    setSaving(true);
    setFormError("");
    try {
      const payload = { ...form, slug: form.slug || toSlug(form.name) };
      if (modal === "add") {
        const created = await apiRequest<Category>("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setCategories((prev) => [created, ...prev]);
      } else if (editing) {
        const updated = await apiRequest<Category>(`/api/categories/${editing.categoryId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setCategories((prev) =>
          prev.map((c) => (c.categoryId === editing.categoryId ? updated : c))
        );
      }
      setModal(null);
    } catch (e) {
      if (e instanceof UnauthorizedError) { router.replace("/login"); return; }
      setFormError("LÆ°u tháº¥t báº¡i. Backend chÆ°a há»— trá»£ API nÃ y.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`XÃ³a danh má»¥c "${name}"?`)) return;
    setDeleting(id);
    try {
      await apiRequest(`/api/categories/${id}`, { method: "DELETE" });
      setCategories((prev) => prev.filter((c) => c.categoryId !== id));
    } catch (e) {
      if (e instanceof UnauthorizedError) { router.replace("/login"); return; }
      alert("XÃ³a tháº¥t báº¡i. Vui lÃ²ng thá»­ láº¡i.");
    } finally {
      setDeleting(null);
    }
  }

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AdminHeader title="Quáº£n lÃ½ Danh má»¥c" />
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
                placeholder="TÃ¬m kiáº¿m danh má»¥c..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm text-gray-400">{filtered.length} danh má»¥c</span>
              <button onClick={load} className="px-3 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                Táº£i láº¡i
              </button>
              <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2 bg-[#1e2532] text-white text-sm font-medium rounded-lg hover:bg-[#2a3347] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                ThÃªm danh má»¥c
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-6 mt-4 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 text-sm text-amber-700">
              {error} â€” Báº¡n váº«n cÃ³ thá»ƒ thÃªm danh má»¥c, dá»¯ liá»‡u sáº½ Ä‘Æ°á»£c lÆ°u khi API sáºµn sÃ ng.
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs text-gray-400 font-semibold px-6 py-3 uppercase tracking-wider">TÃªn danh má»¥c</th>
                    <th className="text-left text-xs text-gray-400 font-semibold px-6 py-3 uppercase tracking-wider hidden md:table-cell">Slug</th>
                    <th className="text-left text-xs text-gray-400 font-semibold px-6 py-3 uppercase tracking-wider hidden lg:table-cell">MÃ´ táº£</th>
                    <th className="text-right text-xs text-gray-400 font-semibold px-6 py-3 uppercase tracking-wider">Thao tÃ¡c</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-12 text-gray-400 text-sm">
                        {error ? "KhÃ´ng thá»ƒ táº£i danh má»¥c tá»« server." : "ChÆ°a cÃ³ danh má»¥c nÃ o."}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((c) => (
                      <tr key={c.categoryId} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800">{c.name}</td>
                        <td className="px-6 py-4 text-gray-400 font-mono text-xs hidden md:table-cell">{c.slug}</td>
                        <td className="px-6 py-4 text-gray-500 hidden lg:table-cell truncate max-w-[240px]">{c.description || "â€”"}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button onClick={() => openEdit(c)} className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">Sá»­a</button>
                            <button
                              onClick={() => handleDelete(c.categoryId, c.name)}
                              disabled={deleting === c.categoryId}
                              className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors disabled:opacity-40"
                            >
                              {deleting === c.categoryId ? "Äang xÃ³a..." : "XÃ³a"}
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

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">
                {modal === "add" ? "ThÃªm danh má»¥c má»›i" : "Chá»‰nh sá»­a danh má»¥c"}
              </h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-600">{formError}</div>
              )}
              {[
                { key: "name", label: "TÃªn danh má»¥c *", placeholder: "VD: Sofa - Salon" },
                { key: "slug", label: "Slug (Ä‘á»ƒ trá»‘ng sáº½ tá»± táº¡o)", placeholder: "vd: sofa-salon" },
                { key: "description", label: "MÃ´ táº£", placeholder: "MÃ´ táº£ ngáº¯n vá» danh má»¥c..." },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={(form as any)[key] ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">Há»§y</button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-[#1e2532] text-white text-sm font-medium rounded-lg hover:bg-[#2a3347] transition-colors disabled:opacity-60"
              >
                {saving ? "Äang lÆ°u..." : modal === "add" ? "ThÃªm danh má»¥c" : "LÆ°u thay Ä‘á»•i"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}





