import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTASectionProps {
  className?: string;
}

export default function FinalCTASection({ className = '' }: FinalCTASectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ringARef = useRef<HTMLDivElement>(null);
  const ringBRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // EXIT - Keep visible longer
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.35, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, rotateY: 0, opacity: 1 },
        { x: '10vw', rotateY: -10, opacity: 0.35, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [ringARef.current, ringBRef.current],
        { scale: 1, opacity: 1 },
        { scale: 1.05, opacity: 0.35, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className={`w-full min-h-screen relative overflow-hidden gradient-bg tint-final flex items-center py-16 lg:py-0 ${className}`}
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
              Start today.
            </h2>

            <p
              className="text-[#6E6E82] mb-6 sm:mb-8 text-base sm:text-lg"
              style={{ lineHeight: 1.6 }}
            >
              Join hundreds of trade businesses moving faster with Deep Edge. No
              card required.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-sm text-[#1B1B2F]">Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-sm text-[#1B1B2F]">No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-sm text-[#1B1B2F]">Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div
            ref={cardRef}
            className="w-full sm:w-[90%] lg:w-[45%] lg:max-w-[420px] bg-white rounded-[20px] sm:rounded-[28px] card-shadow overflow-hidden"
          >
            <div className="p-5 sm:p-8">
              <h3 className="font-semibold text-[#1B1B2F] text-lg sm:text-xl mb-5 sm:mb-6">
                Create your free account
              </h3>

              {isSubmitted ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-[#1B1B2F] text-base sm:text-lg mb-2">
                    You're all set!
                  </h4>
                  <p className="text-[#6E6E82] text-sm">
                    Check your email to get started.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm text-[#6E6E82] block mb-1.5">
                      Full name
                    </label>
                    <Input
                      type="text"
                      placeholder="John Smith"
                      required
                      className="w-full rounded-xl border-gray-200 focus:border-[#7B2D8E] focus:ring-[#7B2D8E]/20 py-2.5 sm:py-3 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm text-[#6E6E82] block mb-1.5">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      required
                      className="w-full rounded-xl border-gray-200 focus:border-[#7B2D8E] focus:ring-[#7B2D8E]/20 py-2.5 sm:py-3 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm text-[#6E6E82] block mb-1.5">
                      Password
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={8}
                      className="w-full rounded-xl border-gray-200 focus:border-[#7B2D8E] focus:ring-[#7B2D8E]/20 py-2.5 sm:py-3 text-sm sm:text-base"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#7B2D8E] hover:bg-[#662375] text-white rounded-full py-3 sm:py-4 font-medium transition-all mt-2 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Get started'
                    )}
                  </Button>

                  <p className="text-xs text-[#6E6E82] text-center mt-3 sm:mt-4">
                    By signing up, you agree to the{' '}
                    <a href="#" className="text-[#7B2D8E] hover:underline">
                      Terms of Service
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center">
        <p className="text-xs sm:text-sm text-[#6E6E82]">
          © 2026 Deep Edge. All rights reserved.
        </p>
      </div>
    </section>
  );
}
