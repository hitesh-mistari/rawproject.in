import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  columns?: 2 | 3 | 4;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  columns = 4,
}) => {
  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns];

  if (isLoading) {
    return (
      <div className={`grid ${colClass} gap-6 md:gap-8`}>
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="border border-sand-200 bg-white overflow-hidden animate-pulse flex flex-col"
          >
            <div className="aspect-[4/5] bg-sand-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-sand-200 rounded w-3/4" />
              <div className="h-3 bg-sand-200 rounded w-1/2" />
              <div className="h-4 bg-sand-200 rounded w-1/3 pt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-sand-50 border border-dashed border-sand-300 p-8">
        <h3 className="font-serif text-xl text-stone-800">No pieces found</h3>
        <p className="text-sm text-stone-500 mt-2">
          Try broadening your search query or removing selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${colClass} gap-6 md:gap-8`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
