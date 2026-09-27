import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const HeroSlider: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Rotate the circular badge text
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current) {
        const delta = time - lastTimeRef.current;
        setAngle((prev) => (prev + delta * 0.025) % 360);
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const badgeText = "THE RAW PROJECT · HANDCRAFTED FURNITURE · ";

  return (
    <>
      {/* Hero Section */}
      <div className="w-full px-4 pt-4 pb-2">
        <div
          className="relative w-full overflow-hidden rounded-[20px]"
          style={{
            background: "linear-gradient(135deg, #c8b89a 0%, #bfac91 40%, #b5a080 100%)",
            minHeight: "86vh",
            maxHeight: "92vh",
          }}
        >
          {/* ── Circular rotating badge (top-left) ── */}
          <div className="absolute top-6 left-6 z-20 w-20 h-20 md:w-24 md:h-24">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                />
              </defs>
              <text
                fontSize="10.5"
                fill="rgba(255,255,255,0.85)"
                fontFamily="Outfit, sans-serif"
                fontWeight="500"
                letterSpacing="1.5"
              >
                <textPath href="#circlePath">{badgeText}</textPath>
              </text>
            </svg>
            {/* Centre dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/70" />
            </div>
          </div>

          {/* ── Main Content ── */}
          <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-12 pt-10 pb-8 md:pt-14 md:pb-10"
               style={{ minHeight: "86vh" }}>

            {/* Top area: tagline + brand name + right text */}
            <div className="flex items-start justify-between mt-6">
              {/* Left: tagline + giant brand */}
              <div className="flex-1">
                <p className="text-white/80 text-sm md:text-base font-light tracking-widest mb-1 flex items-center gap-3">
                  For Luxury Living
                  <span className="inline-block w-8 h-px bg-white/60" />
                </p>
                <h1
                  className="font-serif leading-none text-white select-none"
                  style={{
                    fontSize: "clamp(3.5rem, 11vw, 9.5rem)",
                    letterSpacing: "-0.02em",
                    textShadow: "0 4px 40px rgba(0,0,0,0.18)",
                  }}
                >
                  The Raw
                  <br />
                  Project
                </h1>
              </div>

              {/* Right: tagline description */}
              <div className="hidden md:block max-w-[200px] text-right pt-2">
                <p
                  className="text-white/80 text-sm md:text-base leading-relaxed font-light"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  We believe that great craftsmanship should be easy to live with.
                </p>
              </div>
            </div>

            {/* Centre: product image floating */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <img
                src="/images/home/hero/hero_slide1.jpg"
                alt="Featured furniture"
                className="object-contain"
                style={{
                  maxHeight: "78vh",
                  maxWidth: "70vw",
                  filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.25))",
                }}
              />
            </div>

            {/* Bottom row: CTAs left + video card right */}
            <div className="relative z-20 flex items-end justify-between">
              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.22)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.45)",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.38)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.22)")
                  }
                >
                  Shop Ready Stock
                </Link>
                <Link
                  to="/request-quote"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.22)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.45)",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.38)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.22)")
                  }
                >
                  Custom Commission
                </Link>
              </div>

              {/* Video preview card */}
              <div
                className="relative cursor-pointer group"
                onClick={() => setVideoOpen(true)}
                style={{ width: "clamp(120px, 18vw, 220px)" }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src="/images/home/need_design_advice.png"
                    alt="Watch our story"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <Play className="w-4 h-4 md:w-5 md:h-5 text-stone-900 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-white/80 text-[10px] md:text-xs uppercase tracking-wider text-center font-medium">
                  Watch Our Story
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/videos/Meet-our-Artisans.mp4"
              controls
              autoPlay
              className="w-full h-auto"
            />
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors text-lg font-light"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSlider;
