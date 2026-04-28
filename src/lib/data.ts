export type PropertyType = 'land' | 'house' | 'apartment';

export interface Property {
  id: string;
  title: string;
  price: number;
  formattedPrice: string;
  location: string;
  type: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  images: string[];
  videoUrl?: string;
  features: string[];
}

export const PROPERTIES: Property[] = [
  {
    id: "1",
    title: "East Legon Hills Prime Land",
    price: 150000,
    formattedPrice: "GH₵ 150,000",
    location: "East Legon Hills, Accra",
    type: "land",
    beds: 0,
    baths: 0,
    sqft: 7000,
    description: "Build your dream home on this prime, litigation-free plot located in the highly sought-after East Legon Hills. Fully serviced with water and electricity.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    features: ["Walled and Gated", "Tarred Roads", "Water Connection", "Electricity Available"],
  },
  {
    id: "2",
    title: "Modern 3-Bed House",
    price: 850000,
    formattedPrice: "GH₵ 850,000",
    location: "Oyarifa, Accra",
    type: "house",
    beds: 3,
    baths: 4,
    sqft: 2200,
    description: "A stunning, newly-built 3-bedroom en-suite house. Features a spacious living area, modern fitted kitchen, and a compound large enough for 3 cars.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687931-cecebd802404?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: ["Fitted Kitchen", "En-suite Bedrooms", "CCTV Cameras", "Electric Fence", "Water Heater"],
  },
  {
    id: "3",
    title: "Luxury Serviced Plot",
    price: 80000,
    formattedPrice: "GH₵ 80,000",
    location: "Prampram, Greater Accra",
    type: "land",
    beds: 0,
    baths: 0,
    sqft: 5000,
    description: "Secure your future with this affordable plot in a fast-developing, serene neighborhood in Prampram. Just 10 minutes from the beach.",
    images: [
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Proximity to Beach", "Litigation Free", "Flexible Payment Plan"],
  },
  {
    id: "4",
    title: "Executive 4-Bed Villa",
    price: 1200000,
    formattedPrice: "GH₵ 1,200,000",
    location: "Cantonments, Accra",
    type: "house",
    beds: 4,
    baths: 5,
    sqft: 3500,
    description: "Experience the pinnacle of luxury living in Cantonments. This executive 4-bedroom villa comes with a private pool, boys quarters, and 24/7 security.",
    images: [
      "https://images.unsplash.com/photo-1600607687931-cecebd802404?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: ["Private Pool", "Boys Quarters", "24/7 Security", "Generator", "Fully Furnished Option"],
  },
  {
    id: "5",
    title: "High-Rise Studio Apartment",
    price: 450000,
    formattedPrice: "GH₵ 450,000",
    location: "Airport Residential, Accra",
    type: "apartment",
    beds: 1,
    baths: 1,
    sqft: 800,
    description: "Perfect investment opportunity. A chic studio apartment in the heart of Airport Residential area with great Airbnb potential.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1e525082ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Gym", "Communal Pool", "Balcony", "Basement Parking", "Concierge Service"],
  },
  {
    id: "6",
    title: "Spacious 2-Bed Apartment",
    price: 600000,
    formattedPrice: "GH₵ 600,000",
    location: "Dzorwulu, Accra",
    type: "apartment",
    beds: 2,
    baths: 2,
    sqft: 1200,
    description: "Contemporary 2-bedroom apartment situated in a quiet cul-de-sac in Dzorwulu. Close to major business districts and shopping centers.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1e525082ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: ["Fitted Wardrobes", "Backup Water", "Security Camera", "Air Conditioning"],
  }
];
