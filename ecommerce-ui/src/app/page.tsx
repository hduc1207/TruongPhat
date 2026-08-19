import { getProducts, getCategories } from "@/services/api";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import PromoBanner from "@/components/home/PromoBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SectionTitle from "@/components/shared/SectionTitle";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <HeroBanner />

      {/* Danh mục nổi bật */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionTitle
          title="Danh Mục Nổi Bật"
          subtitle="Khám phá các dòng sản phẩm nội thất cao cấp"
        />
        <CategoryGrid categories={categories} />
      </section>

      {/* Banner khuyến mãi */}
      <PromoBanner />

      {/* Sản phẩm nổi bật */}
      <FeaturedProducts products={products} />
    </>
  );
}
