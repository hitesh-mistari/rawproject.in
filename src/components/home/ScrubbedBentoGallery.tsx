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
    '/images/products/toronto_side_table_b91bbff4-b1f3-4c95-a00a-7f7408b00869.jpg',
    '/images/products/WoudArcCoffeeTable42cmLifestyle3-1-scaled.webp',
    '/images/products/36801-HERO.jpg',
    '/images/products/SideTable_4.webp',
    '/images/products/20210120-soft_deco_product_lifestyle1359-site_crop.jpg',
    '/images/products/delta_side_table_2365.jpg',
    '/images/products/IrieUpholsteredBed-2.webp',
    '/images/products/Toronto_website_product_page_slideshow_2042_x_1012.jpg',
  ];

  return (
    <div ref={containerRef} className="w-full h-[100vh] bg-[#faf9f5]">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
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
    </div>
  );
};

export default ScrubbedBentoGallery;
