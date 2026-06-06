import { Treatment, Review, FAQ } from './types';

export const TREATMENTS: Treatment[] = [
  {
    id: 'higiene-facial',
    category: 'facial',
    name: 'Higiene Facial Profunda Vegari',
    description: 'Tratamiento purificante celular y detoxificación profunda con espátula ultrasónica y principios activos premium. Restaura la luminosidad natural de tu piel.',
    price: '49€',
    duration: '60 min',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    features: [
      'Análisis dérmico personalizado de bienvenida',
      'Dermoabrasión activa ultrasónica',
      'Extracción minuciosa certificada Carmen',
      'Mascarilla descongestiva de arcillas finas',
      'Masaje facial relajante drenante Kobido'
    ],
    popular: true
  },
  {
    id: 'anti-aging-lift',
    category: 'facial',
    name: 'Tratamiento Antiedad Firming & Lift',
    description: 'Rejuvenece, aporta firmeza y define el óvalo facial con radiofrecuencia de última generación combinada con cóctel de vitaminas micronizadas.',
    price: '75€',
    duration: '75 min',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80',
    features: [
      'Estimulación de colágeno y elastina',
      'Crono-cosmética Farmasi avanzada',
      'Efecto tensor express inmediato',
      'Vitamina C pura contra radicales libres',
      'Masaje orbicular anti-fatiga'
    ]
  },
  {
    id: 'ritmo-novias',
    category: 'novias',
    name: 'Ritual Novia Radiante Exclusivo',
    description: 'El pack definitivo para brillar en tu día especial. Un protocolo completo diseñado por Carmen que cuida cada detalle de tu piel, manos y mirada.',
    price: 'de 149€ a 280€',
    duration: 'Sesiones personalizadas',
    imageUrl: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=600&q=80',
    features: [
      'Peeling químico suave facial iluminador',
      'Prueba de hidratación extrema de larga duración',
      'Manicura semipermanente novias premium',
      'Diseño y definición de pestañas & cejas',
      'Asesoramiento de rutina pre-boda Farmasi'
    ],
    popular: true
  },
  {
    id: 'manicura-vegari',
    category: 'uñas',
    name: 'Manicura Semipermanente Vegari Edition',
    description: 'Estilismo y cuidado de uñas de altísima precisión. Limpieza impecable de cutículas, esmaltado ultra-duradero y masaje de hidratación orgánica.',
    price: '22€',
    duration: '45 min',
    imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=600&q=80',
    features: [
      'Retirada de esmalte anterior respetuosa',
      'Corte, limado y perfilado de precisión',
      'Tratamiento de cutículas con torno blando',
      'Esmaltado de alta pigmentación y brillo espejo',
      'Exfoliante y crema nutritiva de karité'
    ],
    popular: true
  },
  {
    id: 'corporal-drenante',
    category: 'corporal',
    name: 'Escultura Corporal & Drenaje Activo',
    description: 'Masaje remodelador intensivo que estimula la microcirculación, ayuda a eliminar toxinas y reduce la retención de líquidos en zonas localizadas.',
    price: '55€',
    duration: '50 min',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    features: [
      'Tratamiento anticelulítico focalizado',
      'Técnicas manuales españolas tradicionales',
      'Aceites esenciales de romero y menta',
      'Estimulación linfática progresiva',
      'Vendaje final activador frío/calor opcional'
    ]
  },
  {
    id: 'spa-pedicura',
    category: 'uñas',
    name: 'Pedicura Spa Rejuvenecedora Profunda',
    description: 'Alivia tus pies cansados con un baño de sales relajantes, remoción de asperezas, exfoliación profunda, mascarilla térmica y esmaltado impecable.',
    price: '35€',
    duration: '60 min',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661499249417-c20d6b668469?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    features: [
      'Jacuzzi de pies con aceites suavizantes',
      'Eliminación de durezas con lija podológica',
      'Peeling exfoliante de coco y azúcar',
      'Masaje reflexógeno de 15 minutos',
      'Esmalte de esferas protectoras de larga duración'
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-isabel',
    author: 'Isabel Gonzalez Rodriguez',
    role: 'Local Guide',
    rating: 5,
    comment: 'Profesional 100%, limpieza de 10, y el resultado es precioso como cuida todo al detalle. Un sitio de absoluta confianza.',
    date: 'Hace 9 meses'
  },
  {
    id: 'rev-angeles',
    author: 'Angeles',
    role: 'Local Guide (40 opiniones)',
    rating: 5,
    comment: 'Maravillosa la atención de Carmen. Limpieza, profesionalidad y muy buen trabajo con las uñas. Recomendable 100 x 100. ¡Hay que reservar con antelación!',
    date: 'Hace 4 años'
  },
  {
    id: 'rev-carmen',
    author: 'Carmen A',
    role: 'Local Guide (11 opiniones)',
    rating: 5,
    comment: 'Carmen es una gran profesional, ofrece un trato estupendo y el resultado es maravilloso. Te sientes cuidada desde que entras.',
    date: 'Hace 2 años'
  },
  {
    id: 'rev-maria',
    author: 'Elena Ruiz',
    role: 'Clienta Reciente',
    rating: 5,
    comment: 'La limpieza facial es espectacular, nunca había tenido la piel tan firme y limpia de impurezas. Carmen es encantadora y explica todo súper bien.',
    date: 'Hace 1 mes'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    category: 'Citas',
    question: '¿Es necesario reservar cita previa con mucha antelación?',
    answer: 'Sí, como indican nuestras clientas, el volumen de reservas gestionado directamente por Carmen es elevado. Recomendamos agendar tu tratamiento ideal con al menos 1 o 2 semanas de antelación para asegurar tu hueco preferido.'
  },
  {
    id: 'faq-2',
    category: 'Tratamientos',
    question: '¿Qué diferencia a Vegari de otros centros de estética en Ciudad Real?',
    answer: 'Nuestros 20 años de experiencia, el trato 100% individualizado liderado por Carmen, y un compromiso absoluto con la "Limpieza de 10". Nos enfocamos en cosmética avanzada (colaboración con marcas prestigiosas como Farmasi) y metodologías que aseguran resultados visibles y un bienestar higiénico impecable.'
  },
  {
    id: 'faq-3',
    category: 'Novias',
    question: '¿Con cuánto tiempo de antelación debe una novia reservar su plan de bodas?',
    answer: 'Para lograr una piel radiante, joven y firme para el día de tu boda, recomendamos iniciar el pack de novias entre 2 y 3 meses antes del evento. Esto permite realizar tratamientos secuenciales de regeneración y pruebas de estética sin prisas.'
  },
  {
    id: 'faq-4',
    category: 'Productos',
    question: '¿Ofrecéis asesoramiento de productos para continuar la rutina en casa?',
    answer: 'Por supuesto. Cada sesión incluye un diagnóstico dérmico y un diseño de rutina personalizado con recomendaciones de productos de alta seguridad dermatológica, asegurando que los beneficios de cabina perduren en casa.'
  }
];
