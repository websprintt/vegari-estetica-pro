import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCcw, MessageSquare, CheckCircle } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: {
    id: string;
    text: string;
    description: string;
    value: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'skinType',
    title: '¿Cómo sientes tu piel habitualmente?',
    subtitle: 'Elige la opción que mejor describa tu sensación general durante el día.',
    options: [
      { id: 'seca', text: 'Tirante o Deshidratada', description: 'Siento falta de agua o descamación ligera', value: 'Seca' },
      { id: 'grasa', text: 'Grasa con Brillos', description: 'Poros dilatados y tendencia a acumular impurezas', value: 'Grasa/Mixta' },
      { id: 'sensible', text: 'Sensible o Reactiva', description: 'Sufro enrojecimientos o reacciones a cambios de clima', value: 'Sensible' },
      { id: 'firme', text: 'Madura o Con Pérdida de Elasticidad', description: 'Noto que necesita nutrición profunda y firmeza', value: 'Madura' }
    ]
  },
  {
    id: 'mainConcern',
    title: '¿Cuál es tu mayor prioridad estética hoy?',
    subtitle: 'Nos centraremos en este objetivo principal para potenciar tus resultados.',
    options: [
      { id: 'higiene', text: 'Limpieza y Detox', description: 'Eliminar puntos negros, células muertas y purificar', value: 'Poros e impurezas' },
      { id: 'arrugas', text: 'Firmeza y Reducción de Arrugas', description: 'Redefinir óvalo, tensar y difuminar líneas', value: 'Flacidez/Líneas' },
      { id: 'luminosidad', text: 'Luminosidad y Tono Uniforme', description: 'Combatir la piel apagada u opaca', value: 'Opacidad' },
      { id: 'uñas', text: 'Cuidado Impecable de Manos o Pies', description: 'Manicura premium y cuidado de cutículas al detalle', value: 'Aesthetic de Uñas' }
    ]
  },
  {
    id: 'specialEvent',
    title: '¿Tienes algún evento importante próximamente?',
    subtitle: 'Adaptamos los tiempos y preparación para que brilles ese día.',
    options: [
      { id: 'boda', text: 'Sí, soy Novia o Invitada especial', description: 'Busco un plan de preparación con cronograma pre-boda', value: 'Boda/Evento' },
      { id: 'mimo', text: 'No, es pura rutina de cuidado personal', description: 'Busco mantener mi piel joven, luminosa y saludable', value: 'Cuidado habitual' }
    ]
  }
];

export default function SkinQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleOptionSelect = (questionId: string, optionValue: string) => {
    const updatedAnswers = { ...answers, [questionId]: optionValue };
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
  };

  // Logic to determine recommendation
  const getRecommendation = () => {
    const { skinType, mainConcern, specialEvent } = answers;
    
    if (specialEvent === 'Boda/Evento') {
      return {
        title: 'Ritual Novia Radiante + Higiene Vegari',
        desc: 'Ideal para conseguir una piel espectacularmente joven, firme y unificada para tu gran día. Se trata de un plan personalizado con cronograma que te asegura brillar.',
        badge: 'Especial Bodas',
        treatmentId: 'ritmo-novias'
      };
    }

    if (mainConcern === 'Flacidez/Líneas' || skinType === 'Madura') {
      return {
        title: 'Tratamiento Antiedad Firming & Lift',
        desc: 'Tu piel se beneficiará enormemente de la reactivación de colágeno mediante nuestra radiofrecuencia avanzada, aportando una firmeza excepcional.',
        badge: 'Efecto Rejuvenecedor',
        treatmentId: 'anti-aging-lift'
      };
    }

    if (mainConcern === 'Poros e impurezas' || skinType === 'Grasa/Mixta') {
      return {
        title: 'Higiene Facial Profunda Vegari',
        desc: 'Un protocolo purificante bajo los estándares más exigentes de limpieza. Ideal para limpiar impurezas profundas y calmar la secreción sebácea.',
        badge: 'Limpieza de 10',
        treatmentId: 'higiene-facial'
      };
    }

    if (mainConcern === 'Aesthetic de Uñas') {
      return {
        title: 'Manicura Semipermanente Vegari Edition',
        desc: 'Uñas impecables cuidadas al milímetro con las manos expertas de Carmen. Incluye rejuvenecimiento de la piel de tus manos.',
        badge: 'Cuidado Premium de Uñas',
        treatmentId: 'manicura-vegari'
      };
    }

    return {
      title: 'Higiene Facial Profunda + Rutina Farmasi',
      desc: 'El punto de partida obligatorio para cualquier tratamiento. Limpiará tu piel, nivelará la hidratación y preparará tus células para durar jóvenes por más tiempo.',
      badge: 'Recomendación Base',
      treatmentId: 'higiene-facial'
    };
  };

  const recommendation = showResult ? getRecommendation() : null;

  const handleWhatsAppBooking = () => {
    if (!recommendation) return;
    const { skinType, mainConcern, specialEvent } = answers;
    const message = `¡Hola Carmen! He completado vuestro Diagnóstico de la Piel online ✨

*Resultados de mi test:*
- Sensación de mi piel: ${skinType}
- Mi mayor prioridad: ${mainConcern}
- Próximo evento: ${specialEvent}

*Recomendación:* ${recommendation.title}

Me gustaría reservar una cita previa para asesoramiento y recibir este tratamiento personalizado. ¿Qué fechas tenéis disponibles? ¡Gracias!`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/34626805053?text=${encodedText}`, '_blank');
  };

  return (
    <div id="skin-quiz-container" className="bg-white rounded-3xl border border-gold-200 shadow-xl overflow-hidden p-6 md:p-10 max-w-3xl mx-auto backdrop-blur-sm relative">
      <div className="absolute top-0 right-0 bg-gold-100 px-4 py-1.5 text-xs text-gold-800 font-semibold uppercase tracking-widest rounded-bl-2xl flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-gold-600" />
        Diagnóstico Inteligente
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 pt-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold font-mono text-gold-600 uppercase tracking-widest bg-gold-100/50 px-2.5 py-1 rounded-full">
                  Paso {currentStep + 1} de {QUESTIONS.length}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-900 tracking-tight">
                {QUESTIONS[currentStep].title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {QUESTIONS[currentStep].subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUESTIONS[currentStep].options.map((option) => (
                <button
                  id={`quiz-option-${option.id}`}
                  key={option.id}
                  onClick={() => handleOptionSelect(QUESTIONS[currentStep].id, option.value)}
                  className="group relative text-left p-5 rounded-2xl border border-gray-100 hover:border-gold-300 bg-gold-50/20 hover:bg-gold-50/50 active:scale-[0.99] transition-all cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-luxury-900 group-hover:text-gold-700 transition-colors">
                      {option.text}
                    </span>
                    <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gold-500 transition-colors group-hover:bg-gold-100">
                      <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-gold-600"></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 pb-1">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-5 border-t border-gray-100 mt-6 select-none">
              <button
                id="quiz-btn-back"
                disabled={currentStep === 0}
                onClick={handlePrev}
                className={`text-sm font-semibold transition-all flex items-center justify-center gap-1.5 min-h-[48px] px-4 -ml-4 ${
                  currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gold-600 cursor-pointer'
                }`}
              >
                Anterior
              </button>
              <div className="flex gap-2">
                {QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentStep ? 'w-8 bg-gold-600' : 'w-2 bg-gold-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-center pt-6 pb-2"
          >
            <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-200 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="inline-block text-xs font-bold font-mono bg-gold-200 text-gold-800 px-3 py-1 rounded-full uppercase tracking-widest mb-2 shadow-sm">
              {recommendation?.badge}
            </span>

            <h3 className="text-3xl font-serif font-bold text-luxury-900 mb-3">
              ¡Tu Diagnóstico de Piel está Listo!
            </h3>
            
            <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
              Según tus respuestas, Carmen ha seleccionado un plan de cabina y cuidado doméstico adaptado especialmente para ti.
            </p>

            <div className="bg-gold-50/50 border border-gold-200/60 rounded-2xl p-6 text-left max-w-xl mx-auto mb-8 shadow-sm">
              <span className="text-xs uppercase font-mono tracking-widest text-gold-600 block mb-1">TRATAMIENTO RECOMENDADO</span>
              <h4 className="text-xl font-bold text-luxury-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-500" />
                {recommendation?.title}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {recommendation?.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-luxury-700">
                <span className="bg-white border border-gold-200 px-2.5 py-1 rounded-full">✓ Diagnóstico facial gratuito Carmen</span>
                <span className="bg-white border border-gold-200 px-2.5 py-1 rounded-full">✓ Limpieza dermatológica estricta</span>
                <span className="bg-white border border-gold-200 px-2.5 py-1 rounded-full">✓ Cosmética de alta concentración</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                id="quiz-btn-whatsapp"
                onClick={handleWhatsAppBooking}
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                Reservar con este Diagnóstico
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="quiz-btn-reset"
                onClick={resetQuiz}
                className="w-full sm:w-auto bg-transparent border border-gray-200 hover:border-gold-300 hover:bg-gold-50/30 text-gray-600 hover:text-luxury-900 px-6 py-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Repetir Test
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
