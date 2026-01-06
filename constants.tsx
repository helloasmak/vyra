
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'airport',
    title: 'Airport Transfer',
    image: 'https://cdn.prod.website-files.com/61fc302889864bb79c5ef818/662af4a0dc1169619f1d100b_Luxurious_Black_Range_Rover_Vogue_with_chauffaur_Paris_Cdg_Airport_dbsexperience.webp',
    shortDesc: 'VIP meet-and-greet at Marrakech Menara.',
    fullDesc: 'Experience stress-free travel from the moment you land. Our chauffeurs track your flight in real-time and greet you with personalized signage at the arrivals gate. Includes luggage assistance and premium refreshments in-car.',
    features: ['Real-time Flight Tracking', 'Meet & Greet Service', 'Luggage Porterage', 'Onboard WiFi', 'Complimentary Drinks']
  },
  {
    id: 'golf',
    title: 'Golf Transfers',
    image: 'https://www.villapremium.fr/images/servicepages/609d9a838cfb2-golf%20marrakech.jpg',
    shortDesc: 'Luxury transport to the city’s elite greens.',
    fullDesc: 'Custom transport solutions for golfers. We provide spacious vehicles for your equipment and ensure you arrive at courses like Royal Golf Marrakech or Assoufid in perfect time.',
    features: ['Club Storage Management', 'Course-Side Drop-off', 'Caddie Coordination', 'Equipment Security']
  },
  {
    id: 'desert',
    title: 'City & Desert Tours',
    image: 'https://chicmorocco.com/wp-content/uploads/2024/10/campamento-jaimas-de-lujo-desierto.jpg',
    shortDesc: 'Curated journeys to Medina and Agafay.',
    fullDesc: 'Uncover the secrets of the Red City or escape to the lunar landscapes of Agafay. Our chauffeurs serve as local insiders, tailoring every stop to your curiosity.',
    features: ['Certified Driver-Guides', 'Tailored Itineraries', 'Sunset Excursions', 'Cultural Highlights']
  },
  {
    id: 'tailored',
    title: 'Tailored Day Trips',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Morocco_-_Essaouira_Part_2_%2831679848385%29.jpg/1200px-Morocco_-_Essaouira_Part_2_%2831679848385%29.jpg',
    shortDesc: 'Custom excursions to the Atlas or Coast.',
    fullDesc: 'Explore Morocco on your own terms. Whether it is the Atlantic breeze of Essaouira or the snow-capped Atlas peaks, we design the day around your pace.',
    features: ['Private Planning', 'Concierge Reservations', 'Flexible Duration', 'Mountain-Ready Fleet']
  },
  {
    id: 'event',
    title: 'Event Chauffeur',
    image: 'https://www.executivecentre.com/_next/image/?url=https%3A%2F%2Fassets.executivecentre.com%2Fassets%2FArticle-EventPlanningGuide-Header.jpg&w=3840&q=75',
    shortDesc: 'Elegant transport for weddings and galas.',
    fullDesc: 'Arrivals that make a statement. We coordinate multi-vehicle fleets for international weddings and red-carpet events with absolute precision.',
    features: ['Coordinated Fleet Arrival', 'Discreet Security', 'Venue Liaison', 'Guest Logistics']
  },
  {
    id: 'corporate',
    title: 'Executive Travel',
    image: 'https://americancarservicenj.com/wp-content/uploads/2022/12/What-is-Corporate-Car-Service.jpeg',
    shortDesc: 'Discreet mobility for business leaders.',
    fullDesc: 'Designed for professionals who value time and privacy. Our executive service offers quiet, secure environments for work or rest between meetings.',
    features: ['Confidential Service', 'Premium Fleet', '24/7 Availability', 'Corporate Billing']
  }
];

export const FAQS = [
  {
    question: "How far in advance should I book?",
    answer: "For standard transfers, 24 hours is ideal. For events or multi-day tours, we recommend 72 hours to ensure your preferred vehicle and chauffeur are secured."
  },
  {
    question: "What languages do your chauffeurs speak?",
    answer: "Our elite team is multilingual, typically fluent in Arabic, French, and English. Specific language requests (German, Spanish, Italian) can be accommodated."
  },
  {
    question: "Do you offer airport meet-and-greet?",
    answer: "Yes, our chauffeurs wait at the arrivals hall with a personalized name sign and provide full assistance with luggage."
  },
  {
    question: "Can I book a vehicle by the hour?",
    answer: "Absolutely. Our 'At Disposal' service allows you to have a private chauffeur and luxury vehicle for as long as you need for shopping or business."
  }
];

export const PARTNERS = [
  {
    name: "Luxury DMCs",
    desc: "Destination Management Companies creating bespoke Moroccan itineraries for high-net-worth travelers."
  },
  {
    name: "Wedding Planners",
    desc: "Specialists in destination weddings and luxury events requiring elegant guest transportation."
  },
  {
    name: "Corporate Agencies",
    desc: "Providing executive transportation for business meetings, conferences, and incentive trips."
  },
  {
    name: "Luxury Hotels",
    desc: "Five-star properties seeking premium transportation partners for their discerning guests."
  }
];
