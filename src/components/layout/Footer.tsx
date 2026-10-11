import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp, Download, Phone, Instagram } from 'lucide-react';
import { useCatalogModal } from '../../context/CatalogModalContext';

const Footer: React.FC = () => {
  const { openCatalog } = useCatalogModal();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
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
                onClick={openCatalog}
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
  );
};

export default Footer;