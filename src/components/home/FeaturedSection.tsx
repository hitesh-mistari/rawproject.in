import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Product } from "../../types";
import { api } from "../../services/api";
import ProductGrid from "../common/ProductGrid";

const FeaturedSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    async function loadFeatured() {
      setIsLoading(true);
      try {
        const res = await api.getProducts({ per_page: 8 });
        setProducts(res.products);
      } catch (err) {
        console.error("Failed to load featured products:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((p) =>
          p.categories?.some((c) => c.slug.toLowerCase().includes(activeTab))
        );

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header with Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block mb-2">
              Featured Signatures
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-medium">
              Pieces of Distinction
            </h2>
          </div>

          {/* Collection Filter Tabs */}
          <div className="flex items-center gap-1 border-b border-sand-300 pb-1 overflow-x-auto">
            {[
              { label: "All Works", key: "all" },
              { label: "Living", key: "living" },
              { label: "Bedroom", key: "bedroom" },
              { label: "Dining", key: "dining" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all relative whitespace-nowrap ${
                  activeTab === tab.key
                    ? "text-stone-900 font-semibold"
                    : "text-stone-400 hover:text-stone-700"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} isLoading={isLoading} columns={4} />

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-stone-900 hover:bg-gold-600 hover:text-stone-950 text-white px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md"
          >
            <span>View Full Furniture Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
