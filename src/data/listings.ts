import { Listing } from '../features/listings/types';

const categories: Listing['category'][] = ['beach', 'mountain', 'city', 'countryside'];

// Base 6 listings from Assignment 1 — kept as-is
const baseListing: Listing[] = [
  {
    id: 1, title: "Beachfront Villa with Ocean View",
    location: "Malibu, California", price: 420, rating: 4.97,
    superhost: true, available: true, availableFrom: "2025-01-12",
    img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=260&fit=crop",
    category: "beach",
  },
  {
    id: 2, title: "Cozy Mountain Cabin Retreat",
    location: "Aspen, Colorado", price: 185, rating: 4.82,
    superhost: false, available: true, availableFrom: "2025-02-01",
    img: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=400&h=260&fit=crop",
    category: "mountain",
  },
  {
    id: 3, title: "Modern Downtown Loft",
    location: "New York City, New York", price: 275, rating: 4.91,
    superhost: true, available: false, availableFrom: "2025-03-15",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=260&fit=crop",
    category: "city",
  },
  {
    id: 4, title: "Rustic Countryside Farmhouse",
    location: "Tuscany, Italy", price: 210, rating: 4.76,
    superhost: false, available: true, availableFrom: "2025-01-20",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=260&fit=crop",
    category: "countryside",
  },
  {
    id: 5, title: "Luxury Cliffside Beach House",
    location: "Santorini, Greece", price: 550, rating: 4.99,
    superhost: true, available: true, availableFrom: "2025-02-14",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=260&fit=crop",
    category: "beach",
  },
  {
    id: 6, title: "Charming City Studio Apartment",
    location: "Paris, France", price: 160, rating: 4.65,
    superhost: false, available: true, availableFrom: "2025-01-28",
    img: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=400&h=260&fit=crop",
    category: "city",
  },
];

// Generate listings 7-50 programmatically
const locations = [
  "Barcelona, Spain", "Tokyo, Japan", "Cape Town, South Africa",
  "Sydney, Australia", "Amsterdam, Netherlands", "Bali, Indonesia",
  "Dubai, UAE", "London, UK", "Bangkok, Thailand", "Rome, Italy",
  "Lisbon, Portugal", "Mexico City, Mexico", "Buenos Aires, Argentina",
  "Vancouver, Canada", "Seoul, South Korea", "Prague, Czech Republic",
  "Istanbul, Turkey", "Marrakech, Morocco", "Vienna, Austria",
  "Stockholm, Sweden", "Dubai, UAE", "Nairobi, Kenya",
  "Lagos, Nigeria", "Cairo, Egypt", "Accra, Ghana",
  "Kigali, Rwanda", "Zanzibar, Tanzania", "Casablanca, Morocco",
  "Dakar, Senegal", "Johannesburg, South Africa", "Addis Ababa, Ethiopia",
  "Kampala, Uganda", "Dar es Salaam, Tanzania", "Abuja, Nigeria",
  "Lusaka, Zambia", "Harare, Zimbabwe", "Maputo, Mozambique",
  "Windhoek, Namibia", "Gaborone, Botswana", "Freetown, Sierra Leone",
  "Bamako, Mali", "Ouagadougou, Burkina Faso", "Niamey, Niger",
  "Conakry, Guinea",
];

const images = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=260&fit=crop",
];

const titles = [
  "Stunning Sea View Apartment", "Peaceful Forest Hideaway",
  "Urban Chic Studio", "Rolling Hills Cottage",
  "Seaside Escape Bungalow", "Mountain Peak Chalet",
  "City Center Penthouse", "Countryside Manor House",
  "Tropical Garden Villa", "Lakeside Retreat Cabin",
];

// Generate listings 7 through 50
const generatedListings: Listing[] = Array.from({ length: 44 }, (_, i) => ({
  id: i + 7,
  title: titles[i % titles.length] + ` ${i + 7}`,
  location: locations[i % locations.length],
  price: Math.floor(Math.random() * 500) + 100,
  rating: Math.round((Math.random() * 1.5 + 3.5) * 100) / 100,
  superhost: i % 3 === 0,
  available: i % 5 !== 0,
  availableFrom: `2025-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
  img: images[i % images.length],
  category: categories[i % categories.length],
}));

export const listings: Listing[] = [...baseListing, ...generatedListings];