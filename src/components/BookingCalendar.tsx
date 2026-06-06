import { useState } from 'react';
import { TREATMENTS } from '../data';
import { Calendar, Clock, AlertTriangle, Check, ArrowRight } from 'lucide-react';

export default function BookingCalendar() {
  const [selectedService, setSelectedService] = useState<string>(TREATMENTS[0].id);
  const [selectedDayOffset, setSelectedDayOffset] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<string>('11:30');

  // Generate next 4 operational days starting from today (excluding Sunday)
  const getNextDays = () => {
    const days = [];
    let current = new Date();
    // In our metadata, it is Friday (June 5th, 2026).
    // Let's generate days sequentially
    for (let i = 0; i < 5; i++) {
      const future = new Date(current.getTime() + i * 24 * 60 * 60 * 1000);
      const isSunday = future.getDay() === 0;
      if (!isSunday) {
        days.push(future);
      }
    }
    return days.slice(0, 4);
  };

  const operationalDays = getNextDays();

  const mockSlots = [
    { time: '10:00', available: true },
    { time: '11:30', available: true },
    { time: '13:00', available: false }, // busy
    { time: '16:00', available: true },
    { time: '17:30', available: true },
    { time: '19:00', available: false } // busy
  ];

  const selectedServiceObj = TREATMENTS.find(t => t.id === selectedService) || TREATMENTS[0];

  const getFormattedDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const getFullFormattedDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleBooking = () => {
    const targetDate = operationalDays[selectedDayOffset] || new Date();
    const formattedDateString = getFullFormattedDate(targetDate);
    
    const message = `¡Hola Carmen! Me gustaría reservar una cita para el siguiente tratamiento:

🔹 *Tratamiento:* ${selectedServiceObj.name} (${selectedServiceObj.price})
📅 *Fecha sugerida:* ${formattedDateString}
⏰ *Hora sugerida:* ${selectedSlot}
👤 *Especialista:* Carmen (Propietaria)

¿Tenéis este hueco disponible en vuestra agenda? Mi nombre es: `;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/34626805053?text=${encodedText}`, '_blank');
  };

  return (
    <div id="booking-calendar-module" className="bg-luxury-900 text-white rounded-3xl p-6 md:p-10 shadow-2xl relative border border-luxury-800">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold-400 text-luxury-950 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-md">
        <Clock className="w-3.5 h-3.5" />
        Pre-reserva Express
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* Left Column: Form selector */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
              Sugerir Día y Hora de Tratamiento
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Selecciona tu tratamiento e indica la fecha tentativa que mejor se amolde a tu rutina.
            </p>
          </div>

          {/* Treatment Select */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-mono tracking-widest text-gold-300 block">1. Selecciona el servicio</label>
            <select
              id="booking-service-select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full bg-luxury-800 border border-luxury-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-gold-400 focus:outline-none transition-all cursor-pointer"
            >
              {TREATMENTS.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} — {t.price} ({t.duration})
                </option>
              ))}
            </select>
          </div>

          {/* Date Selector */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-mono tracking-widest text-gold-300 block">2. Elige la fecha</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {operationalDays.map((day, idx) => (
                <button
                  id={`booking-day-${idx}`}
                  key={idx}
                  onClick={() => setSelectedDayOffset(idx)}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedDayOffset === idx
                      ? 'border-gold-400 bg-gold-400/20 text-gold-200 font-bold shadow-md'
                      : 'border-luxury-800 bg-luxury-800/40 text-gray-300 hover:border-luxury-700 hover:bg-luxury-850'
                  }`}
                >
                  <span className="block text-xs uppercase tracking-wider font-mono opacity-80">
                    {idx === 0 ? 'Hoy' : idx === 1 ? 'Mañana' : 'Fecha'}
                  </span>
                  <span className="block text-sm font-sans font-semibold capitalize mt-0.5">
                    {getFormattedDate(day)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Slot Selector */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-mono tracking-widest text-gold-300 block">3. Hueco horario sugerido</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {mockSlots.map((slot) => (
                <button
                  id={`booking-slot-${slot.time}`}
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`p-2.5 rounded-lg text-center text-xs font-semibold font-mono transition-all cursor-pointer ${
                    !slot.available
                      ? 'bg-luxury-950 text-gray-600 border border-transparent line-through cursor-not-allowed'
                      : selectedSlot === slot.time
                      ? 'bg-gold-500 text-luxury-950 font-bold shadow-glow border border-gold-400 scale-[1.04]'
                      : 'bg-luxury-800 text-gray-200 border border-luxury-700 hover:border-gold-500/50'
                  }`}
                >
                  {slot.time}
                  {slot.available && selectedSlot === slot.time && (
                    <span className="inline-block ml-1 text-[9px] text-luxury-950 font-sans">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visualizer receipt & CRO assurances */}
        <div className="lg:col-span-5 bg-luxury-950 p-6 rounded-2xl border border-luxury-800 flex flex-col justify-between">
          <div className="space-y-5">
            <h4 className="text-sm uppercase tracking-widest font-mono text-gold-400 pb-3 border-b border-luxury-800">
              Resumen de tu Propuesta
            </h4>

            <div className="space-y-3.5">
              <div className="flex justify-between items-start text-sm">
                <span className="text-gray-400">Tratamiento:</span>
                <span className="font-semibold text-right max-w-[180px] truncate">{selectedServiceObj.name}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Duración:</span>
                <span className="font-semibold">{selectedServiceObj.duration}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Precio estimado:</span>
                <span className="text-gold-300 font-bold text-base">{selectedServiceObj.price}</span>
              </div>
              <div className="flex justify-between items-start text-sm pt-2 border-t border-luxury-850">
                <span className="text-gray-400">Día propuesto:</span>
                <span className="font-semibold text-gold-200 text-right">
                  {operationalDays[selectedDayOffset] ? getFullFormattedDate(operationalDays[selectedDayOffset]) : ''}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Hora propuesta:</span>
                <span className="font-semibold text-gold-200">{selectedSlot}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Especialista asignada:</span>
                <span className="text-amber-100 font-medium">Carmen (Misma dueña)</span>
              </div>
            </div>

            {/* Demanda indicator */}
            <div className="bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs p-3.5 rounded-xl flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Alta Demanda:</span> Hay reservas constantes esta semana en Ciudad Real. Te guardaremos digitalmente esta sugerencia.
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-luxury-800">
            <button
              id="booking-confirm-btn"
              onClick={handleBooking}
              className="w-full bg-gold-400 hover:bg-gold-300 text-luxury-950 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              Consultar Disponibilidad en WhatsApp
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[11px] text-gray-500 mt-2.5">
              Haz clic para abrir WhatsApp. Recibirás respuesta directa e individualizada de Carmen en minutos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
