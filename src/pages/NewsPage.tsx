import React, { useEffect } from 'react';
import BeInspiredSection from '../components/common/BeInspiredSection';

const NewsPage: React.FC = () => {
  const posts = [
    {
      id: 'C1J7BIwowZS',
      url: 'https://www.instagram.com/p/C1J7BIwowZS/',
      caption: 'The Bohemian Visual - Cane and Teakwood Furniture',
    },
    {
      id: 'CvpLhq6yvnX',
      url: 'https://www.instagram.com/p/CvpLhq6yvnX/',
      caption: "FAQ's - Handwoven Cane Craftsmanship at The Raw Project",
    },
    {
      id: 'Cxaei_fI28i',
      url: 'https://www.instagram.com/p/Cxaei_fI28i/',
      caption: 'Why The Raw Project - Organic and Natural Woods',
    },
  ];

  useEffect(() => {
    // Dynamically inject and trigger Instagram embed processing
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    } else {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        (window as any).instgrm?.Embeds?.process();
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="bg-[#ede8de] text-[#111111] min-h-screen">
      {/* 3 Real Instagram Post Embeds Section (Exact 1:1 replica of WordPress Elementor) */}
      <section className="pt-6 sm:pt-8 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {posts.map((post) => (
            <div key={post.id} className="w-full flex justify-center">
              <iframe
                src={`https://www.instagram.com/p/${post.id}/embed/`}
                className="w-full max-w-[380px] h-[550px] sm:h-[580px] md:h-[610px] bg-white rounded-[4px] shadow-[0_0_1px_0_rgba(0,0,0,0.4),0_1px_10px_0_rgba(0,0,0,0.12)] border-0"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                title={post.caption}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Be Inspired Instagram Gallery Section */}
      <BeInspiredSection />
    </div>
  );
};

export default NewsPage;
