import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";
import { Product, Category } from "../types";
import { api } from "../services/api";
import ProductCard from "../components/common/ProductCard";

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedCatSlug = searchParams.get("category") || "";

  useEffect(() => {
    async function loadCats() {
      const catData = await api.getCategories();
      setCategories(catData);
    }
    loadCats();
  }, []);

  useEffect(() => {
    async function loadCatalog() {
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      const res = await api.getProducts({
        per_page: 50,
        category: selectedCatSlug || undefined,
      });
      setProducts(res.products);
      setIsLoading(false);
    }
    loadCatalog();
  }, [selectedCatSlug]);

  const activeCategoryName = categories.find(c => c.slug === selectedCatSlug)?.name || "All Collections";

  return (
    <div className="bg-[#eae5da] min-h-screen pb-24">
      {/* 1. Hero Banner */}
      <section className="relative h-[45vh] min-h-[400px] w-full bg-[#2a251e] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" 
          alt="Shop Collection"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#e8e4db] font-bold mb-4">
            Curated Selection
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            {activeCategoryName}
          </h1>
          <div className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest text-[#e8e4db]/80">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Shop</span>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mt-12 md:mt-16 lg:mt-24 flex flex-col md:flex-row gap-8 lg:gap-20">
        
        {/* 2. Left Sidebar (Filter Bar) */}
        <aside className="md:w-[200px] lg:w-[240px] shrink-0">
          <div className="md:sticky md:top-32">
            <h3 className="text-[13px] font-bold text-[#1a1612] tracking-[0.2em] uppercase mb-5 md:mb-6 pb-4 border-b border-[#dfdbd2]">
              Collections
            </h3>
            
            <ul className="space-y-3.5 max-h-[40vh] md:max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar flex md:block flex-row flex-nowrap overflow-x-auto md:overflow-x-hidden md:overflow-y-auto pb-4 md:pb-0 scroll-smooth">
              <li className="shrink-0 md:shrink">
                <Link 
                  to="/shop"
                  className={`flex items-center gap-2 md:gap-3 text-[13px] md:text-[13.5px] transition-colors group ${
                    !selectedCatSlug 
                      ? 'text-[#1a1612] font-medium' 
                      : 'text-[#6b6359] hover:text-[#1a1612]'
                  }`}
                >
                  <div className={`w-[14px] h-[14px] shrink-0 border flex items-center justify-center transition-colors ${!selectedCatSlug ? 'border-[#1a1612] bg-[#1a1612]' : 'border-[#d8d2c4] group-hover:border-[#1a1612]'}`}>
                    {!selectedCatSlug && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </div>
                  All Products
                </Link>
              </li>
              {categories.map(c => (
                <li key={c.id} className="shrink-0 md:shrink">
                  <Link 
                    to={`/shop?category=${c.slug}`} 
                    className={`flex items-center gap-2 md:gap-3 text-[13px] md:text-[13.5px] transition-colors group ${
                      selectedCatSlug === c.slug 
                        ? 'text-[#1a1612] font-medium' 
                        : 'text-[#6b6359] hover:text-[#1a1612]'
                    }`}
                  >
                    <div className={`w-[14px] h-[14px] shrink-0 border flex items-center justify-center transition-colors ${selectedCatSlug === c.slug ? 'border-[#1a1612] bg-[#1a1612]' : 'border-[#d8d2c4] group-hover:border-[#1a1612]'}`}>
                      {selectedCatSlug === c.slug && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                    </div>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-12 hidden md:block">
              <h3 className="text-[13px] font-bold text-[#1a1612] tracking-[0.2em] uppercase mb-5 pb-4 border-b border-[#dfdbd2]">
                Need Help?
              </h3>
              <p className="text-[13px] text-[#6b6359] leading-relaxed mb-4">
                Looking for custom dimensions or a bespoke piece? Our design architects are here to assist.
              </p>
              <a 
                href="https://api.whatsapp.com/send?phone=918698814865"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-[11px] font-bold uppercase tracking-widest border-b border-[#1a1612] text-[#1a1612] pb-0.5 hover:text-[#8a7f72] hover:border-[#8a7f72] transition-colors"
              >
                Chat with us
              </a>
            </div>
          </div>
        </aside>

        {/* 3. Product Grid */}
        <main className="flex-1">
          {/* Header row above products */}
          <div className="flex justify-between items-end mb-10 pb-4 border-b border-[#dfdbd2]">
            <p className="text-[13px] text-[#6b6359] font-medium">
              Showing {products.length} {products.length === 1 ? 'piece' : 'pieces'}
            </p>
            <div className="text-[12px] tracking-[0.1em] text-[#1a1612] uppercase font-bold flex items-center gap-2">
              <span className="text-[#8a7f72] font-normal">Sort By:</span> Default
            </div>
          </div>

          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center text-[#8a7f72] gap-4">
              <div className="w-6 h-6 border-2 border-[#8a7f72] border-t-transparent rounded-full animate-spin"></div>
              <p className="font-serif italic text-lg">Curating collection...</p>
            </div>
          ) : (
            products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-xl font-serif text-[#1a1612] mb-4">No pieces found in this collection.</p>
                <Link to="/shop" className="text-[12px] font-bold uppercase tracking-widest border-b border-[#1a1612] text-[#1a1612] pb-0.5 hover:text-[#8a7f72] transition-colors">
                  View All Collections
                </Link>
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
