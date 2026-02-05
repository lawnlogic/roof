import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ringARef = useRef<HTMLDivElement>(null);
  const ringBRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Rings entrance
      tl.fromTo(
        [ringARef.current, ringBRef.current],
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.8 },
        0
      );

      // Headline words stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.03 },
          0.2
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.5
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.6
      );

      // Product card
      tl.fromTo(
        cardRef.current,
        { x: 30, rotateY: 10, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, duration: 0.9 },
        0.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation - only on desktop
  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
              x: 0,
              opacity: 1,
            });
            gsap.set(cardRef.current, { x: 0, rotateY: 0, opacity: 1 });
            gsap.set([ringARef.current, ringBRef.current], { scale: 1, opacity: 1 });
          },
        },
      });

      // EXIT (70-100%)
      scrollTl.fromTo(
        [headlineRef.current, subheadlineRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, rotateY: 0, opacity: 1 },
        { x: '18vw', rotateY: -12, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [ringARef.current, ringBRef.current],
        { scale: 1, opacity: 1 },
        { scale: 1.08, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`w-full min-h-screen relative overflow-hidden gradient-bg flex items-center ${className}`}
    >
      {/* Decorative Rings - Hidden on mobile */}
      <div
        ref={ringARef}
        className="absolute ring-decoration opacity-0 hidden lg:block"
        style={{
          left: '6vw',
          top: '10vh',
          width: '34vw',
          height: '34vw',
        }}
      />
      <div
        ref={ringBRef}
        className="absolute ring-decoration opacity-0 hidden lg:block"
        style={{
          left: '18vw',
          top: '26vh',
          width: '22vw',
          height: '22vw',
        }}
      />

      {/* Content Container - Mobile First Stack */}
      <div className="w-full px-5 sm:px-6 lg:px-12 py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Headline Block */}
          <div className="w-full lg:w-[45%] lg:max-w-[550px] text-center lg:text-left">
            <h1
              ref={headlineRef}
              className="text-[#1B1B2F] font-bold mb-4 sm:mb-6"
              style={{
                fontSize: 'clamp(32px, 8vw, 64px)',
                lineHeight: 1.05,
              }}
            >
              <span className="word inline-block">The</span>{' '}
              <span className="word inline-block">fastest</span>{' '}
              <span className="word inline-block">way</span>{' '}
              <span className="word inline-block">from</span>{' '}
              <span className="word inline-block">quote</span>{' '}
              <span className="word inline-block">to</span>{' '}
              <span className="word inline-block">paid.</span>
            </h1>

            <p
              ref={subheadlineRef}
              className="text-[#6E6E82] mb-6 sm:mb-8 opacity-0 text-base sm:text-lg lg:text-xl"
              style={{
                lineHeight: 1.6,
                maxWidth: '420px',
              }}
            >
              Quoting, scheduling, and payments—built for landscapers and trades.
            </p>

            <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <Button
                onClick={() => {
                  const el = document.getElementById('final-cta');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#7B2D8E] hover:bg-[#662375] text-white rounded-full px-8 py-5 sm:py-6 text-base sm:text-lg font-medium transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Create free account
              </Button>
              <p className="text-[#6E6E82] text-sm sm:text-base">No card required.</p>
            </div>
          </div>

          {/* Product Card */}
          <div
            ref={cardRef}
            className="w-full sm:w-[90%] lg:w-[45%] lg:max-w-[480px] bg-white rounded-[20px] sm:rounded-[28px] card-shadow overflow-hidden opacity-0"
            style={{ maxHeight: '520px' }}
          >
            {/* Search Bar */}
            <div className="p-4 sm:p-5 border-b border-gray-100">
              <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-3">
                <Search className="w-4 h-4 text-[#6E6E82]" />
                <span className="text-[#6E6E82] text-sm">Search properties...</span>
              </div>
            </div>

            {/* Map Image */}
            <div className="relative h-[250px] sm:h-[280px] lg:h-[300px]">
              <img
                src="/hero-map.jpg"
                alt="Aerial property view"
                className="w-full h-full object-cover"
              />
              {/* Location Pin */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#7B2D8E] rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#7B2D8E] rotate-45" />
                </div>
              </div>
            </div>

            {/* Quote Button */}
            <div className="p-4 sm:p-5 bg-white border-t border-gray-100">
              <Button className="w-full bg-[#7B2D8E] hover:bg-[#662375] text-white rounded-full py-3 sm:py-4 font-medium text-base">
                Create Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
