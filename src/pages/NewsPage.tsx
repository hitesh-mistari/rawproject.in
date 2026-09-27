import React, { useState } from 'react';
import instagramImages from '../data/instagram_images.json';

const NewsPage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(20);

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 20, instagramImages.length));
  };

  return (
    <div className="pt-24 pb-24 min-h-[60vh] bg-[#eae5da]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#a67c52] font-bold mb-4">
            Socials
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-[#1a1612] mb-4">
            Instagram Journal
          </h1>
          <p className="text-[#8a7f72] text-[15px] font-light max-w-xl mx-auto">
            Latest updates, behind the scenes, and daily inspiration from our handcrafted furniture atelier.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {instagramImages.slice(0, visibleCount).map((src, index) => (
            <div key={index} className="aspect-square bg-[#e0dcd1] overflow-hidden group relative border border-[#dfdbd2]">
              <img 
                src={src} 
                alt={`Instagram post ${index + 1}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
              {/* Optional: Add instagram icon overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <svg className="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination: Show More Button */}
        {visibleCount < instagramImages.length && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleShowMore}
              className="inline-flex items-center justify-center border border-[#1a1612] text-[#1a1612] px-8 py-3.5 text-[13px] font-medium tracking-[0.1em] uppercase hover:bg-[#1a1612] hover:text-[#eae5da] transition-all duration-300"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
