export interface Treatment {
  id: string;
  category: 'facial' | 'corporal' | 'novias' | 'uñas' | 'premium';
  name: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  imageUrl: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}
