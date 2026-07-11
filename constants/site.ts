import type { NavGroup, TourCategory } from "@/types";

/** Central place for brand + contact info (wire to env/CMS later). */
export const siteConfig = {
  name: "TravelX",
  legalName: "TravelX Holidays Pvt. Ltd.",
  tagline: "Journeys crafted for the curious",
  description:
    "TravelX designs premium domestic and international holidays — luxury escapes, adventures, honeymoons, group tours and bespoke itineraries with 24/7 concierge support.",
  url: "https://travelx.example.com",
  ogImage: "/og.jpg",
  email: "hello@travelx.com",
  supportEmail: "support@travelx.com",
  phone: "+91 99180 01088",
  phoneHref: "tel:+919918001088",
  whatsapp: "919918001088",
  whatsappMessage: "Hi TravelX! I'd like to know more about your tour packages.",
  address: "Branch Office, Shop No-4, Chaudhari Heights, Above Swarna Hotel, Warje, Pune",
  hours: "Mon–Sat: 9:00 AM – 8:00 PM IST",
  founded: 2011,
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://x.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
  },
} as const;

export const whatsappLink = (message: string = siteConfig.whatsappMessage) =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;

/** Announcement bar rotating messages. */
export const announcements = [
  { text: "✨ Monsoon Sale — Flat 25% off on international holidays", href: "/tour-packages?type=international" },
  { text: "🏝️ Maldives honeymoon from ₹89,999 — limited villas left", href: "/honeymoon-tours" },
  { text: "🎒 Group departures for Ladakh & Spiti now open", href: "/group-tours" },
];

/** Primary navigation — mega menu structure. */
export const mainNav: NavGroup[] = [
  {
    label: "Destinations",
    href: "/destinations",
    columns: [
      {
        heading: "Popular in India",
        items: [
          { label: "Kerala", href: "/destinations/kerala", description: "Backwaters & tea hills" },
          { label: "Rajasthan", href: "/destinations/rajasthan", description: "Palaces & desert" },
          { label: "Goa", href: "/destinations/goa", description: "Beaches & nightlife" },
          { label: "Ladakh", href: "/destinations/ladakh", description: "High-altitude adventure" },
        ],
      },
      {
        heading: "International",
        items: [
          { label: "Maldives", href: "/destinations/maldives", description: "Overwater villas" },
          { label: "Switzerland", href: "/destinations/switzerland", description: "Alps & lakes" },
          { label: "Bali", href: "/destinations/bali", description: "Temples & rice terraces" },
          { label: "Dubai", href: "/destinations/dubai", description: "Luxury & desert" },
        ],
      },
      {
        heading: "By Interest",
        items: [
          { label: "Beach escapes", href: "/tour-packages?category=beach" },
          { label: "Mountains", href: "/adventure-tours" },
          { label: "Wildlife safaris", href: "/tour-packages?category=wildlife" },
          { label: "All destinations", href: "/destinations", featured: true },
        ],
      },
    ],
  },
  {
    label: "Tours",
    href: "/tour-packages",
    columns: [
      {
        heading: "By Style",
        items: [
          { label: "Luxury Tours", href: "/luxury-tours", description: "5★ curated stays" },
          { label: "Adventure Tours", href: "/adventure-tours", description: "Treks & thrills" },
          { label: "Honeymoon Tours", href: "/honeymoon-tours", description: "Romantic getaways" },
          { label: "Family Tours", href: "/family-tours", description: "Fun for all ages" },
        ],
      },
      {
        heading: "By Group",
        items: [
          { label: "Group Tours", href: "/group-tours", description: "Join fixed departures" },
          { label: "Weekend Tours", href: "/weekend-tours", description: "Quick 2–3 day trips" },
          { label: "Pilgrimage Tours", href: "/pilgrimage-tours", description: "Spiritual journeys" },
          { label: "Corporate Tours", href: "/corporate-tours", description: "Offsites & MICE" },
        ],
      },
      {
        heading: "Plan your way",
        items: [
          { label: "All Packages", href: "/tour-packages" },
          { label: "Custom Tour Planner", href: "/custom-tour-planner", featured: true },
          { label: "AI Trip Planner", href: "/custom-tour-planner#ai" },
          { label: "Special Offers", href: "/tour-packages?offers=true" },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    columns: [
      {
        heading: "Travel Services",
        items: [
          { label: "Visa Services", href: "/visa-services" },
          { label: "Travel Insurance", href: "/travel-insurance" },
          { label: "Hotel Booking", href: "/hotel-booking" },
          { label: "Flight Booking", href: "/flight-booking" },
        ],
      },
      {
        heading: "On-ground",
        items: [
          { label: "Transportation", href: "/transportation" },
          { label: "Airport Transfers", href: "/transportation#transfers" },
          { label: "Travel Calculator", href: "/custom-tour-planner#calculator" },
          { label: "Currency Converter", href: "/custom-tour-planner#currency" },
        ],
      },
    ],
  },
  {
    label: "Explore",
    columns: [
      {
        heading: "Discover",
        items: [
          { label: "Gallery", href: "/gallery" },
          { label: "Videos", href: "/videos" },
          { label: "Travel Blog", href: "/blog" },
          { label: "Testimonials", href: "/testimonials" },
        ],
      },
      {
        heading: "Company",
        items: [
          { label: "About Us", href: "/about" },
          { label: "Careers", href: "/career" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/career" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Travel Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  "Tour Styles": [
    { label: "Luxury Tours", href: "/luxury-tours" },
    { label: "Adventure Tours", href: "/adventure-tours" },
    { label: "Honeymoon Tours", href: "/honeymoon-tours" },
    { label: "Family Tours", href: "/family-tours" },
    { label: "Group Tours", href: "/group-tours" },
  ],
  Services: [
    { label: "Visa Services", href: "/visa-services" },
    { label: "Travel Insurance", href: "/travel-insurance" },
    { label: "Hotel Booking", href: "/hotel-booking" },
    { label: "Flight Booking", href: "/flight-booking" },
    { label: "Transportation", href: "/transportation" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Custom Tour Planner", href: "/custom-tour-planner" },
  ],
};

export interface CategoryMeta {
  key: TourCategory;
  label: string;
  href: string;
  icon: string;
  description: string;
  image: string;
}

/** Tour categories used across home tiles, filters and mega menus. */
export const tourCategories: CategoryMeta[] = [
  {
    key: "luxury",
    label: "Luxury Escapes",
    href: "/luxury-tours",
    icon: "Gem",
    description: "Five-star stays & private experiences",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    key: "adventure",
    label: "Adventure",
    href: "/adventure-tours",
    icon: "Mountain",
    description: "Treks, rafting & adrenaline",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
  },
  {
    key: "honeymoon",
    label: "Honeymoon",
    href: "/honeymoon-tours",
    icon: "Heart",
    description: "Romantic getaways for two",
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
  },
  {
    key: "family",
    label: "Family",
    href: "/family-tours",
    icon: "Users",
    description: "Fun & safe for all ages",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
  },
  {
    key: "pilgrimage",
    label: "Pilgrimage",
    href: "/pilgrimage-tours",
    icon: "Landmark",
    description: "Sacred & spiritual journeys",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
  },
  {
    key: "weekend",
    label: "Weekend",
    href: "/weekend-tours",
    icon: "CalendarDays",
    description: "Quick 2–3 day escapes",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    key: "group",
    label: "Group Tours",
    href: "/group-tours",
    icon: "Flag",
    description: "Meet fellow travellers",
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=800&q=80",
  },
  {
    key: "corporate",
    label: "Corporate",
    href: "/corporate-tours",
    icon: "Briefcase",
    description: "Offsites, MICE & incentives",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
];
