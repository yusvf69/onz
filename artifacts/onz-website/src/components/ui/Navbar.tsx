import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Founder', href: '#founder' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
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
        scrolled ? 'py-4 bg-background/80 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,245,255,0.05)]' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a 
          href="#top" 
          onClick={(e) => scrollTo(e, '#top')}
          className="text-2xl font-bold font-sans tracking-tighter flex items-center gap-1 group"
        >
          <span className="text-white group-hover:text-primary transition-colors">ON</span>
          <span className="text-primary glow-text-primary">Z</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="text-sm font-mono text-muted-foreground hover:text-white transition-colors relative group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-primary absolute -left-3 transition-opacity">1</span>
              {link.label}
              <span className="opacity-0 group-hover:opacity-100 text-primary absolute -right-3 transition-opacity">0</span>
            </a>
          ))}
        </div>
        
        {/* Mobile menu could be added here, keeping minimal for now */}
        <div className="md:hidden">
           <span className="text-primary font-mono text-xl">1/0</span>
        </div>
      </div>
    </motion.nav>
  );
}
