export interface Category {
  id: number | string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  material?: string;
  color?: string;
  dimensions?: string;
  categoryId?: string | null;
  image: string;
  images?: string[];
}
