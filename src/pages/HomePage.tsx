import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Instagram, ChevronLeft, ChevronRight, Heart, MessageCircle, Send, Bookmark, Camera, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import productsData from '../data/products.json';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const whatsappUrl = "https://api.whatsapp.com/send?phone=918698814865&text=Hi!%20We%27d%20like%20you%20to%20suggest%20some%20furniture.";

  const heroDesktopSlides = [
    '/images/home/carousel/mainhero.png',
    '/images/home/hero/hero_slide2.png',
    '/images/home/hero/hero_slide1.jpg',
  ];
  const heroMobileSlides = [
    '/images/home/carousel/mainhero.png',
    '/images/home/hero/hero_mobile2.webp',
    '/images/home/hero/hero_mobile3.webp',
  ];
  
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroDesktopSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroDesktopSlides.length]);

  const inspirationSlides = [
    { id: 'wood-grain', src: '/images/home/inspiration/3.jpg', alt: 'The Raw Project Inspiration - Wood Grain' },
    { id: 'cut-timber', src: '/images/home/inspiration/6.jpg', alt: 'The Raw Project Inspiration - Cut Timber Logs' },
    { id: 'monstera-leaf', src: '/images/home/inspiration/7.jpg', alt: 'The Raw Project Inspiration - Leaf Patterns' },
    { id: 'bedside-coffee', src: '/images/home/inspiration/4.jpg', alt: 'The Raw Project Inspiration - Handcrafted Bedside Table' },
    { id: 'striped-leaf', src: '/images/home/inspiration/5.jpg', alt: 'The Raw Project Inspiration - Botanical Textures' },
  ];

  const [inspirationIndex, setInspirationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setInspirationIndex((prev) => (prev + 1) % inspirationSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [inspirationSlides.length]);

  // Load 18 real products dynamically from products.json across varied niches (Beds, Tables, Sofas, Swings, Lounge Chairs, Storage)
  const featuredProducts = productsData
    .filter(p => p.images && p.images.length > 0 && p.images[0].src)
    .slice(0, 18)
    .map(p => ({
      id: p.id,
      title: p.name.toUpperCase(),
      image: p.images[0].src,
      slug: p.slug,
      category: p.categories && p.categories.length > 0 ? p.categories[0].name.toUpperCase() : 'FURNITURE'
    }));

  const [featuredProductIndex, setFeaturedProductIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedProductIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  const handlePrevProduct = () => {
    setFeaturedProductIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const handleNextProduct = () => {
    setFeaturedProductIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const instagramPosts = [
    { id: 'ig1', image: '/images/home/instagram/post1.jpg', caption: 'Simple forms. Lasting details. Crafted for everyday spaces.', likes: 99, comments: 3, time: '2 days ago', type: 'reel', url: 'https://www.instagram.com/reel/ClsuaLzoZgm/' },
    { id: 'ig2', image: '/images/home/instagram/post2.jpg', caption: 'Where craft meets everyday living. Every piece is made to last.', likes: 84, comments: 5, time: '4 days ago', type: 'post', url: 'https://www.instagram.com/therawproject.in/' },
    { id: 'ig3', image: '/images/home/instagram/post3.jpg', caption: 'Natural forms, lasting beauty. Our latest piece in solid wood.', likes: 71, comments: 2, time: '1 week ago', type: 'post', url: 'https://www.instagram.com/therawproject.in/' },
    { id: 'ig4', image: '/images/home/instagram/post4.jpg', caption: 'In the workshop - watching form take shape from raw timber.', likes: 63, comments: 4, time: '1 week ago', type: 'reel', url: 'https://www.instagram.com/reel/CvSNrGBImf_/' },
    { id: 'ig5', image: '/images/home/instagram/post5.jpg', caption: 'Good Design Lasts. Simple lines, honest materials.', likes: 57, comments: 3, time: '2 weeks ago', type: 'post', url: 'https://www.instagram.com/therawproject.in/' },
    { id: 'ig6', image: '/images/home/instagram/post6.jpg', caption: 'The texture of raw wood - nothing quite like it.', likes: 112, comments: 7, time: '2 weeks ago', type: 'reel', url: 'https://www.instagram.com/reel/CxdEuBvI0Fe/' },
    { id: 'ig7', image: '/images/home/instagram/post7.jpg', caption: 'Crafted for everyday spaces. Built to last a lifetime.', likes: 88, comments: 6, time: '3 weeks ago', type: 'post', url: 'https://www.instagram.com/therawproject.in/' },
    { id: 'ig8', image: '/images/home/instagram/post8.jpg', caption: 'Bringing nature into your home, one piece at a time.', likes: 43, comments: 2, time: '3 weeks ago', type: 'post', url: 'https://www.instagram.com/therawproject.in/' },
    { id: 'ig9', image: '/images/home/instagram/post9.jpg', caption: 'The MOH Swing - our most loved, handcrafted piece.', likes: 95, comments: 9, time: '1 month ago', type: 'post', url: 'https://www.instagram.com/therawproject.in/' },
  ];

  const [featuredPost, setFeaturedPost] = useState(0);
  const [activeFilter, setActiveFilter] = useState<{ type: string; sub: string }>({ type: 'bedroom', sub: 'bed' });

  const portfolioProjects = productsData.map((p) => {
    const parentCats = ['bedroom', 'living', 'dining', 'one-of-one'];
    let mainCategory = 'living';
    let subcategory = 'all';

    if (p.categories && p.categories.length > 0) {
      const slugs = p.categories.map(c => c.slug);
      if (slugs.includes('bedroom')) mainCategory = 'bedroom';
      else if (slugs.includes('dining')) mainCategory = 'dining';
      else if (slugs.includes('one-of-one')) mainCategory = 'one-of-one';
      else if (slugs.includes('living')) mainCategory = 'living';
      
      const sub = p.categories.find(c => !parentCats.includes(c.slug));
      if (sub) subcategory = sub.slug;
      else subcategory = slugs[0];
    }

    return {
      id: p.id.toString(),
      title: p.name,
      slug: p.slug,
      categoryType: mainCategory,
      subcategory: subcategory,
      category: p.categories && p.categories.length > 0 ? p.categories[0].name : 'Furniture',
      scope: 'Handcrafted Solid Wood',
      location: 'Atelier Collection',
      mainImg: p.images && p.images.length > 0 ? p.images[0].src : '/images/products/Toronto_website_product_page_slideshow_2042_x_1012.jpg',
      detailImg: p.images && p.images.length > 1 ? p.images[1].src : (p.images && p.images.length > 0 ? p.images[0].src : '/images/products/Toronto_website_product_page_slideshow_2042_x_1012.jpg')
    };
  });



  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade up section headers
      gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 2. Stagger project cards reveal in Works of Quiet Elegance
      gsap.utils.toArray<HTMLElement>('.gsap-project-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: (i % 2) * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 3. Stagger reveal why ethos cards
      gsap.utils.toArray<HTMLElement>('.gsap-ethos-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <div ref={sectionRef} className="bg-white text-[#111111] min-h-screen font-sans">
      
      {/* 1. HERO BANNER */}
      <div className="w-full bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-0">
          <section className="relative w-full overflow-hidden bg-[#d3cec3] rounded-[20px] shadow-sm" style={{ minHeight: '80vh' }}>
            {/* Desktop Images */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
              {heroDesktopSlides.map((src, idx) => (
                <div
                  key={src}
                  className="absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out"
                  style={{
                    opacity: heroIndex === idx ? 1 : 0,
                    zIndex: heroIndex === idx ? 1 : 0,
                  }}
                >
                  <img
                    src={src}
                    alt={`Hero slide ${idx + 1}`}
                    className={`w-full h-full object-cover object-center transition-transform duration-[15000ms] ease-out ${heroIndex === idx ? 'scale-105' : 'scale-100'}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>

            {/* Mobile Images */}
            <div className="block md:hidden absolute inset-0 w-full h-full">
              {heroMobileSlides.map((src, idx) => (
                <div
                  key={src}
                  className="absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out"
                  style={{
                    opacity: (heroIndex % heroMobileSlides.length) === idx ? 1 : 0,
                    zIndex: (heroIndex % heroMobileSlides.length) === idx ? 1 : 0,
                  }}
                >
                  <img
                    src={src}
                    alt={`Hero mobile slide ${idx + 1}`}
                    className={`w-full h-full object-cover object-center transition-transform duration-[15000ms] ease-out ${(heroIndex % heroMobileSlides.length) === idx ? 'scale-105' : 'scale-100'}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {heroDesktopSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroIndex(idx)}
                  aria-label={`Go to hero slide ${idx + 1}`}
                  className={`h-1.5 transition-all duration-500 rounded-full ${
                    heroIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* 1.5. WORKS OF QUIET ELEGANCE - 100VH ARCHITECTURAL SHOWCASE SECTION */}
      <section className="bg-[#faf9f6] min-h-screen flex flex-col justify-between py-12 sm:py-16 border-b border-[#ded7ca]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full flex-1 flex flex-col justify-between">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-6 border-b border-[#ded7ca]">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-['IBM_Plex_Sans',sans-serif] tracking-wider uppercase font-light text-[#1a1612] leading-tight">
                OUR WORK
              </h2>
            </div>
            <div className="mt-4 md:mt-0 max-w-md text-left md:text-right flex flex-col items-start md:items-end">
              <p className="text-[13px] text-[#6b6359] font-light leading-relaxed mb-3">
                Through architecture and design, we craft environments that honor materiality, light, and the human experience.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#1a1612] hover:text-[#8a7f72] transition-colors"
              >
                VIEW ALL WORKS →
              </Link>
            </div>
          </div>

          {/* Portfolio Grid Layout (Filter sidebar + Projects) */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-14 items-start my-auto">
            
            {/* Left Filter Sidebar - Sticky */}
            <div className="w-full flex items-center overflow-x-auto gap-8 pb-4 lg:pb-0 lg:flex-col lg:items-stretch lg:gap-0 lg:space-y-6 text-[12px] uppercase tracking-widest text-[#6b6359] lg:sticky lg:top-8 scrollbar-none whitespace-nowrap lg:whitespace-normal">
              
              <div className="font-bold text-[#1a1612] flex items-center gap-4 lg:pb-2 lg:border-b lg:border-[#ded7ca] lg:justify-between shrink-0 lg:w-full sticky left-0 bg-[#faf9f6] z-10 pr-4 lg:pr-0">
                <span>Filter</span>
                {activeFilter.sub !== 'all' && (
                  <button 
                    onClick={() => setActiveFilter({ type: 'all', sub: 'all' })}
                    className="text-[10px] lowercase text-[#8a7f72] hover:text-[#1a1612] tracking-normal font-normal underline"
                  >
                    reset
                  </button>
                )}
              </div>
              
              {/* BEDROOM Filter Group */}
              <div className="flex items-center gap-3 shrink-0 lg:flex-col lg:items-stretch lg:gap-0">
                <div className="font-semibold text-[#1a1612] flex items-center gap-2 lg:justify-between">
                  <span>Bedroom</span>
                  <span className="hidden lg:inline text-[10px]">✕</span>
                  <span className="lg:hidden text-[#ded7ca]">|</span>
                </div>
                <div className="flex items-center gap-4 lg:flex-col lg:items-stretch lg:gap-0 lg:pl-3 lg:space-y-2 text-[#8a7f72] lg:mt-2.5">
                  {[
                    { id: 'bed', label: 'Bed' },
                    { id: 'side-table', label: 'Side Table' },
                  ].map(sub => {
                    const isSelected = activeFilter.type === 'bedroom' && activeFilter.sub === sub.id;
                    return (
                      <div 
                        key={sub.id}
                        onClick={() => setActiveFilter({ type: 'bedroom', sub: sub.id })}
                        className={`cursor-pointer transition-colors flex items-center gap-1.5 ${
                          isSelected ? 'font-bold text-[#1a1612]' : 'hover:text-[#1a1612]'
                        }`}
                      >
                        <span>{sub.label}</span>
                        {isSelected && <span className="text-[14px] leading-none text-[#1a1612] hidden lg:inline">•</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* LIVING Filter Group */}
              <div className="flex items-center gap-3 shrink-0 lg:flex-col lg:items-stretch lg:gap-0 lg:border-t lg:border-[#ded7ca] lg:pt-3">
                <div className="font-semibold text-[#1a1612] flex items-center gap-2 lg:justify-between">
                  <span>Living</span>
                  <span className="hidden lg:inline text-[10px]">✕</span>
                  <span className="lg:hidden text-[#ded7ca]">|</span>
                </div>
                <div className="flex items-center gap-4 lg:flex-col lg:items-stretch lg:gap-0 lg:pl-3 lg:space-y-2 text-[#8a7f72] lg:mt-2.5">
                  {[
                    { id: 'ottoman-bench', label: 'Ottoman & Bench' },
                    { id: 'tv-unit', label: 'TV Unit' },
                    { id: 'sofa', label: 'Sofa' },
                    { id: 'side-table-living', label: 'Side Table Living' },
                    { id: 'shoe-stand', label: 'Shoe Stand' },
                    { id: 'lounge-chair', label: 'Lounge Chair' },
                    { id: 'console-table', label: 'Console Unit' },
                    { id: 'swing', label: 'Swing' },
                    { id: 'center-table', label: 'Center Table' },
                  ].map(sub => {
                    const isSelected = activeFilter.type === 'living' && activeFilter.sub === sub.id;
                    return (
                      <div 
                        key={sub.id}
                        onClick={() => setActiveFilter({ type: 'living', sub: sub.id })}
                        className={`cursor-pointer transition-colors flex items-center gap-1.5 ${
                          isSelected ? 'font-bold text-[#1a1612]' : 'hover:text-[#1a1612]'
                        }`}
                      >
                        <span>{sub.label}</span>
                        {isSelected && <span className="text-[14px] leading-none text-[#1a1612] hidden lg:inline">•</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DINING Filter Group */}
              <div className="flex items-center gap-3 shrink-0 lg:flex-col lg:items-stretch lg:gap-0 lg:border-t lg:border-[#ded7ca] lg:pt-3">
                <div className="font-semibold text-[#1a1612] flex items-center gap-2 lg:justify-between">
                  <span>Dining</span>
                  <span className="hidden lg:inline text-[10px]">✕</span>
                  <span className="lg:hidden text-[#ded7ca]">|</span>
                </div>
                <div className="flex items-center gap-4 lg:flex-col lg:items-stretch lg:gap-0 lg:pl-3 lg:space-y-2 text-[#8a7f72] lg:mt-2.5">
                  {[
                    { id: 'chairs', label: 'Chairs' },
                    { id: 'bar-cabinates', label: 'Bar Cabinets' },
                    { id: 'bar-chairs', label: 'Bar Chairs' },
                    { id: 'dining-table', label: 'Dining Table' },
                  ].map(sub => {
                    const isSelected = activeFilter.type === 'dining' && activeFilter.sub === sub.id;
                    return (
                      <div 
                        key={sub.id}
                        onClick={() => setActiveFilter({ type: 'dining', sub: sub.id })}
                        className={`cursor-pointer transition-colors flex items-center gap-1.5 ${
                          isSelected ? 'font-bold text-[#1a1612]' : 'hover:text-[#1a1612]'
                        }`}
                      >
                        <span>{sub.label}</span>
                        {isSelected && <span className="text-[14px] leading-none text-[#1a1612] hidden lg:inline">•</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ONE OF ONE Filter Group */}
              <div className="flex items-center gap-3 shrink-0 lg:flex-col lg:items-stretch lg:gap-0 lg:border-t lg:border-[#ded7ca] lg:pt-3">
                <div className="font-semibold text-[#1a1612] flex items-center gap-2 lg:justify-between">
                  <span>One of One</span>
                  <span className="hidden lg:inline text-[10px]">✕</span>
                  <span className="lg:hidden text-[#ded7ca]">|</span>
                </div>
                <div className="flex items-center gap-4 lg:flex-col lg:items-stretch lg:gap-0 lg:pl-3 lg:space-y-2 text-[#8a7f72] lg:mt-2.5">
                  {[
                    { id: 'one-of-one', label: 'Explore piece' },
                  ].map(sub => {
                    const isSelected = activeFilter.type === 'one-of-one' && activeFilter.sub === sub.id;
                    return (
                      <div 
                        key={sub.id}
                        onClick={() => setActiveFilter({ type: 'one-of-one', sub: sub.id })}
                        className={`cursor-pointer transition-colors flex items-center gap-1.5 ${
                          isSelected ? 'font-bold text-[#1a1612]' : 'hover:text-[#1a1612]'
                        }`}
                      >
                        <span>{sub.label}</span>
                        {isSelected && <span className="text-[14px] leading-none text-[#1a1612] hidden lg:inline">•</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Portfolio Projects List */}
            <div className="space-y-12">
              {portfolioProjects
                .filter(proj => activeFilter.sub === 'all' || (proj.categoryType === activeFilter.type && proj.subcategory === activeFilter.sub) || activeFilter.type === 'all')
                .concat(
                  activeFilter.sub !== 'all' 
                    ? portfolioProjects.filter(proj => !(proj.categoryType === activeFilter.type && proj.subcategory === activeFilter.sub))
                    : []
                )
                .slice(0, 8)
                .map((project) => (
                  <Link to={`/product/${project.slug}`} key={project.id} className="gsap-project-card group space-y-3 block">
                    <div className="grid grid-cols-1 md:grid-cols-[2.2fr_1fr] gap-4">
                      <div className="aspect-[16/9] lg:aspect-[16/10] overflow-hidden bg-[#e0ded8]">
                        <img 
                          src={project.mainImg} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                      <div className="aspect-[4/3] md:aspect-auto overflow-hidden bg-[#e0ded8]">
                        <img 
                          src={project.detailImg} 
                          alt={`${project.title} Detail`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between pt-2 border-b border-[#ded7ca] pb-3">
                      <div>
                        <h3 className="text-xl font-bold tracking-wider uppercase text-[#1a1612] group-hover:text-[#8a7f72] transition-colors">{project.title}</h3>
                        <div className="flex gap-6 sm:gap-8 text-[11px] uppercase tracking-widest text-[#8a7f72] mt-1 flex-wrap">
                          <span>Category: {project.category}</span>
                          <span>Scope: {project.scope}</span>
                          <span>Location: {project.location}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold tracking-widest uppercase text-[#1a1612] group-hover:text-[#8a7f72] transition-colors mt-2 sm:mt-0">
                        VIEW DETAIL →
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

        </div>
      </section>



      {/* 2. OUR PROCESS SECTION */}
      <section className="bg-[#eae5da] py-20 sm:py-28 lg:py-32 border-b border-[#ded7ca]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 lg:mb-20 items-end">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#8a7f72] font-bold mb-4">
                Our Process
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#1a1612] leading-tight">
                From raw material <br className="hidden sm:block" /> to timeless objects.
              </h2>
            </div>
            <div className="lg:pb-2">
              <p className="text-[14px] text-[#4a4238] font-light leading-relaxed mb-6 lg:mb-8">
                We work with materials that carry memory — wood, stone, cane, brass — and give them another life. Each piece is shaped by skilled hands, with respect for nature, craft and the spaces it will live in.
              </p>
              <div className="w-full h-px bg-[#d8d2c4]" />
            </div>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-10">
            {/* 01. MATERIAL */}
            <div className="flex flex-col group">
              <div className="relative aspect-[3/2] overflow-hidden bg-[#e0ded8] mb-6 shadow-sm border border-[#dfdbd2]">
                <img 
                  src="/images/home/inspiration/6.jpg" 
                  alt="Raw Material" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              </div>
              <div className="flex gap-4">
                <span className="text-[12px] font-medium text-[#8a7f72] mt-0.5 tracking-wider">01.</span>
                <div>
                  <h3 className="text-[13px] font-bold text-[#1a1612] tracking-[0.2em] uppercase mb-2">Material</h3>
                  <p className="text-[13.5px] text-[#4a4238] font-light leading-[1.6]">
                    We source sustainable wood, natural stone, cane and brass with care.
                  </p>
                </div>
              </div>
            </div>

            {/* 02. CRAFT */}
            <div className="flex flex-col group">
              <div className="relative aspect-[3/2] overflow-hidden bg-[#e0ded8] mb-6 shadow-sm border border-[#dfdbd2]">
                <img 
                  src="/images/home/inspiration/3.jpg" 
                  alt="Craft" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              </div>
              <div className="flex gap-4">
                <span className="text-[12px] font-medium text-[#8a7f72] mt-0.5 tracking-wider">02.</span>
                <div>
                  <h3 className="text-[13px] font-bold text-[#1a1612] tracking-[0.2em] uppercase mb-2">Craft</h3>
                  <p className="text-[13.5px] text-[#4a4238] font-light leading-[1.6]">
                    Our artisans bring decades of skill and knowledge to every detail.
                  </p>
                </div>
              </div>
            </div>

            {/* 03. OBJECT */}
            <div className="flex flex-col group">
              <div className="relative aspect-[3/2] overflow-hidden bg-[#e0ded8] mb-6 shadow-sm border border-[#dfdbd2]">
                <img 
                  src="/images/home/inspiration/4.jpg" 
                  alt="Object" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              </div>
              <div className="flex gap-4">
                <span className="text-[12px] font-medium text-[#8a7f72] mt-0.5 tracking-wider">03.</span>
                <div>
                  <h3 className="text-[13px] font-bold text-[#1a1612] tracking-[0.2em] uppercase mb-2">Object</h3>
                  <p className="text-[13.5px] text-[#4a4238] font-light leading-[1.6]">
                    Honest, durable pieces made to be lived with, for years to come.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* 2.5 FEATURED PRODUCTS CAROUSEL */}
      <section className="bg-[#eae5da] py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-[#ded7ca] relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#8a7f72] font-bold mb-4">
            Shop Collection
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#1a1612]">
            Featured Objects
          </h2>
          <p className="text-[11px] text-[#8a7f72] font-medium tracking-[0.2em] uppercase mt-3">
            Handcrafted Works &bull; Beds, Center Tables, Lounge Chairs, Sofas & Swings
          </p>
        </div>

        {/* Carousel Container with Controls */}
        <div className="relative w-full max-w-[1400px] mx-auto h-[380px] md:h-[520px] flex items-center justify-center px-4">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrevProduct}
            className="absolute left-4 sm:left-12 z-50 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#1a1612] backdrop-blur-md shadow-lg border border-[#dfdbd2] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
            aria-label="Previous Product"
          >
            <ChevronLeft className="w-5 h-5 text-[#1a1612] group-hover:text-[#c5a880] transition-colors" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNextProduct}
            className="absolute right-4 sm:right-12 z-50 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#1a1612] backdrop-blur-md shadow-lg border border-[#dfdbd2] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
            aria-label="Next Product"
          >
            <ChevronRight className="w-5 h-5 text-[#1a1612] group-hover:text-[#c5a880] transition-colors" />
          </button>

          {featuredProducts.map((product, i) => {
            // Calculate shortest distance in a circular array
            let diff = i - featuredProductIndex;
            if (diff > Math.floor(featuredProducts.length / 2)) diff -= featuredProducts.length;
            if (diff < -Math.floor(featuredProducts.length / 2)) diff += featuredProducts.length;

            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;
            const isFarLeft = diff === -2;
            const isFarRight = diff === 2;
            const isVisible = Math.abs(diff) <= 2;

            // Positioning calculations
            let translateX = "0%";
            let scale = 0.5;
            let opacity = 0;
            let zIndex = 10;
            let pointerEvents: 'auto' | 'none' = 'none';

            if (isCenter) {
              translateX = "0%";
              scale = 1.1;
              opacity = 1;
              zIndex = 50;
              pointerEvents = 'auto';
            } else if (isLeft) {
              translateX = "-115%";
              scale = 0.8;
              opacity = 0.85;
              zIndex = 40;
              pointerEvents = 'auto';
            } else if (isRight) {
              translateX = "115%";
              scale = 0.8;
              opacity = 0.85;
              zIndex = 40;
              pointerEvents = 'auto';
            } else if (isFarLeft) {
              translateX = "-210%";
              scale = 0.6;
              opacity = 0.4;
              zIndex = 30;
              pointerEvents = 'auto';
            } else if (isFarRight) {
              translateX = "210%";
              scale = 0.6;
              opacity = 0.4;
              zIndex = 30;
              pointerEvents = 'auto';
            }

            return (
              <div
                key={product.id}
                onClick={() => setFeaturedProductIndex(i)}
                className={`absolute top-1/2 left-1/2 w-[220px] md:w-[320px] aspect-[4/5] bg-[#e0ded8] shadow-md transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden group ${
                  !isVisible ? "pointer-events-none" : ""
                }`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  pointerEvents: pointerEvents,
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Title & Category overlay - only visible on center item */}
                <div 
                  className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-center whitespace-nowrap transition-all duration-500 delay-200 bg-white/95 backdrop-blur-md px-6 py-3 shadow-lg border border-[#dfdbd2] rounded-sm ${isCenter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                >
                  <span className="block text-[9px] tracking-[0.25em] font-semibold text-[#8a7f72] uppercase mb-1">
                    {product.category}
                  </span>
                  <Link to={`/product/${product.slug}`} className="text-[12.5px] tracking-[0.18em] font-bold text-[#1a1612] hover:text-[#c5a880] transition-colors block">
                    {product.title}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Counter indicator */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className="text-xs font-mono tracking-widest text-[#8a7f72]">
            {String(featuredProductIndex + 1).padStart(2, '0')} / {String(featuredProducts.length).padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* 3. INSPIRATION SECTION */}
      <section className="bg-[#eae5da] py-20 sm:py-28 lg:py-32 border-b border-[#ded7ca]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Inspiration narrative */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#8a7f72] font-bold">
              The Genesis
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-[54px] font-serif font-light text-[#1a1612] leading-tight">
              Inspired by <br/><i className="font-serif text-[#6b6359]">Nature's Canvas</i>
            </h2>

            <div className="space-y-5 text-[15px] text-[#4a4238] font-light leading-[1.8] max-w-lg">
              <p>
                I've perpetually been captivated by the tapestries woven by nature itself.
                From the exquisite intricacies of veins adorning a leaf to the mesmerizing
                grains etched onto a wooden canvas, I remain enthralled by the manner in which
                nature's elements collaborate to craft such breathtaking beauty.
              </p>

              <p>
                It all began with a single, handcrafted bedside table, envisioned not just as a
                piece of furniture but as a daily source of wonder. Each morning, I wake up to this
                creation, in awe of nature's boundless artistry.
              </p>
            </div>

            <div className="pt-8 border-t border-[#d8d2c4] inline-block">
              <span className="block text-[11px] uppercase tracking-widest font-bold text-[#1a1612]">
                Founder & Designer
              </span>
              <span className="block text-xl font-serif font-light text-[#8a7f72] mt-2">
                Ar. Amruta Bade
              </span>
            </div>
          </div>

          {/* Right Column: Inspiration photo slideshow */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-[4/5] overflow-hidden bg-[#e0ded8] shadow-lg shadow-[#d2cdbf]">
              {inspirationSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="absolute inset-0 w-full h-full transition-all duration-[1200ms] ease-in-out"
                  style={{
                    opacity: inspirationIndex === idx ? 1 : 0,
                    transform: `scale(${inspirationIndex === idx ? 1 : 1.05})`,
                    zIndex: inspirationIndex === idx ? 2 : 1,
                  }}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover object-center"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOLLOW OUR JOURNEY - ON INSTAGRAM */}
      <section className="bg-[#f2efe9] py-20 md:py-28 border-b border-[#ded7ca]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#8a7f72] font-bold mb-3">
              Social Journal
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#1a1612] mb-5">
              Follow Our Journey
            </h2>
            <div className="w-px h-10 bg-[#d8d2c4] mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-start">
            
            {/* Left: Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {instagramPosts.map((post, idx) => (
                <button
                  key={post.id}
                  onClick={() => setFeaturedPost(idx)}
                  className={`relative aspect-square overflow-hidden group block focus:outline-none transition-all duration-300 ${featuredPost === idx ? 'ring-2 ring-offset-2 ring-offset-[#f2efe9] ring-[#8a7f72]' : ''}`}
                >
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#2a251e]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Instagram className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Authentic Instagram Embed Replica */}
            <div className="bg-white border border-[#dbdbdb] rounded-[3px] overflow-hidden sticky top-32 shadow-sm font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]">
              {/* Header */}
              <div className="px-3.5 py-[14px] flex items-center justify-between border-b border-[#efefef]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#dbdbdb] cursor-pointer">
                    <img
                      src="/images/home/instagram/avatar.png"
                      alt="therawproject.in"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <a href="https://instagram.com/therawproject.in" target="_blank" rel="noreferrer" className="text-[14px] font-semibold text-[#262626] leading-tight hover:opacity-50">
                      therawproject.in
                    </a>
                    <span className="text-[12px] text-[#262626] leading-tight mt-0.5">
                      The Raw Project
                    </span>
                  </div>
                </div>
                <button className="text-[#262626]">
                  <svg aria-label="More options" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                </button>
              </div>

              {/* Media */}
              <a
                href={instagramPosts[featuredPost].url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square overflow-hidden bg-black flex items-center justify-center"
              >
                <img
                  src={instagramPosts[featuredPost].image}
                  alt={instagramPosts[featuredPost].caption}
                  className="w-full h-full object-cover"
                />
              </a>

              {/* Footer Actions */}
              <div className="px-3.5 pt-3 pb-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <button className="text-[#262626] hover:opacity-50 transition-opacity">
                      <svg aria-label="Like" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.14 6.14 0 0 0-4.204 1.804 6.13 6.13 0 0 0-4.204-1.804C5.56 1.904 2 5.56 2 9.122c0 4.398 4.382 7.274 8.78 11.233 1.05.94 1.76 1.56 2.22 1.56s1.17-.62 2.22-1.56c4.398-3.959 8.78-6.835 8.78-11.233 0-3.562-3.56-7.218-7.208-7.218z"></path></svg>
                    </button>
                    <button className="text-[#262626] hover:opacity-50 transition-opacity">
                      <svg aria-label="Comment" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    </button>
                    <button className="text-[#262626] hover:opacity-50 transition-opacity">
                      <svg aria-label="Share Post" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                    </button>
                  </div>
                  <button className="text-[#262626] hover:opacity-50 transition-opacity">
                    <svg aria-label="Save" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                  </button>
                </div>
                
                <div className="text-[14px] font-semibold text-[#262626] mb-1">
                  {instagramPosts[featuredPost].likes} likes
                </div>
                
                <div className="text-[14px] text-[#262626] leading-[1.3] mb-2">
                  <span className="font-semibold mr-1.5">therawproject.in</span>
                  {instagramPosts[featuredPost].caption}
                </div>
                
                <div className="text-[10px] text-[#8e8e8e] uppercase tracking-wide mb-1">
                  {instagramPosts[featuredPost].time}
                </div>
              </div>
              
              {/* Add Comment */}
              <div className="px-3.5 py-3 border-t border-[#efefef] flex items-center gap-3 hidden sm:flex">
                <svg aria-label="Emoji" className="text-[#262626]" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                <input type="text" placeholder="Add a comment..." className="flex-1 bg-transparent border-none text-[14px] focus:outline-none placeholder-[#8e8e8e]" />
                <button className="text-[#0095f6] font-semibold text-[14px] opacity-50 cursor-default">Post</button>
              </div>
            </div>
            
            <div className="lg:hidden flex justify-center mt-6">
              <a
                href="https://www.instagram.com/therawproject.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#1a1612] text-[#1a1612] text-[11px] tracking-widest uppercase font-semibold px-8 py-3.5 hover:bg-[#1a1612] hover:text-white transition-all duration-300"
              >
                View full journal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY THE RAW PROJECT SECTION */}
      <section 
        className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-cover bg-center bg-fixed border-t border-[#2e2922]"
        style={{ backgroundImage: `url('https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/0c0bd6249757095.6a0ef91474750.png')` }}
      >
        {/* Dark gradient overlay so the white text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0"></div>
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-4 mb-4">
              <p className="text-[12px] tracking-[0.25em] uppercase text-[#c5a880] font-medium">
                Our Ethos
              </p>
              <div className="w-12 h-[1px] bg-[#c5a880]"></div>
            </div>
            
            <h2 className="text-[42px] sm:text-5xl md:text-6xl lg:text-[70px] font-sans font-light text-white mb-6 leading-[1.1] tracking-tight">
              Why The<br />Raw Project
            </h2>
            
            <p className="text-[14px] sm:text-[15px] text-white/90 leading-[1.7] font-light mb-10 max-w-[600px]">
              Our designs are minimal, versatile, and timeless, allowing you to style them with different fabrics and patterns while letting the natural beauty of wood remain at the heart of every piece. We use soft, comfortable, and sustainable organic fabrics that bring a warm, natural feel while offering lasting quality. Our wood is sourced responsibly through forestry practices that support continuous replenishment, with a focus on recycled, upcycled, and FSC-certified materials wherever possible. Every piece is thoughtfully handcrafted by Indian local artisans, providing employment to over 200+ artisans while preserving the traditional craft of cane weaving and celebrating the skill, heritage, and craftsmanship behind every creation.
            </p>
            
            <Link 
              to="/about"
              className="inline-flex items-center gap-3 bg-[#fdfbf9] text-[#1a1612] px-7 py-3.5 text-[14px] font-medium tracking-wide hover:bg-[#eae5da] transition-colors"
            >
              Discover More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. NEED DESIGN ADVICE ? */}
      <section className="w-full py-24 sm:py-32 bg-white">
        <div className="flex flex-col items-center justify-center text-center px-4">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#a67c52] font-semibold mb-3">
            Bespoke Consultation
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#1a1612] mb-4 tracking-wide">
            Need Design Advice?
          </h2>
          <p className="text-[#666] font-light mb-8 max-w-lg leading-relaxed text-[15px]">
            Speak to our design architects about custom dimensions, finishes, and bespoke commissions for your space.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1a1612] text-[#eae5da] px-8 py-3.5 text-[11px] tracking-widest uppercase font-bold hover:bg-[#2a2622] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with us
          </a>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
