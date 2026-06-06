import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Instagram, 
  Scissors, 
  Heart, 
  Star, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

import { TREATMENTS, FAQS } from './data';
import SkinQuiz from './components/SkinQuiz';
import BookingCalendar from './components/BookingCalendar';
import StatsReviews from './components/StatsReviews';

import logoImg from './assets/images/vegari_logo_1780765486878.png';
import heroImg from './assets/images/vegari_skincare_hero_1780665620153.png';
import nailArtImg from './assets/images/vegari_nail_art_1780665637647.png';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [expandedTreatments, setExpandedTreatments] = useState<Record<string, boolean>>({});

  const toggleTreatment = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setExpandedTreatments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'facial', label: 'Especial Facial' },
    { id: 'corporal', label: 'Corporal' },
    { id: 'novias', label: 'Especial Novias 👰' },
    { id: 'uñas', label: 'Manicura & Pedicura' }
  ];

  const filteredTreatments = selectedCategory === 'todos' 
    ? TREATMENTS 
    : TREATMENTS.filter(t => t.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Pre-configured reservation/question message
  const handleQuickContact = (interest: string) => {
    const message = `¡Hola Carmen! Vengo de vuestra Landing Page y me interesa mucho: *${interest}*. Me gustaría recibir más detalles sobre horarios y precios. ✨`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/34626805053?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-luxury-100 text-luxury-900 font-sans selection:bg-gold-200 selection:text-gold-900 overflow-x-hidden">
      
      {/* Premium Notification Ribbon */}
      <div className="bg-luxury-950 text-gold-200 text-[11px] font-mono uppercase tracking-widest py-2 px-4 text-center border-b border-gold-900/15 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
        <span>⭐️ 20 Años cuidando tu piel en Ciudad Real • Carmen, Estética de Confianza</span>
      </div>

      {/* Navigation Header */}
      <header className={`sticky top-0 z-50 bg-luxury-100/90 backdrop-blur-md border-b border-gold-200/30 transition-all duration-300 ${scrolled ? 'h-16 shadow-md' : 'h-24 md:h-28'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Brand/Logo Layout */}
          <a href="#" className="flex items-center gap-3 select-none group">
            <img 
              src={logoImg} 
              alt="Logo Vegari" 
              className={`rounded-full border border-gold-400/50 shadow-sm transition-all duration-300 group-hover:scale-105 ${scrolled ? 'w-10 h-10' : 'w-16 h-16 md:w-20 md:h-20'}`}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className={`font-serif font-bold tracking-[0.15em] text-luxury-900 group-hover:text-gold-600 transition-all duration-300 uppercase ${scrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl md:text-3xl'}`}>
                Vegari
              </span>
              <span className={`font-mono uppercase tracking-[0.15em] text-gold-600 font-semibold transition-all duration-300 ${scrolled ? 'text-[8px] -mt-1' : 'text-[9px] sm:text-[10px] -mt-0.5'}`}>
                Estética Profesional
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-luxury-700">
            <a href="#tratamientos" className="hover:text-gold-600 transition-colors">Tratamientos</a>
            <a href="#diagnostico" className="hover:text-gold-600 transition-colors">Test de Piel</a>
            <a href="#experiencia" className="hover:text-gold-600 transition-colors">Por Qué Vegari</a>
            <a href="#reservas" className="hover:text-gold-600 transition-colors">Agendar Cita</a>
            <a href="#faq" className="hover:text-gold-600 transition-colors">Preguntas</a>
            <a href="#ubicacion" className="hover:text-gold-600 transition-colors">Contacto</a>
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+34626805053" 
              className="text-sm font-semibold flex items-center gap-1.5 text-luxury-800 hover:text-gold-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold-500" />
              626 805 053
            </a>
            <a
              href="#reservas"
              className="bg-luxury-900 hover:bg-gold-600 text-white hover:text-luxury-950 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-[0.98] animate-shine"
            >
              Reservar Online
            </a>
          </div>

          {/* Mobile Menu Icon (Supports minimum 48px tactile touch size) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-3 -mr-3 text-luxury-900 focus:outline-none min-w-[48px] min-h-[48px] flex items-center justify-center cursor-pointer select-none"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gold-600" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer (Bottom Sheet) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Elegant dark blurred backdrop overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-luxury-950/70 backdrop-blur-md z-50 md:hidden"
              />
              
              {/* Bottom Sheet Panel Container */}
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 240 }}
                className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-luxury-100 rounded-t-[2.5rem] border-t border-gold-400/30 shadow-[0_-12px_45px_rgba(0,0,0,0.22)] z-50 p-6 pb-24 flex flex-col md:hidden overflow-hidden"
              >
                {/* Decorative Pill Pull handler */}
                <div className="w-16 h-1.5 bg-gold-300/60 rounded-full mx-auto mb-6 shrink-0" />
                
                {/* Header inside the bottom sheet */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-luxury-900 tracking-[0.12em] text-xl uppercase">VEGARI</span>
                    <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-gold-600 font-bold">Carmen, Estética de Confianza</span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-luxury-900 cursor-pointer border border-gold-200/50 shadow-sm active:scale-90 transition-transform"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5 text-luxury-900" />
                  </button>
                </div>

                {/* List of Navigation Actions with great touch targets (minimum 48px height) */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-4">
                  {[
                    { href: '#tratamientos', label: 'Carta de Tratamientos', desc: 'Limpieza de 10, corporales, novias y uñas' },
                    { href: '#diagnostico', label: 'Test Diagnóstico de Piel', desc: 'Descubre qué necesita tu cutis en 3 minutos' },
                    { href: '#experiencia', label: '¿Por Qué Elegir Vegari?', desc: '20 años de rigor y mimo en Ciudad Real' },
                    { href: '#reservas', label: 'Agendar Cita en Directo', desc: 'Prepara tu próximo momento de cuidado' },
                    { href: '#faq', label: 'Preguntas Frecuentes', desc: 'Aparatología, cabina y Farmasi al detalle' },
                    { href: '#ubicacion', label: 'Cómo Llegar y Horario', desc: 'C. Huertos, 6, Ciudad Real' }
                  ].map((item, idx) => (
                    <motion.a 
                      key={idx}
                      href={item.href} 
                      onClick={() => setMobileMenuOpen(false)} 
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between p-4 bg-white hover:bg-gold-50/20 border border-gold-200/30 rounded-2xl transition-all shadow-sm min-h-[52px] select-none"
                    >
                      <div className="pr-4">
                        <h4 className="font-sans font-bold text-xs sm:text-sm text-luxury-900">{item.label}</h4>
                        <p className="text-[10px] sm:text-xs text-gray-400 font-light mt-0.5">{item.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gold-500 shrink-0" />
                    </motion.a>
                  ))}
                </div>

                {/* Fast Touch Core Actions for the Thumb Zone */}
                <div className="space-y-3 pt-4 border-t border-gold-200/40 shrink-0 select-none">
                  <motion.a 
                    whileTap={{ scale: 0.96 }}
                    href="tel:+34626805053" 
                    className="w-full bg-white text-luxury-900 py-3.5 rounded-2xl text-center flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold border border-gold-200 min-h-[48px] shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-gold-600" />
                    Llamar al Centro 626 805 053
                  </motion.a>
                  
                  <motion.a 
                    whileTap={{ scale: 0.96 }}
                    href="#reservas" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full bg-luxury-900 hover:bg-gold-600 text-white hover:text-luxury-950 py-4 rounded-xl text-center font-bold uppercase tracking-wider text-xs min-h-[48px] flex items-center justify-center shadow-lg animate-shine"
                  >
                    <span>Agendar Cita Online</span>
                  </motion.a>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-200 text-gold-800 text-xs font-semibold tracking-wider uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                Estética Avanzada de Confianza en Ciudad Real
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-luxury-900 tracking-tight leading-[1.1]">
                Piel joven, <br className="hidden sm:inline" />
                <span className="italic text-gold-700">firme y cuidada</span> al detalle
              </h1>

              <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Disfruta de una sublime atención personalizada y un compromiso total con la <strong className="font-semibold text-luxury-900 text-bold bg-gold-100/80 px-1 rounded">Limpieza y Profesionalidad de 10</strong>. Liderada por Carmen, con más de 20 años de excelencia e innovación estética.
              </p>

              {/* Social proof rating widget */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gold-300 flex items-center justify-center text-xs font-bold text-luxury-950">IG</div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-luxury-900 flex items-center justify-center text-xs font-bold text-white">★</div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gold-400 flex items-center justify-center text-xs font-bold text-luxury-950">20y</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-0.5 text-gold-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-luxury-900 font-bold ml-1.5 text-sm">5.0 / 5.0</span>
                  </div>
                  <p className="text-xs text-gray-500">Consensuado por 23+ valoraciones impecables de Google Maps</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4">
                <a
                  href="#reservas"
                  className="w-full sm:w-auto bg-luxury-900 hover:bg-gold-600 text-white hover:text-luxury-950 text-center px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-lg hover:shadow-gold-300/30 cursor-pointer active:scale-[0.99]"
                >
                  Reservar Cita Online
                </a>
                <a
                  href="#tratamientos"
                  className="w-full sm:w-auto bg-white border border-gold-200 hover:border-gold-300 text-luxury-800 text-center px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:bg-gold-50/20 cursor-pointer"
                >
                  Explorar Tratamientos
                </a>
              </div>
            </div>

            {/* Hero Right Visuals */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                {/* Visual Accent cards / badges */}
                <div className="absolute -left-6 top-1/4 z-20 bg-white/95 backdrop-blur border border-gold-100 p-4 rounded-2xl shadow-xl max-w-[190px] hidden sm:block transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-xs">A</div>
                    <div>
                      <h4 className="font-bold text-xs">Carmen Estética</h4>
                      <p className="text-[10px] text-gray-500">Especialista de Cabina</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-2 font-serif italic">
                    "20 años cuidando novias al detalle"
                  </p>
                </div>

                <div className="absolute -right-4 bottom-8 z-20 bg-luxury-950 text-white p-4 rounded-2xl shadow-xl max-w-[200px] hidden sm:block transform rotate-2 hover:rotate-0 transition-transform border border-luxury-800">
                  <div className="text-xs font-bold text-gold-300 uppercase tracking-widest mb-1 font-mono">HIGIENE CERTIFICADA</div>
                  <h4 className="font-serif font-bold text-sm">Limpieza de Diez</h4>
                  <p className="text-[11px] text-gray-400 mt-1">Esterilización de grado médico para cada tratamiento de uñas y de cabina.</p>
                </div>

                {/* Main Hero Image */}
                <div className="aspect-[4/3] sm:aspect-[16:9] lg:aspect-[4/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative bg-luxury-200">
                  <img 
                    src={heroImg} 
                    alt="VEGARI Tratamientos Faciales Premium"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/45 via-transparent to-transparent"></div>
                </div>

                {/* Decorative background circle blurs */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold-200/40 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-rose-200/35 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Treatments Panel & Filter (Interactive Treatment Grid) */}
      <section id="tratamientos" className="py-20 bg-white border-y border-gold-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-gold-600 font-bold bg-gold-100 px-3 py-1 rounded-full">Nuestra Carta de Servicios</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-900 tracking-tight">
              Tratamientos Diseñados Con <span className="italic text-gold-700">Pasión y Rigor</span>
            </h2>
            <p className="text-gray-500 font-light text-sm sm:text-base">
              Higiene exhaustiva, aparatología avanzada y principios activos Farmasi. Selecciona un área para filtrar nuestros tratamientos estrella.
            </p>

            {/* Interactive Filters Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4 select-none">
              {categories.map((cat) => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  id={`cat-tab-${cat.id}`}
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer min-h-[48px] flex items-center justify-center ${
                    selectedCategory === cat.id
                      ? 'bg-luxury-900 text-white shadow-lg border border-luxury-900'
                      : 'bg-white hover:bg-gold-50/50 border border-gold-200/50 text-luxury-700 hover:text-luxury-950 shadow-sm'
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Treatment Cards Grid */}
          <div id="treatments-grid-wrapper" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTreatments.map((treatment) => {
                const isExpanded = !!expandedTreatments[treatment.id];
                return (
                  <motion.div
                    key={treatment.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/70 backdrop-blur-md rounded-none md:rounded-3xl overflow-hidden border border-gold-200/50 flex flex-col justify-between group hover:border-gold-400/[0.6] hover:shadow-[0_15px_45px_rgba(186,130,107,0.07)] hover:translate-y-0 md:hover:-translate-y-1.5 transition-all duration-300 relative"
                  >
                    {treatment.popular && (
                      <div className="absolute top-3.5 right-3.5 z-20 bg-gold-400 text-luxury-950 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
                        Recomendado
                      </div>
                    )}

                    <div>
                      {/* Hover scalable treatment image */}
                      <div className="aspect-[4/3] overflow-hidden relative bg-luxury-200">
                        <img 
                          src={treatment.imageUrl} 
                          alt={treatment.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gold-50/10 via-transparent to-transparent"></div>
                      </div>

                      <div className="p-6 space-y-3.5">
                        <div className="flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider text-gold-600">
                          <span>{treatment.category}</span>
                          <span>{treatment.duration}</span>
                        </div>
                        
                        <h3 className="text-xl font-serif font-bold text-luxury-900 group-hover:text-gold-700 transition-colors">
                          {treatment.name}
                        </h3>

                        {/* Botón para expandir/colapsar detalles en móvil (min-h-[48px] target) */}
                        <button
                          onClick={(e) => toggleTreatment(treatment.id, e)}
                          className="md:hidden w-full flex items-center justify-between border border-gold-200/80 hover:border-gold-300/60 bg-white/75 py-3 px-4 rounded-xl text-xs font-bold text-luxury-800 tracking-wide mt-2 cursor-pointer select-none min-h-[48px] transition-colors shadow-sm"
                        >
                          <span>{isExpanded ? 'Ocultar detalles' : 'Ver de qué trata'}</span>
                          <ChevronDown className={`w-4 h-4 text-gold-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Detalles: siempre visible en desktop */}
                        <div className="hidden md:block space-y-3.5">
                          <p className="text-xs text-gray-500 leading-relaxed font-light">
                            {treatment.description}
                          </p>

                          {/* Benefits bullets list */}
                          <ul className="space-y-1.5 pt-3.5 border-t border-gold-200/30">
                            {treatment.features.map((feature, index) => (
                              <li key={index} className="text-xs text-gray-600 flex items-start gap-1.5">
                                <span className="text-gold-500 shrink-0 select-none">✦</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Detalles: colapsable en móvil */}
                        <div className="md:hidden block">
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden space-y-3.5 text-left"
                              >
                                <p className="text-xs text-gray-500 leading-relaxed font-light pt-2">
                                  {treatment.description}
                                </p>

                                {/* Benefits bullets list */}
                                <ul className="space-y-1.5 pt-3.5 border-t border-gold-200/30">
                                  {treatment.features.map((feature, index) => (
                                    <li key={index} className="text-xs text-gray-600 flex items-start gap-1.5">
                                      <span className="text-gold-500 shrink-0 select-none">✦</span>
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-auto select-none">
                      <div className="flex items-center justify-between pt-4 border-t border-gold-200/30">
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block">Precio</span>
                          <span className="text-lg font-bold text-luxury-900 font-serif">{treatment.price}</span>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          id={`request-service-${treatment.id}`}
                          onClick={() => handleQuickContact(treatment.name)}
                          className="bg-luxury-900 hover:bg-gold-500 hover:text-luxury-950 text-white font-bold text-xs min-h-[48px] py-3 px-5 rounded-xl transition-all cursor-pointer flex items-center justify-center font-mono uppercase tracking-wider animate-shine"
                        >
                          Preguntar
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Prompt banner for customized pricing */}
          <div className="mt-16 bg-gold-200/35 border border-gold-200 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-block text-xs uppercase font-mono tracking-widest text-gold-700 font-semibold bg-white/60 px-2.5 py-0.5 rounded-full">Rituales Especiales</span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-luxury-900">¿Tienes un evento o Boda este año?</h3>
              <p className="text-sm text-gray-600">
                Diseñamos planes integrales que aseguran una piel luminosa, joven y libre de imperfecciones para el gran día. De forma adaptada y con cita de cabina dedicada.
              </p>
            </div>
            <a
              href="#reservas"
              className="w-full md:w-auto bg-luxury-900 hover:bg-gold-600 text-white hover:text-luxury-950 text-center py-4 px-8 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors shrink-0 shadow-md"
            >
              Consultar Pack Especial
            </a>
          </div>

        </div>
      </section>

      {/* Embedded Skin Diagnostic Section (SkinQuiz) */}
      <section id="diagnostico" className="py-20 bg-luxury-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-gold-600 font-bold bg-white px-3 py-1 rounded-full shadow-sm">Diagnóstico Estético Online</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-900 tracking-tight">
              ¿Qué Necesita Realmente <span className="italic text-gold-700">Tu Piel</span>?
            </h2>
            <p className="text-gray-500 text-sm font-light">
              Responde 3 breves cuestiones dermoestéticas y recibe un informe adaptado con los rituales de cabina y productos Farmasi aconsejados por Carmen.
            </p>
          </div>

          <SkinQuiz />

        </div>
      </section>

      {/* "El Sello Vegari" Section (Why Vegari - 20 years experience) */}
      <section id="experiencia" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text info */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase font-mono tracking-widest text-gold-600 font-bold bg-gold-100 px-3 py-1 rounded-full">Filosofía de Cabina</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-900 tracking-tight leading-tight">
                20 Años Cultivando el Arte <br />
                de la <span className="italic text-gold-700">Belleza Segura e Impecable</span>
              </h2>

              <p className="text-gray-600 font-light leading-relaxed">
                Fundado y dirigido individualmente por Carmen, el centro de estética <strong>VEGARI</strong> es un punto de referencia de bienestar y cuidado de confianza en Ciudad Real. Durante dos décadas nos hemos enfocado en ofrecer resultados visibles, con calma, mimo y atención quirúrgica al detalle.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-100/70 border border-gold-200/50 flex items-center justify-center text-gold-700 shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="font-serif font-bold text-luxury-900 text-base">Atención 100% Personalizada</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Sin prisas. Cada sesión se planifica adaptándose al ritmo de renovación celular de tu piel.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-100/70 border border-gold-200/50 flex items-center justify-center text-gold-700 shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="font-serif font-bold text-luxury-900 text-base">Limpieza de Nivel Quirúrgico</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Cumplimos con rigor los protocolos de esterilización de cabina e instrumental de manicura.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-100/70 border border-gold-200/50 flex items-center justify-center text-gold-700 shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="font-serif font-bold text-luxury-900 text-base">Cosmética de Alta Gama (Farmasi)</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Empleamos fórmulas avanzadas con un porcentaje alto de nutrientes activos que logran penetrar la capa basal dérmica.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side beautifully generated image of Manicura detail or client satisfaction */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative bg-luxury-200">
                  <img 
                    src={nailArtImg} 
                    alt="Manicura premium vegari al detalle"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/45 via-transparent to-transparent"></div>
                </div>

                {/* Star review overlay */}
                <div className="absolute -bottom-6 left-6 z-20 bg-white border border-gold-200 p-5 rounded-2xl shadow-xl max-w-sm">
                  <div className="flex gap-0.5 text-gold-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 italic font-mono leading-relaxed">
                    "Limpieza de 10, y el resultado es precioso como cuida todo al detalle."
                  </p>
                  <span className="block text-[10px] uppercase font-bold text-luxury-900 mt-2 font-mono tracking-wider">— Isabel Gonzalez Rodriguez</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof & Client Testimonials Section */}
      <section className="py-20 bg-luxury-100/50 border-t border-gold-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-gold-600 font-bold bg-white px-3 py-1 rounded-full shadow-sm">La Voz de Nuestras Clientas</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-900 tracking-tight">
              ¿Por qué nos eligen en <span className="italic text-gold-700">Ciudad Real</span>?
            </h2>
            <p className="text-gray-500 text-sm font-light">
              Opiniones transparentes extraídas de nuestro perfil de Google Maps con una valoración sobresaliente de 5 estrellas.
            </p>
          </div>

          <StatsReviews />

        </div>
      </section>

      {/* Embedded Availability & Reservation Planner (BookingCalendar) */}
      <section id="reservas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-gold-600 font-bold bg-gold-100 px-3 py-1 rounded-full">Gestor de Citas en Directo</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-900 tracking-tight">
              Prepara tu <span className="italic text-gold-700">Próximo Momento</span> de Mimo
            </h2>
            <p className="text-gray-500 text-sm font-light">
              Calculamos la disponibilidad estimada para que reserves tu sesión con Carmen de forma ágil por WhatsApp. Sin esperas interminables ni intermediarios.
            </p>
          </div>

          <BookingCalendar />

        </div>
      </section>

      {/* FAQ Section with interactive accordion */}
      <section id="faq" className="py-20 bg-luxury-200 border-t border-gold-200/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-gold-600 font-bold bg-white px-3 py-1 rounded-full shadow-sm">Preguntas Comunes</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-900 tracking-tight">
              Resolvemos tus <span className="italic text-gold-700">Inquietudes</span>
            </h2>
            <p className="text-gray-500 text-sm font-light">
              Queremos que asistas totalmente relajada e informada. Aquí tienes las dudas más recurrentes resueltas al instante.
            </p>
          </div>

          {/* Interactive accordion structure */}
          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white border border-gold-200/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:border-gold-300"
                >
                  <button
                    id={`faq-toggle-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-6 flex justify-between items-center bg-transparent cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                      <h4 className="font-bold text-luxury-900 text-sm sm:text-base pr-4">
                        {faq.question}
                      </h4>
                    </div>
                    <span className="text-gold-600 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-gray-600 border-t border-gold-100 leading-relaxed font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Geolocation Section & Schedules */}
      <section id="ubicacion" className="py-20 bg-white border-t border-gold-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Contact details and Schedule Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-mono tracking-widest text-gold-600 font-bold bg-gold-100 px-3 py-1 rounded-full">Cómo Llegar & Horarios</span>
              
              <h2 className="text-3xl font-serif font-bold text-luxury-900 tracking-tight leading-tight">
                Te Esperamos en <br />
                <span className="italic text-gold-700">Pleno Corazón</span> de Ciudad Real
              </h2>

              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Estamos a escasos minutos de las arterias principales de la localidad, en una calle rodeada de aparcamientos accesibles y comercios clave.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-luxury-900 font-sans">Dirección Física</h4>
                    <p className="text-xs text-gray-500 mt-0.5">C. Huertos, 6, 13004 Ciudad Real, España</p>
                    <a 
                      href="https://maps.google.com/?q=C.+Huertos,+6,+13004+Ciudad+Real" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gold-700 font-bold text-xs inline-flex items-center gap-1 group mt-1.5 hover:text-gold-900"
                    >
                      Abrir en Google Maps
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <Clock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-luxury-900 font-sans">Horario de Apertura</h4>
                    <ul className="text-xs text-gray-500 mt-1 space-y-1">
                      <li className="flex justify-between w-48"><span>Lunes a Viernes:</span> <span className="font-semibold text-luxury-900">10:00 - 20:00</span></li>
                      <li className="flex justify-between w-48 bg-gold-50 px-1 rounded"><span>Sábados (Cita previa):</span> <span className="font-semibold text-luxury-900">10:00 - 14:00</span></li>
                      <li className="flex justify-between w-48 text-rose-600"><span>Domingos & Festivos:</span> <span>Cerrado</span></li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <Phone className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-luxury-900 font-sans">Contacto Directo</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Teléfono: 626 80 50 53</p>
                    <p className="text-xs text-gray-500">Instagram: @vegari_centro_estetica</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated interactive premium map interface */}
            <div className="lg:col-span-7">
              <div id="interactive-map-frame" className="bg-luxury-200 border border-gold-200 rounded-3xl p-4 md:p-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-8 left-8 z-20 bg-white/95 p-4 rounded-xl shadow-md border border-gold-100 max-w-[200px] hidden sm:block">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-gold-600 block">DESTINO SEGURO</span>
                  <h4 className="font-bold text-xs text-luxury-900 mt-0.5">Estética VEGARI</h4>
                  <p className="text-[10px] text-gray-500 mt-1">C. Huertos, 6, Ciudad Real</p>
                  <p className="text-[9px] text-amber-600 font-semibold mt-1">✓ Se aconseja reservar online</p>
                </div>

                {/* Real Interactive Map via Iframe */}
                <div className="aspect-[16:9] sm:aspect-[16:10] rounded-2xl overflow-hidden relative bg-gold-50 border border-gold-200/50 shadow-inner">
                  <iframe
                    src="https://maps.google.com/maps?q=Calle%20Huertos%206,%20Ciudad%20Real,%20Espa%C3%B1a&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Ubicación de Estética VEGARI"
                    className="w-full h-full grayscale-[10%] contrast-[105%] opacity-90 transition-opacity duration-300 hover:opacity-100"
                  ></iframe>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 border-t border-gold-200/40">
                  <span className="text-xs text-gray-500 text-center sm:text-left">
                    ¿Quieres guiarte en coche o transporte público?
                  </span>
                  <a
                    href="https://maps.google.com/?q=C.+Huertos,+6,+13004+Ciudad+Real"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-luxury-900 hover:bg-gold-500 text-white hover:text-luxury-950 font-bold text-xs py-3 px-5 rounded-xl transition-colors text-center shadow-md cursor-pointer"
                  >
                    Abrir Ruta de GPS
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-950 text-white pt-16 pb-12 border-t border-luxury-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-luxury-900">
            
            {/* Footer Column 1: Brand details */}
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-3 select-none group">
                <img 
                  src={logoImg} 
                  alt="Logo Vegari" 
                  className="w-10 h-10 rounded-full border border-gold-400/30 shadow-sm transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-serif font-bold tracking-[0.15em] text-white uppercase">
                    Vegari
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-gold-400 font-semibold">
                    Ciudad Real
                  </span>
                </div>
              </a>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                20 años elevando la belleza y la salud de la piel de Ciudad Real con metodologías de cabina impecables y trato humano excepcional.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/vegari_centro_estetica" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-luxury-800 hover:border-gold-400 text-gray-300 hover:text-gold-400 flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Sabor Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/34626805053" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-luxury-800 hover:border-gold-400 text-gray-300 hover:text-gold-400 flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Canal WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Footer Column 2: Quick navigation */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-gold-300 font-bold">Navegación</h4>
              <ul className="space-y-2 text-xs text-gray-400 font-light">
                <li><a href="#tratamientos" className="hover:text-gold-300 transition-colors">Carta de Tratamientos</a></li>
                <li><a href="#diagnostico" className="hover:text-gold-300 transition-colors">Test de Piel Diagnóstico</a></li>
                <li><a href="#experiencia" className="hover:text-gold-300 transition-colors">La Filosofía Vegari</a></li>
                <li><a href="#reservas" className="hover:text-gold-300 transition-colors">Gestor de Citas Reservas</a></li>
              </ul>
            </div>

            {/* Footer Column 3: Local legal safeguards & trust */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-gold-300 font-bold">Confianza Estética</h4>
              <ul className="space-y-2 text-xs text-gray-400 font-light">
                <li>• Diagnóstico Facial Previo</li>
                <li>• Higiene Absoluta de Diez</li>
                <li>• Novias & Bodas Personalizadas</li>
                <li>• Productos Farmasi Avanzados</li>
              </ul>
            </div>

            {/* Footer Column 4: Key business details */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-gold-300 font-bold">Localización Directa</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Calle Huertos, 6,<br />
                13004 Ciudad Real, España
              </p>
              <p className="text-xs text-gold-300 font-semibold">
                📲 Teléfono y Citas: 626 80 50 53
              </p>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-gray-500 font-light text-center sm:text-left">
              &copy; {new Date().getFullYear()} VEGARI Centro Estética Ciudad Real. Todos los derechos reservados.
            </span>
            <div className="flex gap-4 text-[10px] text-gray-600 font-light">
              <a href="#" className="hover:text-gray-400 transition-colors">Aviso Legal</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-400 transition-colors">Política de Privacidad</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Dock for Mobile First Navigation (90% of traffic) - thumb-friendly */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden flex justify-center pointer-events-none select-none">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', damping: 20, stiffness: 180 }}
          className="pointer-events-auto bg-luxury-900/95 backdrop-blur-xl border border-gold-400/35 rounded-2xl shadow-[0_12px_45px_rgba(15,11,10,0.45)] p-2 px-3 flex items-center justify-between w-full max-w-sm"
        >
          {/* Menu Drawer */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 text-gold-200/80 hover:text-white transition-colors cursor-pointer min-w-[56px] min-h-[48px] select-none"
          >
            <Menu className="w-5 h-5 text-gold-300" />
            <span className="text-[9px] font-mono uppercase tracking-widest font-bold">Menú</span>
          </button>

          {/* Test de Piel */}
          <a
            href="#diagnostico"
            className="flex flex-col items-center justify-center gap-0.5 text-gold-200/80 hover:text-white transition-colors cursor-pointer min-w-[56px] min-h-[48px] select-none"
          >
            <Sparkles className="w-5 h-5 text-gold-400 animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-widest font-bold">Dermo</span>
          </a>

          {/* Central Glow WhatsApp icon */}
          <button
            onClick={() => handleQuickContact('Consulta express dermoestética')}
            className="bg-gold-500 text-luxury-950 hover:bg-gold-400 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-gold-600/25 active:scale-95 transition-all text-xs font-black uppercase tracking-wider cursor-pointer min-h-[48px] animate-shine"
          >
            <MessageSquare className="w-4 h-4 fill-current shrink-0" />
            <span>Carmen</span>
          </button>

          {/* Calendar Citas */}
          <a
            href="#reservas"
            className="flex flex-col items-center justify-center gap-0.5 text-gold-200/80 hover:text-white transition-colors cursor-pointer min-w-[56px] min-h-[48px] select-none"
          >
            <Clock className="w-5 h-5 text-gold-300" />
            <span className="text-[9px] font-mono uppercase tracking-widest font-bold">Citas</span>
          </a>

          {/* Call Phone */}
          <a
            href="tel:+34626805053"
            className="flex flex-col items-center justify-center gap-0.5 text-gold-200/80 hover:text-white transition-colors cursor-pointer min-w-[56px] min-h-[48px] select-none"
          >
            <Phone className="w-5 h-5 text-gold-300" />
            <span className="text-[9px] font-mono uppercase tracking-widest font-bold">Tel</span>
          </a>
        </motion.div>
      </div>

    </div>
  );
}
