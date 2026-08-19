import { Product } from "@/types";
import ProductCard from "@/components/shared/ProductCard";
import SectionTitle from "@/components/shared/SectionTitle";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featured = products.slice(0, 8);

  return (
    <section id="featured" className="container mx-auto px-4 py-12 md:py-16">
      <SectionTitle
        title="Sản Phẩm Nổi Bật"
        subtitle="Bộ sưu tập nội thất gỗ cao cấp được ưa chuộng nhất"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {featured.length === 0 && (
        <p className="text-center text-gray-400 py-8">
          Chưa có sản phẩm nào.
        </p>
      )}
    </section>
  );
}
