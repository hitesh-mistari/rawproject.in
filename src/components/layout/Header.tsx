import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

const HoverUnderlineLink = ({ to, children, className = '', isActive = false, onMouseEnter, onMouseLeave }: any) => {
  const lineRef = useRef(null);

  const handleEnter = (e: any) => {
    if (onMouseEnter) onMouseEnter(e);
    if (isActive) return;
    gsap.fromTo(lineRef.current, 
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.4, ease: 'power3.out' }
    );
  };

  const handleLeave = (e: any) => {
    if (onMouseLeave) onMouseLeave(e);
    if (isActive) return;
    gsap.to(lineRef.current, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.4,
      ease: 'power3.inOut'
    });
  };

  return (
    <Link 
      to={to} 
      className={`relative inline-block ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="relative z-10">{children}</span>
      <span 
        ref={lineRef} 
        className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-[#1a1612]" 
        style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: isActive ? 'left center' : 'right center' }}
      />
    </Link>
  );
};

interface SubmenuItem {
  name: string;
  href: string;
}

interface ShopCategory {
  id: string;
  name: string;
  href: string;
  subcategories?: SubmenuItem[];
  featuredImage: string;
  featuredTitle: string;
  featuredLink: string;
}

const SHOP_CATEGORIES: ShopCategory[] = [
  {
    id: 'bedroom',
    name: 'Bedroom',
    href: '/product-category/bedroom',
    featuredImage: '/images/home/featured_nibrite_bed.png',
    featuredTitle: 'Nibrite Bed',
    featuredLink: '/product-category/bedroom/bed',
    subcategories: [
      { name: 'Bed', href: '/product-category/bedroom/bed' },
      { name: 'Side Table', href: '/product-category/bedroom/side-table' }
    ]
  },
  {
    id: 'living',
    name: 'Living',
    href: '/product-category/living',
    featuredImage: '/images/home/featured_sahara_sofa.png',
    featuredTitle: 'Sahara Sofa',
    featuredLink: '/product-category/living/sofa',
    subcategories: [
      { name: 'Ottoman & Bench', href: '/product-category/living/ottoman-bench' },
      { name: 'TV Unit', href: '/product-category/living/tv-unit' },
      { name: 'Sofa', href: '/product-category/living/sofa' },
      { name: 'Living Side Table', href: '/product-category/living/living-side-table' },
      { name: 'Shoe Stand', href: '/product-category/living/shoe-stand' },
      { name: 'Lounge Chair', href: '/product-category/living/lounge-chair' },
      { name: 'Console Unit', href: '/product-category/living/console-table' },
      { name: 'Swing', href: '/product-category/living/swing' },
      { name: 'Center Table', href: '/product-category/living/center-table' }
    ]
  },
  {
    id: 'dining',
    name: 'Dining',
    href: '/product-category/dining',
    featuredImage: 'https://images.unsplash.com/photo-1617806118233-18e1c1228eb0?q=80&w=1000&auto=format&fit=crop', // Beautiful dining table fallback
    featuredTitle: 'Dining Chairs',
    featuredLink: '/product-category/dining/chairs',
    subcategories: [
      { name: 'Chairs', href: '/product-category/dining/chairs' },
      { name: 'Bar Cabinets', href: '/product-category/dining/bar' },
      { name: 'Bar Chairs', href: '/product-category/dining/bar-chairs' },
      { name: 'Dining Table', href: '/product-category/dining/dining-table' }
    ]
  },
  {
    id: 'one-of-one',
    name: 'One of one',
    href: '/shop?collection=one-of-one',
    featuredImage: '/images/home/featured_moh_swing.jpg',
    featuredTitle: 'Moh Swing',
    featuredLink: '/shop?collection=one-of-one'
  }
];

const Header: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string>('bedroom');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();
  
  useLayoutEffect(() => {
    if (!logoRef.current) return;
    const chars = logoRef.current.querySelectorAll('.logo-char');
    
    // Create a master timeline that loops infinitely
    const tl = gsap.timeline({ repeat: -1 });

    // 1. Initial Entry: Elastic flip up
    tl.fromTo(chars, 
      { y: 30, opacity: 0, rotateX: -90, transformOrigin: '50% 50% -20px' },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.04, duration: 1.2, ease: "elastic.out(1, 0.5)", delay: 0.2 }
    )
    
    // 2. The Wave: Smooth up and down
    .to(chars, {
      y: -8,
      stagger: { each: 0.05, yoyo: true, repeat: 1 },
      duration: 0.4,
      ease: "sine.inOut",
      delay: 4
    })

    // 3. The 3D Barrel Roll: Flip 360 degrees
    .to(chars, {
      rotateX: 360,
      stagger: 0.05,
      duration: 0.8,
      ease: "back.out(1.5)",
      delay: 4
    })
    
    // Reset rotation for future loops seamlessly
    .set(chars, { rotateX: 0 })

    // 4. The Shimmer: Quick opacity fade
    .to(chars, {
      opacity: 0.3,
      stagger: { each: 0.04, yoyo: true, repeat: 1 },
      duration: 0.2,
      ease: "power1.inOut",
      delay: 4
    })
    
    // 5. Squeeze and Stretch
    .to(chars, {
      scaleY: 0.7,
      scaleX: 1.2,
      stagger: { each: 0.04, yoyo: true, repeat: 1 },
      duration: 0.2,
      ease: "power2.inOut",
      delay: 4
    })
    
    // 6. Letter Spacing Pulse (Targeting the parent container)
    .to(logoRef.current, {
      letterSpacing: '0.15em',
      duration: 1,
      ease: "power2.inOut",
      delay: 4
    })
    .to(logoRef.current, {
      letterSpacing: '0.02em',
      duration: 1,
      ease: "power2.inOut",
    })
    
    // Wait before the timeline repeats from the start (which will re-trigger the initial entry)
    // Actually, to prevent the logo from disappearing, let's just make it do the effects in a loop,
    // and skip the initial flip on subsequent loops by using a label and repeating from there.
    
    // Wait a bit at the end of the timeline
    .to({}, { duration: 3 });

  }, []);
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleShopMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsShopOpen(true);
  };

  const handleShopMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsShopOpen(false);
    }, 150);
  };

  const currentCategoryData = SHOP_CATEGORIES.find(c => c.id === hoveredCategory);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const renderAnimatedText = (text: string, isBold: boolean = false) => {
    return text.split('').map((char, index) => (
      <span key={`${char}-${index}`} className={`inline-block logo-char font-recoleta ${isBold ? 'font-bold' : ''}`} style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char}
      </span>
    ));
  };

  return (
    <>
      <header className="bg-white w-full relative z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-5 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="group flex flex-col" onClick={closeMobileMenu}>
              <span ref={logoRef} className="font-recoleta text-[24px] sm:text-[28px] md:text-[32px] text-[#1a1612] leading-tight mb-1 flex items-center" style={{ letterSpacing: '0.02em', perspective: '400px' }}>
                {renderAnimatedText('the ')}
                {renderAnimatedText('raw', true)}
                {renderAnimatedText(' project')}
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10 mt-1">
            <HoverUnderlineLink to="/about" isActive={location.pathname === '/about'} className="text-[12px] tracking-[0.1em] text-[#666] hover:text-black font-medium transition-colors uppercase py-1">
              ABOUT
            </HoverUnderlineLink>
            <HoverUnderlineLink to="/experience-centre" isActive={location.pathname === '/experience-centre'} className="text-[12px] tracking-[0.1em] text-[#666] hover:text-black font-medium transition-colors uppercase py-1">
              EXPERIENCE CENTRE
            </HoverUnderlineLink>

            {/* Shop (Collections) Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleShopMouseEnter}
              onMouseLeave={handleShopMouseLeave}
            >
              <HoverUnderlineLink 
                to="/shop" 
                isActive={location.pathname === '/shop'}
                className={`text-[12px] tracking-[0.1em] font-medium transition-colors uppercase cursor-pointer flex items-center gap-1.5 py-1 ${
                  isShopOpen ? 'text-black' : 'text-[#666] hover:text-black'
                }`}
              >
                COLLECTIONS
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isShopOpen ? 'rotate-180' : ''}`} />
              </HoverUnderlineLink>

              {isShopOpen && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-5 z-50 animate-fadeIn"
                  onMouseEnter={handleShopMouseEnter}
                  onMouseLeave={handleShopMouseLeave}
                >
                  {/* Invisible bridge to keep hover active */}
                  <div className="absolute -top-5 left-0 right-0 h-5 bg-transparent" />
                  
                  <div className="bg-[#fdfbf9] border border-[#e8e4db] shadow-2xl p-10 flex gap-12 lg:gap-16 w-max max-w-[1200px]">
                    <div className="flex gap-12 lg:gap-16">
                      {SHOP_CATEGORIES.map((cat) => (
                        <div 
                          key={cat.id} 
                          className="flex flex-col min-w-[140px]"
                          onMouseEnter={() => setHoveredCategory(cat.id)}
                        >
                          <Link 
                            to={cat.href}
                            onClick={() => setIsShopOpen(false)}
                            className="text-[#1a1612] font-semibold uppercase tracking-[0.15em] text-[11px] mb-4 pb-2 border-b border-[#e8e4db] hover:text-[#8a7f72] transition-colors"
                          >
                            {cat.name}
                          </Link>
                          {cat.subcategories ? (
                            <div className="flex flex-col gap-2.5">
                              {cat.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.href}
                                  onClick={() => setIsShopOpen(false)}
                                  className="text-[13px] text-[#6b6359] font-light hover:text-[#1a1612] hover:translate-x-1 transition-all duration-300"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <Link
                              to={cat.href}
                              onClick={() => setIsShopOpen(false)}
                              className="text-[12px] text-[#8a7f72] font-serif italic hover:text-[#1a1612] transition-colors mt-2"
                            >
                              Explore piece &rarr;
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Featured Mega Menu Block */}
                    <div className="hidden lg:block w-[320px] bg-[#eae5da] relative overflow-hidden group border border-[#dfdbd2]">
                      <img 
                        key={currentCategoryData?.featuredImage}
                        src={currentCategoryData?.featuredImage || '/images/home/featured_sahara_sofa.png'} 
                        alt={currentCategoryData?.featuredTitle || 'Featured'} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 animate-[fadeIn_0.5s_ease-in-out]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a251e]/80 via-[#2a251e]/20 to-transparent group-hover:from-[#2a251e]/90 transition-colors duration-500" />
                      <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white w-full">
                        <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-1 opacity-90 drop-shadow-md">Signature Piece</p>
                        <h3 className="font-serif text-2xl drop-shadow-md tracking-wide animate-[fadeIn_0.5s_ease-in-out]" key={currentCategoryData?.featuredTitle}>
                          {currentCategoryData?.featuredTitle || 'Sahara Sofa'}
                        </h3>
                        <Link 
                          to={currentCategoryData?.featuredLink || '/product-category/living/sofa'} 
                          onClick={() => setIsShopOpen(false)}
                          className="mt-4 text-[10px] font-bold uppercase tracking-[0.15em] border-b border-white self-start pb-0.5 hover:text-[#eae5da] hover:border-[#eae5da] transition-colors drop-shadow-md"
                        >
                          Discover
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <HoverUnderlineLink to="/news" isActive={location.pathname === '/news'} className="text-[12px] tracking-[0.1em] text-[#666] hover:text-black font-medium transition-colors uppercase py-1">
              NEWS
            </HoverUnderlineLink>
            <HoverUnderlineLink to="/get-in-touch" isActive={location.pathname === '/get-in-touch' || location.pathname === '/contact'} className="text-[12px] tracking-[0.1em] text-[#666] hover:text-black font-medium transition-colors uppercase py-1">
              GET IN TOUCH
            </HoverUnderlineLink>
          </nav>

          {/* Right: Empty (previously Cart) */}
          <div className="hidden md:flex items-center gap-5 mt-1">
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-4">
             <button
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               className="p-1 text-[#222] cursor-pointer"
               aria-label="Toggle Menu"
             >
               {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Full Screen Slide-in Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={closeMobileMenu}
          />
          
          {/* Drawer Panel */}
          <div className="absolute top-0 left-0 bottom-0 w-[85vw] max-w-[340px] bg-[#FAF9F6] overflow-y-auto shadow-2xl flex flex-col mobile-menu-enter border-t-4 border-t-[#18484B]">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-[#ded7ca]">
              <span className="text-[14px] font-medium tracking-wider text-black uppercase">Menu</span>
              <button onClick={closeMobileMenu} className="p-1 text-black" aria-label="Close Menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search bar */}
            <div className="px-5 py-4 border-b border-[#ded7ca]">
              <form onSubmit={handleSearch} className="flex items-center border-b border-black pb-2">
                <Search className="w-4 h-4 mr-2 text-black shrink-0" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm w-full focus:outline-none text-black placeholder-black/60"
                />
              </form>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-5 py-2 text-[16px]">
              <Link 
                to="/about" 
                onClick={closeMobileMenu} 
                className="flex items-center py-3.5 border-b border-[#d8d2c4] text-black font-light hover:text-[#6b6359] transition-colors uppercase"
              >
                ABOUT
              </Link>
              <Link 
                to="/experience-centre" 
                onClick={closeMobileMenu} 
                className="flex items-center py-3.5 border-b border-[#d8d2c4] text-black font-light hover:text-[#6b6359] transition-colors uppercase"
              >
                EXPERIENCE CENTRE
              </Link>

              
              {/* Shop Accordion */}
              <div className="border-b border-[#d8d2c4]">
                <div className="flex items-center justify-between py-3.5 cursor-pointer text-black font-light">
                  <Link to="/shop" onClick={closeMobileMenu} className="flex-1 hover:text-[#6b6359] transition-colors uppercase">COLLECTIONS</Link>
                  <button
                    onClick={() => setMobileExpandedCat(mobileExpandedCat === '__shop__' ? null : '__shop__')}
                    className="p-1"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedCat === '__shop__' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {mobileExpandedCat === '__shop__' && (
                  <div className="pb-3 space-y-0.5 bg-[#f0eadd] -mx-5 px-8 py-3">
                    {SHOP_CATEGORIES.map((cat) => (
                      <div key={cat.id}>
                        <div className="flex items-center justify-between py-2">
                          <Link 
                            to={cat.href} 
                            onClick={closeMobileMenu}
                            className="text-[15px] text-[#333] hover:text-black transition-colors font-normal"
                          >
                            {cat.name}
                          </Link>
                          {cat.subcategories && cat.subcategories.length > 0 && (
                            <button
                              onClick={() => setMobileExpandedCat(mobileExpandedCat === cat.id ? '__shop__' : cat.id)}
                              className="p-1"
                            >
                              <ChevronDown className={`w-3.5 h-3.5 text-[#666] transition-transform duration-200 ${mobileExpandedCat === cat.id ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                        </div>

                        {cat.subcategories && mobileExpandedCat === cat.id && (
                          <div className="ml-4 mb-2 border-l-2 border-[#6b6359] pl-3 space-y-2">
                            {cat.subcategories.map(sub => (
                              <Link 
                                key={sub.name} 
                                to={sub.href} 
                                onClick={closeMobileMenu}
                                className="block text-[13px] py-0.5 text-[#666] hover:text-[#6b6359] transition-colors"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to="/news" 
                onClick={closeMobileMenu} 
                className="flex items-center py-3.5 border-b border-[#d8d2c4] text-black font-light hover:text-[#6b6359] transition-colors uppercase"
              >
                NEWS
              </Link>
              <Link 
                to="/get-in-touch" 
                onClick={closeMobileMenu} 
                className="flex items-center py-3.5 border-b border-[#d8d2c4] text-black font-light hover:text-[#6b6359] transition-colors uppercase"
              >
                GET IN TOUCH
              </Link>
              <a 
                href="tel:+918698814865"
                className="flex items-center py-3.5 border-b border-[#d8d2c4] text-black font-light hover:text-[#6b6359] transition-colors mt-2"
              >
                +91 8698814865
              </a>
            </nav>

            {/* Drawer Footer */}
            <div className="px-5 py-4 border-t border-[#ded7ca] text-[11px] text-[#666]">
              Handcrafted Luxury Furniture by Ar. Amruta Bade
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
