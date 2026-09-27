import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

// ─────────────────────────────────────────────────────────────
//  CONFIG — Change this number to switch variants (1–10)
//  1  Logo Reveal
//  2  Mask Reveal
//  3  Line Draw
//  4  Split Screen
//  5  Curtain
//  6  Logo Zoom
//  7  Clip Path
//  8  Typography
//  9  Logo → Hero
//  10 Cinematic Master  ← DEFAULT PRODUCTION
// ─────────────────────────────────────────────────────────────
export const INTRO_VARIANT = 10;

interface IntroLoaderProps {
  logo?: string;         // path to logo image — null uses text logo
  variant?: number;
  onComplete?: () => void;
}

// ─────────────────────────────────────────────────────────────
// LOGO TEXT (mirrors Header)
// ─────────────────────────────────────────────────────────────
function LogoText({ color = '#faf9f5' }: { color?: string }) {
  return (
    <span
      style={{
        fontFamily: "'Recoleta', serif",
        fontSize: 'clamp(24px, 4vw, 40px)',
        color,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      the <strong style={{ fontWeight: 700 }}>raw</strong> project
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// HELPER — detect reduced-motion preference
// ─────────────────────────────────────────────────────────────
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─────────────────────────────────────────────────────────────
// REDUCED MOTION FALLBACK
// ─────────────────────────────────────────────────────────────
function runReducedMotion(
  overlayEl: HTMLElement,
  onComplete: () => void
) {
  document.body.style.overflow = 'hidden';
  gsap.set(overlayEl, { autoAlpha: 1 });
  gsap.to(overlayEl, {
    autoAlpha: 0,
    duration: 0.3,
    delay: 0.2,
    ease: 'none',
    onComplete: () => {
      document.body.style.overflow = '';
      onComplete();
    },
  });
}

// ═════════════════════════════════════════════════════════════
// VARIANT RUNNERS — each receives refs and a done callback
// ═════════════════════════════════════════════════════════════

/** 01 — Logo Reveal (Apple-like) */
function runV1(overlay: HTMLElement, logo: HTMLElement, done: () => void) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: done });
  gsap.set(logo, { autoAlpha: 0, scale: 0.75, filter: 'blur(12px)', y: 20 });
  tl.to(logo, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 0.65 })
    .to(logo, { scale: 0.96, duration: 0.25, ease: 'power2.inOut' }, '+=0.2')
    .to(overlay, { autoAlpha: 0, duration: 0.45, ease: 'power2.inOut' }, '-=0.1');
}

/** 02 — Mask Reveal (editorial / fashion) */
function runV2(overlay: HTMLElement, logo: HTMLElement, done: () => void) {
  // mask slides left→right to uncover logo then yanks offscreen right
  const mask = overlay.querySelector<HTMLElement>('.intro-mask');
  if (!mask) { done(); return; }
  gsap.set(mask, { x: '-101%' });
  gsap.set(logo, { autoAlpha: 0 });
  const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' }, onComplete: done });
  tl.to(mask, { x: '0%', duration: 0.5 })
    .to(logo, { autoAlpha: 1, duration: 0.01 }, '<0.49')
    .to(mask, { x: '101%', duration: 0.55 })
    .to(overlay, { autoAlpha: 0, duration: 0.3, ease: 'power2.out' }, '-=0.1');
}

/** 03 — Line Draw (architectural) */
function runV3(overlay: HTMLElement, logo: HTMLElement, done: () => void) {
  const line = overlay.querySelector<HTMLElement>('.intro-line');
  if (!line) { done(); return; }
  gsap.set(logo, { autoAlpha: 0, y: 10 });
  gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: done });
  tl.to(line, { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, 0.2)
    .to(logo, { autoAlpha: 1, y: 0, duration: 0.45 }, '<0.2')
    .to(logo, { scale: 1.04, duration: 0.25, ease: 'power1.inOut', yoyo: true, repeat: 1 }, '+=0.15')
    .to([overlay, line], { autoAlpha: 0, duration: 0.4, stagger: 0 }, '+=0.1');
}

/** 04 — Split Screen (cinematic agency) */
function runV4(overlay: HTMLElement, logo: HTMLElement, done: () => void) {
  const left = overlay.querySelector<HTMLElement>('.intro-left');
  const right = overlay.querySelector<HTMLElement>('.intro-right');
  if (!left || !right) { done(); return; }
  gsap.set(logo, { autoAlpha: 0, scale: 0.9 });
  const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' }, onComplete: done });
  tl.to(logo, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out' }, 0.15)
    .to(left, { x: '-101%', duration: 0.7 }, '+=0.2')
    .to(right, { x: '101%', duration: 0.7 }, '<')
    .to(logo, { autoAlpha: 0, duration: 0.25 }, '-=0.3');
}

/** 05 — Curtain Reveal (luxury / cinematic) */
function runV5(overlay: HTMLElement, logo: HTMLElement, done: () => void) {
  gsap.set(logo, { autoAlpha: 0, y: 6 });
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: done });
  tl.to(logo, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.1)
    .to(overlay, { y: '-100%', duration: 0.75, ease: 'power4.inOut' }, '+=0.35')
    .to(logo, { autoAlpha: 0, duration: 0.2 }, '<0.1');
}

/** 06 — Logo Zoom Through (bold / creative) */
function runV6(overlay: HTMLElement, logo: HTMLElement, done: () => void) {
  gsap.set(logo, { autoAlpha: 0, scale: 0.8 });
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: done });
  tl.to(logo, { autoAlpha: 1, scale: 1, duration: 0.45 })
    .to(logo, { scale: 28, autoAlpha: 0, duration: 0.65, ease: 'power2.in' }, '+=0.25')
    .to(overlay, { autoAlpha: 0, duration: 0.25, ease: 'none' }, '-=0.05');
}

/** 07 — Clip-Path Reveal (experimental / creative studio) */
function runV7(overlay: HTMLElement, logo: HTMLElement, done: () => void) {
  const reveal = overlay.querySelector<HTMLElement>('.intro-clip');
  if (!reveal) { done(); return; }
  gsap.set(logo, { autoAlpha: 0 });
  gsap.set(reveal, { clipPath: 'circle(0% at 50% 50%)' });
  const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: done });
  tl.to(logo, { autoAlpha: 1, duration: 0.3 }, 0.1)
    .to(reveal, { clipPath: 'circle(12% at 50% 50%)', duration: 0.45 }, '<')
    .to(reveal, { clipPath: 'circle(150% at 50% 50%)', duration: 0.65, ease: 'power3.in' }, '+=0.1')
    .to(overlay, { autoAlpha: 0, duration: 0.2 }, '-=0.05');
}

/** 08 — Typographic Intro (luxury editorial) */
function runV8(overlay: HTMLElement, logo: HTMLElement, done: () => void) {
  const tag = overlay.querySelector<HTMLElement>('.intro-tagline');
  if (!tag) { done(); return; }
  gsap.set(tag, { autoAlpha: 0, y: 16, letterSpacing: '0.5em' });
  gsap.set(logo, { autoAlpha: 0, y: 12 });
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: done });
  tl.to(tag, { autoAlpha: 1, y: 0, letterSpacing: '0.25em', duration: 0.5 }, 0)
    .to(tag, { autoAlpha: 0, y: -10, duration: 0.3 }, '+=0.2')
    .to(logo, { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.1')
    .to(overlay, { autoAlpha: 0, duration: 0.45, ease: 'power2.inOut' }, '+=0.2');
}

/** 09 — Logo Morph into Hero (seamless / high-end) */
function runV9(overlay: HTMLElement, logo: HTMLElement, done: () => void) {
  gsap.set(logo, { autoAlpha: 0, scale: 0.85 });
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: done });
  tl.to(logo, { autoAlpha: 1, scale: 1, duration: 0.45 }, 0.1)
    // logo drifts up toward header position while shrinking
    .to(logo, {
      y: () => -(window.innerHeight * 0.38),
      scale: 0.55,
      duration: 0.7,
      ease: 'power4.inOut',
    }, '+=0.25')
    .to(overlay, { autoAlpha: 0, duration: 0.35, ease: 'power2.inOut' }, '-=0.2')
    .to(logo, { autoAlpha: 0, duration: 0.2 }, '-=0.2');
}

/** 10 — Cinematic Master (the real thing) */
function runV10(overlay: HTMLElement, logo: HTMLElement, done: () => void) {
  const bg = overlay.querySelector<HTMLElement>('.intro-bg');
  const left = overlay.querySelector<HTMLElement>('.intro-panel-l');
  const right = overlay.querySelector<HTMLElement>('.intro-panel-r');

  gsap.set(logo, { autoAlpha: 0, scale: 0.88, filter: 'blur(8px)' });
  if (bg) gsap.set(bg, { scale: 1.06 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: done });

  // ambient subtle drift
  if (bg) tl.to(bg, { scale: 1, duration: 1.8, ease: 'power1.out' }, 0);

  // logo fade-in
  tl.to(logo, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }, 0.25);

  // breathing pulse
  tl.to(logo, { scale: 1.03, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0.65);

  // panels split apart
  if (left && right) {
    tl.to(left, { x: '-101%', duration: 0.65, ease: 'power4.inOut' }, 1.0);
    tl.to(right, { x: '101%', duration: 0.65, ease: 'power4.inOut' }, '<');
  } else {
    tl.to(overlay, { autoAlpha: 0, duration: 0.55, ease: 'power3.inOut' }, 1.0);
  }

  // logo fades as panels split
  tl.to(logo, { autoAlpha: 0, duration: 0.3 }, 1.05);

  // final overlay vanish
  tl.to(overlay, { autoAlpha: 0, duration: 0.25, ease: 'none' }, '-=0.05');
}

// ─────────────────────────────────────────────────────────────
// MAP variant → runner
// ─────────────────────────────────────────────────────────────
const RUNNERS: Record<number, (o: HTMLElement, l: HTMLElement, done: () => void) => void> = {
  1: runV1, 2: runV2, 3: runV3, 4: runV4, 5: runV5,
  6: runV6, 7: runV7, 8: runV8, 9: runV9, 10: runV10,
};

// ─────────────────────────────────────────────────────────────
// INNER STRUCTURE helpers (render extra DOM for some variants)
// ─────────────────────────────────────────────────────────────
function VariantStructure({ variant }: { variant: number }) {
  const darkPanel =
    'absolute inset-0 w-full h-full bg-[#0e0d0c]';

  switch (variant) {
    case 2:
      return <div className="intro-mask absolute inset-0 bg-[#0e0d0c]" />;
    case 3:
      return (
        <div
          className="intro-line absolute"
          style={{
            bottom: 'calc(50% - 56px)',
            left: '10%',
            width: '80%',
            height: '1px',
            background: 'rgba(255,255,255,0.18)',
            transformOrigin: 'left center',
          }}
        />
      );
    case 4:
      return (
        <>
          <div className={`intro-left absolute inset-y-0 left-0 w-1/2 ${darkPanel}`} />
          <div className={`intro-right absolute inset-y-0 right-0 w-1/2 ${darkPanel}`} />
        </>
      );
    case 7:
      return (
        <div
          className="intro-clip absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, #1a1714 0%, #0e0d0c 100%)',
            clipPath: 'circle(0% at 50% 50%)',
          }}
        />
      );
    case 8:
      return (
        <div
          className="intro-tagline absolute"
          style={{
            top: 'calc(50% + 52px)',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 'clamp(9px, 1.2vw, 12px)',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            userSelect: 'none',
          }}
        >
          crafted with purpose
        </div>
      );
    case 10:
      return (
        <>
          <div
            className="intro-bg absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #0e0d0c 0%, #1c1814 100%)' }}
          />
          <div
            className="intro-panel-l absolute inset-y-0 left-0 w-1/2 bg-[#0e0d0c]"
            style={{ transformOrigin: 'left center' }}
          />
          <div
            className="intro-panel-r absolute inset-y-0 right-0 w-1/2 bg-[#0e0d0c]"
            style={{ transformOrigin: 'right center' }}
          />
        </>
      );
    default:
      return null;
  }
}

// ═════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════
const IntroLoader: React.FC<IntroLoaderProps> = ({
  logo,
  variant = INTRO_VARIANT,
  onComplete,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logoEl = logoRef.current;
    if (!overlay || !logoEl) return;

    document.body.style.overflow = 'hidden';

    const finish = () => {
      document.body.style.overflow = '';
      onComplete?.();
      // schedule DOM removal after transition
      gsap.set(overlay, { display: 'none' });
    };

    if (prefersReducedMotion()) {
      runReducedMotion(overlay, finish);
      return;
    }

    const runner = RUNNERS[variant] ?? RUNNERS[10];
    runner(overlay, logoEl, finish);

    return () => {
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0e0d0c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Extra per-variant DOM structure */}
      <VariantStructure variant={variant} />

      {/* Central logo — always present */}
      <div
        ref={logoRef}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          willChange: 'transform, opacity, filter',
        }}
      >
        {logo ? (
          <img
            src={logo}
            alt="The Raw Project"
            style={{
              maxWidth: 'clamp(160px, 30vw, 320px)',
              maxHeight: '80px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        ) : (
          <LogoText color="#faf9f5" />
        )}
      </div>
    </div>
  );
};

export default IntroLoader;
