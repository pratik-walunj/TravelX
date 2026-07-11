import type { Stat } from "@/types";

/** Headline metrics for the counters / trust section. */
export const stats: Stat[] = [
  { label: "Happy Travellers", value: 148000, suffix: "+", icon: "Users" },
  { label: "Destinations", value: 320, suffix: "+", icon: "MapPin" },
  { label: "Tour Packages", value: 1200, suffix: "+", icon: "Briefcase" },
  { label: "Years of Excellence", value: 14, suffix: "+", icon: "Award" },
  { label: "5-Star Reviews", value: 9600, suffix: "+", icon: "Star" },
  { label: "Repeat Customers", value: 92, suffix: "%", icon: "Repeat" },
];

/** "Why choose us" pillars. */
export const usps = [
  { icon: "ShieldCheck", title: "100% Safe & Secure", description: "Verified partners, secure payments and full financial protection on every booking." },
  { icon: "BadgeIndianRupee", title: "Best Price Guarantee", description: "Find it cheaper elsewhere and we'll match it — premium travel without the premium markup." },
  { icon: "Headphones", title: "24/7 Concierge", description: "Real humans on WhatsApp and phone, before, during and after your trip — any timezone." },
  { icon: "MapPinned", title: "Handcrafted Itineraries", description: "Every trip is designed by destination experts, not spat out by a template." },
  { icon: "Users", title: "Trusted by 148k+", description: "Fourteen years, six continents and a 92% repeat rate. We must be doing something right." },
  { icon: "Sparkles", title: "Curated Experiences", description: "Skip-the-line access, private guides and moments money usually can't buy." },
];

/** How-it-works travel process steps. */
export const travelProcess = [
  { step: 1, icon: "Search", title: "Discover", description: "Browse handpicked destinations and packages, or tell us your dream trip." },
  { step: 2, icon: "MessageSquare", title: "Personalise", description: "Our experts tailor the itinerary, stays and budget exactly to you." },
  { step: 3, icon: "CreditCard", title: "Book Securely", description: "Confirm with flexible payment options and instant confirmation." },
  { step: 4, icon: "Plane", title: "Travel Happy", description: "Pack your bags — we handle everything with 24/7 support on the ground." },
];

export const partners = [
  "Emirates", "Taj Hotels", "Marriott", "Qatar Airways", "IndiGo", "Oberoi",
  "Singapore Airlines", "Accor", "Vistara", "Hyatt",
];
