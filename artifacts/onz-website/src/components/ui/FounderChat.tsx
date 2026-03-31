import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

interface FounderChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FounderChat({ isOpen, onClose }: FounderChatProps) {
  const [messages, setMessages] = useState<{role: 'ai'|'user', text: string}[]>([
    { role: 'ai', text: "I am the 1. How can I help you transform your vision?" }
  ]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const starters = [
    { label: "What's your philosophy?", reply: "Value is binary. Mediocrity is the zero state. We exist to elevate projects to the status of 1—singular, unique, exceptional." },
    { label: "Tell me about ONZ", reply: "ONZ is a collective of builders who refuse to accept 'good enough'. We are architects of the digital avant-garde." },
    { label: "What makes you different?", reply: "Precision. Obsession. We don't just write code; we craft digital luxury. We treat every pixel as a statement of intent." },
    { label: "How do you work?", reply: "We analyze the zero state, map the transformation, and execute with absolute focus until the one is achieved." }
  ];

  const handleSend = (text: string, reply?: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: reply || "Every interaction is an opportunity for greatness. Let's discuss this further in a real meeting." 
      }]);
    }, 1000);
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed bottom-6 right-6 w-[400px] max-w-[calc(100vw-3rem)] h-[550px] z-50 bg-black/95 border border-primary/30 rounded-lg shadow-[0_0_40px_rgba(0,245,255,0.15)] flex flex-col overflow-hidden backdrop-blur-xl"
        >
          <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary flex items-center justify-center glow-box-primary relative overflow-hidden">
                <span className="relative z-10 text-primary font-mono font-bold text-sm">1</span>
                <motion.div 
                  className="absolute inset-0 bg-primary/20"
                  animate={{ y: ['100%', '-100%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-wide">The Founder AI</h3>
                <p className="text-primary text-[10px] font-mono tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  SYSTEM ONLINE
                </p>
              </div>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors p-1">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col font-mono text-sm hide-scrollbar relative">
            <div className="absolute inset-0 pointer-events-none opacity-5 flex flex-col items-center justify-center overflow-hidden">
              <div className="text-[200px] leading-none text-primary font-bold">1</div>
            </div>
            
            {messages.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10, x: msg.role === 'ai' ? -10 : 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                key={i} 
                className={`max-w-[85%] relative z-10 ${msg.role === 'ai' ? 'self-start' : 'self-end'}`}
              >
                <div className={`p-3 rounded-sm ${
                  msg.role === 'ai' 
                    ? 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none' 
                    : 'bg-primary/10 border border-primary/30 text-primary glow-box-primary rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
                <div className={`text-[10px] mt-1 opacity-50 ${msg.role === 'ai' ? 'text-left' : 'text-right'}`}>
                  {msg.role === 'ai' ? '01000110' : '01010101'}
                </div>
              </motion.div>
            ))}
            <div ref={endOfMessagesRef} />
          </div>

          <div className="p-4 border-t border-white/10 bg-black">
            <div className="flex flex-wrap gap-2 mb-3">
              {starters.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s.label, s.reply)}
                  className="text-[10px] font-mono px-2 py-1.5 rounded border border-white/10 text-white/60 hover:text-primary hover:border-primary transition-colors bg-white/5 whitespace-nowrap text-left"
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-mono animate-pulse">{'>'}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Initialize protocol..."
                className="w-full bg-white/5 border border-white/10 rounded pl-8 pr-10 py-2.5 text-sm font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-primary/5 transition-all"
              />
              <button 
                onClick={() => handleSend(input)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-primary transition-colors p-1"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
