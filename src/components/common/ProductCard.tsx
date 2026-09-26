import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.images?.[0]?.src || "/placeholder-image.jpg";
  const hoverImageUrl = product.images?.[1]?.src || imageUrl;

  return (
    <div className="group flex flex-col">
      {/* Image Container */}
      <Link to={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-[#e0ded8] mb-5 border border-[#dfdbd2] shadow-sm">
        <img 
          src={imageUrl} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
        />
        <img 
          src={hoverImageUrl} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-[#3a352d]/0 group-hover:bg-[#3a352d]/5 transition-colors duration-500 z-10 pointer-events-none" />
      </Link>

      {/* Info Container */}
      <div className="flex flex-col px-1">
        {/* Categories */}
        <div className="text-[10px] tracking-[0.2em] uppercase text-[#8a7f72] font-bold mb-2 flex flex-wrap gap-1.5">
          {product.categories?.map((cat, idx) => (
            <React.Fragment key={cat.id}>
              <Link to={`/shop?category=${cat.slug}`} className="hover:text-[#1a1612] transition-colors relative z-10">
                {cat.name}
              </Link>
              {idx < product.categories.length - 1 && <span className="opacity-50">/</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Title */}
        <Link to={`/product/${product.slug}`} className="text-[15px] font-semibold text-[#1a1612] tracking-[0.1em] uppercase mb-1.5 hover:text-[#8a7f72] transition-colors">
          {product.name}
        </Link>
        
        {/* Price */}
        <div className="text-[13.5px] text-[#6b6359] font-medium tracking-wide">
          <span dangerouslySetInnerHTML={{ __html: product.prices.currency_symbol || '₹' }} />
          <span> {parseFloat(product.prices.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
