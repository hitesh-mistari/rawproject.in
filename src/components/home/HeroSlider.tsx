import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Sculptural Modernity",
    subtitle: "The New Living Collection",
    description: "Architectural proportions, organic curves, and bespoke upholstery tailored to high-end residential interiors.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920&auto=format&fit=crop",
    ctaText: "Explore Collection",
    ctaLink: "/category/living",
    secondaryCtaText: "Experience Centre",
    secondaryCtaLink: "/experience-centre",
  },
  {
    id: 2,
    title: "Sanctuary of Rest",
    subtitle: "Bespoke Bedroom Suites",
    description: "Designed for profound rest. Hand-tufted headboards, floating pedestals, and concealed acoustic craftsmanship.",
    image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?q=80&w=1920&auto=format&fit=crop",
    ctaText: "Discover Bedrooms",
    ctaLink: "/category/bedroom",
    secondaryCtaText: "Request a Quote",
    secondaryCtaLink: "/request-quote",
  },
  {
    id: 3,
    title: "The Art of Gathering",
    subtitle: "Monolithic Dining",
    description: "Exotic natural marble surfaces paired with solid smoked oak bases. Crafted to become the focal point of conversation.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1920&auto=format&fit=crop",
    ctaText: "View Dining Tables",
    ctaLink: "/category/dining",
    secondaryCtaText: "Custom Commission",
    secondaryCtaLink: "/request-quote",
  },
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="relative h-[80vh] min-h-[580px] max-h-[900px] w-full bg-stone-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, idx) => {
        const isActive = idx === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with parallax zoom */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/50 to-stone-950/30" />
            </div>

            {/* Slide Content */}
            <div className="relative z-20 h-full container-custom flex items-center">
              <div className="max-w-2xl text-white space-y-5 animate-fade-in">
                <span className="inline-block text-xs md:text-sm uppercase tracking-[0.3em] text-gold-400 font-medium">
                  {slide.subtitle}
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.15] text-white tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed max-w-lg">
                  {slide.description}
                </p>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center gap-3 bg-white text-stone-950 hover:bg-gold-500 hover:text-stone-950 px-7 py-3.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {slide.secondaryCtaText && (
                    <Link
                      to={slide.secondaryCtaLink || "/request-quote"}
                      className="inline-flex items-center gap-2 border border-white/70 hover:border-gold-400 text-white hover:text-gold-400 px-6 py-3.5 text-xs uppercase tracking-widest font-medium transition-all duration-300"
                    >
                      <span>{slide.secondaryCtaText}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-black/70 text-white transition-all backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-black/70 text-white transition-all backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? "w-8 h-1.5 bg-gold-400"
                : "w-2 h-1.5 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
