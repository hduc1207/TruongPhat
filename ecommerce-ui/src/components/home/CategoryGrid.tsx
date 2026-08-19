import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categories/${cat.slug}`}
          className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-md transition-shadow"
        >
          <Image
            src={cat.image}
            alt={cat.name}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white font-semibold text-sm md:text-base text-center">
              {cat.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
