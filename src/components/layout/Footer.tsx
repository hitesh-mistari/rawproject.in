import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Download, X, Mail, Phone, User, CheckCircle2, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Redirect client to the Google Drive folder
    window.location.href = 'https://drive.google.com/drive/folders/1hf4G4ZlPRviPm1nv-J47afITPD2nmiOG?usp=drive_link';
  };

  return (
    <>
      <footer className="bg-[#1e1c1a] text-[#e8e3da] font-sans overflow-hidden">
        {/* Main Content Area */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14">

          {/* Top Row: Tagline + Download Catalog */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 mb-10 sm:mb-12">

            {/* Left: Tagline + Download Catalog Action */}
            <div className="max-w-[380px]">

              {/* Download Catalog Trigger */}
              <button
                type="button"
                onClick={handleOpenModal}
                className="w-full flex items-center justify-between border-b border-[#3d3a36] pb-2.5 gap-3 group text-left hover:border-[#c5a880] transition-colors"
              >
                <span className="text-[14px] text-[#e8e3da] font-medium group-hover:text-[#c5a880] transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#c5a880]" />
                  Download Our Catalog
                </span>
                <span className="w-7 h-7 rounded-full border border-[#3d3a36] flex items-center justify-center group-hover:bg-[#c5a880] group-hover:text-[#1e1c1a] group-hover:border-[#c5a880] transition-all shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </span>
              </button>
            </div>

            {/* Right: 2 Navigation Columns */}
            <div className="grid grid-cols-2 gap-8 sm:gap-14">
              {/* Collections */}
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#6b6560] font-medium mb-4">
                  Collections
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Bedroom', href: '/product-category/bedroom' },
                    { label: 'Living Room', href: '/product-category/living' },
                    { label: 'Dining', href: '/product-category/dining' },
                    { label: 'Seating', href: '/product-category/living/lounge-chair' },
                    { label: 'Storage', href: '/shop' },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <Link to={href} className="text-[13px] text-[#a09890] hover:text-[#e8e3da] transition-colors leading-tight block">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Studio */}
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#6b6560] font-medium mb-4">
                  Studio
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'About', href: '/about' },
                    { label: 'Contact', href: '/contact' },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <Link to={href} className="text-[13px] text-[#a09890] hover:text-[#e8e3da] transition-colors leading-tight block">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2e2b28] pt-5">
            <p className="text-[12px] text-[#6b6560] tracking-wide">
              2026 © The Raw Project. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com/therawproject.in/" target="_blank" rel="noreferrer" className="text-[#6b6560] hover:text-[#c5a880] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <Link to="/shipping-policy" className="text-[12px] text-[#6b6560] hover:text-[#a09890] transition-colors">Shipping Policy</Link>
              <Link to="/privacy-policy" className="text-[12px] text-[#6b6560] hover:text-[#a09890] transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-[12px] text-[#6b6560] hover:text-[#a09890] transition-colors">Terms of Use</Link>
              <button onClick={scrollToTop} className="text-[12px] text-[#6b6560] hover:text-[#a09890] transition-colors">
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Download Catalog Popup Modal - Editorial High-Fashion Luxury Styling */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-md bg-[#181614] border border-[#332f2b] p-8 sm:p-10 text-[#e8e3da] shadow-2xl rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Minimalist Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 p-2 text-[#736c63] hover:text-[#e8e3da] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {!isSubmitted ? (
              <>
                <div className="mb-8 pr-6">
                  <p className="text-[10px] tracking-[0.3em] font-semibold text-[#c5a880] uppercase mb-2">
                    Catalogue Request
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#e8e3da] tracking-wide leading-tight mb-2">
                    Download Our Collection
                  </h3>
                  <p className="text-[12.5px] text-[#8c857b] font-light leading-relaxed">
                    Enter your credentials to receive our complete 2026 furniture & interior design portfolio.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-[#8c857b] mb-2 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Architectural Client"
                      className="w-full bg-transparent border-b border-[#332f2b] focus:border-[#c5a880] py-2.5 text-[13px] text-[#e8e3da] placeholder-[#544e47] focus:outline-none transition-colors font-light tracking-wide rounded-none"
                    />
                  </div>

                  {/* Contact Type Segmented Toggle */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-[#8c857b] mb-2 font-medium">
                      Preferred Contact *
                    </label>
                    <div className="flex border-b border-[#332f2b]">
                      <button
                        type="button"
                        onClick={() => setContactType('email')}
                        className={`flex-1 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-all text-center border-b-2 ${
                          contactType === 'email'
                            ? 'border-[#c5a880] text-[#c5a880]'
                            : 'border-transparent text-[#736c63] hover:text-[#a09890]'
                        }`}
                      >
                        Email Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setContactType('phone')}
                        className={`flex-1 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-all text-center border-b-2 ${
                          contactType === 'phone'
                            ? 'border-[#c5a880] text-[#c5a880]'
                            : 'border-transparent text-[#736c63] hover:text-[#a09890]'
                        }`}
                      >
                        Phone Number
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Input Field */}
                  {contactType === 'email' ? (
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-[#8c857b] mb-2 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@studio.com"
                        className="w-full bg-transparent border-b border-[#332f2b] focus:border-[#c5a880] py-2.5 text-[13px] text-[#e8e3da] placeholder-[#544e47] focus:outline-none transition-colors font-light tracking-wide rounded-none"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-[#8c857b] mb-2 font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-transparent border-b border-[#332f2b] focus:border-[#c5a880] py-2.5 text-[13px] text-[#e8e3da] placeholder-[#544e47] focus:outline-none transition-colors font-light tracking-wide rounded-none"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-4 bg-[#c5a880] hover:bg-[#b0936b] text-[#181614] text-[11px] tracking-[0.25em] font-semibold uppercase py-4 transition-all flex items-center justify-center gap-2 group rounded-none"
                  >
                    <span>Download Catalogue PDF</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center space-y-5">
                <span className="text-[10px] tracking-[0.3em] font-semibold text-[#c5a880] uppercase block">
                  Request Confirmed
                </span>
                <h3 className="font-serif text-2xl font-light text-[#e8e3da]">
                  Thank You, {name || 'Valued Guest'}
                </h3>
                <p className="text-[13px] text-[#8c857b] font-light leading-relaxed max-w-xs mx-auto">
                  Your catalogue PDF download has been initiated. We look forward to creating exceptional spaces together.
                </p>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-6 inline-block border border-[#332f2b] hover:border-[#c5a880] text-[#e8e3da] hover:text-[#c5a880] text-[11px] tracking-[0.2em] font-medium uppercase px-8 py-3 transition-colors rounded-none"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;