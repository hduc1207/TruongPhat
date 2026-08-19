import { Product, Category } from "@/types";
import { products as mockProducts, categories as mockCategories } from "@/data/mock";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80";

function fromBE(p: any): Product {
  return {
    id: p.productId ?? p.id,
    name: p.name ?? "Sản phẩm không tên",
    slug: p.slug,
    description: p.description,
    material: p.material,
    color: p.color,
    dimensions: p.dimensions,
    categoryId: p.category ?? null,
    image: PLACEHOLDER_IMAGE,
    images: [PLACEHOLDER_IMAGE],
  };
}

function parseList(json: any): any[] {
  return Array.isArray(json) ? json : (json?.value ?? []);
}

export async function getProducts(): Promise<Product[]> {
  if (BASE_URL) {
    try {
      const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
      if (res.ok) return parseList(await res.json()).map(fromBE);
    } catch {}
  }
  return mockProducts;
}

export async function getProductById(id: string): Promise<Product | null> {
  if (BASE_URL) {
    try {
      const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
      if (res.ok) {
        const found = parseList(await res.json()).find((p: any) => p.productId === id);
        if (found) return fromBE(found);
      }
    } catch {}
  }
  return mockProducts.find((p) => p.id === id) ?? null;
}

export async function getRelatedProducts(
  categoryId: string | null | undefined,
  excludeId: string
): Promise<Product[]> {
  if (BASE_URL) {
    try {
      const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
      if (res.ok) {
        return parseList(await res.json())
          .filter((p: any) => p.category === categoryId && p.productId !== excludeId)
          .slice(0, 4)
          .map(fromBE);
      }
    } catch {}
  }
  return mockProducts
    .filter((p) => p.categoryId === categoryId && p.id !== excludeId)
    .slice(0, 4);
}

export async function getCategories(): Promise<Category[]> {
  if (BASE_URL) {
    try {
      const res = await fetch(`${BASE_URL}/categories`, { cache: "no-store" });
      if (res.ok) return res.json();
    } catch {}
  }
  return mockCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (BASE_URL) {
    try {
      const res = await fetch(`${BASE_URL}/categories/${slug}`, { cache: "no-store" });
      if (res.ok) return res.json();
    } catch {}
  }
  return mockCategories.find((c) => c.slug === slug) ?? null;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  if (BASE_URL) {
    try {
      const res = await fetch(`${BASE_URL}/categories/${slug}/products`, { cache: "no-store" });
      if (res.ok) return res.json();
    } catch {}
  }
  const cat = mockCategories.find((c) => c.slug === slug);
  return cat ? mockProducts.filter((p) => p.categoryId === cat.id) : [];
}
