import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Tablet, Smartphone, Monitor, Check, Wifi } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AccessSectionProps {
  className?: string;
}

export default function AccessSection({ className = '' }: AccessSectionProps) {
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

  const devices = [
    { icon: Tablet, label: 'iPad', active: true },
    { icon: Smartphone, label: 'Phone', active: false },
    { icon: Monitor, label: 'Desktop', active: false },
  ];

  return (
    <section
      ref={sectionRef}
      id="access"
      className={`w-full min-h-screen relative overflow-hidden gradient-bg tint-access flex items-center py-16 lg:py-0 ${className}`}
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

      {/* Content Container */}
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
              Works on any device.
            </h2>

            <p
              className="text-[#6E6E82] mb-6 sm:mb-8 text-base sm:text-lg"
              style={{ lineHeight: 1.6 }}
            >
              Start a quote on your iPad, finish it on your phone, send it from the
              office. Your data stays in sync.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-full px-4 py-2">
                <Wifi className="w-4 h-4" />
                <span className="text-sm font-medium">Real-time sync</span>
              </div>
              <div className="flex items-center gap-2 text-[#7B2D8E] bg-[#7B2D8E]/10 rounded-full px-4 py-2">
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Offline capable</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="border-[#7B2D8E] text-[#7B2D8E] hover:bg-[#7B2D8E] hover:text-white rounded-full px-6 sm:px-8 py-4 sm:py-5 font-medium transition-all text-base w-full sm:w-auto"
            >
              Check device support
            </Button>
          </div>

          {/* Device Card */}
          <div
            ref={cardRef}
            className="w-full sm:w-[90%] lg:w-[45%] lg:max-w-[420px] bg-white rounded-[20px] sm:rounded-[28px] card-shadow overflow-hidden"
          >
            {/* Device Toggles */}
            <div className="p-4 sm:p-5 border-b border-gray-100">
              <div className="flex items-center justify-center gap-2">
                {devices.map((device, i) => (
                  <button
                    key={i}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all ${
                      device.active
                        ? 'bg-[#7B2D8E] text-white'
                        : 'bg-gray-100 text-[#6E6E82] hover:bg-gray-200'
                    }`}
                  >
                    <device.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">{device.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Image */}
            <div className="relative h-[180px] sm:h-[200px]">
              <img
                src="/device-preview.jpg"
                alt="Property preview"
                className="w-full h-full object-cover"
              />
              {/* Status Overlay */}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#7B2D8E] flex items-center justify-center">
                      <Tablet className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-[#1B1B2F]">iPad Pro</p>
                      <p className="text-xs text-[#6E6E82]">Connected</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-600 font-medium">Live</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sync Status */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-[#6E6E82]">Last synced</span>
                <span className="text-xs sm:text-sm font-medium text-[#1B1B2F]">Just now</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-[#7B2D8E] to-[#9B4DAA] rounded-full" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-[#6E6E82]">3 devices</span>
                <span className="text-xs text-green-600 font-medium">100% synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
