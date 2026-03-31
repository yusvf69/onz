import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FounderChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai'|'user', text: string}[]>([
    { role: 'ai', text: "I am the Architect. What is your vision?" }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const starters = [
    { label: "Your Philosophy", reply: "Mediocrity is the zero state. We exist to elevate projects to the status of 1—singular, unique, exceptional." },
    { label: "The Process", reply: "We analyze the zero state, map the transformation, and execute with absolute focus." },
    { label: "Future Vision", reply: "The middle ground is dead. Only the exceptional will survive the next digital epoch." }
  ];

  const handleSend = (text: string, predefinedReply?: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: predefinedReply || "Precision requires focus. Let's schedule a formal transmission." 
      }]);
    }, 800);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary text-[#080808] font-mono-custom text-xs font-bold px-4 py-2 border border-primary hover:bg-[#080808] hover:text-primary transition-colors flex items-center gap-2"
        style={{ display: isOpen ? 'none' : 'flex' }}
        data-testid="button-open-chat"
      >
        <span className="w-2 h-2 rounded-full bg-[#080808] animate-pulse"></span>
        INITIATE DIALOGUE
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] bg-[#080808] border-2 border-primary shadow-2xl flex flex-col"
            data-testid="modal-chat"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b-2 border-primary bg-primary text-[#080808]">
              <div className="font-mono-custom text-[11px] font-bold tracking-widest flex items-center gap-2">
                <span className="animate-pulse">_</span> ONZ FOUNDER TERMINAL // LIVE
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#080808] hover:text-white font-mono-custom font-bold" data-testid="button-close-chat">X</button>
            </div>

            {/* Chat Area */}
            <div className="h-[300px] overflow-y-auto p-4 flex flex-col gap-4 bg-[#080808] relative">
              <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none"></div>
              
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 border ${
                    msg.role === 'ai' 
                      ? 'border-primary/50 text-[#FAF7F0] font-editorial italic text-sm bg-primary/5' 
                      : 'border-white/20 text-white font-sans text-xs bg-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t-2 border-primary bg-[#080808]">
              <div className="flex flex-wrap gap-2 mb-3">
                {starters.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s.label, s.reply)}
                    className="text-[9px] font-mono-custom px-2 py-1 border border-primary text-primary hover:bg-primary hover:text-[#080808] transition-colors"
                    data-testid={`button-chat-starter-${i}`}
                  >
                    [{s.label}]
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 border border-white/20 p-1">
                <span className="text-primary font-mono-custom pl-2">{'>'}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  className="w-full bg-transparent font-mono-custom text-xs text-white focus:outline-none p-1"
                  placeholder="TYPE MESSAGE..."
                  data-testid="input-chat"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}