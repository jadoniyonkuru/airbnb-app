export interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  superhost: boolean;
  available: boolean;
  availableFrom: string; // ISO date e.g. "2025-01-12"
  img: string;
  category: 'beach' | 'mountain' | 'city' | 'countryside';
}