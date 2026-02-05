import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { X, Send, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SpeedSectionProps {
  className?: string;
}

export default function SpeedSection({ className = '' }: SpeedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ringARef = useRef<HTMLDivElement>(null);
  const ringBRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    const ctx = gsap.context(() => {
      // For mobile: simple fade/slide animations without pin
      if (isMobile) {
        gsap.fromTo(
          cardRef.current,
          { y: 50, opacity: 0 },
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
          headlineRef.current,
          { y: 30, opacity: 0 },
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

      // Desktop: Pinned scroll animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        cardRef.current,
        { x: '-55vw', rotateZ: -6, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        [ringARef.current, ringBRef.current],
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, rotateZ: 0, opacity: 1 },
        { x: '-18vw', rotateZ: 4, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
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
      id="speed"
      className={`w-full min-h-screen relative overflow-hidden gradient-bg tint-speed flex items-center py-16 lg:py-0 ${className}`}
    >
      {/* Decorative Rings - Hidden on mobile */}
      <div
        ref={ringARef}
        className="absolute ring-decoration hidden lg:block"
        style={{
          left: '6vw',
          top: '10vh',
          width: '34vw',
          height: '34vw',
          opacity: 0.75,
        }}
      />
      <div
        ref={ringBRef}
        className="absolute ring-decoration hidden lg:block"
        style={{
          left: '18vw',
          top: '26vh',
          width: '22vw',
          height: '22vw',
          opacity: 0.55,
        }}
      />

      {/* Content Container - Mobile First: Card on top, text below */}
      <div className="w-full px-5 sm:px-6 lg:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Headline Block (Left on desktop, bottom on mobile) */}
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
              Quote in minutes, not hours.
            </h2>

            <p
              className="text-[#6E6E82] mb-6 sm:mb-8 text-base sm:text-lg"
              style={{ lineHeight: 1.6 }}
            >
              Build accurate quotes on-site. Auto-calculate materials, labor, and
              tax—then send before you leave the driveway.
            </p>

            <Button
              variant="outline"
              className="border-[#7B2D8E] text-[#7B2D8E] hover:bg-[#7B2D8E] hover:text-white rounded-full px-6 sm:px-8 py-4 sm:py-5 font-medium transition-all text-base w-full sm:w-auto"
            >
              See how quoting works
            </Button>
          </div>

          {/* Quote Card (Right on desktop, top on mobile) */}
          <div
            ref={cardRef}
            className="w-full sm:w-[90%] lg:w-[45%] lg:max-w-[420px] bg-white rounded-[20px] sm:rounded-[28px] card-shadow overflow-hidden"
            style={{ maxHeight: '480px' }}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
              <h3 className="font-semibold text-[#1B1B2F] text-lg">Quote</h3>
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X className="w-4 h-4 text-[#6E6E82]" />
              </button>
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Clock className="w-4 h-4 text-[#7B2D8E]" />
                <span className="text-sm text-[#7B2D8E] font-medium">Just now</span>
              </div>

              <h4 className="text-lg sm:text-xl font-semibold text-[#1B1B2F] mb-3 sm:mb-4">Lawn care</h4>

              {/* Quote Table */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6E6E82]">Service</span>
                  <span className="text-[#1B1B2F] font-medium">Lawn mowing</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6E6E82]">Qty</span>
                  <span className="text-[#1B1B2F] font-medium">1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6E6E82]">Unit Price</span>
                  <span className="text-[#1B1B2F] font-medium">$85.00</span>
                </div>
                <div className="h-px bg-gray-100 my-2 sm:my-3" />
                <div className="flex justify-between">
                  <span className="text-[#1B1B2F] font-semibold">Total</span>
                  <span className="text-[#7B2D8E] font-bold text-lg">$85.00</span>
                </div>
              </div>
            </div>

            {/* Send Button */}
            <div className="p-4 sm:p-5 bg-white border-t border-gray-100">
              <Button className="w-full bg-[#7B2D8E] hover:bg-[#662375] text-white rounded-full py-3 sm:py-4 font-medium flex items-center justify-center gap-2 text-base">
                <Send className="w-4 h-4" />
                Send quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
