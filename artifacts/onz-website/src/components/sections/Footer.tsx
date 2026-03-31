import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [isZero, setIsZero] = useState(true);

  const toggleCopyright = () => {
    setIsZero(false);
    // Could add a small particle burst here if desired
  };

  return (
    <footer className="bg-background border-t border-white/10 relative overflow-hidden pt-16 pb-8">
      {/* Ticker tape */}
      <div className="absolute top-0 left-0 w-full h-8 border-b border-white/5 overflow-hidden flex items-center bg-black/50">
        <motion.div 
          className="flex whitespace-nowrap font-mono text-[10px] text-primary/30 tracking-widest"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className="mx-4">
              10010110 01101111 01101110 01111010 10010110 01101111 01101110 01111010 ONE NOT ZERO 11100011 
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <a href="#top" className="text-4xl font-bold font-sans tracking-tighter flex items-center gap-1 group mb-4 inline-flex">
              <span className="text-white">ON</span>
              <span className="text-primary glow-text-primary">Z</span>
            </a>
            <p className="text-muted-foreground font-light max-w-sm">
              We engineer digital excellence. Eliminate mediocrity. Become the One.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-sm text-white mb-6 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-3 font-mono text-xs text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">01. Philosophy</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">02. Services</a></li>
              <li><a href="#founder" className="hover:text-primary transition-colors">03. The Architect</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors">04. Portfolio</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm text-white mb-6 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-3 font-mono text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Protocol</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-xs text-white/40 flex items-center gap-2">
            © 2025 ONZ AGENCY. ALL RIGHTS RESERVED. 
            <span className="text-white/20">|</span> 
            VERSION 
            <span 
              onClick={toggleCopyright}
              className={`cursor-pointer font-bold px-1 transition-all ${
                isZero ? 'text-white/40 hover:text-white' : 'text-primary glow-text-primary scale-125 inline-block'
              }`}
            >
              {isZero ? '0' : '1'}.0
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] text-primary tracking-widest">SYSTEM OPTIMAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
