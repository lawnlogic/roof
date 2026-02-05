import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { CreditCard, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PaymentsSectionProps {
  className?: string;
}

export default function PaymentsSection({ className = '' }: PaymentsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
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
          cardsContainerRef.current,
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
        cardsContainerRef.current,
        { x: '55vw', rotateZ: 6, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        [ringARef.current, ringBRef.current],
        { scale: 0.9, opacity: 0 },
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
        cardsContainerRef.current,
        { x: 0, rotateZ: 0, opacity: 1 },
        { x: '18vw', rotateZ: -4, opacity: 0, ease: 'power2.in' },
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
      id="payments"
      className={`w-full min-h-screen relative overflow-hidden gradient-bg tint-payments flex items-center py-16 lg:py-0 ${className}`}
    >
      {/* Decorative Rings - Hidden on mobile */}
      <div
        ref={ringARef}
        className="absolute ring-decoration hidden lg:block"
        style={{
          left: '6vw',
          top: '12vh',
          width: '32vw',
          height: '32vw',
          opacity: 0.7,
        }}
      />
      <div
        ref={ringBRef}
        className="absolute ring-decoration hidden lg:block"
        style={{
          left: '16vw',
          top: '28vh',
          width: '20vw',
          height: '20vw',
          opacity: 0.5,
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
              Get paid faster.
            </h2>

            <p
              className="text-[#6E6E82] mb-6 sm:mb-8 text-base sm:text-lg"
              style={{ lineHeight: 1.6 }}
            >
              Accept cards, bank transfers, and scheduled payments. Automatic
              receipts and reminders mean less chasing.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 bg-white/60 rounded-full px-4 py-2">
                <CreditCard className="w-4 h-4 text-[#7B2D8E]" />
                <span className="text-sm text-[#1B1B2F]">Cards</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-[#7B2D8E]" />
                <span className="text-sm text-[#1B1B2F]">Instant</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 rounded-full px-4 py-2">
                <Shield className="w-4 h-4 text-[#7B2D8E]" />
                <span className="text-sm text-[#1B1B2F]">Secure</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="border-[#7B2D8E] text-[#7B2D8E] hover:bg-[#7B2D8E] hover:text-white rounded-full px-6 sm:px-8 py-4 sm:py-5 font-medium transition-all text-base w-full sm:w-auto"
            >
              Learn about payments
            </Button>
          </div>

          {/* Card Stack */}
          <div
            ref={cardsContainerRef}
            className="w-full sm:w-[80%] lg:w-[40%] lg:max-w-[380px] relative"
            style={{ height: '280px', maxHeight: '320px' }}
          >
            {/* Back Card */}
            <div
              className="absolute top-0 left-0 w-full bg-white rounded-[20px] sm:rounded-[24px] card-shadow"
              style={{
                height: '220px',
                transform: 'translateY(-20px) scale(0.96)',
                opacity: 0.6,
              }}
            />

            {/* Middle Card */}
            <div
              className="absolute top-0 left-0 w-full bg-white rounded-[20px] sm:rounded-[24px] card-shadow"
              style={{
                height: '220px',
                transform: 'translateY(-10px) scale(0.98)',
                opacity: 0.8,
              }}
            />

            {/* Front Card - Payment Form */}
            <div
              className="absolute top-0 left-0 w-full bg-white rounded-[20px] sm:rounded-[24px] card-shadow p-5 sm:p-6"
              style={{ height: '220px' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1B1B2F] text-sm sm:text-base">Payment method</h3>
                <div className="flex gap-1">
                  <div className="w-6 h-4 sm:w-8 sm:h-5 bg-[#1B1B2F] rounded opacity-80" />
                  <div className="w-6 h-4 sm:w-8 sm:h-5 bg-[#7B2D8E] rounded opacity-80" />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-[#6E6E82] block mb-1">
                    Card number
                  </label>
                  <div className="bg-gray-50 rounded-xl px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3">
                    <CreditCard className="w-4 h-4 text-[#6E6E82]" />
                    <span className="text-[#1B1B2F] text-sm tracking-wider">
                      •••• •••• •••• 4242
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="text-xs text-[#6E6E82] block mb-1">
                      Expiry
                    </label>
                    <div className="bg-gray-50 rounded-xl px-3 sm:px-4 py-2.5">
                      <span className="text-[#1B1B2F] text-sm">12/26</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#6E6E82] block mb-1">
                      CVC
                    </label>
                    <div className="bg-gray-50 rounded-xl px-3 sm:px-4 py-2.5">
                      <span className="text-[#1B1B2F] text-sm">•••</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border-2 border-[#7B2D8E] bg-[#7B2D8E] flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-xs text-[#6E6E82]">Save card</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
