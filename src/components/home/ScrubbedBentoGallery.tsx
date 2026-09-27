import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

const ScrubbedBentoGallery: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {});

    // Set a delay to ensure fonts, css, and layout shifts are resolved before computing bounds
    const timer = setTimeout(() => {
      ctx.add(() => {
        const galleryElement = galleryRef.current;
        if (!galleryElement || !wrapperRef.current) return;

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
            pin: wrapperRef.current,
          },
        });
        tl.add(flip);
      });
    }, 150); // 150ms ensures React Strict mode layout is stable

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const images = [
    '/images/home/carousel/mainhero.webp',
    '/images/experience/exp1.webp',
    '/images/home/instagram/post1.webp',
    '/images/experience/exp2.webp',
    '/images/home/instagram/post2.webp',
    '/images/home/hero/hero_slide2.webp',
    '/images/home/inspiration/8.webp',
    '/images/experience/exp3.webp',
  ];

  return (
    <div ref={wrapperRef} className="gallery-wrap relative w-full bg-[#faf9f5]">
      <div 
        ref={galleryRef} 
        className="gallery gallery--bento"
      >
        {images.map((src, i) => (
          <div key={i} className="gallery__item flex-none relative bg-center bg-cover">
            <img src={src} alt="" className="w-full h-auto block" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrubbedBentoGallery;
