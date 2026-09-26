import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    title: 'KASARA',
    subtitle: 'Lounge & Living',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop',
    link: '/category/living'
  },
  {
    title: 'MONOLITH',
    subtitle: 'Tables & Accents',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1000&auto=format&fit=crop',
    link: '/category/tables'
  },
  {
    title: 'VERONICA',
    subtitle: 'Chairs & Seating',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1000&auto=format&fit=crop',
    link: '/category/chairs'
  },
  {
    title: 'RELIC',
    subtitle: 'Sculptural Objects',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop',
    link: '/category/objects'
  },
  {
    title: 'MOH SWING',
    subtitle: 'Indoor Swing',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1000&auto=format&fit=crop',
    link: '/category/swing'
  }
];

const PreFooterCollections: React.FC = () => {
  return (
    <section className="bg-[#faf9f5] pt-20 pb-12 px-6 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-14">
          <div className="max-w-xl">
            <p className="text-[10px] tracking-[0.2em] font-medium text-[#737373] uppercase mb-4">
              Collections
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1c1917] leading-tight">
              Signature collections,<br />rooted in craft.
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-sm flex flex-col items-start md:items-end md:text-right">
            <p className="text-[#555] text-sm md:text-base leading-relaxed mb-4 text-left">
              Furniture, lighting and objects designed for modern Indian homes — minimal, honest and made to last.
            </p>
            <Link 
              to="/collections" 
              className="group flex items-center text-[12px] text-[#1c1917] font-medium tracking-wide uppercase hover:text-[#555] transition-colors"
            >
              <span className="border-b border-[#1c1917] pb-0.5 group-hover:border-[#555] transition-colors">
                View all collections
              </span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {collections.map((item, index) => (
            <Link key={index} to={item.link} className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-[#ebebeb] mb-4">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div>
                <h3 className="text-[#1c1917] text-[13px] font-medium tracking-wider uppercase mb-1">
                  {item.title}
                </h3>
                <p className="text-[#737373] text-[11px]">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PreFooterCollections;
