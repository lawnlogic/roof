import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import SpeedSection from './sections/SpeedSection';
import AccuracySection from './sections/AccuracySection';
import PaymentsSection from './sections/PaymentsSection';
import PlatformSection from './sections/PlatformSection';
import AccessSection from './sections/AccessSection';
import PricingSection from './sections/PricingSection';
import FinalCTASection from './sections/FinalCTASection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const snapTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Only enable global snap on desktop (lg breakpoint is 1024px)
    const isDesktop = window.innerWidth >= 1024;
    
    if (!isDesktop) {
      // On mobile, refresh ScrollTrigger without snap
      ScrollTrigger.refresh();
      return;
    }

    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      snapTriggerRef.current = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
      if (snapTriggerRef.current) {
        snapTriggerRef.current.kill();
      }
    };
  }, []);

  // Handle resize to refresh ScrollTrigger
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Grain overlay - hidden on mobile for performance */}
      <div className="grain-overlay hidden lg:block" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        <HeroSection className="z-10" />
        <SpeedSection className="z-20" />
        <AccuracySection className="z-30" />
        <PaymentsSection className="z-40" />
        <PlatformSection className="z-50" />
        <AccessSection className="z-[60]" />
        <PricingSection className="z-[70]" />
        <FinalCTASection className="z-[80]" />
      </main>
    </div>
  );
}

export default App;
