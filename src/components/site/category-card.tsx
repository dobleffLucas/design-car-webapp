import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import type { Category } from "@/data/types";

import { CategoryIcon } from "./category-icon";
import { MediaFrame } from "./media-frame";

/**
 * Category card. The whole card is clickable thanks to the stretched title
 * link, so the target is large on mobile without a button-heavy layout.
 */
export const CategoryCard = ({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) => {
  const count = productsByCategory(category.slug).length;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-[transform,box-shadow] duration-base ease-out hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <MediaFrame
          media={category.media}
          ratio="aspect-[16/10]"
          className="rounded-none"
          showTag={false}
          imageClassName="transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/95 px-2.5 py-1 text-[0.6875rem] font-semibold text-foreground shadow-xs backdrop-blur">
          <CategoryIcon name={category.icon} className="h-3.5 w-3.5 text-primary" />
          {count} productos
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-sm p-lg">
        <h3 className="text-headline-s">
          <Link
            to={`/productos/${category.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {category.name}
          </Link>
        </h3>
        <p className="text-body-s text-muted-foreground">{category.description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-sm text-label text-primary">
          Ver productos
          <ArrowRight className="h-4 w-4 transition-transform duration-base ease-out group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
};

export const CategoryGrid = ({ className }: { className?: string }) => (
  <ul
    role="list"
    className={cn("grid gap-lg sm:grid-cols-2 lg:grid-cols-3", className)}
  >
    {categories.map((category) => (
      <li key={category.slug}>
        <CategoryCard category={category} className="h-full" />
      </li>
    ))}
  </ul>
);
