
export interface Service {
  id: string;
  title: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  image: string;
  passengers: number;
  luggage: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
