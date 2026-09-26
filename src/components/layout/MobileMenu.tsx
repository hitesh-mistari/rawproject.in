import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown, ChevronRight, Phone, MessageSquare, MapPin } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  const navSections = [
    {
      id: "living",
      title: "Living Room",
      items: [
        { name: "All Living", slug: "/category/living" },
        { name: "Sofas", slug: "/category/sofa" },
        { name: "Lounge Chairs", slug: "/category/lounge-chair" },
        { name: "Center Tables", slug: "/category/center-table" },
        { name: "Side Tables", slug: "/category/living-side-table" },
        { name: "Console Tables", slug: "/category/console-table" },
        { name: "TV Units", slug: "/category/tv-unit" },
        { name: "Ottoman & Bench", slug: "/category/ottoman-bench" },
        { name: "Swings", slug: "/category/swing" },
      ],
    },
    {
      id: "bedroom",
      title: "Bedroom",
      items: [
        { name: "All Bedroom", slug: "/category/bedroom" },
        { name: "Beds", slug: "/category/bed" },
        { name: "Side Tables", slug: "/category/side-table" },
        { name: "Wardrobes", slug: "/category/wardrobe" },
        { name: "Day Beds", slug: "/category/day-bed" },
      ],
    },
    {
      id: "dining",
      title: "Dining",
      items: [
        { name: "All Dining", slug: "/category/dining" },
        { name: "Dining Tables", slug: "/category/dining-table" },
        { name: "Dining Chairs", slug: "/category/chairs" },
        { name: "Bar Cabinets", slug: "/category/bar-cabinates" },
        { name: "Bar Chairs", slug: "/category/bar-chairs" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Menu Sidebar */}
      <div className="relative w-4/5 max-w-sm bg-[#121212] border-r border-[#222] h-full overflow-y-auto flex flex-col justify-between p-6 z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#222]">
            <Link to="/" onClick={onClose} className="font-serif text-xl tracking-widest text-white font-bold">
              RAW <span className="text-[#c5a880]">PROJECT</span>
            </Link>
            <button onClick={onClose} className="p-1.5 text-[#888] hover:text-white rounded-md">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links list */}
          <nav className="py-6 space-y-2">
            <Link
              to="/shop"
              onClick={onClose}
              className="block py-2.5 px-3 text-sm font-medium text-white hover:text-[#c5a880] hover:bg-[#1a1a1a] rounded transition-colors"
            >
              Browse All Furniture (Shop)
            </Link>

            {navSections.map((sec) => (
              <div key={sec.id} className="border-b border-[#1f1f1f] last:border-none">
                <button
                  onClick={() => toggleSection(sec.id)}
                  className="w-full flex items-center justify-between py-3 px-3 text-sm font-medium text-white hover:text-[#c5a880] transition-colors"
                >
                  <span>{sec.title}</span>
                  {expanded === sec.id ? (
                    <ChevronDown className="w-4 h-4 text-[#c5a880]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#888]" />
                  )}
                </button>
                {expanded === sec.id && (
                  <div className="pl-6 pb-3 space-y-2">
                    {sec.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.slug}
                        onClick={onClose}
                        className="block text-xs text-[#aaa] hover:text-[#c5a880] py-1 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/category/one-of-one"
              onClick={onClose}
              className="block py-2.5 px-3 text-sm font-medium text-[#c5a880] hover:bg-[#1a1a1a] rounded transition-colors"
            >
              One of One (Limited Edition)
            </Link>

            <Link
              to="/experience-centre"
              onClick={onClose}
              className="block py-2.5 px-3 text-sm font-medium text-[#ccc] hover:text-white hover:bg-[#1a1a1a] rounded transition-colors"
            >
              Experience Centre
            </Link>

            <Link
              to="/request-quote"
              onClick={onClose}
              className="block py-2.5 px-3 text-sm font-medium text-[#ccc] hover:text-white hover:bg-[#1a1a1a] rounded transition-colors"
            >
              Request a Custom Quote
            </Link>

            <Link
              to="/about"
              onClick={onClose}
              className="block py-2.5 px-3 text-sm font-medium text-[#ccc] hover:text-white hover:bg-[#1a1a1a] rounded transition-colors"
            >
              About Artisans
            </Link>

            <Link
              to="/get-in-touch"
              onClick={onClose}
              className="block py-2.5 px-3 text-sm font-medium text-[#ccc] hover:text-white hover:bg-[#1a1a1a] rounded transition-colors"
            >
              Get in Touch
            </Link>
          </nav>
        </div>

        {/* Footer Contact Details */}
        <div className="pt-6 border-t border-[#222] space-y-3">
          <a
            href="https://api.whatsapp.com/send?phone=918698814865&text=Hi!%20We%27d%20like%20you%20to%20suggest%20some%20furniture."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-[#25D366] hover:underline"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat with Designer on WhatsApp</span>
          </a>
          <a href="tel:+919876543210" className="flex items-center gap-2 text-xs text-[#aaa] hover:text-white">
            <Phone className="w-3.5 h-3.5" />
            <span>+91 98765 43210</span>
          </a>
          <div className="flex items-center gap-2 text-xs text-[#777]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Experience Centre, India</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
