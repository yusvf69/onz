import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['About', 'Services', 'Founder', 'Portfolio', 'Insights'];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-4 bg-[#080808]/80 backdrop-blur-md border-b border-primary/20 shadow-[0_4px_30px_rgba(201,168,76,0.1)]' 
          : 'py-6 bg-transparent border-b border-primary'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div 
          className="flex flex-col cursor-pointer group"
          onClick={() => scrollTo('top')}
          data-testid="link-logo"
        >
          <span className="font-display text-2xl tracking-widest text-white group-hover:glow-gold transition-all">ONZ</span>
          <span className="font-mono-custom text-[10px] text-primary tracking-widest">ONE NOT ZERO</span>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link, i) => (
            <div key={link} className="flex items-center gap-6">
              <button
                onClick={() => scrollTo(link.toLowerCase())}
                className="text-[11px] font-sans uppercase tracking-[0.2em] text-white hover:text-primary transition-colors relative group"
                data-testid={`link-nav-${link.toLowerCase()}`}
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
              {i < links.length - 1 && <span className="text-white/20 font-mono-custom">|</span>}
            </div>
          ))}
        </div>
        
        {/* Right: CTA & Badge */}
        <div className="flex items-center gap-6">
          <span className="hidden md:block font-mono-custom text-[10px] text-white/50 tracking-widest border border-white/20 px-2 py-1" data-testid="text-est-badge">EST. 2018</span>
          <button 
            onClick={() => scrollTo('contact')}
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-white border border-primary rounded-full px-6 py-2 hover:bg-primary hover:text-[#080808] transition-colors"
            data-testid="button-contact-us"
          >
            Contact Us
          </button>
        </div>

      </div>
    </motion.nav>
  );
}