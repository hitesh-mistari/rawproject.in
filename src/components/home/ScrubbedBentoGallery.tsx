import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrubbedBentoGallery: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);

  // We re-ordered the items so the Target is exactly item 4 (the 5th item).
  // This guarantees that on Mobile (where we show 2 images per row), 
  // the Target naturally gets its own full-width row right in the middle!
  const gridItems = [
    // 0, 1 (Mobile Row 1)
    { src: '/images/experience/exp1.webp', className: 'item-0' },
    { src: '/images/experience/exp3.webp', className: 'item-1' },
    // 2, 3 (Mobile Row 2)
    { src: '/images/home/instagram/post1.webp', className: 'item-2' },
    { src: '/images/home/hero/hero_slide2.webp', className: 'item-3' }, 
    // 4 (MEGA TARGET) (Mobile Row 3 - 100% width)
    { src: '/images/home/carousel/mainhero.webp', className: 'item-4 target-item', isTarget: true },
    // 5, 6 (Mobile Row 4)
    { src: '/images/home/instagram/post2.webp', className: 'item-5' },
    { src: '/images/experience/exp2.webp', className: 'item-6' },
    // 7, 8 (Mobile Row 5)
    { src: '/images/home/instagram/post1.webp', className: 'item-7' },
    { src: '/images/home/instagram/post2.webp', className: 'item-8' },
    // 9, 10 (Mobile Row 6)
    { src: '/images/experience/exp3.webp', className: 'item-9' },
    { src: '/images/experience/exp1.webp', className: 'item-10' },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!wrapperRef.current || !galleryRef.current || !cloneRef.current) return;

      const targetElement = galleryRef.current.querySelector('.target-item') as HTMLElement;
      if (!targetElement) return;

      const setClonePosition = () => {
        const wrapperRect = wrapperRef.current!.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        
        gsap.set(cloneRef.current, {
          top: targetRect.top - wrapperRect.top,
          left: targetRect.left - wrapperRect.left,
          width: targetRect.width,
          height: targetRect.height,
        });
      };

      const timer = setTimeout(() => {
        setClonePosition();
        
        gsap.set(targetElement, { opacity: 0 });
        gsap.set(cloneRef.current, { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=150%', 
            scrub: true,
            pin: true,
          },
        });

        tl.to(cloneRef.current, {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          ease: 'none',
        }, 0);

        tl.to(galleryRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: 'power2.inOut',
        }, 0);

      }, 150);

      window.addEventListener('resize', setClonePosition);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', setClonePosition);
      };
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 
        Custom CSS Block to handle complex Desktop Grid vs Mobile Flex responsiveness. 
        This perfectly prevents the squished lines on mobile screens!
      */}
      <style>{`
        .bento-grid {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none; /* Let clicks pass through grid gaps */
        }
        
        .bento-item {
          position: relative;
          border-radius: 0.125rem;
          overflow: hidden;
          cursor: pointer;
          pointer-events: auto; /* Enable hover on actual images */
        }

        /* Mobile Layout (Responsive Flex) */
        @media (max-width: 767px) {
          .bento-grid {
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            width: 100vw;
            height: 150vh; /* Taller than screen to ensure flush bleed */
            padding: 0.25rem;
            gap: 0.5rem;
          }
          .bento-item {
            width: calc(50% - 0.25rem); /* 2 items per row */
            height: calc(15% - 0.5rem);
          }
          .bento-item.target-item {
            width: 100%; /* Mega image spans full width */
            height: calc(25% - 0.5rem); /* Mega image is taller */
          }
        }

        /* Desktop Layout (Perfectly Flush 5x20 Grid) */
        @media (min-width: 768px) {
          .bento-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(20, 1fr);
            width: 100vw;
            height: 100vh;
            padding: 1rem;
            gap: 1rem;
          }
          .bento-item {
            width: 100%;
            height: 100%;
          }
          /* Mapped to ensure zero aggressive cropping */
          .item-0 { grid-column: 1 / 2; grid-row: 1 / 11; }
          .item-1 { grid-column: 1 / 2; grid-row: 11 / 21; }
          .item-2 { grid-column: 2 / 3; grid-row: 1 / 5; }
          .item-3 { grid-column: 3 / 4; grid-row: 1 / 5; }
          .item-4 { grid-column: 2 / 5; grid-row: 5 / 17; } /* Target Mega */
          .item-5 { grid-column: 4 / 5; grid-row: 1 / 5; }
          .item-6 { grid-column: 2 / 3; grid-row: 17 / 21; }
          .item-7 { grid-column: 3 / 4; grid-row: 17 / 21; }
          .item-8 { grid-column: 4 / 5; grid-row: 17 / 21; }
          .item-9 { grid-column: 5 / 6; grid-row: 1 / 11; }
          .item-10 { grid-column: 5 / 6; grid-row: 11 / 21; }
        }
      `}</style>

      <div ref={wrapperRef} className="gallery-wrap relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-[#faf9f5]">
        
        <div ref={galleryRef} className="bento-grid">
          {gridItems.map((item, i) => (
            <div 
              key={i} 
              className={`bento-item group ${item.className} ${item.isTarget ? 'target-item' : ''}`}
            >
              <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 ease-in-out group-hover:opacity-0 z-10 pointer-events-none" />
              <img src={item.src} alt="" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            </div>
          ))}
        </div>

        <div 
          ref={cloneRef} 
          className="absolute z-20 overflow-hidden opacity-0 rounded-sm"
        >
          <img src={'/images/home/carousel/mainhero.webp'} alt="" className="w-full h-full object-cover" />
        </div>

      </div>
    </>
  );
};

export default ScrubbedBentoGallery;
