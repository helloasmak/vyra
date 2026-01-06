
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LegalModal: React.FC<{ type: 'privacy' | 'terms' | 'cookies' | null; onClose: () => void }> = ({ type, onClose }) => {
  if (!type) return null;
  const content = {
    privacy: {
      title: 'Privacy Policy',
      text: (
        <div className="space-y-6 text-sm">
          <p className="font-bold">1. Introduction</p>
          <p>Vyra Luxury Marrakech ("we", "our", or "us") is committed to protecting your personal data. This policy explains how we collect and use your information when you use our chauffeur services or visit our website.</p>
          <p className="font-bold">2. Data We Collect</p>
          <p>We collect personal identification information (Name, email address, phone number), travel details (Flight numbers, hotel locations), and payment information required to process your bookings.</p>
          <p className="font-bold">3. How We Use Your Data</p>
          <p>Your data is used solely to process your reservations, provide concierge support, and comply with Moroccan transport regulations. We do not sell your data to third parties.</p>
          <p className="font-bold">4. Data Retention</p>
          <p>We keep your personal information only as long as necessary for legal or business purposes. After this period, data is securely deleted.</p>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      text: (
        <div className="space-y-6 text-sm">
          <p className="font-bold">1. Booking & Cancellation</p>
          <p>Reservations are confirmed upon receipt of booking details. Cancellations made more than 24 hours before service are free of charge. Cancellations within 24 hours may incur a 50% fee. No-shows are billed at 100%.</p>
          <p className="font-bold">2. Passenger Conduct</p>
          <p>Passengers are expected to behave respectfully. Smoking, illegal drug use, and excessive alcohol consumption are prohibited in all vehicles. The chauffeur reserves the right to terminate service if safety is compromised.</p>
          <p className="font-bold">3. Liability</p>
          <p>While we strive for 100% punctuality, we are not liable for delays caused by traffic accidents, flight delays, or extreme weather. Our vehicles are fully insured under Moroccan commercial transport laws.</p>
        </div>
      )
    },
    cookies: {
      title: 'Cookie Policy',
      text: (
        <div className="space-y-6 text-sm">
          <p>This website uses cookies to enhance your experience. By continuing to browse, you agree to our use of cookies.</p>
          <p className="font-bold">Essential Cookies</p>
          <p>Required for basic site functionality, such as navigating between service pages and processing booking inquiries.</p>
          <p className="font-bold">Performance & Analytics</p>
          <p>We use tools like Google Analytics to understand how visitors use our site, which helps us improve our digital concierge services.</p>
          <p className="font-bold">Managing Cookies</p>
          <p>You can disable cookies in your browser settings at any time, though some features of the site may not function correctly.</p>
        </div>
      )
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-luxury-dark/95 backdrop-blur-xl" onClick={onClose}></div>
      <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="relative bg-white w-full max-w-2xl rounded-[3rem] p-12 overflow-y-auto max-h-[80vh] shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-luxury-dark transition-colors"><i className="fas fa-times text-2xl"></i></button>
        <h2 className="font-serif text-4xl text-luxury-dark mb-8 italic">{content[type].title}</h2>
        <div className="text-gray-600 font-light space-y-4 leading-relaxed">
          {content[type].text}
        </div>
        <button onClick={onClose} className="mt-10 gold-gradient text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px]">Close</button>
      </motion.div>
    </motion.div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  onPageChange: (page: string) => void;
  currentPage: string;
}

export const Header: React.FC<{ onPageChange: (page: string) => void; currentPage: string }> = ({ onPageChange, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftLinks = [
    { name: 'Essence', id: 'about' },
    { name: 'Services', id: 'services' },
  ];
  const rightLinks = [
    { name: 'Press', id: 'press' },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (currentPage !== 'home') {
      onPageChange('home');
      setTimeout(() => {
        const target = document.querySelector(`#${id}`);
        if (target) {
            const yOffset = -80;
            const element = target;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
      }, 300);
    } else {
      const target = document.querySelector(`#${id}`);
      if (target) {
        const yOffset = -80;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }
  };

  const isDarkBackground = currentPage !== 'home' || isScrolled;

  return (
    <header className={`fixed w-full z-[100] transition-all duration-700 ${isDarkBackground ? 'glass-effect py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center relative h-20">
          <nav className="hidden lg:flex space-x-12 items-center flex-1 justify-end mr-12">
            {leftLinks.map((link) => (
              <a key={link.id} href="#" onClick={(e) => handleLinkClick(e, link.id)} className={`text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-300 ${isDarkBackground ? 'text-white hover:text-luxury-gold' : 'text-white/80 hover:text-white'}`}>
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="flex-shrink-0 z-[101]">
            <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="block relative">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src="https://zorai.io/wp-content/uploads/2025/12/logo-vyra-luxury-marrakech.png" 
                alt="Vyra" 
                className="h-16 md:h-20 transition-all duration-700 brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
              />
            </a>
          </div>

          <nav className="hidden lg:flex space-x-12 items-center flex-1 justify-start ml-12">
            {rightLinks.map((link) => (
              <a key={link.id} href="#" onClick={(e) => handleLinkClick(e, link.id)} className={`text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-300 ${isDarkBackground ? 'text-white hover:text-luxury-gold' : 'text-white/80 hover:text-white'}`}>
                {link.name}
              </a>
            ))}
            <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('home'); setTimeout(() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="gold-gradient text-white px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-black hover:shadow-[0_0_40px_rgba(157,111,41,0.5)] transition-all transform hover:-translate-y-1">
              Start Journey
            </a>
          </nav>

          <button className="lg:hidden absolute right-0 z-[101] text-2xl text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 w-full h-screen bg-luxury-dark flex flex-col items-center justify-center space-y-12 z-[100]">
            {[...leftLinks, ...rightLinks].map((link) => (
              <a key={link.id} href="#" className="text-4xl font-serif text-white hover:text-luxury-gold tracking-widest italic" onClick={(e) => handleLinkClick(e, link.id)}>{link.name}</a>
            ))}
            <a href="#" className="gold-gradient text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm" onClick={(e) => { e.preventDefault(); onPageChange('home'); setIsMobileMenuOpen(false); setTimeout(() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }), 300); }}>Start Journey</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer: React.FC<{ onPageChange: (page: string) => void }> = ({ onPageChange }) => {
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'cookies' | null>(null);

  const handleSubPage = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-luxury-dark text-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"></div>
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
          {/* Column 1: Brand */}
          <div className="space-y-8">
            <img src="https://zorai.io/wp-content/uploads/2025/12/logo-vyra-luxury-marrakech.png" alt="Vyra" className="h-10 brightness-0 invert" />
            <p className="text-base font-light text-gray-400 leading-relaxed">
              Excellence defined. Vyra Luxury is Marrakech's premier chauffeur and lifestyle concierge service for global travelers.
            </p>
            <div className="flex space-x-6">
              {['instagram', 'facebook-f', 'linkedin-in'].map(social => (
                <a key={social} href="#" className="text-xl text-gray-500 hover:text-luxury-gold transition-all"><i className={`fab fa-${social}`}></i></a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-2xl text-luxury-gold mb-8 italic">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 font-light text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onPageChange('home'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-luxury-gold transition-colors">Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onPageChange('home'); setTimeout(() => document.querySelector('#about')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-luxury-gold transition-colors">Essence</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onPageChange('home'); setTimeout(() => document.querySelector('#services')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-luxury-gold transition-colors">Services</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onPageChange('home'); setTimeout(() => document.querySelector('#booking')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-luxury-gold transition-colors">Start Journey</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-serif text-2xl text-luxury-gold mb-8 italic">Resources</h4>
            <ul className="space-y-4 text-gray-400 font-light text-sm">
              <li><a href="#" onClick={(e) => handleSubPage(e, 'partners')} className="hover:text-luxury-gold transition-colors">Partners</a></li>
              <li><a href="#" onClick={(e) => handleSubPage(e, 'career')} className="hover:text-luxury-gold transition-colors">Careers</a></li>
              <li><a href="#" onClick={(e) => handleSubPage(e, 'faq')} className="hover:text-luxury-gold transition-colors">FAQ</a></li>
              <li><a href="#" onClick={(e) => handleSubPage(e, 'support')} className="hover:text-luxury-gold transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Column 4: Reach Us */}
          <div>
            <h4 className="font-serif text-2xl text-luxury-gold mb-8 italic">Reach Us</h4>
            <ul className="space-y-4 text-gray-400 font-light text-sm">
              <li className="flex items-start"><i className="fas fa-map-marker-alt text-luxury-gold mt-1 mr-4"></i> Marrakech, Morocco</li>
              <li className="flex items-start"><i className="fas fa-phone text-luxury-gold mt-1 mr-4"></i> +212 661 111 525</li>
              <li className="flex items-start"><i className="fas fa-envelope text-luxury-gold mt-1 mr-4"></i> contact@vyra.ma</li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-8 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] tracking-widest uppercase font-bold">
          <p>© {new Date().getFullYear()} Vyra Luxury Marrakech. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <button onClick={() => setLegalType('privacy')} className="hover:text-luxury-gold">Privacy</button>
            <button onClick={() => setLegalType('terms')} className="hover:text-luxury-gold">Terms</button>
            <button onClick={() => setLegalType('cookies')} className="hover:text-luxury-gold">Cookies</button>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {legalType && <LegalModal type={legalType} onClose={() => setLegalType(null)} />}
      </AnimatePresence>
    </>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, onPageChange, currentPage }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onPageChange={onPageChange} currentPage={currentPage} />
      <main className="flex-grow">{children}</main>
      <Footer onPageChange={onPageChange} />
    </div>
  );
};
