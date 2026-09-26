import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string | null;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, activeCategory }) => {
  if (!isOpen || !activeCategory) return null;

  const menuData: Record<
    string,
    {
      title: string;
      featuredImage: string;
      featuredTitle: string;
      featuredDesc: string;
      columns: {
        heading: string;
        items: { name: string; slug: string }[];
      }[];
    }
  > = {
    living: {
      title: "Living Room Collections",
      featuredImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      featuredTitle: "The Royal Chesterfield",
      featuredDesc: "Bespoke velvet and Italian leather craftsmanship tailored to your living space.",
      columns: [
        {
          heading: "Seating",
          items: [
            { name: "Luxury Sofas", slug: "/category/sofa" },
            { name: "Lounge Chairs", slug: "/category/lounge-chair" },
            { name: "Ottoman & Bench", slug: "/category/ottoman-bench" },
            { name: "Swings & Hammocks", slug: "/category/swing" },
          ],
        },
        {
          heading: "Tables & Consoles",
          items: [
            { name: "Center Tables", slug: "/category/center-table" },
            { name: "Side Tables", slug: "/category/living-side-table" },
            { name: "Console Tables", slug: "/category/console-table" },
            { name: "TV Entertainment Units", slug: "/category/tv-unit" },
          ],
        },
        {
          heading: "Accent Furniture",
          items: [
            { name: "Shoe Stands", slug: "/category/shoe-stand" },
            { name: "All Living Collection", slug: "/category/living" },
          ],
        },
      ],
    },
    bedroom: {
      title: "Bedroom Collections",
      featuredImage: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=800&q=80",
      featuredTitle: "Handcrafted Sanctuary",
      featuredDesc: "Solid teak & brass inlays designed for peaceful luxury.",
      columns: [
        {
          heading: "Beds & Suites",
          items: [
            { name: "Bespoke Beds", slug: "/category/bed" },
            { name: "Day Beds", slug: "/category/day-bed" },
            { name: "All Bedroom Furniture", slug: "/category/bedroom" },
          ],
        },
        {
          heading: "Companions",
          items: [
            { name: "Nightstands & Side Tables", slug: "/category/side-table" },
            { name: "Custom Wardrobes", slug: "/category/wardrobe" },
          ],
        },
      ],
    },
    dining: {
      title: "Dining Collections",
      featuredImage: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
      featuredTitle: "Gourmet Hospitality",
      featuredDesc: "Marble and solid wood dining tables that anchor family traditions.",
      columns: [
        {
          heading: "Dining Suites",
          items: [
            { name: "Dining Tables", slug: "/category/dining-table" },
            { name: "Dining Chairs", slug: "/category/chairs" },
            { name: "All Dining Furniture", slug: "/category/dining" },
          ],
        },
        {
          heading: "Bar & Lounge",
          items: [
            { name: "Bar Cabinets", slug: "/category/bar-cabinates" },
            { name: "Bar Chairs & Stools", slug: "/category/bar-chairs" },
          ],
        },
      ],
    },
  };

  const current = menuData[activeCategory];
  if (!current) return null;

  return (
    <div
      className="absolute top-full left-0 w-full bg-[#121212]/95 backdrop-blur-md border-b border-[#252525] shadow-2xl py-8 px-6 z-40 transition-all duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        <div className="col-span-8 grid grid-cols-3 gap-6">
          {current.columns.map((col, idx) => (
            <div key={idx}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c5a880] mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      to={item.slug}
                      onClick={onClose}
                      className="text-sm text-[#ccc] hover:text-[#c5a880] transition-colors block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured Card */}
        <div className="col-span-4 bg-[#181818] border border-[#2a2a2a] rounded-lg overflow-hidden group">
          <div className="h-44 overflow-hidden relative">
            <img
              src={current.featuredImage}
              alt={current.featuredTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-1.5 text-xs text-[#c5a880] mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Artisanal Highlight</span>
            </div>
            <h5 className="font-serif text-base text-white font-medium mb-1">
              {current.featuredTitle}
            </h5>
            <p className="text-xs text-[#888] mb-3 leading-relaxed">
              {current.featuredDesc}
            </p>
            <Link
              to={`/category/${activeCategory}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#c5a880] hover:text-white transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
