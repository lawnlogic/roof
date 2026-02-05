import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import {
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Home,
  Settings,
  Search,
  MoreHorizontal,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PlatformSectionProps {
  className?: string;
}

export default function PlatformSection({ className = '' }: PlatformSectionProps) {
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
        cardRef.current,
        { x: '-55vw', rotateY: -18, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
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

      // EXIT
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, rotateY: 0, opacity: 1 },
        { x: '-18vw', rotateY: 10, opacity: 0, ease: 'power2.in' },
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

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: Users, label: 'Customers', active: true },
    { icon: Calendar, label: 'Schedule', active: false },
    { icon: FileText, label: 'Quotes', active: false },
    { icon: MessageSquare, label: 'Messages', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const customers = [
    { name: 'Sarah Johnson', email: 'sarah@email.com', status: 'Active' },
    { name: 'Mike Peters', email: 'mike@email.com', status: 'Active' },
    { name: 'Lisa Chen', email: 'lisa@email.com', status: 'Pending' },
    { name: 'Tom Wilson', email: 'tom@email.com', status: 'Active' },
  ];

  return (
    <section
      ref={sectionRef}
      id="platform"
      className={`w-full min-h-screen relative overflow-hidden gradient-bg tint-platform flex items-center py-16 lg:py-0 ${className}`}
    >
      {/* Decorative Rings - Hidden on mobile */}
      <div
        ref={ringARef}
        className="absolute ring-decoration hidden lg:block"
        style={{
          left: '52vw',
          top: '10vh',
          width: '32vw',
          height: '32vw',
          opacity: 0.65,
        }}
      />
      <div
        ref={ringBRef}
        className="absolute ring-decoration hidden lg:block"
        style={{
          left: '64vw',
          top: '24vh',
          width: '20vw',
          height: '20vw',
          opacity: 0.45,
        }}
      />

      {/* Content Container */}
      <div className="w-full px-5 sm:px-6 lg:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 max-w-7xl mx-auto">
          
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
              Everything in one place.
            </h2>

            <p
              className="text-[#6E6E82] mb-6 sm:mb-8 text-base sm:text-lg"
              style={{ lineHeight: 1.6 }}
            >
              Customers, jobs, schedules, and messages—organized so you're never
              searching through threads or notebooks.
            </p>

            <Button
              variant="outline"
              className="border-[#7B2D8E] text-[#7B2D8E] hover:bg-[#7B2D8E] hover:text-white rounded-full px-6 sm:px-8 py-4 sm:py-5 font-medium transition-all text-base w-full sm:w-auto"
            >
              Explore the platform
            </Button>
          </div>

          {/* Dashboard Card */}
          <div
            ref={cardRef}
            className="w-full sm:w-[90%] lg:w-[45%] lg:max-w-[480px] bg-white rounded-[20px] sm:rounded-[28px] card-shadow overflow-hidden flex"
            style={{ maxHeight: '420px' }}
          >
            {/* Sidebar */}
            <div className="w-14 sm:w-16 bg-gray-50 border-r border-gray-100 flex flex-col items-center py-3 sm:py-4 gap-1 sm:gap-2">
              {sidebarItems.map((item, i) => (
                <button
                  key={i}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors ${
                    item.active
                      ? 'bg-[#7B2D8E] text-white'
                      : 'text-[#6E6E82] hover:bg-gray-200'
                  }`}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Header */}
              <div className="p-3 sm:p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#1B1B2F] text-sm sm:text-base">Customers</h3>
                  <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4 text-[#6E6E82]" />
                  </button>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2">
                  <Search className="w-3 h-3 sm:w-4 sm:h-4 text-[#6E6E82]" />
                  <span className="text-[#6E6E82] text-xs sm:text-sm">Search...</span>
                </div>
              </div>

              {/* Customer List */}
              <div className="flex-1 overflow-auto p-3 sm:p-4">
                <div className="space-y-2 sm:space-y-3">
                  {customers.map((customer, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#7B2D8E] to-[#9B4DAA] flex items-center justify-center text-white font-medium text-xs sm:text-sm flex-shrink-0">
                        {customer.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#1B1B2F] text-xs sm:text-sm truncate">
                          {customer.name}
                        </p>
                        <p className="text-[#6E6E82] text-xs truncate">
                          {customer.email}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                          customer.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {customer.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
