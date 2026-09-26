import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Twitter, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#905a39] text-[#f4efe8] font-sans overflow-hidden">
      
      {/* Top Grid Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#a16b49]">
        
        {/* Left Column */}
        <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-between min-h-[320px]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">THE RAW PROJECT</h2>
            <p className="text-[14px] text-white/80 leading-relaxed max-w-xs">
              Every week we share the latest arrivals, best deals, and exclusive offers.
            </p>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-white/70">Follow us on</span>
            <div className="flex gap-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 border border-[#a16b49] flex items-center justify-center hover:bg-white hover:text-[#905a39] transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 border border-[#a16b49] flex items-center justify-center hover:bg-white hover:text-[#905a39] transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 border border-[#a16b49] flex items-center justify-center hover:bg-white hover:text-[#905a39] transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 border border-[#a16b49] flex items-center justify-center hover:bg-white hover:text-[#905a39] transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center min-h-[320px] md:items-center">
          <ul className="space-y-4 inline-block">
            {['Home', 'About Us', 'Services', 'Projects', 'Contact'].map(link => (
              <li key={link}>
                <Link to="#" className="text-[14px] text-white/90 hover:text-white transition-colors flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-white/50"></span> {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center min-h-[320px]">
          <h3 className="text-2xl md:text-[28px] font-light mb-4 tracking-tight">
            Download <em className="font-serif italic text-white pr-1">Catalog</em>
          </h3>
          <p className="text-[13px] text-white/80 leading-relaxed mb-8 max-w-sm">
            Enter your email to receive our exclusive furniture and interior collections PDF directly.
          </p>
          <form 
            className="flex border border-[#a16b49] w-full max-w-md bg-transparent" 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you! The catalog PDF will begin downloading shortly.');
              // window.open('/catalog-placeholder.pdf', '_blank');
            }}
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent px-4 py-3.5 text-[13px] text-white placeholder-white/50 focus:outline-none flex-1" 
              required
            />
            <button type="submit" className="bg-white text-[#905a39] px-5 flex items-center justify-center hover:bg-gray-100 transition-colors group">
              <span className="text-[11px] font-bold tracking-widest uppercase mr-2 group-hover:mr-3 transition-all">Get PDF</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Middle Footer Strip */}
      <div className="border-t border-[#a16b49]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#a16b49]">
          
          <div className="p-5 lg:px-12 xl:px-16 flex items-center justify-center md:justify-start">
            <p className="text-[12px] text-white/70 tracking-wide">
              2026 ©The Raw Project. All rights reserved
            </p>
          </div>

          <div className="p-5 lg:px-12 xl:px-16 flex items-center justify-center">
            <button onClick={scrollToTop} className="text-[13px] text-white/90 font-medium hover:text-white transition-colors tracking-wide">
              Back to Top
            </button>
          </div>

          <div className="p-5 lg:px-12 xl:px-16 flex items-center justify-center md:justify-end gap-6 md:gap-8">
            <Link to="#" className="text-[12px] text-white/70 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-[12px] text-white/70 hover:text-white transition-colors">Terms of Use</Link>
            <Link to="#" className="text-[12px] text-white/70 hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Massive Typography Bottom */}
      <div className="w-full pt-12 md:pt-20 px-4 flex justify-center translate-y-4 md:translate-y-8 select-none">
        <h1 
          className="text-[11vw] leading-[0.7] font-bold tracking-tighter text-white whitespace-nowrap"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          THE RAW PROJECT
        </h1>
      </div>

    </footer>
  );
};

export default Footer;