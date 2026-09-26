import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BeInspiredSection from '../components/common/BeInspiredSection';

const ExperienceCentrePage: React.FC = () => {
  // Exact 6 high-resolution original photos from WordPress uploads for Experience Centre
  const sliderImages = [
    { src: '/images/experience/exp1.jpg', alt: 'The Raw Project Atelier - Dining Area with Cane Detailing' },
    { src: '/images/experience/exp2.jpg', alt: 'The Raw Project Atelier - Cane Console and Paper Pendant Light' },
    { src: '/images/experience/exp3.jpg', alt: 'The Raw Project Atelier - Daybed Lounger with Decorative Plates' },
    { src: '/images/experience/exp4.jpg', alt: 'The Raw Project Atelier - Cane Sofa and Coffee Table Living Setup' },
    { src: '/images/experience/exp5.jpg', alt: 'The Raw Project Atelier - Bespoke Armchair and Side Table Setting' },
    { src: '/images/experience/exp6.jpg', alt: 'The Raw Project Atelier - Signature Cane Armchair with Tiger Motif Pillow' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-slide every 4 seconds, pausing when user hovers
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, sliderImages.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div className="bg-[#ede8de] text-[#111111] min-h-screen">
      {/* Main Experience Centre Content Section: 2-Column Elementor Boxed Layout */}
      <section className="pt-8 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image Carousel with smooth horizontal sliding, arrows and dots */}
          <div 
            className="flex flex-col items-center w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Carousel Container */}
            <div 
              className="relative w-full aspect-[4/5] sm:h-[520px] md:h-[580px] overflow-hidden bg-[#ded8ca] shadow-sm select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Sliding Strip */}
              <div 
                className="flex w-full h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {sliderImages.map((img, idx) => (
                  <div key={idx} className="w-full h-full shrink-0 relative">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover object-center"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white/85 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] z-10 transition-transform active:scale-90"
              >
                <ChevronLeft className="w-8 h-8 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white/85 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] z-10 transition-transform active:scale-90"
              >
                <ChevronRight className="w-8 h-8 stroke-[2.5]" />
              </button>
            </div>

            {/* Slider Pagination Dots (Elementor Swiper position outside) */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx 
                      ? 'bg-[#111111] scale-110' 
                      : 'bg-[#999999]/60 hover:bg-[#111111]/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Goa Store details & exact Google Map */}
          <div className="flex flex-col justify-start w-full">
            {/* Title centered as in original site */}
            <h1 className="text-[34px] sm:text-[38px] md:text-[42px] font-normal text-black font-sans text-center mb-6 leading-tight">
              Goa Store
            </h1>

            {/* Store details: Left-aligned, matching original font and line breaks */}
            <div className="space-y-4 text-[14px] sm:text-[15px] text-[#111111] leading-relaxed mb-6 font-sans">
              <p>
                Experience our timeless designs with intricate detailing at Omyaa Designs.
              </p>
              <p>
                Store Address: GRPF+W6, Defence Colony, Porvorim, Panaji, Aradi Socorro, Goa 403521.
              </p>
              <p>
                Mon-Sat ( 11am – 6pm )
              </p>
            </div>

            {/* Exact Google Map Embed from WordPress */}
            <div className="w-full h-[320px] sm:h-[350px] md:h-[360px] overflow-hidden shadow-sm border border-[#ded7ca] bg-[#e4dfd4]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.015286942064!2d73.8229946!3d15.537311199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc19a50504eef%3A0x51cfb1ab29d1c015!2sOmyaa%20Designs!5e0!3m2!1sen!2sin!4v1703249574622!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Omyaa Designs Goa Store Location"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Be Inspired Instagram Section */}
      <BeInspiredSection />
    </div>
  );
};

export default ExperienceCentrePage;
