import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp, Download, X, Mail, Phone, User, CheckCircle2, Instagram } from 'lucide-react';

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
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">

          {/* Top Row: Brand Info + Navigation Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] gap-10 md:gap-12 lg:gap-16 mb-12 sm:mb-14">

            {/* Left: Brand Identity + Download Catalog Trigger */}
            <div className="flex flex-col justify-between max-w-[420px] space-y-6">
              <div>
                <Link to="/" className="inline-block group mb-3">
                  <span className="font-recoleta text-[24px] sm:text-[28px] text-[#f2eee7] leading-tight block tracking-[0.02em]">
                    the <span className="font-bold">raw</span> project
                  </span>
                </Link>
                <p className="text-[13px] text-[#9a9187] font-light leading-relaxed mb-4">
                  Handcrafted bespoke furniture and quiet luxury architectural interiors honoring natural timber and traditional joinery.
                </p>
                <div className="flex flex-col gap-1.5 text-[12px] text-[#827a71]">
                  <a href="tel:+918698814865" className="hover:text-[#c5a880] transition-colors inline-flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>+91 8698814865</span>
                  </a>
                  <a href="https://instagram.com/therawproject.in" target="_blank" rel="noreferrer" className="hover:text-[#c5a880] transition-colors inline-flex items-center gap-2">
                    <Instagram className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>@therawproject.in</span>
                  </a>
                </div>
              </div>

              {/* Download Catalog Trigger */}
              <button
                type="button"
                onClick={handleOpenModal}
                className="w-full flex items-center justify-between border-b border-[#3d3a36] pb-3 gap-3 group text-left hover:border-[#c5a880] transition-colors pt-2"
              >
                <span className="text-[13px] sm:text-[14px] text-[#e8e3da] font-medium group-hover:text-[#c5a880] transition-colors flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-[#c5a880]" />
                  Download Our Catalog
                </span>
                <span className="w-7 h-7 rounded-full border border-[#3d3a36] flex items-center justify-center group-hover:bg-[#c5a880] group-hover:text-[#1e1c1a] group-hover:border-[#c5a880] transition-all shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </span>
              </button>
            </div>

            {/* Middle: Collections */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#736c64] font-semibold mb-4 sm:mb-5">
                Collections
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Bedroom', href: '/product-category/bedroom' },
                  { label: 'Living Room', href: '/product-category/living' },
                  { label: 'Dining', href: '/product-category/dining' },
                  { label: 'Seating & Chairs', href: '/product-category/living/lounge-chair' },
                  { label: 'Center & Side Tables', href: '/product-category/living/center-table' },
                  { label: 'One of One Pieces', href: '/shop' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link to={href} className="text-[13px] text-[#a09890] hover:text-[#f2eee7] hover:translate-x-0.5 transition-all leading-tight inline-block">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Studio & Atelier */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#736c64] font-semibold mb-4 sm:mb-5">
                Studio & Atelier
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'About The Atelier', href: '/about' },
                  { label: 'Experience Centre', href: '/experience-centre' },
                  { label: 'Complete Catalog', href: '/shop' },
                  { label: 'News & Journal', href: '/news' },
                  { label: 'Get in Touch', href: '/get-in-touch' },
                  { label: 'Request a Quote', href: '/request-quote' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link to={href} className="text-[13px] text-[#a09890] hover:text-[#f2eee7] hover:translate-x-0.5 transition-all leading-tight inline-block">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Strip: Fully Responsive & Zero Awkward Wrapping */}
          <div className="border-t border-[#2e2b28] pt-6 sm:pt-8 space-y-4 sm:space-y-5">
            {/* Upper Action/Links Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              {/* Policy Links with Bullet Separators */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 sm:gap-x-6 gap-y-2 text-[12px] text-[#7a746e]">
                <Link to="/shipping-policy" className="whitespace-nowrap hover:text-[#e8e3da] transition-colors py-0.5">
                  Shipping Policy
                </Link>
                <span className="text-[#3d3a36] select-none">•</span>
                <Link to="/privacy-policy" className="whitespace-nowrap hover:text-[#e8e3da] transition-colors py-0.5">
                  Privacy Policy
                </Link>
                <span className="text-[#3d3a36] select-none">•</span>
                <Link to="/terms-of-service" className="whitespace-nowrap hover:text-[#e8e3da] transition-colors py-0.5">
                  Terms of Use
                </Link>
              </div>

              {/* Social and Back to Top Actions */}
              <div className="flex items-center gap-5 sm:gap-6 text-[12px] text-[#7a746e]">
                <a 
                  href="https://www.instagram.com/therawproject.in/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 hover:text-[#c5a880] transition-colors whitespace-nowrap py-0.5" 
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Instagram</span>
                </a>
                <span className="text-[#3d3a36] select-none">•</span>
                <button 
                  onClick={scrollToTop} 
                  className="inline-flex items-center gap-1.5 hover:text-[#c5a880] transition-colors whitespace-nowrap py-0.5 group"
                >
                  <span>Back to Top</span>
                  <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>

            {/* Lower Copyright Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#5c564f] text-center sm:text-left pt-2 border-t border-[#252320]">
              <p>2026 © The Raw Project. All rights reserved.</p>
              <p className="tracking-wide">Handcrafted Luxury Furniture by Ar. Amruta Bade</p>
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