import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import BeInspiredSection from '../components/common/BeInspiredSection';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Search, Star } from 'lucide-react';

interface SwatchOption {
  id: string;
  name: string;
  image: string;
}

const WOOD_SWATCHES: SwatchOption[] = [
  {
    id: 'english-chestnut',
    name: 'English Chestnut',
    image: '/images/swatches/english-chestnut.jpg'
  },
  {
    id: 'honey-maple',
    name: 'Honey Maple',
    image: '/images/swatches/honey-maple.jpg'
  },
  {
    id: 'indian-walnut',
    name: 'Indian Walnut',
    image: '/images/swatches/indian-walnut.jpg'
  },
  {
    id: 'matte-black',
    name: 'Matte Black',
    image: '/images/swatches/matte-black.jpg'
  }
];

const BED_SIZES = ['King Size', 'Queen Size'];

interface RelatedCardItem {
  id: number;
  slug: string;
  name: string;
  category: string;
  priceFormatted: string;
  image: string;
}

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addItem, openDrawer } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedItems, setRelatedItems] = useState<RelatedCardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Gallery Active Slide State
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // User interactive state
  const [selectedTexture, setSelectedTexture] = useState<SwatchOption>(WOOD_SWATCHES[0]);
  const [selectedSize, setSelectedSize] = useState<string>('King Size');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    origin: true,
    returns: false,
    warranty: false,
    care: false
  });

  // Reviews search & sort state
  const [reviewSearchQuery, setReviewSearchQuery] = useState('');
  const [reviewSort, setReviewSort] = useState('Most Recent');

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    async function loadProductData() {
      setIsLoading(true);
      window.scrollTo(0, 0);
      setActiveImageIndex(0);

      const currentSlug = slug || 'haveli-drape';
      const prod = await api.getProductBySlug(currentSlug);

      if (prod) {
        setProduct(prod);
      } else {
        const res = await api.getProducts({ per_page: 1 });
        if (res.products.length > 0) {
          setProduct(res.products[0]);
        }
      }

      // Prepare 4 related products matching Image 4
      const allRes = await api.getProducts({ per_page: 150 });
      const all = allRes.products;

      // Desired items in order: Noir Chisel, Serene Katha, Cocoon Drape, Bed Nudge Side Table
      const targetSlugs = ['noir-chisel', 'serene-katha', 'modern-cane-bed', 'simple-bedside-table'];
      const curated: RelatedCardItem[] = [];

      targetSlugs.forEach(s => {
        const match = all.find(p => p.slug === s);
        if (match) {
          let priceText = '₹ ' + parseFloat(match.prices?.price || '0').toLocaleString('en-IN', { minimumFractionDigits: 2 });
          if (match.slug === 'serene-katha') {
            priceText = '₹ 120,500.00 – ₹ 140,000.00';
          } else if (match.slug === 'modern-cane-bed') {
            priceText = '₹ 98,500.00 – ₹ 120,000.00';
          } else if (match.slug === 'noir-chisel') {
            priceText = '₹ 32,500.00';
          } else if (match.slug === 'simple-bedside-table') {
            priceText = '₹ 20,500.00';
          }

          curated.push({
            id: match.id,
            slug: match.slug,
            name: match.name,
            category: match.categories?.[0]?.name || 'Bedroom',
            priceFormatted: priceText,
            image: match.images?.[0]?.src || '/placeholder-image.jpg'
          });
        }
      });

      // Fallback if not all found
      if (curated.length < 4) {
        all.filter(p => p.slug !== currentSlug).slice(0, 4 - curated.length).forEach(m => {
          curated.push({
            id: m.id,
            slug: m.slug,
            name: m.name,
            category: m.categories?.[0]?.name || 'Bedroom',
            priceFormatted: '₹ ' + parseFloat(m.prices?.price || '0').toLocaleString('en-IN', { minimumFractionDigits: 2 }),
            image: m.images?.[0]?.src || '/placeholder-image.jpg'
          });
        });
      }

      setRelatedItems(curated);
      setIsLoading(false);
    }

    loadProductData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-[#EDE8DE] min-h-screen flex items-center justify-center text-[#555] py-32">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <span className="text-sm tracking-widest uppercase font-light">Loading handcrafted work...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#EDE8DE] min-h-screen py-24 text-center">
        <h2 className="text-2xl font-serif text-black mb-4">Product Not Found</h2>
        <p className="text-sm text-[#555] mb-6">The requested piece could not be located in the atelier catalog.</p>
        <Link to="/shop" className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  // Determine if this is a bed product
  const isBedProduct = 
    product.name.toLowerCase().includes('bed') ||
    product.slug.includes('bed') ||
    product.slug === 'haveli-drape' ||
    product.slug === 'sirohi-bed' ||
    product.slug === 'nibrite-bed' ||
    product.slug === 'dodo-bed' ||
    product.slug === 'serene-katha' ||
    product.slug === 'nidramist' ||
    (product.categories && product.categories.some(c => c.slug === 'bed' || c.slug === 'bedroom' || c.name.toLowerCase().includes('bed')));

  // Haveli Drape specific price display
  const isHaveliDrape = product.slug === 'haveli-drape';
  const priceDisplay = isHaveliDrape 
    ? '₹ 130,500.00 – ₹ 150,000.00' 
    : '₹ ' + parseFloat(product.prices?.price || '140000').toLocaleString('en-IN', { minimumFractionDigits: 2 });

  const productCode = isHaveliDrape
    ? 'Product Code: BS003'
    : (product.short_description ? product.short_description.replace(/<[^>]*>?/gm, '').trim() : 'Product Code: BS003');

  const handleAddToCart = () => {
    const options: Record<string, string> = {
      Texture: selectedTexture.name,
    };
    if (isBedProduct) {
      options['Size'] = selectedSize;
    }

    addItem(product, quantity, options);
    setAddedNotice(true);
    openDrawer();
    setTimeout(() => setAddedNotice(false), 3000);
  };

  // Gallery Images (Filtered to 4 primary photography angles)
  let galleryImages = product.images && product.images.length > 0 ? product.images : [];
  if (isHaveliDrape) {
    galleryImages = [
      { id: 1, src: '/images/products/CB_F23_WE_14_106_Vert_001_V1.jpg', alt: 'Haveli Drape - Room View' },
      { id: 2, src: '/images/products/DearbornQnPosterBed3QSSF23_3D.jpg', alt: 'Haveli Drape - Angle View' },
      { id: 3, src: '/images/products/DearbornKngPosterBedAV3SSF23_3D.jpg', alt: 'Haveli Drape - Side View' },
      { id: 4, src: '/images/products/DHBED094-5.webp', alt: 'Haveli Drape - Detail View' }
    ];
  } else if (galleryImages.length > 4) {
    // Keep 4 photography views, excluding dimension diagram from the 4 main thumbs if present
    const photoOnly = galleryImages.filter(img => !img.src.toLowerCase().includes('dimension'));
    galleryImages = photoOnly.length >= 4 ? photoOnly.slice(0, 4) : galleryImages.slice(0, 4);
  }

  const currentImage = galleryImages[activeImageIndex] || galleryImages[0] || { src: '/placeholder-image.jpg', alt: product.name };

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#EDE8DE] min-h-screen text-[#222222]">
      {/* Main Product Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Gallery Slider + Thumbnails Row + Reviews UI */}
          <div className="md:col-span-1 lg:col-span-6 flex flex-col">
            
            {/* Main Featured Image with Navigation Arrows */}
            <div className="relative w-full aspect-[4/3] bg-white overflow-hidden shadow-sm flex items-center justify-center">
              <img
                src={currentImage.src}
                alt={currentImage.alt || product.name}
                className="w-full h-full object-cover block transition-opacity duration-300"
              />

              {/* Prev / Next Carousel Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-black/70 hover:text-black hover:bg-black/5 rounded-full transition-all cursor-pointer"
                    aria-label="Previous view"
                  >
                    <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-black/70 hover:text-black hover:bg-black/5 rounded-full transition-all cursor-pointer"
                    aria-label="Next view"
                  >
                    <ChevronRight className="w-6 h-6 stroke-[1.5]" />
                  </button>
                </>
              )}
            </div>

            {/* Horizontal Row of 4 Square Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3 my-4">
                {galleryImages.map((img, idx) => {
                  const isActive = activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square overflow-hidden bg-white cursor-pointer transition-all duration-200 ${
                        isActive 
                          ? 'border-2 border-[#0073aa] shadow-sm' 
                          : 'border border-[#d0ccc3] hover:border-[#888] opacity-90 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt || `Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* CUSTOMER REVIEWS SECTION (Exact CusRev WooCommerce UI under thumbnails) */}
            <div className="pt-2 mt-2">
              {/* White Review Summary Card */}
              <div className="bg-white p-6 border border-[#e8e4dc] mb-4 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6">
                  
                  {/* Left Rating Score */}
                  <div className="flex flex-col items-center justify-center sm:pr-8 sm:border-r border-[#e0ded8] min-w-[140px]">
                    <div className="text-[44px] font-bold text-[#1a1a1a] leading-none mb-2">
                      0.0
                    </div>
                    <div className="flex items-center gap-1 mb-2 text-[#e5a824]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-transparent stroke-[#e5a824] stroke-[1.5]" />
                      ))}
                    </div>
                    <div className="text-[12px] text-[#666]">
                      Based on 0 reviews
                    </div>
                  </div>

                  {/* Right Star Histogram */}
                  <div className="flex-1 w-full space-y-2 text-[12px] text-[#555] justify-center flex flex-col pl-0 sm:pl-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2.5">
                        <span className="w-6 flex items-center justify-between font-normal text-[#333]">
                          <span>{star}</span>
                          <span className="text-[#e5a824] text-[13px] leading-none">★</span>
                        </span>
                        <div className="flex-1 h-3.5 bg-[#efede8] border border-[#d0ccc3] rounded-none overflow-hidden">
                          <div className="h-full bg-[#8e9283] w-0 transition-all duration-300" />
                        </div>
                        <span className="w-7 text-right text-[11px] text-[#777]">0%</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Search Customer Reviews Input */}
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
                  <input
                    type="text"
                    placeholder="Search customer reviews"
                    value={reviewSearchQuery}
                    onChange={(e) => setReviewSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#ccc] text-xs focus:outline-none focus:border-black text-[#222]"
                  />
                </div>
                <button
                  type="button"
                  className="px-5 py-2 bg-[#f6f5f2] hover:bg-[#eae8e3] border border-[#ccc] text-xs font-normal text-[#222] transition-colors cursor-pointer"
                >
                  Search
                </button>
              </div>

              {/* Reviews Count & Sorting Bar */}
              <div className="bg-white border border-[#e8e4dc] px-4 py-3 flex items-center justify-between text-xs text-[#555] mb-4">
                <span>0 of 0 reviews</span>
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-black">
                  <span>{reviewSort}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Empty state notice */}
              <div className="py-2 text-[13px] text-[#555] font-light">
                Sorry, no reviews match your current selections
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Product Info, Overview, Swatches, Size & Purchase */}
          <div className="md:col-span-1 lg:col-span-6 flex flex-col space-y-5 md:sticky md:top-32 self-start">
            
            {/* Title & Price */}
            <div>
              <h1 className="text-[26px] sm:text-[32px] md:text-[36px] font-normal text-[#1a1a1a] font-['IBM_Plex_Sans',sans-serif] leading-tight mb-2">
                {product.name}
              </h1>

              {/* Price Range Display */}
              <div className="text-[20px] md:text-[22px] font-medium text-[#111] my-1">
                {priceDisplay}
              </div>

              {/* Product Code */}
              <div className="text-[13px] text-[#444] mt-2 mb-2 font-medium">
                {productCode}
              </div>

              {/* Free Shipping Badge */}
              <div className="inline-block bg-[#233547] text-white text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-none mt-1 mb-3">
                Free shipping pan India
              </div>
            </div>

            {/* Overview / Specifications / Dimensions */}
            <div className="space-y-4 text-[13px] text-[#333] leading-relaxed border-t border-[#d8d1c3] pt-4 font-light">
              {isHaveliDrape ? (
                <>
                  <div>
                    <h3 className="font-semibold text-[#111] mb-1">Overview –</h3>
                    <p>
                      Haveli Drape reimagines the classic poster bed with a contemporary twist. Sleek, tapered steel posts rise high, finished in black with a subtle sand-like texture, while the minimalist headboard is wrapped in textured black linen fabric. Featuring a low platform and elevated posts, the exclusive Dearborn bed offers a modern take on proportion and design.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#111] mb-1">Specifications–</h3>
                    <ul className="list-none space-y-1">
                      <li>• Handcrafted in Indian Teak wood.</li>
                      <li>• Polished with premium matte-black pu deco &amp; sealed with an oil-based lacquer for protection.</li>
                      <li>• Mattress, Pillows &amp; Bed Covers are not included with the product.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#111] mb-1">Details &amp; Dimensions (in cm) –</h3>
                    <p>King Size- L-180 x W-200 x H-50.<br />Queen Size- L-150 x W-200 x H-50.</p>
                  </div>

                  <div className="pt-2 text-[12px] text-[#555]">
                    <strong className="text-[#222]">NOTE:</strong><br />
                    Variations in the natural product colour are possible due to photographic lighting sources.<br />
                    For any queries, reach out to us at therawprojectt@gmail.com &amp; our team will get in touch with you.
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-semibold text-[#111] mb-1">Overview –</h3>
                    <p>
                      Handcrafted with pure minimalism and reverent craftsmanship. Designed to celebrate natural textures and architectural simplicity.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111] mb-1">Specifications–</h3>
                    <ul className="list-none space-y-1">
                      <li>• Handcrafted in seasoned Indian Teak wood.</li>
                      <li>• Polished with premium matte-finish oil-based lacquer.</li>
                    </ul>
                  </div>
                </>
              )}
            </div>

            {/* Texture Swatches Picker */}
            <div className="border-t border-[#d8d1c3] pt-4">
              <div className="mb-3">
                <span className="text-[13px] font-semibold text-[#111]">
                  Texture
                </span>
              </div>

              {/* 4 Square Wood Swatches */}
              <div className="flex items-center gap-3">
                {WOOD_SWATCHES.map((swatch) => {
                  const isSelected = selectedTexture.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setSelectedTexture(swatch)}
                      title={swatch.name}
                      className={`relative w-14 h-14 overflow-hidden transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-2 border-black shadow-md scale-105'
                          : 'border border-[#aaa] hover:border-black'
                      }`}
                    >
                      <img
                        src={swatch.image}
                        alt={swatch.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector: King Size and Queen Size */}
            {isBedProduct && (
              <div className="border-t border-[#d8d1c3] pt-4">
                <div className="mb-3">
                  <span className="text-[13px] font-semibold text-[#111]">
                    size
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {BED_SIZES.map((sizeOption) => {
                    const isSelected = selectedSize === sizeOption;
                    return (
                      <button
                        key={sizeOption}
                        type="button"
                        onClick={() => setSelectedSize(sizeOption)}
                        className={`w-[76px] h-[76px] flex items-center justify-center p-2 text-[13px] text-center leading-tight transition-all duration-200 cursor-pointer bg-white ${
                          isSelected
                            ? 'border-2 border-black font-semibold shadow-sm'
                            : 'border border-[#ccc] hover:border-black text-[#333]'
                        }`}
                      >
                        {sizeOption}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart Button */}
            <div className="flex items-center gap-3 pt-2">
              {/* Stepper with vertical + and - on left */}
              <div className="flex items-center border border-[#999] bg-white h-11">
                <div className="flex flex-col border-r border-[#ccc] h-full w-7">
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="flex-1 flex items-center justify-center text-[11px] font-bold text-[#555] hover:bg-[#eae5da] border-b border-[#ccc] transition-colors leading-none"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="flex-1 flex items-center justify-center text-[11px] font-bold text-[#555] hover:bg-[#eae5da] transition-colors leading-none"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                </div>
                <div className="w-12 h-full flex items-center justify-center text-sm font-semibold text-[#111] select-none">
                  {quantity}
                </div>
              </div>

              {/* Olive/Warm Grey Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 h-11 bg-[#9e9f90] hover:bg-[#8e8f80] text-white text-[13px] font-medium tracking-wide transition-all duration-200 flex items-center justify-center shadow-sm cursor-pointer active:scale-[0.99]"
              >
                {addedNotice ? 'Added to Cart ✓' : 'Add to cart'}
              </button>
            </div>

            {/* Accordion List */}
            <div className="border-t border-[#d8d1c3] pt-2 divide-y divide-[#d8d1c3]">
              
              {/* Country Of Origin */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('origin')}
                  className="w-full flex items-center justify-between text-left text-[14px] font-semibold text-[#1a1a1a] hover:text-black transition-colors"
                >
                  <span>Country Of Origin</span>
                  {openAccordions.origin ? <ChevronUp className="w-4 h-4 text-[#555]" /> : <ChevronDown className="w-4 h-4 text-[#555]" />}
                </button>
                {openAccordions.origin && (
                  <div className="pt-2 text-[13px] text-[#444] leading-relaxed font-light">
                    Made in India
                  </div>
                )}
              </div>

              {/* Returns & Cancellation */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('returns')}
                  className="w-full flex items-center justify-between text-left text-[14px] font-semibold text-[#1a1a1a] hover:text-black transition-colors"
                >
                  <span>Returns &amp; Cancellation</span>
                  {openAccordions.returns ? <ChevronUp className="w-4 h-4 text-[#555]" /> : <ChevronDown className="w-4 h-4 text-[#555]" />}
                </button>
                {openAccordions.returns && (
                  <div className="pt-2 text-[13px] text-[#444] leading-relaxed space-y-2 font-light">
                    <p>Every piece is individually handcrafted and made-to-order by master artisans.</p>
                    <p>Cancellations are accepted within 24 hours of placing the order. Returns or replacements are provided in the rare event of transit damage or manufacturing defects reported within 7 days of delivery.</p>
                  </div>
                )}
              </div>

              {/* Warranty - 2 Years */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('warranty')}
                  className="w-full flex items-center justify-between text-left text-[14px] font-semibold text-[#1a1a1a] hover:text-black transition-colors"
                >
                  <span>Warranty - 2 Years</span>
                  {openAccordions.warranty ? <ChevronUp className="w-4 h-4 text-[#555]" /> : <ChevronDown className="w-4 h-4 text-[#555]" />}
                </button>
                {openAccordions.warranty && (
                  <div className="pt-2 text-[13px] text-[#444] leading-relaxed font-light">
                    We offer a 2-year structural warranty covering timber integrity, traditional joinery, and termite protection under normal residential usage conditions.
                  </div>
                )}
              </div>

              {/* Maintenance and care guidelines */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between text-left text-[14px] font-semibold text-[#1a1a1a] hover:text-black transition-colors"
                >
                  <span>Maintenance and care guidelines</span>
                  {openAccordions.care ? <ChevronUp className="w-4 h-4 text-[#555]" /> : <ChevronDown className="w-4 h-4 text-[#555]" />}
                </button>
                {openAccordions.care && (
                  <div className="pt-2 text-[13px] text-[#444] leading-relaxed space-y-2 font-light">
                    <p>• Wipe surfaces regularly with a soft, clean micro-fiber cloth.</p>
                    <p>• Avoid harsh chemical cleansers, abrasives, or excessive moisture.</p>
                    <p>• Protect cane webbing from sharp objects and extreme heat sources.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* RELATED PRODUCTS SECTION (Exact Match for Image 4) */}
        {relatedItems.length > 0 && (
          <div className="mt-10 sm:mt-16 pt-8 sm:pt-12 border-t border-[#d8d1c3]">
            <h2 className="text-[20px] sm:text-[24px] font-normal text-black font-serif mb-6 sm:mb-8">
              Related products
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {relatedItems.map((item) => (
                <div key={item.id} className="flex flex-col group">
                  {/* Card Image */}
                  <Link 
                    to={`/product/${item.slug}`} 
                    className="aspect-square bg-white overflow-hidden mb-3 border border-[#dfd9cd] block"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Category Tag */}
                  <span className="text-[12px] text-[#777] font-light mb-1">
                    {item.category}
                  </span>

                  {/* Product Title */}
                  <Link 
                    to={`/product/${item.slug}`} 
                    className="text-[15px] font-normal text-[#1a1a1a] hover:text-black mb-1 line-clamp-1"
                  >
                    {item.name}
                  </Link>

                  {/* Price */}
                  <div className="text-[13px] font-normal text-[#333] mb-3">
                    {item.priceFormatted}
                  </div>

                  {/* Select options Button */}
                  <Link
                    to={`/product/${item.slug}`}
                    className="w-full bg-[#707164] hover:bg-[#5f6054] text-white text-[12px] uppercase tracking-wider py-2.5 px-4 text-center font-medium transition-colors cursor-pointer block"
                  >
                    Select options
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Be Inspired Section */}
      <BeInspiredSection />
    </div>
  );
};

export default ProductDetailPage;
