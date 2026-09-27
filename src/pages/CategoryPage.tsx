import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Product, Category } from '../types';
import { api } from '../services/api';
import ProductCard from '../components/common/ProductCard';

const CategoryPage: React.FC = () => {
  const { category, subcategory, slug } = useParams<{ category?: string; subcategory?: string; slug?: string }>();
  const location = useLocation();

  // Determine active category & subcategory slugs
  let activeCat = category || slug || '';
  let activeSub = subcategory || '';

  if (!activeCat) {
    const p = location.pathname.replace(/^\/product-category\//, '').replace(/^\//, '').split('/');
    activeCat = p[0] || 'shop';
    if (p.length > 1) {
      activeSub = p[1];
    }
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');

  useEffect(() => {
    async function loadCategoryData() {
      setIsLoading(true);
      window.scrollTo(0, 0);

      const allCats = await api.getCategories();
      setCategories(allCats);

      // Determine filter target
      const targetSlug = activeSub || (activeCat !== 'shop' ? activeCat : undefined);

      const res = await api.getProducts({
        category: targetSlug,
        per_page: 60
      });

      let items = res.products;

      // If category is living / bedroom / dining, include items in subcategories too
      if (items.length === 0 && activeCat && activeCat !== 'shop') {
        const allRes = await api.getProducts({ per_page: 100 });
        items = allRes.products.filter(p => 
          p.categories?.some(c => 
            c.slug.toLowerCase().includes(activeCat.toLowerCase()) || 
            (activeSub && c.slug.toLowerCase().includes(activeSub.toLowerCase()))
          )
        );
      }

      setProducts(items);
      setIsLoading(false);
    }

    loadCategoryData();
  }, [activeCat, activeSub]);

  // Format Display Names
  const formatName = (str: string) => {
    if (!str) return '';
    return str
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
      .replace('Ottoman Bench', 'Ottoman & Bench');
  };

  const catTitle = formatName(activeSub || activeCat || 'Shop');
  const parentCatTitle = activeSub ? formatName(activeCat) : null;

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Living Subcategories quick filter
  const livingSubcategories = [
    { name: 'All Living', slug: 'living' },
    { name: 'Ottoman & Bench', slug: 'ottoman-bench' },
    { name: 'Lounge Chair', slug: 'lounge-chair' },
    { name: 'Center Table', slug: 'center-table' },
    { name: 'Sofa', slug: 'sofa' },
    { name: 'Day Bed', slug: 'day-bed' },
    { name: 'TV Unit', slug: 'tv-unit' },
    { name: 'Console Table', slug: 'console-table' }
  ];

  const getBannerImage = (category: string) => {
    if (products && products.length > 0 && products[0].images) {
      if (products[0].images.length > 1) {
        return products[0].images[1].src;
      } else if (products[0].images.length > 0) {
        return products[0].images[0].src;
      }
    }
    switch (category) {
      case 'dining': return '/images/home/carousel/slide_1.png';
      case 'living': return '/images/home/hero/hero_slide2.png';
      case 'bedroom': return '/images/home/carousel/slide_3.png';
      case 'storage': return '/images/home/carousel/slide_4.png';
      case 'decor': return '/images/home/carousel/slide_2.png';
      case 'seating': return '/images/home/carousel/mainhero.png';
      default: return '/images/home/hero/hero_slide1.jpg';
    }
  };

  return (
    <div className="bg-[#f7f5f2] min-h-screen text-[#222222]">
      {/* 1. Category Header Banner (Dark & Elegant) */}
      <section 
        className="bg-[#1a1612] text-[#eae5da] px-6 sm:px-12 relative overflow-hidden bg-cover bg-center min-h-[50vh] md:min-h-[60vh] flex flex-col justify-end pb-12 sm:pb-16 pt-32"
        style={{ backgroundImage: `url(${getBannerImage(activeCat)})` }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1612]/90 via-[#1a1612]/30 to-transparent z-0" />
        <div className="w-full max-w-[1400px] mx-auto relative z-10 text-left">
          <h1 className="text-[40px] sm:text-[50px] md:text-[64px] font-medium tracking-tight mb-3 sm:mb-4 drop-shadow-lg leading-none">
            {parentCatTitle ? (
              <>{parentCatTitle} <em className="font-serif italic text-[#d8c3a5] pr-1">{catTitle}</em></>
            ) : (
              <>{catTitle} <em className="font-serif italic text-[#d8c3a5] pr-1">Collection</em></>
            )}
          </h1>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[1.8] text-[#eae5da]/90 max-w-xl drop-shadow-md">
            Explore our definitive selection of handcrafted {catTitle.toLowerCase()}. Designed for those who appreciate pure architecture, natural materials, and uncompromised quality.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-10 sm:pt-12 pb-16 sm:pb-20">
        
        {/* Breadcrumb Bar */}
        <div className="text-[12px] text-[#6b6359] flex items-center gap-2 mb-8">
          <Link to="/" className="hover:text-[#1a1612] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#1a1612] transition-colors">Shop</Link>
          {parentCatTitle && (
            <>
              <span>/</span>
              <Link to={`/product-category/${activeCat}`} className="hover:text-[#1a1612] transition-colors">
                {parentCatTitle}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-[#1a1612] font-medium">{catTitle}</span>
        </div>

        {/* Toolbar: Info & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#dfdbd2] pb-4 mb-10 gap-4">
          <p className="text-[13px] text-[#6b6359] font-medium">
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'piece' : 'pieces'}
          </p>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <label htmlFor="sort" className="text-xs text-[#555] font-medium">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/80 border border-[#bbb] text-xs px-3 py-2 text-[#222] focus:outline-none focus:border-black"
            >
              <option value="default">Default sorting</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Category Sub-Filters if in Living or general shop */}
        {activeCat === 'living' && (
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-10 text-[13px] overflow-x-auto scrollbar-none pb-1">
            {livingSubcategories.map((sub) => {
              const isActive = (sub.slug === 'living' && !activeSub) || activeSub === sub.slug;
              const linkUrl = sub.slug === 'living'
                ? '/product-category/living'
                : `/product-category/living/${sub.slug}`;

              return (
                <Link
                  key={sub.slug}
                  to={linkUrl}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-white/70 text-[#444] border border-[#d0c8ba] hover:bg-black hover:text-white'
                  }`}
                >
                  {sub.name}
                </Link>
              );
            })}
          </div>
        )}

        {/* Product Grid */}
        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center text-[#555] gap-3">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
            <span className="text-xs uppercase tracking-widest">Loading collection...</span>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="py-20 text-center bg-white/40 border border-[#d8d1c3] p-12">
            <h3 className="text-xl font-serif text-[#111] mb-2">No products found in this category</h3>
            <p className="text-xs text-[#666] mb-6">Explore our complete catalog of handcrafted bespoke furniture.</p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8C7A6B] transition-colors"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-20 bg-[#f7f5f2]">
            {sortedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryPage;
