import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShieldCheck, ArrowLeft, Lock } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatters";

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockOrderNum = "RAW-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(mockOrderNum);
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="container-custom py-24 text-center max-w-xl mx-auto min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold mb-2 block">
          Order Request Received
        </span>
        <h2 className="font-serif text-3xl text-stone-900 font-medium">
          Thank You, {form.firstName}
        </h2>
        <p className="text-stone-500 text-sm mt-3 leading-relaxed">
          Your bespoke order reference is <strong className="text-stone-900 font-mono">{orderNumber}</strong>. Our senior design architect will contact you within 24 hours to review timber stains, confirm fabric swatches, and finalize delivery timelines.
        </p>

        <div className="mt-8 p-6 bg-sand-50 border border-sand-200 text-left w-full text-xs space-y-2 text-stone-600">
          <p>• <strong>Confirmation Sent:</strong> {form.email}</p>
          <p>• <strong>WhatsApp Contact:</strong> {form.phone}</p>
          <p>• <strong>Delivery Address:</strong> {form.address}, {form.city}, {form.state} - {form.pincode}</p>
        </div>

        <Link
          to="/"
          className="mt-8 inline-block px-8 py-3.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-gold-600 hover:text-stone-950 transition-colors"
        >
          Return to Atelier Home
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-custom py-24 text-center">
        <h2 className="font-serif text-2xl text-stone-900">Your bag is empty</h2>
        <Link to="/shop" className="inline-block mt-4 text-xs uppercase tracking-wider text-gold-700 underline">
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-sand-50/40 min-h-screen py-12">
      <div className="container-custom">
        <div className="border-b border-sand-300 pb-6 mb-10 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block mb-1">
              Secure Checkout
            </span>
            <h1 className="font-serif text-3xl text-stone-900 font-medium">
              Bespoke Commission & Delivery Details
            </h1>
          </div>
          <Link
            to="/cart"
            className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Bag</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 border border-sand-200">
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-stone-900 font-medium border-b border-sand-200 pb-2">
                1. Client Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-lg text-stone-900 font-medium border-b border-sand-200 pb-2">
                2. Pan-India White-Glove Delivery Location
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                    Street Address & Apartment / Villa No. *
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                      State *
                    </label>
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none bg-white"
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Other">Other State</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                    Special Access Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="E.g. Service elevator available, narrow doorway, specific installation hours..."
                    className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-sand-50 border border-sand-200 text-xs space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold">
                <Lock className="w-4 h-4 text-gold-600" />
                <span>Bespoke Concierge Verification</span>
              </div>
              <p className="text-stone-600 font-light leading-relaxed">
                Because Raw Project furniture is handcrafted to custom dimensions and fabrics, no instant card charge is processed right now. Our atelier team verifies your spatial layout and issues an official GST Proforma Invoice with direct RTGS/NEFT or payment link details.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 border border-sand-200 space-y-6 sticky top-28 shadow-sm">
              <h3 className="font-serif text-lg text-stone-900 font-medium border-b border-sand-200 pb-3">
                Order Review ({items.length} items)
              </h3>

              <div className="divide-y divide-sand-200 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.key} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <h4 className="font-serif font-medium text-stone-900">{item.name}</h4>
                      <p className="text-stone-400 text-[11px]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-serif font-semibold text-stone-900">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-sand-200 pt-4 space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Pan-India Delivery</span>
                  <span className="text-emerald-700 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between font-serif text-base font-bold text-stone-950 pt-2 border-t border-sand-200">
                  <span>Estimated Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-stone-950 hover:bg-gold-600 hover:text-stone-950 text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg"
              >
                Place Bespoke Order Request
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                <span>Zero Obligation • 10-Year Structural Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
