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
    '/images/home/carousel/mainhero.png',
    '/images/experience/exp1.jpg',
    '/images/home/instagram/post1.jpg',
    '/images/experience/exp2.jpg',
    '/images/home/instagram/post2.jpg',
    '/images/home/hero/hero_slide2.png',
    '/images/home/inspiration/8.jpg',
    '/images/experience/exp3.jpg',
  ];

  return (
    <div ref={wrapperRef} className="gallery-wrap relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-[#faf9f5]">
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
