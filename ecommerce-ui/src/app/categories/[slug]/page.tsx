import { getCategories } from "@/services/api";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory } from "@/services/api";
import CategoryContent from "@/components/category/CategoryContent";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [category, categoryProducts] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) {
    notFound();
  }

  return <CategoryContent category={category} products={categoryProducts} />;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}
