import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate API call and explosion effect
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 5000);
    }, 1500);
  };

  const aiHints: Record<string, string> = {
    name: "Identify yourself to the system.",
    email: "Where should we send the transmission?",
    type: "What level of intervention is required?",
    message: "Detail your vision. Be precise. We only build 1s."
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Copy & Socials */}
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Initiate <br/><span className="text-primary font-mono glow-text-primary">Contact</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-md font-light leading-relaxed">
              Ready to leave the zero state? Transmit your coordinates and objective. We only respond to serious inquiries.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-mono text-white/40 mb-4 tracking-widest uppercase">Direct Line</h3>
                <a href="mailto:hello@onz.agency" className="text-xl md:text-2xl font-mono text-white hover:text-primary transition-colors flex items-center gap-4 group">
                  hello@onz.agency
                  <span className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-primary">↗</span>
                </a>
              </div>

              <div>
                <h3 className="text-xs font-mono text-white/40 mb-4 tracking-widest uppercase">Network</h3>
                <div className="flex gap-6">
                  {[
                    { icon: Twitter, label: "Twitter" },
                    { icon: Linkedin, label: "LinkedIn" },
                    { icon: Github, label: "GitHub" },
                  ].map((social, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:text-primary hover:border-primary hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all relative group overflow-hidden">
                      <social.icon size={20} className="relative z-10" />
                      {/* Binary hover effect */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 font-mono text-[8px] text-primary/30 pointer-events-none break-all leading-none z-0">
                        1010101
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            {/* Floating AI Guide */}
            <AnimatePresence mode="wait">
              {focusedField && (
                <motion.div
                  key={focusedField}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -top-12 right-0 bg-primary/10 border border-primary/30 text-primary font-mono text-xs px-4 py-2 rounded flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {aiHints[focusedField]}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6 bg-[#050505] p-8 border border-white/5 relative z-10">
              
              <div className="space-y-2 relative group">
                <label className="text-xs font-mono text-white/50 uppercase tracking-widest">Name</label>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-0 h-full border-l-2 border-primary transition-all duration-300 group-focus-within:w-full bg-primary/5 -z-10 opacity-0 group-focus-within:opacity-100" />
                  <input 
                    type="text" 
                    required
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors font-mono"
                    placeholder="Enter designation"
                  />
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-xs font-mono text-white/50 uppercase tracking-widest">Email</label>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-0 h-full border-l-2 border-primary transition-all duration-300 group-focus-within:w-full bg-primary/5 -z-10 opacity-0 group-focus-within:opacity-100" />
                  <input 
                    type="email" 
                    required
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors font-mono"
                    placeholder="system@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-xs font-mono text-white/50 uppercase tracking-widest">Protocol Type</label>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-0 h-full border-l-2 border-primary transition-all duration-300 group-focus-within:w-full bg-primary/5 -z-10 opacity-0 group-focus-within:opacity-100" />
                  <select 
                    required
                    onFocus={() => setFocusedField('type')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-primary transition-colors font-mono appearance-none"
                  >
                    <option value="" disabled selected className="bg-black text-white/50">Select objective...</option>
                    <option value="web" className="bg-black text-white">01 Web Platform</option>
                    <option value="mobile" className="bg-black text-white">10 Mobile Application</option>
                    <option value="ai" className="bg-black text-white">11 AI Integration</option>
                    <option value="other" className="bg-black text-white">00 Custom Protocol</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-xs font-mono text-white/50 uppercase tracking-widest">Parameters</label>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-0 h-full border-l-2 border-primary transition-all duration-300 group-focus-within:w-full bg-primary/5 -z-10 opacity-0 group-focus-within:opacity-100" />
                  <textarea 
                    required
                    rows={4}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors font-mono resize-none"
                    placeholder="Describe the end state..."
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={formState !== 'idle'}
                className="w-full py-4 bg-white text-black font-bold font-mono tracking-widest hover:bg-primary transition-colors relative overflow-hidden group mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {formState === 'idle' && "TRANSMIT DATA"}
                  {formState === 'submitting' && "ENCRYPTING..."}
                  {formState === 'success' && "TRANSMISSION SUCCESSFUL"}
                </span>
                
                {/* Button Hover effect */}
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            </form>

            {/* Success Explosion Overlay */}
            <AnimatePresence>
              {formState === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-primary/90 backdrop-blur-md z-20 flex flex-col items-center justify-center text-black"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 border-4 border-black rounded-full flex items-center justify-center mb-4"
                  >
                    <span className="font-mono text-4xl font-bold">1</span>
                  </motion.div>
                  <h3 className="font-bold text-xl mb-2">System Updated</h3>
                  <p className="font-mono text-xs">We will return the signal shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}
