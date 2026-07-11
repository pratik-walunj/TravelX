/**
 * TravelX — Core domain types.
 * These model the shapes a real backend/API would return, so screens can be
 * wired to live data with minimal changes.
 */

export type TourCategory =
  | "luxury"
  | "adventure"
  | "family"
  | "honeymoon"
  | "pilgrimage"
  | "weekend"
  | "group"
  | "corporate"
  | "wildlife"
  | "cruise"
  | "beach"
  | "cultural";

export type TripType = "domestic" | "international";

export interface Money {
  amount: number;
  currency: "INR" | "USD" | "EUR" | "GBP" | "AED";
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  continent: string;
  type: TripType;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  coordinates: Coordinates;
  rating: number;
  reviewCount: number;
  packageCount: number;
  startingPrice: number;
  bestTimeToVisit: string[];
  idealDuration: string;
  weather: { season: string; temp: string; note: string }[];
  activities: string[];
  highlights: string[];
  trending: boolean;
  featured: boolean;
  tags: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: ("Breakfast" | "Lunch" | "Dinner")[];
  stay?: string;
  activities: string[];
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  destinationSlug: string;
  destination: string;
  country: string;
  type: TripType;
  category: TourCategory;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  durationDays: number;
  durationNights: number;
  price: number;
  oldPrice: number;
  currency: Money["currency"];
  rating: number;
  reviewCount: number;
  groupSize: { min: number; max: number };
  difficulty: "Easy" | "Moderate" | "Challenging";
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  hotels: { name: string; rating: number; nights: number }[];
  departureCities: string[];
  availableDates: string[];
  seatsLeft: number;
  featured: boolean;
  trending: boolean;
  bestseller: boolean;
  tags: string[];
  themes: string[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  source: "Google" | "TripAdvisor" | "TravelX" | "Facebook";
  packageSlug?: string;
  destinationSlug?: string;
  verified: boolean;
  helpfulCount: number;
  tripType?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  category: string;
  tags: string[];
  author: { name: string; avatar: string; role: string };
  publishedAt: string;
  readingMinutes: number;
  featured: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discountLabel: string;
  image: string;
  expiresAt: string;
  badge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  trip: string;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  featured?: boolean;
}

export interface NavGroup {
  label: string;
  href?: string;
  items?: NavItem[];
  columns?: { heading: string; items: NavItem[] }[];
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: string;
}
