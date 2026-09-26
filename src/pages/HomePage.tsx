import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Instagram, ChevronLeft, ChevronRight, Heart, MessageCircle, Send, Bookmark, Camera } from 'lucide-react';

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

  const featuredProducts = [
    {
      id: "moh-swing",
      title: "MOH SWING",
      image: "/images/home/featured_moh_swing.jpg",
      slug: "moh-swing"
    },
    {
      id: "sahara-sofa",
      title: "SAHARA SOFA",
      image: "/images/home/featured_sahara_sofa.png",
      slug: "sahara-sofa"
    },
    {
      id: "nibrite-bed",
      title: "NIBRITE BED",
      image: "/images/home/featured_nibrite_bed.png",
      slug: "nibrite-bed"
    },
    {
      id: "veda-lounge",
      title: "VEDA LOUNGE",
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800",
      slug: "veda-lounge"
    },
    {
      id: "orra-pod",
      title: "ORRA POD",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
      slug: "orra-pod"
    }
  ];

  const [featuredProductIndex, setFeaturedProductIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedProductIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

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

  const whySlides = [
    { id: 'timeless', image: '/images/home/carousel/slide_1.png', alt: 'Timeless Designs', title: 'Timeless Design', desc: 'Crafted to outlive fleeting trends, rooted in classic proportions and honest materials.' },
    { id: 'wholesome', image: '/images/home/carousel/slide_2.png', alt: 'Wholesome', title: 'Wholesome Living', desc: 'Bringing the grounding warmth and tranquility of natural textures into everyday spaces.' },
    { id: 'sustainable', image: '/images/home/carousel/slide_3.png', alt: 'Sustainable Wood Sourcing', title: 'Sustainable', desc: 'Responsibly sourced timber, deeply respecting the environment that provides it.' },
    { id: 'artisans', image: '/images/home/carousel/slide_4.png', alt: 'Handcrafted by Indian Local Artisans', title: 'Master Artisans', desc: 'Every detail shaped by decades of traditional Indian craftsmanship and dedication.' }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? whySlides.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= whySlides.length - 3 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#eae5da] text-[#111111] min-h-screen font-sans">
      
      {/* 1. HERO BANNER - Full-width background slideshow (fade) */}
      <section className="relative w-full overflow-hidden bg-[#d3cec3]" style={{ minHeight: '85vh' }}>
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
        
        {/* Overlay Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 text-center px-6 pointer-events-none">
          <Link 
            to="/shop" 
            className="pointer-events-auto border border-[#1a1612] text-[#1a1612] bg-white/40 backdrop-blur-md px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#1a1612] hover:text-white transition-all duration-500 opacity-0 animate-[fadeIn_2s_ease-out_0.5s_forwards]"
          >
            Explore Collection
          </Link>
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

      {/* 1.5. BRAND STATEMENT SECTION */}
      <section className="bg-[#eae5da] py-16 md:py-24 px-6 flex justify-center text-center border-b border-[#ded7ca]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[36px] leading-[1.6] text-[#1a1612] font-light tracking-tight">
            A modern and elegant <em className="font-serif italic text-[#a67c52] pr-1">website</em> crafted to showcase <em className="font-serif italic text-[#a67c52] pr-1">premium furniture</em> with immersive visuals and a refined <em className="font-serif italic text-[#a67c52] pr-1">shopping experience.</em>
          </h2>
        </div>
      </section>

      {/* 2. OUR PROCESS SECTION */}
      <section className="bg-[#eae5da] py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-12 border-b border-[#ded7ca]">
        <div className="max-w-[1400px] mx-auto">
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
                  src="https://images.unsplash.com/photo-1550584483-4a11fde80208?auto=format&fit=crop&q=80&w=1200" 
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
                  src="https://images.unsplash.com/photo-1505334185265-27a92fb9c3b8?auto=format&fit=crop&q=80&w=1200" 
                  alt="Craft" 
                  className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105" 
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
                  src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1200" 
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
      <section className="bg-[#eae5da] py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-[#ded7ca]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#8a7f72] font-bold mb-4">
            Shop Collection
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#1a1612]">
            Featured Objects
          </h2>
        </div>

        <div className="relative w-full max-w-[1400px] mx-auto h-[350px] md:h-[500px] flex items-center justify-center">
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

            // Positioning calculations
            let translateX = "0%";
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (isCenter) {
              translateX = "0%";
              scale = 1.1;
              zIndex = 50;
            } else if (isLeft) {
              translateX = "-115%";
              scale = 0.8;
              zIndex = 40;
            } else if (isRight) {
              translateX = "115%";
              scale = 0.8;
              zIndex = 40;
            } else if (isFarLeft) {
              translateX = "-210%";
              scale = 0.6;
              opacity = 0.5;
              zIndex = 30;
            } else if (isFarRight) {
              translateX = "210%";
              scale = 0.6;
              opacity = 0.5;
              zIndex = 30;
            }

            return (
              <div
                key={product.id}
                className="absolute top-1/2 left-1/2 w-[220px] md:w-[320px] aspect-[4/5] bg-[#e0ded8] shadow-md transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Title overlay - only visible on center item */}
                <div 
                  className={`absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-500 delay-300 bg-white/90 backdrop-blur-sm px-6 py-2.5 shadow-sm border border-[#dfdbd2] ${isCenter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <Link to={`/product/${product.slug}`} className="text-[12px] tracking-[0.2em] font-bold text-[#1a1612] hover:text-[#8a7f72] transition-colors">
                    {product.title}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INSPIRATION SECTION */}
      <section className="bg-[#eae5da] py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-12 border-b border-[#ded7ca]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 items-center">
          
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
      <section className="bg-[#f2efe9] py-20 md:py-28 px-4 sm:px-6 lg:px-12 border-b border-[#ded7ca]">
        <div className="max-w-[1400px] mx-auto">
          
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

            {/* Right: Detailed Post */}
            <div className="bg-[#eae5da] border border-[#ded7ca] overflow-hidden sticky top-32 shadow-sm">
              <div className="px-5 py-4 flex items-center justify-between border-b border-[#ded7ca]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-[#e0ded8]">
                    <img
                      src="/images/home/instagram/avatar.png"
                      alt="The Raw Project"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[13px] font-medium text-[#1a1612] block leading-tight">
                      therawproject.in
                    </span>
                    <span className="text-[11px] text-[#8a7f72] block mt-0.5">
                      The Raw Project
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={instagramPosts[featuredPost].url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square overflow-hidden group bg-[#e0ded8]"
              >
                <img
                  src={instagramPosts[featuredPost].image}
                  alt={instagramPosts[featuredPost].caption}
                  className="w-full h-full object-cover"
                />
              </a>

              <div className="px-5 py-4 bg-[#f2efe9]/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <button className="text-[#1a1612] hover:text-[#8a7f72] transition-colors">
                      <Heart className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <button className="text-[#1a1612] hover:text-[#8a7f72] transition-colors">
                      <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <button className="text-[#1a1612] hover:text-[#8a7f72] transition-colors">
                      <Send className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                  <button className="text-[#1a1612] hover:text-[#8a7f72] transition-colors">
                    <Bookmark className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>

                <p className="text-[13px] font-medium text-[#1a1612] mb-1.5">
                  {instagramPosts[featuredPost].likes} likes
                </p>

                <p className="text-[13px] text-[#4a4238] leading-relaxed font-light">
                  <span className="font-medium text-[#1a1612] mr-2">therawproject.in</span>
                  {instagramPosts[featuredPost].caption}
                </p>

                <p className="text-[11px] text-[#8a7f72] mt-2 font-serif italic">
                  {instagramPosts[featuredPost].time}
                </p>
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
      <section className="relative bg-[#1a1612] py-24 sm:py-32 px-4 sm:px-6 lg:px-12 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/0c0bd6249757095.6a0ef91474750.png" 
            alt="The Raw Project Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1612] via-transparent to-[#1a1612]" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#8a7f72] font-bold mb-4">
              Our Ethos
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#eae5da]">
              Why The Raw Project
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {whySlides.map((slide, idx) => (
              <div key={slide.id} className="flex flex-col group">
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-[#2a251e]">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className="flex gap-4">
                  <span className="text-[11px] tracking-widest text-[#8a7f72] font-medium pt-1">0{idx + 1}.</span>
                  <div>
                    <h3 className="text-[14px] font-bold tracking-[0.15em] uppercase text-[#eae5da] mb-3">
                      {slide.title}
                    </h3>
                    <p className="text-[13.5px] text-[#8a7f72] font-light leading-relaxed">
                      {slide.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEED DESIGN ADVICE ? */}
      <section className="relative w-full h-[55vh] overflow-hidden bg-[#2a251e]">
        <div className="absolute inset-0 bg-[#2a251e]/30 z-10" />
        <img
          src="/images/home/need_design_advice.png"
          alt="Living room interior design"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 opacity-80"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl md:text-5xl font-serif text-[#eae5da] mb-5 tracking-wide">
            Need Design Advice?
          </h2>
          <p className="text-[#eae5da]/80 font-light mb-8 max-w-lg leading-relaxed text-[15px]">
            Speak to our design architects about custom dimensions, finishes, and bespoke commissions for your space.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#eae5da] text-[#1a1612] px-8 py-3.5 text-[11px] tracking-widest uppercase font-bold hover:bg-white transition-colors"
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
