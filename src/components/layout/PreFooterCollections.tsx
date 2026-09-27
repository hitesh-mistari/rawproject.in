import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    title: 'KASARA',
    subtitle: 'Lounge & Living',
    image: '/images/home/instagram/post1.jpg',
    link: '/category/living'
  },
  {
    title: 'MONOLITH',
    subtitle: 'Tables & Accents',
    image: '/images/home/instagram/post2.jpg',
    link: '/category/tables'
  },
  {
    title: 'VERONICA',
    subtitle: 'Chairs & Seating',
    image: '/images/home/instagram/post4.jpg',
    link: '/category/chairs'
  },
  {
    title: 'RELIC',
    subtitle: 'Sculptural Objects',
    image: '/images/site/Design-Within-Reach-on-Instagram_-Teak-peek_-The-Kayu-Teak-Dining-Table-and-Moller-Model-55-Armchair-make-an-appearance-in-the-eclectic-home-of-actress-@hollandroden-–-as-Copy-768x960.jpg',
    link: '/category/objects'
  },
  {
    title: 'MOH SWING',
    subtitle: 'Indoor Swing',
    image: '/images/home/instagram/post9.jpg',
    link: '/category/swing'
  }
];

const PreFooterCollections: React.FC = () => {
  const location = useLocation();
  
  if (['/contact', '/contact-us', '/get-in-touch', '/about', '/about-us'].includes(location.pathname)) {
    return null;
  }

  return (
    <section className="bg-[#faf9f5] pt-20 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
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
