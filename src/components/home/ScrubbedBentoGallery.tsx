import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

const ScrubbedBentoGallery: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const images = [
    '/images/home/carousel/mainhero.webp',
    '/images/experience/exp1.webp',
    '/images/home/instagram/post1.webp',
    '/images/experience/exp2.webp', // The target middle image
    '/images/home/instagram/post2.webp',
    '/images/home/hero/hero_slide2.webp',
    '/images/home/inspiration/8.webp',
    '/images/experience/exp3.webp',
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const galleryElement = galleryRef.current;
      if (!galleryElement || !wrapperRef.current) return;

      const items = galleryElement.querySelectorAll('.gallery__item');

      // Ensure Fonts/CSS are fully loaded before capturing Flip bounds
      const timer = setTimeout(() => {
        // 1. Capture initial state
        const state = Flip.getState(items);

        // 2. Add switch class to change CSS layout to full-screen target
        galleryElement.classList.add('gallery--switch');

        // 3. Create the Flip animation
        const flipTween = Flip.from(state, {
          ease: 'none',
          absolute: true, // Prevents layout collapsing during the scrub
          scale: true,
        });

        // 4. Tie it to scroll
        gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: true,
            pin: true,
          }
        }).add(flipTween);

      }, 100);

      return () => clearTimeout(timer);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="gallery-wrap relative w-full h-[100vh] bg-[#faf9f5] overflow-hidden">
      <div 
        ref={galleryRef} 
        className="gallery gallery--bento w-full h-full"
      >
        {images.map((src, i) => (
          <div 
            key={i} 
            className="gallery__item overflow-hidden"
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrubbedBentoGallery;
