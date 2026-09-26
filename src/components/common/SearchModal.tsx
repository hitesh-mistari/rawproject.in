import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { api } from "../../services/api";
import { Product } from "../../types";
import { formatPrice } from "../../utils/formatters";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await api.getProducts({ search: query, per_page: 6 });
        setResults(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#141414] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden z-10">
        {/* Search Bar */}
        <div className="flex items-center px-5 py-4 border-b border-[#222]">
          <Search className="w-5 h-5 text-[#c5a880] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bespoke furniture, sofas, dining tables, beds..."
            className="w-full bg-transparent text-white placeholder-[#777] text-base focus:outline-none"
          />
          {loading && <Loader2 className="w-4 h-4 text-[#c5a880] animate-spin mr-3" />}
          <button onClick={onClose} className="text-[#888] hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[65vh] overflow-y-auto p-5">
          {query.trim().length < 2 && (
            <div className="text-center py-8">
              <p className="text-xs uppercase tracking-widest text-[#777] mb-3">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Living Sofa", "Dining Table", "Lounge Chair", "King Bed", "Center Table", "Bar Cabinet"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs bg-[#202020] hover:bg-[#2a2a2a] text-[#bbb] hover:text-[#c5a880] px-3 py-1.5 rounded-full transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest text-[#c5a880] mb-3 font-semibold">
                Found {results.length} Pieces
              </p>
              <div className="divide-y divide-[#202020]">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 py-3 group hover:bg-[#1a1a1a] -mx-3 px-3 rounded-lg transition-colors"
                  >
                    <div className="w-14 h-14 bg-[#202020] rounded overflow-hidden flex-shrink-0">
                      {product.images?.[0]?.src ? (
                        <img
                          src={product.images[0].src}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-[#555]">RAW</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white group-hover:text-[#c5a880] transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#888]">{product.categories?.[0]?.name || "Luxury Furniture"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#c5a880]">
                        {formatPrice(product.prices?.price)}
                      </p>
                      <span className="text-[10px] text-[#25D366]">In Stock</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[#222] text-center">
                <Link
                  to={`/shop?search=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs text-[#c5a880] hover:text-white font-medium"
                >
                  <span>View all results in Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {query.trim().length >= 2 && !loading && results.length === 0 && (
            <div className="text-center py-10 text-[#777]">
              <p className="text-sm">No furniture pieces found for "{query}".</p>
              <p className="text-xs mt-1">Try searching by category or wood texture name.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
