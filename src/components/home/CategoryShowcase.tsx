import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  itemCount: string;
}

const categories: CategoryItem[] = [
  {
    id: "living",
    name: "Living Collection",
    description: "Curved sofas, sculptural armchairs, coffee tables & media credenzas.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop",
    slug: "living",
    itemCount: "45+ Pieces",
  },
  {
    id: "bedroom",
    name: "Bedroom Suites",
    description: "Architectural beds, floating nightstands, and dressing consoles.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop",
    slug: "bedroom",
    itemCount: "28+ Pieces",
  },
  {
    id: "dining",
    name: "Dining Atelier",
    description: "Solid hardwood dining tables, sculptural chairs & bar cabinets.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1000&auto=format&fit=crop",
    slug: "dining",
    itemCount: "20+ Pieces",
  },
  {
    id: "one-of-one",
    name: "One of One Editions",
    description: "Limited-edition collector pieces sculpted from unique raw materials.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
    slug: "one-of-one",
    itemCount: "Rare Works",
  },
];

const CategoryShowcase: React.FC = () => {
  return (
    <section className="section-padding bg-sand-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block mb-2">
            Curated Spaces
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-medium">
            Explore by Atmosphere
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          <p className="text-stone-600 text-sm font-light">
            Every piece is designed with pure architectural geometry, organic curves, and exquisite hand-finishes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group relative h-[440px] overflow-hidden bg-stone-900 flex flex-col justify-end p-6 md:p-8"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.image})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent group-hover:from-stone-950/95 transition-colors duration-300" />

              {/* Top Tag */}
              <div className="relative z-10 self-start mb-auto">
                <span className="bg-white/90 backdrop-blur-sm text-stone-900 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1">
                  {cat.itemCount}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 transform transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-white font-medium group-hover:text-gold-300 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-gold-500 group-hover:text-stone-950 flex items-center justify-center text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-stone-300 text-xs font-light mt-2 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
