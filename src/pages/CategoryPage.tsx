import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Product, Category } from '../types';
import { api } from '../services/api';
import BeInspiredSection from '../components/common/BeInspiredSection';

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
    if (sortBy === 'price-asc') {
      return parseFloat(a.prices?.price || '0') - parseFloat(b.prices?.price || '0');
    }
    if (sortBy === 'price-desc') {
      return parseFloat(b.prices?.price || '0') - parseFloat(a.prices?.price || '0');
    }
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

  return (
    <div className="bg-[#eae5da] min-h-screen text-[#222222]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8 pb-16 sm:pb-20">
        
        {/* Breadcrumb Bar */}
        <div className="text-[12px] text-[#666] flex items-center gap-2 mb-4">
          <Link to="/" className="hover:underline text-[#444]">Home</Link>
          <span>&gt;</span>
          <Link to="/shop" className="hover:underline text-[#444]">Shop</Link>
          {parentCatTitle && (
            <>
              <span>&gt;</span>
              <Link to={`/product-category/${activeCat}`} className="hover:underline text-[#444]">
                {parentCatTitle}
              </Link>
            </>
          )}
          <span>&gt;</span>
          <span className="text-[#111] font-medium">{catTitle}</span>
        </div>

        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#d8d1c3] pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-normal text-[#1a1a1a] font-serif leading-tight">
              {catTitle}
            </h1>
            <p className="text-[13px] text-[#666] mt-1">
              Showing {sortedProducts.length} handcrafted luxury bespoke {sortedProducts.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>

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
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12 mb-16 sm:mb-20">
            {sortedProducts.map((p) => {
              const pImg = p.images?.[0]?.src || '/placeholder-image.jpg';
              const pCat = p.categories?.[0]?.name || formatName(activeCat);
              const pPrice = parseFloat(p.prices?.price || '0');

              return (
                <div key={p.id} className="group flex flex-col bg-transparent">
                  {/* Image card with hover effect */}
                  <Link
                    to={`/product/${p.slug}`}
                    className="block aspect-4/3 overflow-hidden bg-[#dfd9cd] mb-3 relative shadow-xs"
                  >
                    <img
                      src={pImg}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-col flex-1">
                    <span className="text-[11px] text-[#777] mb-1 font-medium">{pCat}</span>
                    
                    <Link
                      to={`/product/${p.slug}`}
                      className="text-[17px] text-[#1a1a1a] hover:underline mb-1 font-normal font-serif leading-tight"
                    >
                      {p.name}
                    </Link>

                    <div className="text-[14px] text-[#111] font-normal mb-3">
                      ₹ {pPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>

                    {/* Select Options Button */}
                    <Link
                      to={`/product/${p.slug}`}
                      className="inline-block self-start px-4 py-2 bg-[#6b705c] hover:bg-[#585c4b] text-white text-[11px] uppercase tracking-wider font-medium transition-colors"
                    >
                      Select options
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      <BeInspiredSection />
    </div>
  );
};

export default CategoryPage;
