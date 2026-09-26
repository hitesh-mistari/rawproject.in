import React, { useState } from "react";
import { ProductImage } from "../../types";
import { ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop";
  const displayImages = images && images.length > 0 ? images : [{ id: 0, src: fallbackImage, name: productName }];
  const currentImage = displayImages[selectedIndex] || displayImages[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnail Strip */}
      {displayImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[620px] scrollbar-none pb-2 md:pb-0 shrink-0">
          {displayImages.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-20 md:w-20 md:h-24 overflow-hidden border transition-all shrink-0 bg-sand-100 ${
                selectedIndex === idx
                  ? "border-stone-950 ring-1 ring-stone-950"
                  : "border-sand-300 opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img.thumbnail || img.src}
                alt={img.alt || `${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Feature Image */}
      <div className="relative flex-1 aspect-[4/5] bg-sand-100 overflow-hidden border border-sand-200 group">
        <img
          src={currentImage.src}
          alt={currentImage.alt || productName}
          className={`w-full h-full object-cover object-center transition-transform duration-500 ${
            isZoomed ? "scale-125 cursor-zoom-out" : "group-hover:scale-105 cursor-zoom-in"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Zoom Hint */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md backdrop-blur-sm transition-all"
          aria-label="Toggle zoom"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;
