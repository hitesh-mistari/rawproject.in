import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Layers, ShieldCheck, Compass } from "lucide-react";

const Craftsmanship: React.FC = () => {
  const pillars = [
    {
      icon: <Sparkles className="w-6 h-6 text-gold-500 stroke-[1.5]" />,
      title: "Bespoke Proportions",
      desc: "Every sofa, console, and dining suite can be customized in length, depth, and ergonomic density to match your architectural blueprints.",
    },
    {
      icon: <Layers className="w-6 h-6 text-gold-500 stroke-[1.5]" />,
      title: "Curated Textures & Fabrics",
      desc: "Select from over 50+ hand-curated boucle weaves, top-grain Italian leathers, velvet finishes, and hand-rubbed timber stains.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-500 stroke-[1.5]" />,
      title: "Engineered Durability",
      desc: "Constructed with kiln-dried solid hardwood internal frames and high-resilience memory foam cores designed to hold form for decades.",
    },
    {
      icon: <Compass className="w-6 h-6 text-gold-500 stroke-[1.5]" />,
      title: "Architectural Concierge",
      desc: "Our design team collaborates directly with luxury interior designers and homeowners to provide 3D visual mockups and wood swatches.",
    },
  ];

  return (
    <section className="section-padding bg-stone-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-gold-600/10 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column Text */}
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block">
              The Raw Project Standard
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium leading-tight text-white">
              Where Precision Meets Organic Warmth
            </h2>
            <p className="text-stone-300 font-light text-sm md:text-base leading-relaxed">
              We reject mass-produced uniformity. At Raw Project, furniture is approached as functional sculpture. Each piece begins with raw natural elements—responsibly sourced solid woods, hand-honed marbles, and exquisite textiles—shaped by master craftsmen into timeless focal points.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {pillars.map((item, idx) => (
                <div key={idx} className="space-y-2 border-l border-stone-700 pl-4">
                  <div className="mb-2">{item.icon}</div>
                  <h3 className="font-serif text-white font-medium text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-stone-950 px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                Read Our Story & Craft
              </Link>
            </div>
          </div>

          {/* Right Column Image Composition */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-stone-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1000&auto=format&fit=crop"
                alt="Artisan crafting furniture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-6 -left-6 md:-left-8 bg-stone-950 border border-stone-700 p-6 shadow-2xl max-w-xs">
              <span className="font-serif text-3xl md:text-4xl text-gold-400 font-semibold block">
                100%
              </span>
              <p className="text-xs uppercase tracking-wider text-stone-300 mt-1 font-medium">
                Custom Tailored in India • Shipped Nationwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
