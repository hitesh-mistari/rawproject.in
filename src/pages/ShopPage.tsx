import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Product, Category } from "../types";
import { api } from "../services/api";
import ProductCard from "../components/common/ProductCard";

const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCatSlug = searchParams.get("category") || "";

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    async function loadCatalog() {
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      const res = await api.getProducts({
        per_page: 60,
        category: selectedCatSlug || undefined,
      });
      setProducts(res.products);
      setIsLoading(false);
    }
    loadCatalog();
  }, [selectedCatSlug]);

  const filteredProducts = searchQuery.trim()
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products;

  const activeCategoryName =
    categories.find(c => c.slug === selectedCatSlug)?.name || "All Product";

  // Build tab list: All + categories
  const topTabs = [
    { slug: "", name: "All Product" },
    ...categories.map(c => ({ slug: c.slug, name: c.name })),
  ];

  return (
    <div className="bg-[#f7f5f2] min-h-screen">

      {/* ── Hero + Search + Tabs ── */}
      <section className="bg-white border-b border-[#ebebeb] pt-20 pb-0">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center pt-10 pb-6">

          {/* Heading */}
          <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#1a1a1a] mb-2 leading-tight">
            Find Furniture You'll Love —
          </h1>
          <h2 className="text-[28px] sm:text-[36px] font-semibold text-[#1a1a1a] mb-6 leading-tight">
            Delivered to Your Door.
          </h2>

          {/* Search Bar */}
          <div className="relative max-w-[540px] mx-auto mb-8">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#bbb]" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search anything..."
              className="w-full pl-10 pr-10 py-3 rounded-full bg-[#f5f5f5] border border-[#e8e8e8] text-[14px] text-[#1a1a1a] placeholder-[#bbb] focus:outline-none focus:border-[#8a6040] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-[#bbb] hover:text-[#555]" />
              </button>
            )}
          </div>
        </div>

        {/* ── Tab Navigation ── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-end gap-0 overflow-x-auto scrollbar-none border-b border-[#ebebeb]">
            {topTabs.map(tab => {
              const isActive = tab.slug === selectedCatSlug;
              return (
                <Link
                  key={tab.slug}
                  to={tab.slug ? `/shop?category=${tab.slug}` : "/shop"}
                  className={`relative shrink-0 px-5 py-3.5 text-[14px] font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "text-[#1a1a1a] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1a1a1a] after:content-['']"
                      : "text-[#999] hover:text-[#1a1a1a]"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-20">

        {/* Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[13px] text-[#999]">
            {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
          </p>
          <span className="text-[12px] text-[#999]">Sort: Default</span>
        </div>

        {isLoading ? (
          <div className="h-72 flex flex-col items-center justify-center gap-3 text-[#999]">
            <div className="w-7 h-7 border-2 border-[#8a6040] border-t-transparent rounded-full animate-spin" />
            <span className="text-[13px]">Loading collection...</span>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-xl text-[#1a1a1a] mb-4">No pieces found.</p>
            <Link to="/shop" className="text-[13px] font-medium text-[#8a6040] hover:underline">
              View All Collections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
