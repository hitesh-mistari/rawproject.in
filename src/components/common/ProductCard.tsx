import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.images?.[0]?.src || "/placeholder-image.jpg";
  const hoverImageUrl = product.images?.[1]?.src || imageUrl;
  const [wished, setWished] = useState(false);

  const price = parseFloat(product.prices?.price || "0");
  const priceStr = "₹ " + price.toLocaleString("en-IN", { minimumFractionDigits: 2 });
  const categoryName = product.categories?.[0]?.name || "";

  return (
    <div className="group flex flex-col bg-white rounded-sm overflow-hidden">
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-[#f5f3f0] block">
        <img
          src={imageUrl}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
        />
        <img
          src={hoverImageUrl}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
        />

        {/* Wishlist Heart */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWished(w => !w); }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 transition-colors ${wished ? 'fill-red-500 text-red-500' : 'text-[#999]'}`} strokeWidth={1.5} />
        </button>
      </Link>

      {/* Info */}
      <div className="px-3 pt-3 pb-4 flex flex-col gap-1">
        {categoryName && (
          <span className="text-[10px] text-[#999] uppercase tracking-wider font-medium">{categoryName}</span>
        )}
        <Link
          to={`/product/${product.slug}`}
          className="text-[14px] sm:text-[15px] font-normal text-[#1a1a1a] hover:text-[#8a6040] transition-colors leading-snug line-clamp-2"
        >
          {product.name}
        </Link>


        {/* View Details */}
        <Link
          to={`/product/${product.slug}`}
          className="mt-2 w-full flex items-center justify-center py-2 rounded-full border border-[#e0e0e0] text-[12px] font-medium text-[#1a1a1a] hover:border-[#8a6040] hover:bg-[#8a6040] hover:text-white transition-all duration-200"
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
