import React from 'react';
import { Instagram } from 'lucide-react';

const BeInspiredSection: React.FC = () => {
  const images = [
    {
      src: '/images/home/be-inspired/be1.jpg',
      alt: 'Cane Armchair and coffee tables in natural sunlight',
    },
    {
      src: '/images/home/be-inspired/be2.jpg',
      alt: 'Artisan Woodcraft Wall Art Piece',
    },
    {
      src: '/images/home/be-inspired/be3.jpg',
      alt: 'Arched dining room doorway with round dining table and chandelier',
    },
    {
      src: '/images/home/be-inspired/be4.jpg',
      alt: 'Handcrafted Cane Bench and stool detailing',
    }
  ];

  return (
    <section className="bg-[#9CA091] py-10 sm:py-16 px-4 sm:px-6 lg:px-12 text-[#222]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-[32px] font-normal text-black font-serif tracking-tight">Be inspired</h2>
            <a 
              href="https://www.instagram.com/therawproject.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram className="w-7 h-7 text-black" strokeWidth={1.5} />
            </a>
          </div>
          <p className="text-[13px] md:text-[14px] text-[#333] max-w-xl font-sans">
            For inspiration and the latest news, follow us on Instagram or subscribe to our newsletter below.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {images.map((img, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/therawproject.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden bg-[#8e9283] block"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeInspiredSection;
