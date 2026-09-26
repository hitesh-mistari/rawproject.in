import React, { useState } from "react";
import { CheckCircle2, UploadCloud, MessageSquare, ShieldCheck } from "lucide-react";

const RequestQuotePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    projectType: "Full Living Room",
    dimensions: "",
    preferredMaterials: "Natural Teak & Boucle Fabric",
    budgetRange: "₹3,00,000 – ₹7,00,000",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-sand-50/40 min-h-screen py-14">
      <div className="container-custom max-w-3xl mx-auto">
        <div className="bg-white p-8 sm:p-12 border border-sand-200 shadow-sm">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block">
              Bespoke Commissioning
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
              Request an Architectural Quote
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto">
              Share your spatial requirements, floorplans, or reference designs. Our design studio will furnish a detailed 3D proposal and itemized estimate within 48 hours.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl text-stone-900 font-medium">Quotation Request Received</h3>
              <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto font-light leading-relaxed">
                Thank you, {formData.name}. Our senior architect will review your project parameters and contact you at {formData.phone} or {formData.email} with swatch options and pricing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                    WhatsApp / Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                    Delivery City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Bengaluru, Delhi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                    Project Classification
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none bg-white"
                  >
                    <option value="Living Room">Living Room (Modular Sofa, Armchairs, Tables)</option>
                    <option value="Bedroom Suite">Bedroom Suite (Bed, Nightstands, Dresser)</option>
                    <option value="Dining Atelier">Dining Ensemble (Table & Dining Chairs)</option>
                    <option value="One-of-One Commission">One of One Collector Commission</option>
                    <option value="Complete Residence">Full Penthouse / Villa Portfolio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                    Estimated Budget Bracket
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full border border-sand-300 px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-900 rounded-none bg-white"
                  >
                    <option value="₹1,50,000 – ₹3,00,000">₹1,50,000 – ₹3,00,000</option>
                    <option value="₹3,00,000 – ₹7,00,000">₹3,00,000 – ₹7,00,000</option>
                    <option value="₹7,00,000 – ₹15,00,000">₹7,00,000 – ₹15,00,000</option>
                    <option value="₹15,00,000+">Above ₹15,00,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1">
                  Spatial Dimensions or Blueprint References
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide room length/width, specific sofa configuration (e.g. Left L-shape 10.5 ft), desired fabric shades, or links to cloud floorplans..."
                  className="w-full border border-sand-300 p-3 text-xs focus:outline-none focus:border-stone-900 rounded-none"
                />
              </div>

              <div className="p-4 bg-sand-50 border border-sand-200 text-xs text-stone-600 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0" />
                <span>Zero Obligation. Your project parameters and architectural blueprints remain strictly confidential.</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-stone-950 hover:bg-gold-600 hover:text-stone-950 text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md"
              >
                Submit Quotation Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestQuotePage;
