import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative bg-[#080808] py-32 overflow-hidden text-white border-t border-primary/20">
      
      <div className="watermark-text bottom-0 left-0 leading-none">
        07
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          
          {/* Left Side */}
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-7xl md:text-[10vw] leading-[0.8] tracking-tighter text-primary mb-12">
              LET'S BUILD <br />A <span className="text-[#0066FF]">1</span>
            </h2>

            <div className="space-y-8 mt-auto">
              <div className="font-mono-custom text-sm flex flex-col gap-2">
                <span className="text-white/40 text-[10px] tracking-widest">EMAIL</span>
                <a href="mailto:hello@onz.agency" className="hover:text-primary transition-colors" data-testid="link-email">hello@onz.agency</a>
              </div>
              <div className="font-mono-custom text-sm flex flex-col gap-2">
                <span className="text-white/40 text-[10px] tracking-widest">LOCATION</span>
                <span>CAIRO, EGYPT // GLOBAL</span>
              </div>
              
              <div className="flex gap-6 font-mono-custom text-xs pt-8 border-t border-white/10">
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-1 group" data-testid="link-social-twitter">
                  TWITTER <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-1 group" data-testid="link-social-linkedin">
                  LINKEDIN <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative p-8 md:p-12 border border-white/10 bg-[#080808]/50 backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-12" data-testid="form-contact">
              
              <div className="relative group">
                <input 
                  type="text" 
                  id="name"
                  required
                  className="w-full bg-transparent border-b border-white/30 py-2 font-mono-custom text-white placeholder-transparent focus:outline-none focus:border-primary peer"
                  placeholder="NAME"
                  data-testid="input-name"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-2 font-mono-custom text-xs text-white/50 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-top-4 peer-valid:text-[10px]"
                >
                  NAME
                </label>
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  id="email"
                  required
                  className="w-full bg-transparent border-b border-white/30 py-2 font-mono-custom text-white placeholder-transparent focus:outline-none focus:border-primary peer"
                  placeholder="EMAIL"
                  data-testid="input-email"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-2 font-mono-custom text-xs text-white/50 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-top-4 peer-valid:text-[10px]"
                >
                  EMAIL
                </label>
              </div>

              <div className="relative group">
                <select 
                  id="type"
                  required
                  className="w-full bg-transparent border-b border-white/30 py-2 font-mono-custom text-white focus:outline-none focus:border-primary appearance-none cursor-pointer"
                  data-testid="select-type"
                >
                  <option value="" disabled selected className="bg-[#080808]">PROJECT TYPE</option>
                  <option value="web" className="bg-[#080808]">WEB PLATFORM</option>
                  <option value="mobile" className="bg-[#080808]">MOBILE APP</option>
                  <option value="ai" className="bg-[#080808]">AI INTEGRATION</option>
                  <option value="other" className="bg-[#080808]">OTHER</option>
                </select>
                <div className="absolute right-0 top-2 pointer-events-none text-primary font-mono-custom">↓</div>
              </div>

              <div className="relative group">
                <textarea 
                  id="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-white/30 py-2 font-mono-custom text-white placeholder-transparent focus:outline-none focus:border-primary peer resize-none"
                  placeholder="MESSAGE"
                  data-testid="input-message"
                />
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-2 font-mono-custom text-xs text-white/50 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-top-4 peer-valid:text-[10px]"
                >
                  MESSAGE
                </label>
              </div>

              <button 
                type="submit"
                disabled={formState !== 'idle'}
                className="w-full bg-primary text-[#080808] font-display text-3xl py-4 hover:bg-white transition-colors disabled:opacity-50"
                data-testid="button-submit-contact"
              >
                {formState === 'idle' && "SEND MESSAGE"}
                {formState === 'submitting' && "TRANSMITTING..."}
                {formState === 'success' && "SUCCESS"}
              </button>
            </form>

            <AnimatePresence>
              {formState === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-primary/95 flex flex-col items-center justify-center text-[#080808] z-20"
                >
                  <div className="font-display text-8xl mb-4">1</div>
                  <div className="font-mono-custom text-sm font-bold tracking-widest">TRANSMISSION RECEIVED</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}