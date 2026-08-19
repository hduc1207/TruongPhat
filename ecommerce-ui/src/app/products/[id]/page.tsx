import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts, getCategoryBySlug } from "@/services/api";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import SectionTitle from "@/components/shared/SectionTitle";
import ProductCard from "@/components/shared/ProductCard";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const [category, relatedProducts] = await Promise.all([
    product.categoryId ? getCategoryBySlug(String(product.categoryId)) : Promise.resolve(null),
    getRelatedProducts(product.categoryId, product.id),
  ]);

  const galleryImages = product.images ?? [product.image];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <ProductGallery images={galleryImages} productName={product.name} />
        <ProductInfo product={product} category={category ?? undefined} />
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <SectionTitle
            title="Sản Phẩm Liên Quan"
            subtitle={`Các sản phẩm khác trong danh mục ${category?.name ?? ""}`}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p: typeof relatedProducts[0]) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
