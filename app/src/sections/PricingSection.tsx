import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PricingSectionProps {
  className?: string;
}

export default function PricingSection({ className = '' }: PricingSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.pricing-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'For solo operators.',
      features: [
        'Unlimited quotes',
        'Unlimited customers',
        'iOS & Android apps',
        'Email support',
        'Basic reporting',
      ],
      cta: 'Start free',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/mo',
      description: 'For growing teams.',
      features: [
        'Everything in Starter',
        'Team scheduling',
        'SMS reminders',
        'Priority support',
        'Advanced reporting',
        'Payment processing (3%)',
      ],
      cta: 'Start trial',
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$79',
      period: '/mo',
      description: 'For multi-team operations.',
      features: [
        'Everything in Pro',
        'Multiple teams',
        'Advanced reporting',
        'Dedicated onboarding',
        'API access',
        'Payment processing (2%)',
      ],
      cta: 'Contact sales',
      highlighted: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className={`w-full relative gradient-bg tint-pricing py-16 sm:py-20 lg:py-28 ${className}`}
    >
      <div className="w-full px-5 sm:px-6 lg:px-12 max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-10 sm:mb-12 lg:mb-16 text-center lg:text-left">
          <h2
            className="text-[#1B1B2F] font-bold mb-3 sm:mb-4"
            style={{
              fontSize: 'clamp(28px, 6vw, 48px)',
              lineHeight: 1.1,
            }}
          >
            Simple pricing.
          </h2>
          <p
            className="text-[#6E6E82] max-w-lg mx-auto lg:mx-0 text-base sm:text-lg"
            style={{ lineHeight: 1.6 }}
          >
            Start free. Upgrade when you need more team members and advanced
            features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card bg-white rounded-[20px] sm:rounded-[28px] p-5 sm:p-6 lg:p-8 card-shadow flex flex-col ${
                plan.highlighted
                  ? 'ring-2 ring-[#7B2D8E] relative sm:scale-105'
                  : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#7B2D8E] text-white text-xs font-medium px-4 py-1.5 rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-5 sm:mb-6">
                <h3 className="font-semibold text-[#1B1B2F] text-base sm:text-lg mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className="text-[#1B1B2F] font-bold"
                    style={{ fontSize: 'clamp(24px, 5vw, 36px)' }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[#6E6E82] text-sm">{plan.period}</span>
                  )}
                </div>
                <p className="text-[#6E6E82] text-sm">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {plan.features.map((feature, j) => (
                  <div key={j} className="feature-item flex items-center gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#7B2D8E]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#7B2D8E]" />
                    </div>
                    <span className="text-[#1B1B2F] text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full rounded-full py-3 sm:py-4 font-medium transition-all text-sm sm:text-base ${
                  plan.highlighted
                    ? 'bg-[#7B2D8E] hover:bg-[#662375] text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-[#1B1B2F]'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Compare Link */}
        <div className="mt-8 sm:mt-10 text-center">
          <button className="inline-flex items-center gap-2 text-[#7B2D8E] font-medium hover:underline text-sm sm:text-base">
            Compare all features
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
