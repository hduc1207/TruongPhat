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

async function request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (res.status === 401) throw new UnauthorizedError();
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getProducts(): Promise<Product[]> {
  return request<Product[]>("/api/products", { cache: "no-store" });
}

export async function createProduct(data: ProductInput): Promise<Product> {
  return request<Product>("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateProduct(id: string, data: Partial<ProductInput>): Promise<Product> {
  return request<Product>(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await request<unknown>(`/api/products/${id}`, { method: "DELETE" });
}
