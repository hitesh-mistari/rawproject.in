import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrubbedBentoGallery: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);

  const images = [
    '/images/home/carousel/mainhero.webp',
    '/images/experience/exp1.webp',
    '/images/home/instagram/post1.webp',
    '/images/experience/exp2.webp', // Target
    '/images/home/instagram/post2.webp',
    '/images/home/hero/hero_slide2.webp',
    '/images/home/inspiration/8.webp',
    '/images/experience/exp3.webp',
  ];
  
  const targetIndex = 3;

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!wrapperRef.current || !galleryRef.current || !cloneRef.current) return;

      const targetElement = galleryRef.current.querySelector('.target-item') as HTMLElement;
      if (!targetElement) return;

      // 1. Get dimensions of the target item in the masonry grid
      const setClonePosition = () => {
        const wrapperRect = wrapperRef.current!.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        
        // Position clone exactly over the target image
        gsap.set(cloneRef.current, {
          top: targetRect.top - wrapperRect.top,
          left: targetRect.left - wrapperRect.left,
          width: targetRect.width,
          height: targetRect.height,
        });
      };

      // Ensure fonts/layout is fully painted before getting rects
      const timer = setTimeout(() => {
        setClonePosition();
        
        // Hide original target so we only see the clone
        gsap.set(targetElement, { opacity: 0 });

        // 2. Build the scroll timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=150%', // duration of scroll pin
            scrub: true,
            pin: true,
          },
        });

        // Animate clone to fill the entire wrapper perfectly
        tl.to(cloneRef.current, {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          ease: 'none',
        }, 0);

        // Fade out and shrink the masonry grid in the background
        tl.to(galleryRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5, // fade out early during the scrub
          ease: 'power2.inOut',
        }, 0);

      }, 100);

      // Handle resize recalculations
      window.addEventListener('resize', setClonePosition);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', setClonePosition);
      };

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="gallery-wrap relative w-full h-[100vh] flex items-start justify-center overflow-hidden bg-[#faf9f5]">
      
      {/* The actual masonry grid */}
      <div 
        ref={galleryRef} 
        className="gallery gallery--bento w-full"
      >
        {images.map((src, i) => (
          <div 
            key={i} 
            className={`gallery__item relative bg-center bg-cover ${i === targetIndex ? 'target-item' : ''}`}
          >
            <img src={src} alt="" className="w-full h-auto block" />
          </div>
        ))}
      </div>

      {/* The clone that zooms to full screen */}
      <div 
        ref={cloneRef} 
        className="absolute z-20 overflow-hidden bg-center bg-cover shadow-2xl"
      >
        <img src={images[targetIndex]} alt="" className="w-full h-full object-cover" />
      </div>

    </div>
  );
};

export default ScrubbedBentoGallery;
