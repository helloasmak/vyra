
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getConciergeResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ConciergeChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Marrakech. I am your Vyra Concierge. How may I assist your journey today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInputValue('');
    setIsLoading(true);

    const aiResponse = await getConciergeResponse(userText);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[150]">
      {/* Bubble Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 gold-gradient text-white rounded-full shadow-[0_30px_60px_rgba(157,111,41,0.4)] flex items-center justify-center relative z-[151] border border-white/20"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-gem'} text-2xl`}></i>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50, x: 20, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, y: 50, x: 20, filter: 'blur(20px)' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-24 right-0 w-[420px] h-[650px] bg-white rounded-[4rem] shadow-[0_100px_200px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border border-gray-100 origin-bottom-right"
          >
            <div className="p-10 bg-luxury-dark text-white flex items-center space-x-6 relative">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
              <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center text-xl shadow-2xl relative z-10 border border-white/10">
                <i className="fas fa-crown text-white"></i>
              </div>
              <div className="relative z-10">
                <h4 className="font-serif text-3xl italic font-light tracking-wide">Digital Liaison</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-black">Online Concierge</p>
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-10 space-y-8 bg-[#fcf9f4]">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] p-6 rounded-[2.5rem] text-sm md:text-base leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-luxury-gold text-white rounded-tr-none font-bold' 
                      : 'bg-white text-luxury-dark rounded-tl-none font-light border border-gray-50'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-5 rounded-full shadow-sm flex items-center space-x-3">
                    <span className="w-2 h-2 bg-luxury-gold rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-luxury-gold rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-luxury-gold rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-10 bg-white border-t border-gray-100 flex items-center space-x-6">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our fleet..."
                className="flex-grow border-none text-[11px] tracking-widest focus:ring-0 text-luxury-dark placeholder-gray-300 font-black uppercase"
              />
              <button 
                onClick={handleSend}
                className="w-14 h-14 gold-gradient text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
