import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATALOG_DRIVE_URL = 'https://drive.google.com/drive/folders/1hf4G4ZlPRviPm1nv-J47afITPD2nmiOG?usp=drive_link';

export const CatalogModal: React.FC<CatalogModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsSubmitted(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Open drive folder in new tab or fallback redirect
    try {
      const opened = window.open(CATALOG_DRIVE_URL, '_blank');
      if (!opened || opened.closed || typeof opened.closed === 'undefined') {
        window.location.href = CATALOG_DRIVE_URL;
      }
    } catch {
      window.location.href = CATALOG_DRIVE_URL;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Catalogue Request Modal"
    >
      <div 
        className="relative w-full max-w-md bg-[#181614] border border-[#332f2b] p-8 sm:p-10 text-[#e8e3da] shadow-2xl rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimalist Close Button */}
        <button
          type="button"
          onClick={onClose}
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
                className="w-full mt-4 bg-[#c5a880] hover:bg-[#b0936b] text-[#181614] text-[11px] tracking-[0.25em] font-semibold uppercase py-4 transition-all flex items-center justify-center gap-2 group rounded-none cursor-pointer"
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
              onClick={onClose}
              className="mt-6 inline-block border border-[#332f2b] hover:border-[#c5a880] text-[#e8e3da] hover:text-[#c5a880] text-[11px] tracking-[0.2em] font-medium uppercase px-8 py-3 transition-colors rounded-none cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogModal;
