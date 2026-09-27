import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { ChevronLeft, ChevronDown, ChevronUp, Share2, Heart, Star } from 'lucide-react';

interface RelatedCardItem {
  id: number;
  slug: string;
  name: string;
  category: string;
  priceFormatted: string;
  image: string;
}

const SWATCH_COLORS: Record<string, string> = {
  'english-chestnut': '/images/swatches/english-chestnut.jpg',
  'honey-maple': '/images/swatches/honey-maple.jpg',
  'indian-walnut': '/images/swatches/indian-walnut.jpg',
  'matte-black': '/images/swatches/matte-black.jpg',
};

function formatPrice(product: Product): string {
  const range = product.prices?.price_range;
  if (range && range.min_amount && range.max_amount &&
    parseFloat(range.min_amount) !== parseFloat(range.max_amount)) {
    return `₹ ${parseFloat(range.min_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })} – ₹ ${parseFloat(range.max_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  }
  const price = parseFloat(product.prices?.price || '0');
  return `₹ ${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
}

function parseDimensions(desc: string): string {
  const plain = stripHtml(desc);
  const match = plain.match(/([LWHlwh]-?\d+[^.\n]*(?:x[^.\n]*){1,3}(?:cm|in)?)/i)
    || plain.match(/(\d+["']?[HWDhwd]?\s*x\s*\d+["']?[HWDhwd]?\s*x?\s*\d*["']?[HWDhwd]?)/i)
    || plain.match(/Dimensions[^:]*:\s*([^\n\.]+)/i);
  return match ? match[1].trim() : '';
}

function getShortDesc(desc: string): string {
  const plain = stripHtml(desc);
  const overviewMatch = plain.match(/Overview\s*[–-]\s*([\s\S]*?)(?:Specifications|$)/i);
  if (overviewMatch) return overviewMatch[1].trim().split('\n')[0].trim();
  return plain.split('\n').find(l => l.trim().length > 20 && !l.includes('•')) || '';
}

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addItem, openDrawer } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedItems, setRelatedItems] = useState<RelatedCardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [wished, setWished] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      window.scrollTo(0, 0);
      setActiveImageIndex(0);
      setSelectedAttrs({});

      const prod = await api.getProductBySlug(slug || '');
      let finalProd = prod;
      if (!finalProd) {
        const res = await api.getProducts({ per_page: 1 });
        finalProd = res.products[0] || null;
      }

      if (finalProd) {
        setProduct(finalProd);
        const defaults: Record<string, string> = {};
        finalProd.attributes?.forEach(attr => {
          if (attr.terms?.length) defaults[attr.name] = attr.terms[0].name;
        });
        setSelectedAttrs(defaults);
      }

      const allRes = await api.getProducts({ per_page: 150 });
      const related = allRes.products
        .filter(p => p.slug !== (slug || ''))
        .slice(0, 4)
        .map(m => ({
          id: m.id,
          slug: m.slug,
          name: m.name,
          category: m.categories?.[0]?.name || '',
          priceFormatted: formatPrice(m),
          image: m.images?.[0]?.src || '/placeholder-image.jpg',
        }));

      setRelatedItems(related);
      setIsLoading(false);
    }
    load();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#8a6040] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen py-24 text-center">
        <h2 className="text-2xl font-serif text-black mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-[#8a6040] underline">Return to Shop</Link>
      </div>
    );
  }

  let galleryImages = product.images?.length > 0 ? product.images : [];
  if (galleryImages.length > 5) {
    const photos = galleryImages.filter(img => !img.src.toLowerCase().includes('dimension'));
    galleryImages = photos.length >= 4 ? photos.slice(0, 5) : galleryImages.slice(0, 5);
  }
  const currentImage = galleryImages[activeImageIndex] || { src: '/placeholder-image.jpg', alt: product.name };

  const desc = product.description || '';
  const shortDesc = getShortDesc(desc);
  const productCode = product.short_description ? stripHtml(product.short_description) : '';
  const dimensions = parseDimensions(desc);
  const priceDisplay = formatPrice(product);
  const rating = parseFloat(product.average_rating || '4');
  const reviewCount = product.review_count || 98;

  const textureAttr = product.attributes?.find(a => a.name === 'Texture');
  const otherAttrs = product.attributes?.filter(a => a.name !== 'Texture' && a.name !== 'Fabrics') || [];

  const handleWhatsAppEnquiry = () => {
    let text = `Hello The Raw Project, I would like to enquire about the ${product?.name}.`;
    
    if (quantity > 1) {
      text += `\nQuantity: ${quantity}`;
    }

    if (Object.keys(selectedAttrs).length > 0) {
      const attrsStr = Object.entries(selectedAttrs).map(([k, v]) => `${k}: ${v}`).join(', ');
      text += `\nPreferences: ${attrsStr}`;
    }
    
    window.open(`https://wa.me/918698814865?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen text-[#1a1a1a] pb-24 md:pb-16">

      {/* ── MOBILE-ONLY LAYOUT (< md) ── */}
      <div className="md:hidden">
        {/* Mobile Sticky Top Bar */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#f0f0f0]">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f5f5f5] transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" strokeWidth={2} />
            </button>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f5f5f5] transition-colors">
                <Share2 className="w-4.5 h-4.5 text-[#1a1a1a]" strokeWidth={1.75} />
              </button>
              <button
                onClick={() => setWished(w => !w)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f5f5f5] transition-colors"
              >
                <Heart className={`w-4.5 h-4.5 transition-colors ${wished ? 'fill-red-500 text-red-500' : 'text-[#1a1a1a]'}`} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full bg-[#f7f5f2] aspect-[4/3] overflow-hidden">
          <img
            src={currentImage.src}
            alt={currentImage.alt || product.name}
            className="w-full h-full object-contain p-4"
          />
        </div>

        {/* Thumbnail Strip */}
        {galleryImages.length > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4 px-4 overflow-x-auto scrollbar-none">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-14 h-14 rounded-sm overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                  activeImageIndex === idx
                    ? 'border-[#8a6040]'
                    : 'border-[#e5e5e5] hover:border-[#ccc]'
                }`}
              >
                <img src={img.src} alt={`View ${idx + 1}`} className="w-full h-full object-cover bg-[#f5f3f0]" />
              </button>
            ))}
          </div>
        )}

        {/* Product Info */}
        <div className="px-5 pt-6 pb-4 text-center">
          <h1 className="text-[20px] font-normal text-[#1a1a1a] leading-snug mb-3">
            {product.name}
          </h1>
          {productCode && (
            <p className="text-[11px] text-[#aaa] tracking-wider uppercase mb-2">{productCode}</p>
          )}

          {desc && (
            <div 
              className="text-[13px] text-[#777] leading-[1.7] text-left mt-4 whitespace-pre-wrap [&_strong]:text-[#1a1a1a] [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          )}
        </div>

        {/* Info Rows (Reviews, Size, Attributes) */}
        <div className="px-5 divide-y divide-[#f0f0f0]">
          <div className="flex items-center justify-between py-4">
            <span className="text-[14px] text-[#555] font-medium">Reviews</span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i <= Math.round(rating) ? 'fill-[#f59e0b] text-[#f59e0b]' : 'fill-[#e5e7eb] text-[#e5e7eb]'}`}
                  />
                ))}
              </div>
              <span className="text-[13px] text-[#555]">({reviewCount})</span>
            </div>
          </div>

          {dimensions && (
            <div className="flex items-center justify-between py-4">
              <span className="text-[14px] text-[#555] font-medium">Size</span>
              <span className="text-[14px] text-[#1a1a1a] font-medium text-right">{dimensions}</span>
            </div>
          )}

          {textureAttr && textureAttr.terms.length > 0 && (
            <div className="flex items-center justify-between py-4 gap-4">
              <div className="shrink-0">
                <span className="text-[14px] text-[#555] font-medium">Wood Finish</span>
                <p className="text-[12px] text-[#8a6040] mt-0.5">{selectedAttrs['Texture'] || textureAttr.terms[0].name}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {textureAttr.terms.map(term => {
                  const isSelected = selectedAttrs['Texture'] === term.name;
                  const img = SWATCH_COLORS[term.slug] || null;
                  return (
                    <button
                      key={term.id}
                      onClick={() => setSelectedAttrs(p => ({ ...p, Texture: term.name }))}
                      title={term.name}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                        isSelected ? 'border-[#8a6040] scale-110 shadow-sm' : 'border-transparent hover:border-[#ccc]'
                      }`}
                    >
                      {img
                        ? <img src={img} alt={term.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-[#c8b89a]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {otherAttrs.map(attr => (
            <div key={attr.id} className="flex items-start justify-between py-4 gap-4">
              <div className="shrink-0">
                <span className="text-[14px] text-[#555] font-medium">{attr.name}</span>
                <p className="text-[12px] text-[#8a6040] mt-0.5">{selectedAttrs[attr.name] || attr.terms[0]?.name}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {attr.terms.map(term => {
                  const isSelected = selectedAttrs[attr.name] === term.name;
                  return (
                    <button
                      key={term.id}
                      onClick={() => setSelectedAttrs(p => ({ ...p, [attr.name]: term.name }))}
                      className={`px-3.5 py-1.5 rounded-full text-[12px] border transition-all font-medium ${
                        isSelected
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'bg-white text-[#555] border-[#e0e0e0] hover:border-[#1a1a1a]'
                      }`}
                    >
                      {term.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Accordion Details */}
        <div className="px-5 mt-2 divide-y divide-[#f0f0f0] border-t border-[#f0f0f0]">
          {[
            { key: 'country', label: 'Country of Origin', content: 'Handcrafted in India by master artisans.' },
            { key: 'returns', label: 'Returns & Cancellation', content: 'Cancellations accepted within 24 hrs. Returns accepted for transit damage or manufacturing defects within 7 days of delivery.' },
            { key: 'warranty', label: 'Warranty — 2 Years', content: '2-year structural warranty covering timber integrity, traditional joinery, and termite protection under normal residential usage.' },
            { key: 'care', label: 'Maintenance & Care', content: 'Wipe with a soft micro-fiber cloth. Avoid harsh chemicals or excess moisture. Protect cane from sharp objects and extreme heat.' },
          ].map(({ key, label, content }) => (
            <div key={key}>
              <button
                onClick={() => setOpenAccordions(p => ({ ...p, [key]: !p[key] }))}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="text-[14px] font-medium text-[#1a1a1a]">{label}</span>
                {openAccordions[key]
                  ? <ChevronUp className="w-4 h-4 text-[#bbb] shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-[#bbb] shrink-0" />}
              </button>
              {openAccordions[key] && (
                <p className="text-[13px] text-[#666] leading-[1.7] pb-4">{content}</p>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Related Products */}
        {relatedItems.length > 0 && (
          <div className="px-5 pt-10 pb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[18px] font-normal text-[#1a1a1a]">
                You may also <em className="font-serif italic text-[#8a6040]">like</em>
              </h2>
              <Link to="/shop" className="text-[12px] text-[#8a6040] hover:underline uppercase tracking-wider font-medium">View All</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {relatedItems.map(item => (
                <Link key={item.id} to={`/product/${item.slug}`} className="group flex flex-col">
                  <div className="aspect-square bg-[#f5f3f0] overflow-hidden rounded-sm mb-2 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {item.category && (
                    <span className="text-[10px] text-[#999] uppercase tracking-wider">{item.category}</span>
                  )}
                  <span className="text-[13px] font-normal text-[#1a1a1a] mt-0.5 leading-snug line-clamp-2 group-hover:text-[#8a6040] transition-colors">
                    {item.name}
                  </span>

                  <div className="mt-2 py-1.5 text-center text-[11px] font-medium border border-[#e0e0e0] rounded-full hover:bg-[#8a6040] hover:text-white hover:border-[#8a6040] transition-all">
                    View details
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Fixed Bottom Floating Action Bar */}
        <div className="fixed bottom-4 left-4 right-4 z-50 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md border border-[#e0e0e0] rounded-[30px] p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 pointer-events-auto">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between bg-[#f5f3f0] rounded-full px-4 h-[44px] w-[100px] shrink-0">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-[#1a1612] text-[18px] p-1 active:scale-95 leading-none mb-0.5"
              >-</button>
              <span className="text-[#1a1612] font-semibold text-[14px]">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="text-[#1a1612] text-[18px] p-1 active:scale-95 leading-none mb-0.5"
              >+</button>
            </div>
            
            {/* Action Button */}
            <button
              type="button"
              onClick={handleWhatsAppEnquiry}
              className="flex-1 h-[44px] bg-[#8a6040] hover:bg-[#7a5030] active:bg-[#6a4020] text-white text-[14px] font-semibold rounded-full transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Enquire on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>


      {/* ── DESKTOP-ONLY LAYOUT (>= md) ── */}
      <div className="hidden md:block">
        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-6">
          <div className="text-[12px] text-[#999] flex items-center gap-2">
            <Link to="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#1a1a1a] transition-colors">Shop</Link>
            {product.categories?.[0] && (
              <>
                <span>/</span>
                <Link to={`/shop?category=${product.categories[0].slug}`} className="hover:text-[#1a1a1a] transition-colors capitalize">
                  {product.categories[0].name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-[#1a1a1a] truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>

        {/* Desktop Main Grid */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
          <div className="grid grid-cols-12 gap-12 items-start">

            {/* Left: Gallery (7 Cols) */}
            <div className="col-span-7 flex flex-col gap-4">
              <div className="relative aspect-[4/3] bg-[#f7f5f2] overflow-hidden rounded-sm group">
                <img
                  src={currentImage.src}
                  alt={currentImage.alt || product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#8a6040] text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Free Shipping Pan India
                </div>
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                        activeImageIndex === idx ? 'border-[#8a6040] shadow-sm' : 'border-[#e5e5e5] hover:border-[#ccc]'
                      }`}
                    >
                      <img src={img.src} alt={`View ${idx + 1}`} className="w-full h-full object-cover bg-[#f5f3f0]" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Controls (5 Cols) - Sticky */}
            <div className="col-span-5 flex flex-col gap-6 sticky top-28 self-start">
              <div>
                {product.categories?.[0] && (
                  <span className="text-[11px] text-[#999] uppercase tracking-widest font-medium mb-1 block">
                    {product.categories[0].name}
                  </span>
                )}
                <h1 className="text-[32px] lg:text-[36px] font-normal text-[#1a1a1a] leading-tight mb-2">
                  {product.name}
                </h1>
                {productCode && (
                  <p className="text-[12px] text-[#aaa] tracking-wider uppercase mb-3">{productCode}</p>
                )}

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? 'fill-[#f59e0b] text-[#f59e0b]' : 'fill-[#e5e7eb] text-[#e5e7eb]'}`} />
                    ))}
                  </div>
                  <span className="text-[13px] text-[#999]">({reviewCount} reviews)</span>
                </div>
              </div>

              {desc && (
                <div 
                  className="text-[14px] text-[#666] leading-[1.7] border-t border-[#f0eeeb] pt-4 whitespace-pre-wrap [&_strong]:text-[#1a1a1a] [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              )}

              {/* Attributes (Wood Finish / Seats / etc) */}
              <div className="space-y-4 border-t border-[#f0eeeb] pt-4">
                {textureAttr && textureAttr.terms.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-semibold text-[#1a1a1a]">Wood Finish</span>
                      <span className="text-[12px] text-[#8a6040] font-medium">{selectedAttrs['Texture'] || textureAttr.terms[0].name}</span>
                    </div>
                    <div className="flex gap-2.5 flex-wrap">
                      {textureAttr.terms.map(term => {
                        const isSelected = selectedAttrs['Texture'] === term.name;
                        const img = SWATCH_COLORS[term.slug] || null;
                        return (
                          <button
                            key={term.id}
                            onClick={() => setSelectedAttrs(p => ({ ...p, Texture: term.name }))}
                            title={term.name}
                            className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-all ${
                              isSelected ? 'border-[#8a6040] scale-110 shadow-md ring-2 ring-[#8a6040]/20' : 'border-transparent hover:border-[#ccc]'
                            }`}
                          >
                            {img
                              ? <img src={img} alt={term.name} className="w-full h-full object-cover" />
                              : <div className="w-full h-full bg-[#c8b89a]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {otherAttrs.map(attr => (
                  <div key={attr.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-semibold text-[#1a1a1a]">{attr.name}</span>
                      <span className="text-[12px] text-[#8a6040] font-medium">{selectedAttrs[attr.name] || attr.terms[0]?.name}</span>
                    </div>
                    <div className="flex gap-2.5 flex-wrap">
                      {attr.terms.map(term => {
                        const isSelected = selectedAttrs[attr.name] === term.name;
                        return (
                          <button
                            key={term.id}
                            onClick={() => setSelectedAttrs(p => ({ ...p, [attr.name]: term.name }))}
                            className={`px-5 py-2 rounded-full text-[13px] border transition-all font-medium ${
                              isSelected
                                ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                                : 'bg-white text-[#555] border-[#e0e0e0] hover:border-[#1a1a1a] hover:text-[#1a1a1a]'
                            }`}
                          >
                            {term.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Quantity & WhatsApp Enquiry Button */}
              <div className="flex items-center gap-4 pt-2">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between bg-[#f5f3f0] rounded-full px-4 h-[48px] w-[120px] shrink-0 border border-[#e0e0e0]">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#1a1612] text-[20px] p-1 hover:scale-110 active:scale-95 leading-none mb-0.5 transition-transform"
                  >-</button>
                  <span className="text-[#1a1612] font-semibold text-[15px]">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#1a1612] text-[20px] p-1 hover:scale-110 active:scale-95 leading-none mb-0.5 transition-transform"
                  >+</button>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="flex-1 h-[48px] bg-[#8a6040] hover:bg-[#7a5030] text-white text-[15px] font-semibold rounded-full transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                >
                  <span className="font-medium">Enquire on WhatsApp</span>
                </button>
              </div>

              {/* Desktop Accordions */}
              <div className="border-t border-[#f0eeeb] pt-2 divide-y divide-[#f0eeeb]">
                {[
                  { key: 'country', label: 'Country of Origin', content: 'Handcrafted in India by master artisans with decades of traditional craft experience.' },
                  { key: 'returns', label: 'Returns & Cancellation', content: 'Each piece is made-to-order. Cancellations accepted within 24 hrs. Returns accepted for transit damage or manufacturing defects within 7 days of delivery.' },
                  { key: 'warranty', label: 'Warranty — 2 Years', content: '2-year structural warranty covering timber integrity, traditional joinery, and termite protection under normal residential usage.' },
                  { key: 'care', label: 'Maintenance & Care', content: 'Wipe with a soft micro-fiber cloth. Avoid harsh chemicals or excess moisture. Protect cane webbing from sharp objects and extreme heat.' },
                ].map(({ key, label, content }) => (
                  <div key={key} className="py-3.5">
                    <button
                      onClick={() => setOpenAccordions(p => ({ ...p, [key]: !p[key] }))}
                      className="w-full flex items-center justify-between text-left text-[14px] font-medium text-[#1a1a1a] hover:text-[#8a6040] transition-colors"
                    >
                      <span>{label}</span>
                      {openAccordions[key] ? <ChevronUp className="w-4 h-4 text-[#bbb] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#bbb] shrink-0" />}
                    </button>
                    {openAccordions[key] && (
                      <p className="mt-2 text-[13px] text-[#666] leading-[1.7]">{content}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Related Products */}
          {relatedItems.length > 0 && (
            <div className="mt-20 pt-12 border-t border-[#f0eeeb]">
              <div className="flex items-end justify-between mb-8">
                <h2 className="text-[26px] font-normal text-[#1a1a1a]">
                  You may also <em className="font-serif italic text-[#8a6040]">like</em>
                </h2>
                <Link to="/shop" className="text-[12px] text-[#8a6040] font-medium hover:underline tracking-wider uppercase">View All</Link>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {relatedItems.map(item => (
                  <Link key={item.id} to={`/product/${item.slug}`} className="group flex flex-col">
                    <div className="aspect-[4/5] bg-[#f5f3f0] overflow-hidden rounded-sm mb-3 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                        <span className="bg-white text-[#1a1a1a] text-[11px] font-semibold uppercase tracking-wider px-5 py-2 rounded-full shadow-sm">View Details</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#999] uppercase tracking-wider mb-1">{item.category}</span>
                    <span className="text-[15px] font-normal text-[#1a1a1a] mb-1 group-hover:text-[#8a6040] transition-colors leading-tight line-clamp-2">{item.name}</span>

                    <div className="mt-3 w-full text-center py-2 border border-[#e5e5e5] hover:border-[#8a6040] hover:bg-[#8a6040] hover:text-white text-[#1a1a1a] text-[12px] font-medium rounded-full transition-all duration-200">
                      View details
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
