import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatters";

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#121212] border-l border-[#252525] shadow-2xl h-full flex flex-col z-10 animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#c5a880]" />
            <h3 className="font-serif text-lg font-semibold text-white tracking-wide">
              Your Selection ({cartCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#888] hover:text-white hover:bg-[#202020] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping / Bespoke Banner */}
        <div className="bg-[#1a1815] border-b border-[#2d261e] px-6 py-2.5 text-xs text-[#d6c4a8] flex items-center justify-between">
          <span>✨ Complimentary White Glove Delivery on all orders</span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#777] py-12">
              <ShoppingBag className="w-12 h-12 text-[#333] mb-3 stroke-[1.5]" />
              <p className="font-serif text-base text-white mb-1">Your cart is currently empty</p>
              <p className="text-xs text-[#777] max-w-xs mb-6">
                Discover our curated handcrafted furniture collections and customize with luxury finishes.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/shop");
                }}
                className="bg-[#c5a880] hover:bg-[#b0936b] text-black font-medium text-xs tracking-wider uppercase px-6 py-3 rounded transition-colors"
              >
                Explore Furniture
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.key}
                className="flex gap-4 p-3.5 bg-[#171717] border border-[#242424] rounded-lg transition-all"
              >
                {/* Image */}
                <div className="w-20 h-20 bg-[#222] rounded overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-[#555]">RAW</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-sm font-medium text-white hover:text-[#c5a880] transition-colors truncate block"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-[#666] hover:text-red-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Attributes */}
                    {item.attributes && Object.keys(item.attributes).length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {Object.entries(item.attributes).map(([k, v]) => (
                          <span
                            key={k}
                            className="text-[10px] uppercase tracking-wider bg-[#222] text-[#aaa] px-2 py-0.5 rounded"
                          >
                            {k.replace("pa_", "")}: <strong className="text-white">{v}</strong>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#222]">
                    <div className="flex items-center border border-[#333] rounded bg-[#111]">
                      <button
                        onClick={() => updateQuantity(item.key, -1)}
                        className="p-1 text-[#888] hover:text-white transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs px-2.5 text-white font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.key, 1)}
                        className="p-1 text-[#888] hover:text-white transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-[#171717] border-t border-[#252525] space-y-4">

            <p className="text-[11px] text-[#777]">
              Taxes and customized delivery options calculated at checkout.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/cart");
                }}
                className="w-full border border-[#333] hover:border-[#c5a880] text-white hover:text-[#c5a880] text-xs font-semibold uppercase tracking-wider py-3 rounded transition-colors"
              >
                View Full Bag
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/checkout");
                }}
                className="w-full bg-[#c5a880] hover:bg-[#b0936b] text-black text-xs font-semibold uppercase tracking-wider py-3 rounded flex items-center justify-center gap-1.5 transition-colors shadow-luxury-gold"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
