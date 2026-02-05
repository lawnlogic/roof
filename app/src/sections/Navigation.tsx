import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#7B2D8E] flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">DE</span>
              </div>
              <span className="font-semibold text-[#1B1B2F] text-base sm:text-lg tracking-tight">
                Deep Edge
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('platform')}
                className="text-[#6E6E82] hover:text-[#1B1B2F] transition-colors text-sm font-medium"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-[#6E6E82] hover:text-[#1B1B2F] transition-colors text-sm font-medium"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('final-cta')}
                className="text-[#6E6E82] hover:text-[#1B1B2F] transition-colors text-sm font-medium"
              >
                Support
              </button>
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Button
                onClick={() => scrollToSection('final-cta')}
                className="bg-[#7B2D8E] hover:bg-[#662375] text-white rounded-full px-6 py-2 text-sm font-medium transition-all"
              >
                Start free
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1B1B2F]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1B1B2F]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div
          className={`absolute top-14 sm:top-16 left-0 right-0 bg-white shadow-lg transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="px-4 sm:px-6 py-4 space-y-1">
            <button
              onClick={() => scrollToSection('platform')}
              className="block w-full text-left text-[#1B1B2F] font-medium py-3 px-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="block w-full text-left text-[#1B1B2F] font-medium py-3 px-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('final-cta')}
              className="block w-full text-left text-[#1B1B2F] font-medium py-3 px-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Support
            </button>
            <div className="pt-2 pb-1">
              <Button
                onClick={() => scrollToSection('final-cta')}
                className="w-full bg-[#7B2D8E] hover:bg-[#662375] text-white rounded-full py-3 font-medium"
              >
                Start free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
