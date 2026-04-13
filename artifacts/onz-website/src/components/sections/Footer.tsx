import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F0] text-[#080808] border-t-8 border-primary">
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full border-2 border-[#080808] flex items-center justify-center relative">
                <span className="font-display text-2xl">O</span>
                <span className="absolute text-[#0066FF] font-mono-custom font-bold text-xs bg-[#FAF7F0] px-1">
                  1
                </span>
              </div>
              <span className="font-display text-3xl tracking-widest mt-1">
                ONZ
              </span>
            </div>
            <p className="font-editorial italic text-sm text-[#080808]/70 max-w-xs mt-4">
              One Not Zero since 2018. Elevating digital experiences from the
              baseline of mediocrity to the pinnacle of perfection.
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display tracking-widest text-xl mb-4">INDEX</h4>
            <div className="flex flex-col gap-2 font-mono-custom text-xs font-bold">
              <a
                href="#about"
                className="hover:text-primary transition-colors w-fit"
                data-testid="link-footer-about"
              >
                01 / ABOUT
              </a>
              <a
                href="#services"
                className="hover:text-primary transition-colors w-fit"
                data-testid="link-footer-services"
              >
                02 / SERVICES
              </a>
              <a
                href="#founder"
                className="hover:text-primary transition-colors w-fit"
                data-testid="link-footer-founder"
              >
                03 / ARCHITECT
              </a>
              <a
                href="#portfolio"
                className="hover:text-primary transition-colors w-fit"
                data-testid="link-footer-portfolio"
              >
                04 / WORK
              </a>
            </div>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display tracking-widest text-xl mb-4">
              NEWSLETTER
            </h4>
            <div className="flex w-full max-w-sm border-b border-[#080808]">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="bg-transparent border-none focus:outline-none font-mono-custom text-xs py-2 w-full"
                data-testid="input-newsletter-email"
              />
              <button
                className="font-mono-custom text-xs font-bold text-primary hover:text-[#080808] transition-colors whitespace-nowrap"
                data-testid="button-newsletter-subscribe"
              >
                SUBSCRIBE →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#080808]/10 py-6 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 font-mono-custom text-[10px] text-[#080808]/50">
        <div>© {new Date().getFullYear()} ONZ AGENCY</div>
        <div>ALL RIGHTS RESERVED</div>
        <div className="text-primary">01001111 01001110 01011010</div>
      </div>

      {/* Ticker */}
      <div className="w-full bg-[#080808] py-2 overflow-hidden flex">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex whitespace-nowrap font-mono-custom text-[9px] text-[#0066FF] tracking-[0.5em]"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="mx-4">
              01001111 01001110 01011010 00110001
            </span>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
