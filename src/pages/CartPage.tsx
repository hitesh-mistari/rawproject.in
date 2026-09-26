import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatters";

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [bespokeNotes, setBespokeNotes] = useState("");

  if (items.length === 0) {
    return (
      <div className="container-custom py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-sand-100 flex items-center justify-center text-stone-400 mb-6">
          <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
        </div>
        <h2 className="font-serif text-3xl text-stone-900 font-medium">Your Shopping Bag is Empty</h2>
        <p className="text-stone-500 text-sm mt-2 max-w-sm">
          You haven't added any bespoke furniture pieces yet. Browse our curated atelier collections to get started.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 bg-stone-900 hover:bg-gold-600 hover:text-stone-950 text-white px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
        >
          <span>Explore Furniture Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-sand-50/40 min-h-screen py-12">
      <div className="container-custom">
        <div className="border-b border-sand-300 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block mb-1">
              Review Bag
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-stone-900 font-medium">
              Bespoke Order Selection
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-wider text-stone-400 hover:text-rose-600 transition-colors self-start sm:self-auto"
          >
            Clear Entire Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-sand-200 divide-y divide-sand-200">
              {items.map((item) => {
                const subtotal = item.price * item.quantity;
                const img = item.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300";

                return (
                  <div key={item.key} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start">
                    <div className="w-24 h-28 sm:w-28 sm:h-32 bg-sand-100 overflow-hidden shrink-0 border border-sand-200">
                      <img src={img} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                          <Link to={`/product/${item.slug}`} className="hover:text-gold-700">
                            {item.name}
                          </Link>
                        </h3>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="text-stone-400 hover:text-rose-600 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.attributes && Object.keys(item.attributes).length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {Object.entries(item.attributes).map(([k, v]) => (
                            <span
                              key={k}
                              className="text-[11px] bg-sand-100 text-stone-700 px-2 py-0.5 border border-sand-200 uppercase tracking-wider"
                            >
                              {k}: <strong className="font-semibold">{String(v)}</strong>
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center border border-sand-300">
                          <button
                            onClick={() => updateQuantity(item.key, -1)}
                            className="px-3 py-1 text-stone-600 hover:bg-sand-100"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-semibold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.key, 1)}
                            className="px-3 py-1 text-stone-600 hover:bg-sand-100"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-serif text-base font-semibold text-stone-900">
                            {formatCurrency(subtotal)}
                          </div>
                          <span className="text-[10px] text-stone-400">
                            {formatCurrency(item.price)} each
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white p-5 border border-sand-200">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-900 mb-2">
                Special Customization or Blueprint Notes
              </label>
              <textarea
                rows={3}
                value={bespokeNotes}
                onChange={(e) => setBespokeNotes(e.target.value)}
                placeholder="Include architectural room dimensions, preferred wood stains, or specific fabric codes..."
                className="w-full border border-sand-300 text-xs p-3 focus:outline-none focus:border-stone-800 rounded-none bg-sand-50/50"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 border border-sand-200 space-y-6 sticky top-28 shadow-sm">
              <h3 className="font-serif text-lg text-stone-900 font-semibold border-b border-sand-200 pb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Pan-India Delivery</span>
                  <span className="text-emerald-700 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Room Placement & Assembly</span>
                  <span className="text-emerald-700 font-semibold">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (GST)</span>
                  <span className="text-stone-500">Calculated in Invoice</span>
                </div>
              </div>

              <div className="border-t border-sand-200 pt-4 flex justify-between items-baseline">
                <span className="font-serif text-base font-semibold text-stone-900">Estimated Total</span>
                <span className="font-serif text-2xl font-bold text-stone-950">
                  {formatCurrency(totalPrice)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="w-full py-4 bg-stone-950 hover:bg-gold-600 hover:text-stone-950 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pt-2 text-[11px] text-stone-500 space-y-2 border-t border-sand-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>10-Year Master Frame Warranty included on all structural hardwoods.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
