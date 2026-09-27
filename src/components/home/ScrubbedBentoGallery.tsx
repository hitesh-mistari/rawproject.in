import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

const ScrubbedBentoGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const galleryElement = galleryRef.current;
      if (!galleryElement || !containerRef.current) return;

      const galleryItems = galleryElement.querySelectorAll('.gallery__item');
      if (galleryItems.length === 0) return;

      // Ensure no final class is initially present
      galleryElement.classList.remove('gallery--final');

      // Temporarily add final class to capture state
      galleryElement.classList.add('gallery--final');
      const flipState = Flip.getState(galleryItems);
      galleryElement.classList.remove('gallery--final');

      const flip = Flip.to(flipState, {
        simple: true,
        ease: 'expoScale(1, 5)',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryElement,
          start: 'center center',
          end: '+=100%',
          scrub: true,
          pin: containerRef.current,
        },
      });
      tl.add(flip);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const images = [
    '/images/products/Acro_Bed_6.jpg',
    '/images/products/Aria_Center_table_1_9e9e1c26-5b48-4034-8fb9-ad99197a9f73.jpg',
    '/images/products/Arbor_Drawer_1.jpg',
    '/images/products/Toronto_website_product_page_slideshow_2042_x_1012.jpg',
    '/images/products/Knot_bliss_4.jpg',
    '/images/products/Flint_Lounge_Chair_1.jpg',
    '/images/products/Nirvana_Bench_3.jpg',
    '/images/products/Toshi_Bed_2.jpg',
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-[#faf9f5]">
      <div 
        ref={galleryRef} 
        className="gallery gallery--bento relative w-full h-full flex-none"
      >
        {images.map((src, i) => (
          <div key={i} className="gallery__item flex-none relative bg-center bg-cover">
            <img src={src} alt="" className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrubbedBentoGallery;
