import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { MapPin, Ruler, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AccuracySectionProps {
  className?: string;
}

export default function AccuracySection({ className = '' }: AccuracySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ringARef = useRef<HTMLDivElement>(null);
  const ringBRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    const ctx = gsap.context(() => {
      // Mobile: simple animations
      if (isMobile) {
        gsap.fromTo(
          headlineRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        gsap.fromTo(
          cardRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        return;
      }

      // Desktop: Pinned scroll
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-45vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: '55vw', rotateY: 18, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        [ringARef.current, ringBRef.current],
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // EXIT
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, rotateY: 0, opacity: 1 },
        { x: '18vw', rotateY: -10, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [ringARef.current, ringBRef.current],
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="accuracy"
      className={`w-full min-h-screen relative overflow-hidden gradient-bg tint-accuracy flex items-center py-16 lg:py-0 ${className}`}
    >
      {/* Decorative Rings - Hidden on mobile */}
      <div
        ref={ringARef}
        className="absolute ring-decoration hidden lg:block"
        style={{
          left: '50vw',
          top: '8vh',
          width: '30vw',
          height: '30vw',
          opacity: 0.65,
        }}
      />
      <div
        ref={ringBRef}
        className="absolute ring-decoration hidden lg:block"
        style={{
          left: '62vw',
          top: '22vh',
          width: '20vw',
          height: '20vw',
          opacity: 0.45,
        }}
      />

      {/* Content Container - Mobile: Text on top, card below */}
      <div className="w-full px-5 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Headline Block */}
          <div
            ref={headlineRef}
            className="w-full lg:w-[45%] lg:max-w-[500px] text-center lg:text-left"
          >
            <h2
              className="text-[#1B1B2F] font-bold mb-4 sm:mb-6"
              style={{
                fontSize: 'clamp(28px, 7vw, 52px)',
                lineHeight: 1.1,
              }}
            >
              Measure with confidence.
            </h2>

            <p
              className="text-[#6E6E82] mb-6 sm:mb-8 text-base sm:text-lg"
              style={{ lineHeight: 1.6 }}
            >
              Use built-in maps and property data to verify measurements. Reduce
              callbacks and protect your margins.
            </p>

            <Button
              variant="outline"
              className="border-[#7B2D8E] text-[#7B2D8E] hover:bg-[#7B2D8E] hover:text-white rounded-full px-6 sm:px-8 py-4 sm:py-5 font-medium transition-all text-base w-full sm:w-auto"
            >
              Explore accuracy features
            </Button>
          </div>

          {/* Map Card */}
          <div
            ref={cardRef}
            className="w-full sm:w-[90%] lg:w-[45%] lg:max-w-[440px] bg-white rounded-[20px] sm:rounded-[28px] card-shadow overflow-hidden"
          >
            {/* Map Image */}
            <div className="relative h-[200px] sm:h-[220px]">
              <img
                src="/accuracy-map.jpg"
                alt="Aerial neighborhood view"
                className="w-full h-full object-cover"
              />
              {/* Location Pin */}
              <div className="absolute top-1/3 left-1/3">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#7B2D8E] rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#7B2D8E] rotate-45" />
                </div>
              </div>
            </div>

            {/* Property Info Panel */}
            <div className="p-4 sm:p-5 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="w-4 h-4 text-[#7B2D8E]" />
                <span className="text-sm font-medium text-[#1B1B2F]">
                  Property measurements
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <span className="text-xs text-[#6E6E82] block mb-1">Lot size</span>
                  <span className="text-base sm:text-lg font-semibold text-[#1B1B2F]">0.25 ac</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <span className="text-xs text-[#6E6E82] block mb-1">Lawn area</span>
                  <span className="text-base sm:text-lg font-semibold text-[#1B1B2F]">8,500 ft²</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-xs text-[#6E6E82]">Verified with satellite data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
