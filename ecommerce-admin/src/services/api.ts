export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

export interface Product {
  productId: string;
  name: string;
  slug: string;
  description: string;
  material: string;
  color: string;
  dimensions: string;
  price: number;
  category: string | null;
  createAt: string;
}

export type ProductInput = Omit<Product, "productId" | "createAt">;

const BASE_URL = "https://z5m5voxdhc.execute-api.ap-southeast-1.amazonaws.com/Stage";

function getToken() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(^| )admin_token=([^;]+)/);
  if (match) return match[2];
  return null;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  if (!token) throw new UnauthorizedError();

  const headers = new Headers(init?.headers);
  headers.set("Authorization", "Bearer " + token);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(BASE_URL + path, { ...init, headers });
  
  if (res.status === 401) throw new UnauthorizedError();
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  if (path === "/products" && (!init || init.method === "GET")) {
    const raw = Array.isArray(data) ? data : (data.value ?? []);
    return raw.map((p: any) => ({
      ...p,
      price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
    })) as unknown as T;
  }
  return data;
}

export async function getProducts(): Promise<Product[]> {
  return request<Product[]>("/products", { cache: "no-store" });
}

export async function createProduct(data: ProductInput): Promise<Product> {
  return request<Product>("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateProduct(id: string, data: Partial<ProductInput>): Promise<Product> {
  return request<Product>("/products/" + id, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await request<unknown>("/products/" + id, { method: "DELETE" });
}


