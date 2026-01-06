
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import { Layout } from './components/Layout';
import { SERVICES, FAQS, PARTNERS } from './constants';
import { Service } from './types';
import { ConciergeChat } from './components/ConciergeChat';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60 scale-110">
          <source src="https://vyra.ma/herovideo.mov" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-dark/40 to-luxury-dark"></div>
      </motion.div>
      <motion.div style={{ opacity }} className="relative z-10 text-center px-8">
        <div className="mb-6 overflow-hidden">
          <motion.span 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
            className="inline-block text-luxury-gold text-xs tracking-[0.8em] uppercase font-bold"
          >
            Elite Private Transport
          </motion.span>
        </div>
        <h1 className="font-serif text-5xl md:text-8xl mb-12 text-white leading-tight font-light tracking-tight">
          Moroccan Luxury <br/> <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 1.5 }} className="italic font-light">Defined</motion.span>
        </h1>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }} className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <button onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })} className="group relative overflow-hidden bg-luxury-gold text-white px-12 py-5 rounded-full font-black tracking-[0.3em] uppercase text-[10px] transition-all shadow-xl">
            <span className="relative z-10">Start Your Journey</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 opacity-20"></div>
          </button>
          <button onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })} className="text-white text-[10px] uppercase tracking-[0.4em] font-black border-b border-white/20 pb-2 hover:border-luxury-gold transition-all duration-700 hover:text-luxury-gold">Explore Services</button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-luxury-gold/50 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-luxury-gold/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle: string; dark?: boolean }> = ({ title, subtitle, dark }) => (
  <div className="text-center mb-16 space-y-4">
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
      <span className="text-luxury-gold text-[10px] uppercase tracking-[0.6em] font-black block mb-2">{subtitle}</span>
      <h2 className={`font-serif text-3xl md:text-5xl ${dark ? 'text-white' : 'text-luxury-dark'} leading-tight italic font-light`}>
        {title}
      </h2>
    </motion.div>
  </div>
);

const ServiceCard: React.FC<{ service: Service; onOpen: (s: Service) => void }> = ({ service, onOpen }) => (
  <motion.div className="flex-shrink-0 w-[280px] md:w-[380px] group relative h-[450px] md:h-[500px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-luxury-dark border border-white/5 mx-3 md:mx-6">
    <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] ease-out" />
    <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/10 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
      <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 md:mb-4 italic font-light tracking-tight group-hover:text-luxury-gold transition-colors">{service.title}</h3>
      <p className="text-gray-400 font-light mb-6 md:mb-8 opacity-0 group-hover:opacity-100 transition-all duration-1000 text-[10px] md:text-xs tracking-widest leading-relaxed line-clamp-3 transform translate-y-4 group-hover:translate-y-0">
        {service.shortDesc}
      </p>
      <button onClick={() => onOpen(service)} className="text-luxury-gold text-[9px] uppercase tracking-[0.4em] font-black group-hover:text-white transition-all flex items-center gap-3">
        View Details <i className="fas fa-arrow-right transition-transform group-hover:translate-x-2"></i>
      </button>
    </div>
  </motion.div>
);

const InfiniteServicesSlider: React.FC<{ onOpen: (s: Service) => void }> = ({ onOpen }) => {
  const x = useMotionValue(0);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const duplicatedServices = [...SERVICES, ...SERVICES, ...SERVICES];
  
  const calculateWidth = () => {
    const cardWidth = window.innerWidth > 768 ? 380 : 280;
    const margin = window.innerWidth > 768 ? 48 : 24;
    return cardWidth + margin;
  };

  useEffect(() => {
    const itemWidth = calculateWidth();
    const totalWidth = SERVICES.length * itemWidth;
    x.set(-totalWidth); 
    setDragConstraints({ left: -totalWidth * 2, right: 0 });
  }, [x]);

  const handleDragEnd = () => {
    const itemWidth = calculateWidth();
    const totalWidth = SERVICES.length * itemWidth;
    const currentX = x.get();

    if (currentX > -itemWidth) {
      x.set(currentX - totalWidth);
    } else if (currentX < -(totalWidth * 2 - itemWidth)) {
      x.set(currentX + totalWidth);
    }
  };

  return (
    <div className="relative mt-4 overflow-hidden py-10">
      <motion.div 
        ref={containerRef}
        style={{ x }}
        drag="x"
        dragConstraints={dragConstraints}
        onDragEnd={handleDragEnd}
        className="flex cursor-grab active:cursor-grabbing px-6 md:px-8"
      >
        {duplicatedServices.map((s, idx) => (
          <ServiceCard key={`${s.id}-${idx}`} service={s} onOpen={onOpen} />
        ))}
      </motion.div>
      <div className="container mx-auto px-12 mt-8 text-white/10 text-[8px] tracking-[0.8em] uppercase font-black flex items-center justify-center gap-8">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white/10"></div>
        <div className="flex items-center gap-4 text-luxury-gold/40">
          <i className="fas fa-arrows-left-right animate-pulse"></i>
          <span>Swipe Collection</span>
        </div>
        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-white/10"></div>
      </div>
    </div>
  );
};

const PartnersPage = () => (
  <div className="pt-32 pb-24 bg-luxury-beige min-h-screen">
    <div className="container mx-auto px-8">
      {/* Hero Section */}
      <div className="text-center mb-24 max-w-4xl mx-auto space-y-6">
        <span className="text-luxury-gold text-xs uppercase tracking-[0.6em] font-black block">Partnership Program</span>
        <h1 className="font-serif text-5xl md:text-7xl text-luxury-dark italic font-light leading-none">Become a Vyra Luxury Partner</h1>
        <p className="text-xl md:text-2xl text-gray-500 font-light italic">"Elegance in Motion" – For Your Most Discerning Clients</p>
        <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          Join our exclusive network of travel agencies, event planners, and corporate partners. Elevate your Moroccan itineraries with seamless luxury transportation that matches your commitment to excellence.
        </p>
        <div className="pt-8">
          <button onClick={() => document.querySelector('#partner-form')?.scrollIntoView({ behavior: 'smooth' })} className="gold-gradient text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl">Apply for Partnership</button>
        </div>
      </div>

      {/* Why Partner Section */}
      <div className="mb-32">
        <SectionHeader title="Why Partner With Vyra?" subtitle="Benefits" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Dedicated Partnership Manager", desc: "Your single point of contact for all bookings, requests, and support. We become an extension of your team in Morocco." },
            { title: "Competitive Net Rates", desc: "Access exclusive partner pricing with attractive margins. Transparent billing and consolidated monthly invoicing." },
            { title: "Enhanced Client Satisfaction", desc: "Impress your clients with flawless execution. The first and last impression of their Moroccan journey will be unforgettable." },
            { title: "Risk-Free Execution", desc: "24/7 support, flight monitoring, and backup vehicles. We handle all contingencies so you can promise with confidence." },
            { title: "Diverse Luxury Fleet", desc: "From Mercedes sedans to executive vans, we have the perfect vehicle for every client need and group size." },
            { title: "Nationwide Coverage", desc: "Serve clients throughout Morocco – from Marrakech to Casablanca, Fez to Essaouira, and everywhere in between." }
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50 hover:shadow-luxury-gold/5 transition-all">
              <h3 className="font-serif text-2xl text-luxury-dark mb-4 italic font-light leading-tight">{item.title}</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it Works Section */}
      <div className="mb-32">
        <SectionHeader title="How Our Partnership Works" subtitle="Process" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: 1, title: "Apply Online", desc: "Complete our partnership application form below. We'll review your agency profile within 48 hours." },
            { step: 2, title: "Welcome Call", desc: "We'll schedule a brief introductory call to understand your needs and explain our partnership framework." },
            { step: 3, title: "Access Portal", desc: "Receive login credentials to our partner portal for real-time quotes, bookings, and account management." },
            { step: 4, title: "Start Booking", desc: "Begin referring clients and enjoying seamless, reliable luxury transportation for all your Moroccan itineraries." }
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-6">{item.step}</div>
              <h3 className="font-serif text-2xl text-luxury-dark italic font-light">{item.title}</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ideal Partners Section */}
      <div className="mb-32 bg-luxury-dark rounded-[4rem] p-16 md:p-24 text-white">
        <SectionHeader title="Ideal Partners" subtitle="Collaboration" dark />
        <p className="text-center text-gray-400 font-light text-lg mb-16">We partner with industry leaders who share our commitment to excellence</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            { title: "Luxury DMCs", desc: "Destination Management Companies creating bespoke Moroccan itineraries for high-net-worth travelers." },
            { title: "Wedding Planners", desc: "Specialists in destination weddings and luxury events requiring elegant guest transportation." },
            { title: "Corporate Travel Agencies", desc: "Providing executive transportation for business meetings, conferences, and incentive trips." },
            { title: "Luxury Hotels & Resorts", desc: "Five-star properties seeking premium transportation partners for their discerning guests." },
            { title: "Golf Tour Operators", desc: "Specialists in golf tourism requiring secure club transportation and multi-course itineraries." },
            { title: "Incentive Houses", desc: "Organizers of premium incentive trips and corporate rewards requiring group transportation." }
          ].map((item, i) => (
            <div key={i} className="space-y-4">
              <h3 className="font-serif text-2xl text-luxury-gold italic font-light">{item.title}</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form Section - Redesigned for Elegance */}
      <div id="partner-form" className="py-24 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-luxury-gold text-[10px] uppercase tracking-[0.6em] font-black block mb-4">Official Inquiry</span>
          <h2 className="font-serif text-4xl md:text-6xl text-luxury-dark italic font-light">Partnership Application</h2>
        </div>
        
        <form className="space-y-20" onSubmit={(e) => { e.preventDefault(); alert("Application transmitted to contact@vyra.ma. Our partnership manager will be in touch within 48 hours."); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <div className="relative group border-b border-luxury-dark/10 focus-within:border-luxury-gold transition-colors">
              <input required type="text" placeholder="AGENCY NAME" className="bg-transparent py-4 outline-none text-[11px] tracking-widest font-black uppercase text-luxury-dark w-full placeholder-luxury-dark/20 focus:placeholder-luxury-gold transition-all" />
            </div>
            <div className="relative group border-b border-luxury-dark/10 focus-within:border-luxury-gold transition-colors">
              <input required type="text" placeholder="LEGAL REPRESENTATIVE" className="bg-transparent py-4 outline-none text-[11px] tracking-widest font-black uppercase text-luxury-dark w-full placeholder-luxury-dark/20 focus:placeholder-luxury-gold transition-all" />
            </div>
            <div className="relative group border-b border-luxury-dark/10 focus-within:border-luxury-gold transition-colors">
              <input required type="email" placeholder="BUSINESS EMAIL" className="bg-transparent py-4 outline-none text-[11px] tracking-widest font-black uppercase text-luxury-dark w-full placeholder-luxury-dark/20 focus:placeholder-luxury-gold transition-all" />
            </div>
            <div className="relative group border-b border-luxury-dark/10 focus-within:border-luxury-gold transition-colors">
              <select className="bg-transparent py-4 outline-none text-[11px] tracking-widest font-black uppercase text-luxury-dark w-full appearance-none cursor-pointer">
                <option disabled selected>PARTNERSHIP TYPE</option>
                <option>Luxury DMC</option>
                <option>Wedding Planner</option>
                <option>Corporate Agency</option>
                <option>Luxury Hotel</option>
                <option>Golf Tour Operator</option>
                <option>Incentive House</option>
              </select>
              <i className="fas fa-chevron-down absolute right-0 bottom-6 text-luxury-dark/20 pointer-events-none text-[8px]"></i>
            </div>
          </div>
          <div className="relative group border-b border-luxury-dark/10 focus-within:border-luxury-gold transition-colors">
            <textarea placeholder="DESCRIBE YOUR PORTFOLIO AND EXPECTED VOLUME" className="bg-transparent py-4 outline-none text-[11px] tracking-widest font-black uppercase text-luxury-dark w-full h-32 resize-none placeholder-luxury-dark/20 focus:placeholder-luxury-gold transition-all"></textarea>
          </div>
          
          <div className="flex flex-col items-center gap-8">
            <button type="submit" className="group relative gold-gradient text-white px-20 py-8 rounded-full font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:scale-105 transition-all overflow-hidden">
              <span className="relative z-10">Transmit Application</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-1000 opacity-20"></div>
            </button>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] flex items-center gap-3">
              <i className="fas fa-shield-alt text-luxury-gold"></i>
              Secure Official Channel
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
);

// Reuse the other subpages with refined styles
const FAQPage = () => (
  <div className="pt-40 pb-24 bg-luxury-beige min-h-screen">
    <div className="container mx-auto px-8 max-w-4xl">
      <SectionHeader title="Guest Information" subtitle="Liaison FAQ" />
      <div className="space-y-8 mt-16">
        {FAQS.map((f, i) => (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-gray-50 group hover:border-luxury-gold/30 transition-colors">
            <h3 className="font-serif text-2xl text-luxury-dark mb-6 italic font-light tracking-tight leading-tight">{f.question}</h3>
            <p className="text-gray-500 font-light leading-relaxed text-sm tracking-wide">{f.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const CareerPage = () => (
  <div className="pt-40 pb-24 bg-luxury-beige min-h-screen">
    <div className="container mx-auto px-8 text-center max-w-5xl">
      <SectionHeader title="Join the Elite" subtitle="Careers at Vyra" />
      <div className="bg-white p-16 md:p-24 rounded-[4rem] shadow-2xl mt-16 text-left space-y-12 border border-gray-100 relative overflow-hidden">
        <div className="space-y-6 max-w-3xl">
          <h3 className="font-serif text-4xl text-luxury-dark italic font-light leading-none">Excellence as a Vocation</h3>
          <p className="text-lg text-gray-400 font-light leading-relaxed">Vyra is built on pillars of discretion. We are seeking elite chauffeurs and logistics experts who understand that luxury is a form of service.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-gray-100">
          {['Executive Chauffeur', 'Liaison Specialist', 'Operations Bureau', 'Fleet Manager'].map(pos => (
            <div key={pos} className="group flex items-center justify-between p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:border-luxury-gold transition-all duration-700">
              <span className="font-black text-[10px] uppercase tracking-[0.4em] text-luxury-dark">{pos}</span>
              <a href="mailto:hr@vyra.ma" className="text-luxury-gold text-[9px] font-black border-b border-luxury-gold/30 group-hover:border-luxury-gold transition-all tracking-[0.2em] uppercase">Apply</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SupportPage = () => (
  <div className="pt-40 pb-24 bg-luxury-beige min-h-screen">
    <div className="container mx-auto px-8 max-w-5xl text-center">
      <SectionHeader title="Digital Bureau" subtitle="Support Center" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {[
          { icon: 'fas fa-phone', title: 'Voice', detail: '+212 661 111 525', sub: '24/7 Priority' },
          { icon: 'fab fa-whatsapp', title: 'WhatsApp', detail: 'Instant Liaison', sub: 'Direct updates', link: 'https://wa.me/212661111525' },
          { icon: 'fas fa-envelope', title: 'Digital', detail: 'contact@vyra.ma', sub: 'Private Response' }
        ].map((item, i) => (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-50 flex flex-col items-center gap-8 group hover:translate-y-[-5px] transition-all duration-700">
            <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center text-white text-2xl shadow-xl"><i className={`${item.icon}`}></i></div>
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-luxury-dark italic font-light tracking-tight">{item.title}</h3>
              <p className="text-gray-500 font-medium text-base tracking-wide">{item.detail}</p>
            </div>
            {item.link ? (
              <a href={item.link} target="_blank" className="text-[9px] uppercase tracking-[0.6em] text-luxury-gold font-black border-b border-luxury-gold/30 hover:border-luxury-gold transition-all pb-2">Connect</a>
            ) : (
              <p className="text-[9px] uppercase tracking-[0.6em] text-luxury-gold font-black">{item.sub}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleModalBooking = () => {
    setSelectedService(null);
    setCurrentPage('home');
    setTimeout(() => {
      const target = document.querySelector('#booking');
      if (target) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 500);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'partners': return <PartnersPage />;
      case 'faq': return <FAQPage />;
      case 'career': return <CareerPage />;
      case 'support': return <SupportPage />;
      default: return (
        <>
          <Hero />
          
          <section id="about" className="py-40 bg-luxury-beige">
            <div className="container mx-auto px-8 flex flex-col lg:flex-row items-center gap-24">
              <div className="lg:w-1/2 relative group">
                <motion.div 
                  initial={{ opacity: 0, x: -60 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-[4rem] overflow-hidden shadow-2xl"
                >
                  <img src="https://www.travelandleisure.com/thmb/4M7bBFREiCtClwdRQx-cQrEW5ZE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-blacklane-rolls-royce-service-BLACKLANEROLLS0725-5c7f0bf648f344fdb69c0f0ab8b3ca29.jpg" alt="Fleet" className="w-full h-full object-cover" />
                </motion.div>
                <div className="absolute -bottom-12 -right-12 w-48 h-48 gold-gradient rounded-full blur-[100px] opacity-10 -z-10"></div>
              </div>
              <div className="lg:w-1/2 space-y-12">
                <div>
                  <span className="text-luxury-gold font-bold uppercase tracking-[0.8em] text-[10px]">Essence of Excellence</span>
                  <h2 className="font-serif text-5xl md:text-7xl text-luxury-dark leading-none mt-8 italic font-light">
                    Moroccan Luxury <br/> <span className="not-italic font-bold tracking-tight">Standard</span>
                  </h2>
                </div>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-xl">
                  Vyra is the definitive choice for global travelers seeking absolute tranquility and military precision in the heart of Marrakech.
                </p>
                <div className="grid grid-cols-2 gap-12 pt-12 border-t border-gray-100">
                  <div className="space-y-4">
                    <h4 className="font-serif text-3xl text-luxury-dark font-light italic tracking-tight">Reliable</h4>
                    <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300 font-black">Private Bureau</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-serif text-3xl text-luxury-dark font-light italic tracking-tight">Discrete</h4>
                    <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300 font-black">VIP Protocol</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="py-40 bg-luxury-dark relative overflow-hidden">
            <div className="container mx-auto px-8 relative z-10">
              <SectionHeader title="Service Collection" subtitle="Curated Travel" dark />
            </div>
            <InfiniteServicesSlider onOpen={setSelectedService} />
          </section>

          <section id="press" className="py-32 bg-luxury-dark text-white border-t border-white/5 relative">
            <div className="container mx-auto px-8 relative z-10">
              <SectionHeader title="Global Acclaim" subtitle="Media Portfolio" dark />
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Cond%C3%A9_Nast_Traveler_logo.png" alt="Condé Nast" className="h-4 md:h-6 invert" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Travel_%2B_Leisure_Co._logo.png" alt="Travel + Leisure" className="h-4 md:h-6 invert" />
                 <img src="https://www.nicepng.com/png/full/42-423482_forbes-logo-forbes-logo-png-transparent.png" alt="Forbes" className="h-4 md:h-6 invert" />
                 <img src="https://s3.us-east-1.amazonaws.com/publicdesign.qtxasset.com/Branding+Portal/Travel/LTA/Logo/New+-+2025/LTA+Color+Logo.png" alt="Luxury Travel Advisor" className="h-4 md:h-6 invert" />
              </div>
            </div>
          </section>

          <section id="booking" className="py-40 bg-luxury-dark relative overflow-hidden">
            <div className="container mx-auto px-8 relative z-10">
              <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-24">
                <div className="lg:w-[45%] text-white space-y-12">
                  <h2 className="font-serif text-5xl md:text-7xl italic font-light leading-none tracking-tight">Begin <br/> <span className="not-italic font-black">Your Journey</span></h2>
                  <p className="text-lg font-light opacity-60 leading-relaxed tracking-wide">
                    Our concierge bureau is standing by to curate your Moroccan experience. Anticipate a bespoke liaison within 15 minutes of your transmission to <span className="text-luxury-gold">contact@vyra.ma</span>.
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center"><i className="fas fa-lock text-luxury-gold"></i></div>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Secure Transmission</span>
                  </div>
                </div>
                <div className="lg:w-[55%] w-full">
                  <form className="space-y-16" onSubmit={(e) => { e.preventDefault(); alert("Transmission successful. A liaison will contact you from contact@vyra.ma shortly."); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="relative border-b border-white/10 group">
                        <input required type="text" className="w-full bg-transparent py-6 text-[11px] tracking-[0.4em] outline-none text-white font-black uppercase placeholder-white/20 focus:placeholder-luxury-gold transition-all" placeholder="FULL NAME" />
                      </div>
                      <div className="relative border-b border-white/10 group">
                        <input required type="email" className="w-full bg-transparent py-6 text-[11px] tracking-[0.4em] outline-none text-white font-black uppercase placeholder-white/20 focus:placeholder-luxury-gold transition-all" placeholder="EMAIL ADDRESS" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="relative border-b border-white/10 group">
                        <select className="w-full bg-transparent py-6 text-[11px] tracking-[0.4em] outline-none text-white font-black uppercase appearance-none cursor-pointer">
                          <option disabled selected className="text-black">SERVICE TYPE</option>
                          {SERVICES.map(s => <option key={s.id} className="text-black">{s.title}</option>)}
                          <option className="text-black">BESPOKE CONCIERGE</option>
                        </select>
                        <i className="fas fa-chevron-down absolute right-0 bottom-8 text-white/20 pointer-events-none text-[8px]"></i>
                      </div>
                      <div className="relative border-b border-white/10 group">
                        <input type="text" className="w-full bg-transparent py-6 text-[11px] tracking-[0.4em] outline-none text-white font-black uppercase placeholder-white/20" onFocus={(e) => e.target.type = 'date'} placeholder="REQUESTED DATE" />
                      </div>
                    </div>
                    <div className="relative border-b border-white/10 group">
                      <textarea placeholder="ADDITIONAL LIAISON NOTES" className="w-full bg-transparent py-6 text-[11px] tracking-[0.4em] outline-none text-white font-black uppercase resize-none h-32 placeholder-white/20"></textarea>
                    </div>
                    <button type="submit" className="group w-full gold-gradient text-white font-black py-8 rounded-[2rem] text-[10px] tracking-[0.5em] uppercase shadow-2xl hover:scale-[1.02] transition-all relative overflow-hidden">
                      <span className="relative z-10">Transmit Request</span>
                      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-1000 opacity-20"></div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
  };

  return (
    <Layout onPageChange={setCurrentPage} currentPage={currentPage}>
      <AnimatePresence mode="wait">
        <motion.div key={currentPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          {renderContent()}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
            <div className="absolute inset-0 bg-luxury-dark/98 backdrop-blur-3xl" onClick={() => setSelectedService(null)}></div>
            <motion.div 
              initial={{ scale: 0.9, y: 50, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.9, y: 50, opacity: 0 }} 
              transition={{ type: "spring", damping: 30, stiffness: 150 }}
              className="relative bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh] lg:max-h-none lg:h-auto"
            >
              <div className="lg:w-1/2 overflow-hidden relative min-h-[300px] lg:min-h-0">
                <img src={selectedService.image} alt="Service" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/40 to-transparent lg:hidden"></div>
              </div>
              <div className="lg:w-1/2 p-8 md:p-16 lg:p-20 overflow-y-auto">
                <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 lg:top-12 lg:right-12 text-gray-300 text-3xl hover:text-luxury-dark transition-all duration-500"><i className="fas fa-times"></i></button>
                <span className="text-luxury-gold text-[10px] font-black tracking-[0.6em] uppercase mb-6 block">Exclusive Detail</span>
                <h3 className="font-serif text-3xl md:text-5xl mb-8 italic font-light tracking-tight text-luxury-dark leading-none">{selectedService.title}</h3>
                <p className="text-base md:text-lg text-gray-400 mb-10 font-light leading-relaxed max-w-xl">{selectedService.fullDesc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
                  {selectedService.features.map((f, i) => (
                    <div key={i} className="flex items-center text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
                      <div className="w-6 h-6 rounded-full gold-gradient opacity-10 flex items-center justify-center mr-3">
                        <i className="fas fa-gem text-[7px] text-white"></i>
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <button onClick={handleModalBooking} className="group w-full gold-gradient text-white py-6 rounded-2xl font-black uppercase tracking-[0.5em] text-[9px] shadow-2xl transition-all relative overflow-hidden">
                  <span className="relative z-10">Book Experience</span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-1000 opacity-20"></div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ConciergeChat />
    </Layout>
  );
};

export default App;
