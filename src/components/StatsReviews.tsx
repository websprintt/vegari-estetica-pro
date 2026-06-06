import { useState } from 'react';
import { REVIEWS } from '../data';
import { Star, ArrowLeft, ArrowRight, Award, ShieldCheck, Heart } from 'lucide-react';

export default function StatsReviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-12">
      {/* Dynamic Statistics Grid */}
      <div id="stats-section-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm border border-gold-100 rounded-2xl p-6 text-center shadow-sm relative group hover:border-gold-300 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-gold-200/40 text-gold-700 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-200 transition-all">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="text-3xl font-serif font-bold text-luxury-900 mb-1">20 Años</h4>
          <span className="text-xs font-mono uppercase tracking-widest text-gold-600 block mb-2">De Experiencia</span>
          <p className="text-sm text-gray-500">
            Líderes locales fundados por Carmen. Novias memorables y soluciones avanzadas en Ciudad Real.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-gold-200 rounded-2xl p-6 text-center shadow-md relative group hover:border-gold-400 transition-all duration-300 -translate-y-1 md:-translate-y-3">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold-500 text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-sm">
            Calificación Perfecta
          </div>
          <div className="w-12 h-12 rounded-full bg-gold-200/40 text-gold-700 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-200 transition-all mt-2">
            <div className="flex gap-0.5 text-gold-500">
              <Star className="w-6 h-6 fill-current" />
            </div>
          </div>
          <h4 className="text-3xl font-serif font-bold text-luxury-900 mb-1">5.0 / 5.0</h4>
          <span className="text-xs font-mono uppercase tracking-widest text-gold-600 block mb-2">23+ Opiniones Reales</span>
          <p className="text-sm text-gray-600">
            Trato 100% individualizado, amable y detallista, certificado de forma independiente en Google Maps.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-gold-100 rounded-2xl p-6 text-center shadow-sm relative group hover:border-gold-300 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-gold-200/40 text-gold-700 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-200 transition-all">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="text-3xl font-serif font-bold text-luxury-900 mb-1">Higiene 10</h4>
          <span className="text-xs font-mono uppercase tracking-widest text-gold-600 block mb-2">Seguridad Absoluta</span>
          <p className="text-sm text-gray-500">
            Limpieza de diez rigurosa y meticulosa. Procesos clínicos de desinfección en cada servicio.
          </p>
        </div>
      </div>

      {/* Interactive Review Slider */}
      <div id="reviews-carousel-wrapper" className="bg-luxury-200 border border-gold-200/50 rounded-3xl p-6 md:p-10 max-w-4xl mx-auto relative shadow-inner">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          {/* Review text */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="flex gap-1 justify-center md:justify-start">
              {[...Array(REVIEWS[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
              ))}
            </div>
            
            <p className="text-lg md:text-xl font-serif italic text-luxury-900 leading-relaxed font-medium">
              "{REVIEWS[activeIndex].comment}"
            </p>

            <div>
              <h5 className="font-bold text-luxury-900 text-base">{REVIEWS[activeIndex].author}</h5>
              <div className="flex items-center gap-2 justify-center md:justify-start mt-0.5">
                <span className="text-xs font-mono text-gold-600 bg-gold-200/60 px-2 py-0.5 rounded-full font-medium">
                  {REVIEWS[activeIndex].role}
                </span>
                <span className="text-xs text-gray-400 font-sans">•</span>
                <span className="text-xs text-gray-500">{REVIEWS[activeIndex].date}</span>
              </div>
            </div>
          </div>

          {/* Nav Controls */}
          <div className="flex gap-3 shrink-0">
            <button
              id="review-prev-btn"
              onClick={prevReview}
              className="w-11 h-11 rounded-full border border-gold-300 bg-white hover:bg-gold-50 text-gold-800 flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              id="review-next-btn"
              onClick={nextReview}
              className="w-11 h-11 rounded-full border border-gold-300 bg-white hover:bg-gold-50 text-gold-800 flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dots indicators */}
        <div className="flex justify-center gap-1.5 mt-6">
          {REVIEWS.map((_, idx) => (
            <button
              id={`review-dot-${idx}`}
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-6 bg-gold-600' : 'w-2 bg-gold-300'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
