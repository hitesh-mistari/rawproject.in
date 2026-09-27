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
    '/images/experience/exp2.webp', // Target (middle-ish)
    '/images/home/instagram/post2.webp',
    '/images/home/hero/hero_slide2.webp',
    '/images/home/inspiration/8.webp',
    '/images/experience/exp3.webp',
  ];
  
  const targetIndex = 3;

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const galleryElement = galleryRef.current;
      if (!galleryElement || !wrapperRef.current) return;

      const targetItem = galleryElement.querySelector('.target-item');
      const otherItems = galleryElement.querySelectorAll('.gallery__item:not(.target-item)');
      if (!targetItem) return;

      // 1. Capture initial state
      const initialState = Flip.getState(targetItem);

      // 2. Add full-screen class to capture final state
      targetItem.classList.add('gallery__item--fullscreen');
      const finalState = Flip.getState(targetItem);
      
      // 3. Revert to initial state before animating
      targetItem.classList.remove('gallery__item--fullscreen');

      // 4. Create the Flip tween
      const flipTween = Flip.to(finalState, {
        simple: true,
        ease: 'none', // linear for smooth scrubbing
      });

      // 5. Build timeline tied to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=150%', // Scroll distance for the animation
          scrub: true,
          pin: true,
        },
      });

      // Animate flip and fade out others simultaneously
      tl.add(flipTween, 0)
        .to(otherItems, { 
          opacity: 0, 
          scale: 0.8,
          duration: flipTween.duration(), 
          ease: 'power1.inOut' 
        }, 0);

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="gallery-wrap relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-[#faf9f5]">
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
    </div>
  );
};

export default ScrubbedBentoGallery;
