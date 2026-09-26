import React from "react";
import { Sparkles, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#0a0a0a] border-b border-[#222] text-xs text-[#a0a0a0] py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
          <span>Handcrafted Luxury Furniture • Custom Tailoring & Pan-India Delivery</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/experience-centre" className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#c5a880]" />
            <span>Visit Experience Centre</span>
          </Link>
          <a href="tel:+919876543210" className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-[#c5a880]" />
            <span>+91 98765 43210</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
