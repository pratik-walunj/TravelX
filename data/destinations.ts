import type { Destination, TripType } from "@/types";
import { rng, between, round2, slugify } from "./seed";
import { travelImages } from "./images";

/** Compact seed rows — the generator expands these into full Destination objects. */
interface Seed {
  name: string;
  country: string;
  continent: string;
  type: TripType;
  tagline: string;
  lat: number;
  lng: number;
  img: string;
  activities: string[];
  highlights: string[];
  best: string[];
  duration: string;
  featured?: boolean;
  trending?: boolean;
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const seeds: Seed[] = [
  { name: "Kerala", country: "India", continent: "Asia", type: "domestic", tagline: "God's own backwaters & misty hills", lat: 10.85, lng: 76.27, img: img("1602216056096-3b40cc0c9944"), activities: ["Houseboat cruise", "Ayurveda spa", "Tea plantation walk", "Kathakali show"], highlights: ["Alleppey backwaters", "Munnar tea gardens", "Fort Kochi", "Periyar wildlife"], best: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"], duration: "5–7 days", featured: true, trending: true },
  { name: "Rajasthan", country: "India", continent: "Asia", type: "domestic", tagline: "Land of kings, palaces & golden dunes", lat: 27.02, lng: 74.21, img: img("1477587458883-47145ed94245"), activities: ["Desert safari", "Palace tour", "Camel ride", "Folk dinner"], highlights: ["Amber Fort", "Udaipur lakes", "Jaisalmer dunes", "Jodhpur blue city"], best: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"], duration: "6–8 days", featured: true },
  { name: "Goa", country: "India", continent: "Asia", type: "domestic", tagline: "Sun, sand & Susegad vibes", lat: 15.3, lng: 74.12, img: img("1512343879784-a960bf40e7f2"), activities: ["Beach hopping", "Water sports", "Nightlife", "Spice farm"], highlights: ["Baga & Palolem", "Old Goa churches", "Dudhsagar Falls", "Flea markets"], best: ["Nov", "Dec", "Jan", "Feb"], duration: "3–5 days", trending: true },
  { name: "Ladakh", country: "India", continent: "Asia", type: "domestic", tagline: "Roof of the world, land of high passes", lat: 34.15, lng: 77.57, img: img("1581793745862-99fde7fa73d2"), activities: ["Bike expedition", "Monastery tour", "River rafting", "Stargazing"], highlights: ["Pangong Lake", "Nubra Valley", "Khardung La", "Thiksey Monastery"], best: ["May", "Jun", "Jul", "Aug", "Sep"], duration: "6–9 days", featured: true, trending: true },
  { name: "Himachal Pradesh", country: "India", continent: "Asia", type: "domestic", tagline: "Pine forests & Himalayan hamlets", lat: 31.1, lng: 77.17, img: img("1626621341517-bbf3d9990a23"), activities: ["Trekking", "Paragliding", "Camping", "Apple orchards"], highlights: ["Manali", "Shimla ridge", "Spiti Valley", "Kasol"], best: ["Mar", "Apr", "May", "Jun", "Oct"], duration: "5–7 days", trending: true },
  { name: "Andaman Islands", country: "India", continent: "Asia", type: "domestic", tagline: "Turquoise waters & coral reefs", lat: 11.74, lng: 92.65, img: img("1589979481223-deb893043163"), activities: ["Scuba diving", "Snorkeling", "Island hopping", "Sea walk"], highlights: ["Radhanagar Beach", "Havelock", "Cellular Jail", "Neil Island"], best: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"], duration: "5–6 days", featured: true },
  { name: "Kashmir", country: "India", continent: "Asia", type: "domestic", tagline: "Paradise on earth", lat: 34.08, lng: 74.8, img: img("1566837497312-7be7a1b3b3c2"), activities: ["Shikara ride", "Gondola cable car", "Gardens tour", "Skiing"], highlights: ["Dal Lake", "Gulmarg", "Pahalgam", "Sonamarg"], best: ["Mar", "Apr", "May", "Jun", "Sep", "Oct"], duration: "5–7 days", trending: true },
  { name: "Meghalaya", country: "India", continent: "Asia", type: "domestic", tagline: "Abode of clouds & living root bridges", lat: 25.47, lng: 91.37, img: img("1627920768047-7c1f31f0f9b3"), activities: ["Root bridge trek", "Cave exploration", "Waterfall chasing", "Kayaking"], highlights: ["Cherrapunji", "Dawki river", "Double-decker bridge", "Shillong"], best: ["Oct", "Nov", "Dec", "Mar", "Apr"], duration: "5–6 days" },
  { name: "Sikkim", country: "India", continent: "Asia", type: "domestic", tagline: "Himalayan serenity below Kanchenjunga", lat: 27.53, lng: 88.51, img: img("1544735716-392fe2489ffa"), activities: ["Monastery visit", "Yak ride", "Trekking", "Tea tasting"], highlights: ["Gangtok", "Tsomgo Lake", "Nathula Pass", "Pelling"], best: ["Mar", "Apr", "May", "Oct", "Nov"], duration: "5–7 days" },
  { name: "Uttarakhand", country: "India", continent: "Asia", type: "domestic", tagline: "Land of the gods & yoga capitals", lat: 30.07, lng: 79.09, img: img("1571536802807-30451e3955d8"), activities: ["River rafting", "Yoga retreat", "Wildlife safari", "Char Dham"], highlights: ["Rishikesh", "Nainital", "Jim Corbett", "Valley of Flowers"], best: ["Feb", "Mar", "Apr", "May", "Jun", "Sep", "Oct"], duration: "5–7 days" },

  { name: "Maldives", country: "Maldives", continent: "Asia", type: "international", tagline: "Overwater villas & endless lagoons", lat: 3.2, lng: 73.22, img: img("1514282401047-d79a71a590e8"), activities: ["Snorkeling", "Sunset cruise", "Overwater spa", "Diving"], highlights: ["Private island resorts", "House reefs", "Bioluminescent beach", "Maafushi"], best: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"], duration: "4–6 days", featured: true, trending: true },
  { name: "Bali", country: "Indonesia", continent: "Asia", type: "international", tagline: "Island of temples & rice terraces", lat: -8.34, lng: 115.09, img: img("1537996194471-e657df975ab4"), activities: ["Temple tour", "Surfing", "Rice terrace trek", "Spa"], highlights: ["Ubud", "Uluwatu", "Tegallalang", "Nusa Penida"], best: ["Apr", "May", "Jun", "Sep", "Oct"], duration: "6–8 days", featured: true, trending: true },
  { name: "Switzerland", country: "Switzerland", continent: "Europe", type: "international", tagline: "Alpine peaks, lakes & scenic rails", lat: 46.82, lng: 8.23, img: img("1530122037265-a5f1f91d3b99"), activities: ["Scenic train", "Cable car", "Lake cruise", "Skiing"], highlights: ["Jungfraujoch", "Interlaken", "Lucerne", "Zermatt"], best: ["May", "Jun", "Jul", "Aug", "Sep", "Dec"], duration: "7–9 days", featured: true, trending: true },
  { name: "Dubai", country: "UAE", continent: "Asia", type: "international", tagline: "Futuristic skyline meets desert gold", lat: 25.2, lng: 55.27, img: img("1512453979798-5ea266f8880c"), activities: ["Desert safari", "Burj Khalifa", "Dhow cruise", "Shopping"], highlights: ["Burj Khalifa", "Palm Jumeirah", "Desert dunes", "Dubai Marina"], best: ["Nov", "Dec", "Jan", "Feb", "Mar"], duration: "5–7 days", featured: true, trending: true },
  { name: "Singapore", country: "Singapore", continent: "Asia", type: "international", tagline: "The Lion City of gardens & lights", lat: 1.35, lng: 103.82, img: img("1525625293386-3f8f99389edd"), activities: ["Universal Studios", "Gardens by the Bay", "River cruise", "Sentosa"], highlights: ["Marina Bay Sands", "Merlion", "Sentosa", "Chinatown"], best: ["Feb", "Mar", "Apr", "Jul", "Aug"], duration: "4–6 days", trending: true },
  { name: "Thailand", country: "Thailand", continent: "Asia", type: "international", tagline: "Beaches, temples & street feasts", lat: 15.87, lng: 100.99, img: img("1552465011-b4e21bf6e79a"), activities: ["Island tour", "Temple hop", "Thai massage", "Night market"], highlights: ["Bangkok", "Phuket", "Krabi", "Chiang Mai"], best: ["Nov", "Dec", "Jan", "Feb", "Mar"], duration: "6–8 days", featured: true },
  { name: "Paris", country: "France", continent: "Europe", type: "international", tagline: "The city of light & love", lat: 48.86, lng: 2.35, img: img("1502602898657-3e91760cbb34"), activities: ["Eiffel Tower", "Seine cruise", "Louvre", "Café hopping"], highlights: ["Eiffel Tower", "Louvre", "Montmartre", "Versailles"], best: ["Apr", "May", "Jun", "Sep", "Oct"], duration: "5–7 days", trending: true },
  { name: "Santorini", country: "Greece", continent: "Europe", type: "international", tagline: "Whitewashed cliffs over the Aegean", lat: 36.39, lng: 25.46, img: img("1570077188670-e3a8d69ac5ff"), activities: ["Caldera cruise", "Wine tasting", "Sunset at Oia", "Beach day"], highlights: ["Oia sunset", "Fira", "Red Beach", "Ancient Thera"], best: ["May", "Jun", "Sep", "Oct"], duration: "5–7 days", featured: true },
  { name: "Bora Bora", country: "French Polynesia", continent: "Oceania", type: "international", tagline: "The pearl of the Pacific", lat: -16.5, lng: -151.74, img: img("1589979481223-deb893043163"), activities: ["Lagoon tour", "Snorkeling", "Overwater bungalow", "Shark dive"], highlights: ["Mount Otemanu", "Matira Beach", "Coral gardens", "Lagoonarium"], best: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"], duration: "5–7 days" },
  { name: "Iceland", country: "Iceland", continent: "Europe", type: "international", tagline: "Fire, ice & northern lights", lat: 64.96, lng: -19.02, img: img("1504829857797-ddff29c27927"), activities: ["Northern lights", "Glacier hike", "Blue Lagoon", "Golden Circle"], highlights: ["Reykjavik", "Blue Lagoon", "Golden Circle", "Jökulsárlón"], best: ["Jun", "Jul", "Aug", "Sep", "Feb", "Mar"], duration: "6–8 days", trending: true },
  { name: "Japan", country: "Japan", continent: "Asia", type: "international", tagline: "Where tradition meets neon future", lat: 36.2, lng: 138.25, img: img("1493976040374-85c8e12f0c0e"), activities: ["Bullet train", "Temple tour", "Cherry blossom", "Sushi crawl"], highlights: ["Tokyo", "Kyoto", "Mt Fuji", "Osaka"], best: ["Mar", "Apr", "May", "Oct", "Nov"], duration: "8–10 days", featured: true, trending: true },
  { name: "Turkey", country: "Turkey", continent: "Asia", type: "international", tagline: "Bazaars, balloons & Byzantine wonders", lat: 38.96, lng: 35.24, img: img("1541432901042-2d8bd64b4a9b"), activities: ["Hot air balloon", "Cave hotel", "Bosphorus cruise", "Bazaar shopping"], highlights: ["Cappadocia", "Istanbul", "Pamukkale", "Ephesus"], best: ["Apr", "May", "Jun", "Sep", "Oct"], duration: "7–9 days", trending: true },
  { name: "Vietnam", country: "Vietnam", continent: "Asia", type: "international", tagline: "Emerald bays & lantern-lit towns", lat: 14.06, lng: 108.28, img: img("1528127269322-539801943592"), activities: ["Ha Long cruise", "Street food tour", "Cave kayaking", "Cyclo ride"], highlights: ["Ha Long Bay", "Hoi An", "Hanoi", "Sapa"], best: ["Feb", "Mar", "Apr", "Oct", "Nov"], duration: "7–9 days" },
  { name: "Sri Lanka", country: "Sri Lanka", continent: "Asia", type: "international", tagline: "Tea country, temples & tropical coasts", lat: 7.87, lng: 80.77, img: img("1546708973-b339540b5162"), activities: ["Train to Ella", "Safari", "Temple visit", "Whale watching"], highlights: ["Kandy", "Ella", "Sigiriya", "Galle"], best: ["Dec", "Jan", "Feb", "Mar", "Apr"], duration: "6–8 days" },
  { name: "Nepal", country: "Nepal", continent: "Asia", type: "international", tagline: "Himalayan trails & living heritage", lat: 28.39, lng: 84.12, img: img("1544735716-392fe2489ffa"), activities: ["Everest trek", "Paragliding", "Temple tour", "Jungle safari"], highlights: ["Kathmandu", "Pokhara", "Annapurna", "Chitwan"], best: ["Mar", "Apr", "May", "Oct", "Nov"], duration: "7–10 days" },
  { name: "Bhutan", country: "Bhutan", continent: "Asia", type: "international", tagline: "The last Himalayan kingdom of happiness", lat: 27.51, lng: 90.43, img: img("1553856622-d1b352e9a211"), activities: ["Tiger's Nest trek", "Dzong tour", "Archery", "Hot stone bath"], highlights: ["Paro", "Thimphu", "Punakha", "Tiger's Nest"], best: ["Mar", "Apr", "May", "Sep", "Oct", "Nov"], duration: "6–8 days" },
  { name: "Mauritius", country: "Mauritius", continent: "Africa", type: "international", tagline: "Volcanic peaks & sugar-white beaches", lat: -20.35, lng: 57.55, img: img("1544644181-1484b3fdfc62"), activities: ["Catamaran cruise", "Underwater walk", "Waterfall tour", "Golf"], highlights: ["Le Morne", "Chamarel", "Ile aux Cerfs", "Port Louis"], best: ["May", "Jun", "Sep", "Oct", "Nov", "Dec"], duration: "5–7 days", featured: true },
  { name: "Egypt", country: "Egypt", continent: "Africa", type: "international", tagline: "Pyramids, pharaohs & the Nile", lat: 26.82, lng: 30.8, img: img("1539768942893-daf53e448371"), activities: ["Pyramid tour", "Nile cruise", "Temple visit", "Desert camp"], highlights: ["Giza Pyramids", "Luxor", "Aswan", "Cairo"], best: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"], duration: "7–9 days" },
  { name: "Kenya", country: "Kenya", continent: "Africa", type: "international", tagline: "The great migration & endless savanna", lat: -0.02, lng: 37.9, img: img("1516426122078-c23e76319801"), activities: ["Big Five safari", "Balloon safari", "Masai village", "Lake cruise"], highlights: ["Masai Mara", "Amboseli", "Nairobi", "Lake Nakuru"], best: ["Jul", "Aug", "Sep", "Oct", "Jan", "Feb"], duration: "6–8 days" },
  { name: "South Africa", country: "South Africa", continent: "Africa", type: "international", tagline: "Where two oceans and the wild meet", lat: -30.56, lng: 22.94, img: img("1484318571209-661cf29a69c3"), activities: ["Safari", "Cape tour", "Wine tasting", "Shark cage dive"], highlights: ["Cape Town", "Kruger", "Garden Route", "Table Mountain"], best: ["May", "Jun", "Jul", "Aug", "Sep"], duration: "8–10 days" },
  { name: "Australia", country: "Australia", continent: "Oceania", type: "international", tagline: "Reefs, outback & cosmopolitan coasts", lat: -25.27, lng: 133.77, img: img("1523482580672-f109ba8cb9be"), activities: ["Reef snorkeling", "Opera House tour", "Coastal drive", "Wildlife park"], highlights: ["Sydney", "Great Barrier Reef", "Melbourne", "Gold Coast"], best: ["Mar", "Apr", "May", "Sep", "Oct", "Nov"], duration: "9–12 days" },
  { name: "New Zealand", country: "New Zealand", continent: "Oceania", type: "international", tagline: "Middle-earth of fjords & adventure", lat: -40.9, lng: 174.89, img: img("1469521669194-babb45599def"), activities: ["Bungee jump", "Milford cruise", "Glowworm caves", "Jet boat"], highlights: ["Queenstown", "Milford Sound", "Rotorua", "Auckland"], best: ["Dec", "Jan", "Feb", "Mar", "Nov"], duration: "9–12 days" },
  { name: "Italy", country: "Italy", continent: "Europe", type: "international", tagline: "Art, ruins & la dolce vita", lat: 41.87, lng: 12.57, img: img("1523906834658-6e24ef2386f9"), activities: ["Colosseum tour", "Gondola ride", "Wine tour", "Vatican visit"], highlights: ["Rome", "Venice", "Florence", "Amalfi Coast"], best: ["Apr", "May", "Jun", "Sep", "Oct"], duration: "8–10 days", trending: true },
  { name: "Spain", country: "Spain", continent: "Europe", type: "international", tagline: "Flamenco, tapas & Gaudí dreams", lat: 40.46, lng: -3.75, img: img("1583422409516-2895a77efded"), activities: ["Sagrada tour", "Flamenco show", "Tapas crawl", "Beach day"], highlights: ["Barcelona", "Madrid", "Seville", "Granada"], best: ["Apr", "May", "Jun", "Sep", "Oct"], duration: "7–9 days" },
  { name: "Iceland Ring Road", country: "Iceland", continent: "Europe", type: "international", tagline: "Waterfalls, black sands & glaciers", lat: 65.0, lng: -18.0, img: img("1490080886466-6ea044b2ee9c"), activities: ["Waterfall tour", "Ice cave", "Whale watching", "Hot springs"], highlights: ["Vik", "Skaftafell", "Akureyri", "Diamond Beach"], best: ["Jun", "Jul", "Aug", "Sep"], duration: "8–10 days" },
  { name: "Norway Fjords", country: "Norway", continent: "Europe", type: "international", tagline: "Steep fjords & midnight sun", lat: 60.47, lng: 8.47, img: img("1516546453174-5e1098a4b4af"), activities: ["Fjord cruise", "Flåm railway", "Hiking", "Aurora hunt"], highlights: ["Bergen", "Geirangerfjord", "Tromsø", "Lofoten"], best: ["Jun", "Jul", "Aug", "Sep"], duration: "8–10 days" },
  { name: "Amsterdam", country: "Netherlands", continent: "Europe", type: "international", tagline: "Canals, bikes & golden-age charm", lat: 52.37, lng: 4.9, img: img("1534351590666-13e3e96b5017"), activities: ["Canal cruise", "Museum tour", "Bike ride", "Tulip fields"], highlights: ["Canal belt", "Van Gogh Museum", "Keukenhof", "Jordaan"], best: ["Apr", "May", "Jun", "Sep"], duration: "4–6 days" },
  { name: "London", country: "United Kingdom", continent: "Europe", type: "international", tagline: "Royal history & modern buzz", lat: 51.51, lng: -0.13, img: img("1513635269975-59663e0ac1ad"), activities: ["London Eye", "Palace tour", "West End show", "Thames cruise"], highlights: ["Big Ben", "Tower of London", "Buckingham Palace", "Soho"], best: ["May", "Jun", "Jul", "Aug", "Sep"], duration: "5–7 days" },
  { name: "Prague", country: "Czechia", continent: "Europe", type: "international", tagline: "The hundred-spired fairytale city", lat: 50.08, lng: 14.44, img: img("1541849546-216549ae216d"), activities: ["Castle tour", "River cruise", "Old town walk", "Beer tasting"], highlights: ["Charles Bridge", "Prague Castle", "Old Town Square", "Astronomical Clock"], best: ["Apr", "May", "Sep", "Oct"], duration: "4–6 days" },
  { name: "Phuket", country: "Thailand", continent: "Asia", type: "international", tagline: "Andaman beaches & island escapes", lat: 7.88, lng: 98.39, img: img("1552465011-b4e21bf6e79a"), activities: ["Phi Phi tour", "Snorkeling", "Big Buddha", "Beach clubs"], highlights: ["Patong", "Phi Phi Islands", "Old Town", "James Bond Island"], best: ["Nov", "Dec", "Jan", "Feb", "Mar"], duration: "5–7 days" },
  { name: "Hong Kong", country: "Hong Kong", continent: "Asia", type: "international", tagline: "Skyline drama & dim sum culture", lat: 22.32, lng: 114.17, img: img("1536599018102-9f803c140fc1"), activities: ["Peak Tram", "Disneyland", "Star Ferry", "Street food"], highlights: ["Victoria Peak", "Tsim Sha Tsui", "Lantau", "Mong Kok"], best: ["Oct", "Nov", "Dec", "Mar", "Apr"], duration: "4–6 days" },
  { name: "Seoul", country: "South Korea", continent: "Asia", type: "international", tagline: "K-culture, palaces & neon nights", lat: 37.57, lng: 126.98, img: img("1538485399081-7191377e8241"), activities: ["Palace tour", "K-pop experience", "Han river cruise", "Shopping"], highlights: ["Gyeongbokgung", "Myeongdong", "Bukchon", "Namsan Tower"], best: ["Apr", "May", "Sep", "Oct", "Nov"], duration: "5–7 days" },
  { name: "Cambodia", country: "Cambodia", continent: "Asia", type: "international", tagline: "Ancient temples lost in the jungle", lat: 12.57, lng: 104.99, img: img("1563492065599-3520f775eeed"), activities: ["Angkor tour", "Floating village", "Cooking class", "Tuk-tuk ride"], highlights: ["Angkor Wat", "Siem Reap", "Phnom Penh", "Tonlé Sap"], best: ["Nov", "Dec", "Jan", "Feb"], duration: "5–7 days" },
  { name: "Jordan", country: "Jordan", continent: "Asia", type: "international", tagline: "Rose-red city & Wadi Rum deserts", lat: 30.59, lng: 36.24, img: img("1548786811-dd6e453ccca7"), activities: ["Petra tour", "Desert camp", "Dead Sea float", "Jeep safari"], highlights: ["Petra", "Wadi Rum", "Dead Sea", "Amman"], best: ["Mar", "Apr", "May", "Oct", "Nov"], duration: "6–8 days" },
  { name: "Morocco", country: "Morocco", continent: "Africa", type: "international", tagline: "Medinas, dunes & mountain kasbahs", lat: 31.79, lng: -7.09, img: img("1489749798305-4fea3ae63d43"), activities: ["Sahara camp", "Medina tour", "Camel trek", "Riad stay"], highlights: ["Marrakech", "Fes", "Sahara", "Chefchaouen"], best: ["Mar", "Apr", "May", "Oct", "Nov"], duration: "7–9 days" },
  { name: "Tanzania", country: "Tanzania", continent: "Africa", type: "international", tagline: "Serengeti plains & Zanzibar shores", lat: -6.37, lng: 34.89, img: img("1547970810-dc1eac37d174"), activities: ["Serengeti safari", "Ngorongoro tour", "Kilimanjaro trek", "Beach day"], highlights: ["Serengeti", "Ngorongoro", "Zanzibar", "Kilimanjaro"], best: ["Jun", "Jul", "Aug", "Sep", "Oct"], duration: "8–10 days" },
  { name: "Peru", country: "Peru", continent: "South America", type: "international", tagline: "Inca trails to Machu Picchu", lat: -9.19, lng: -75.02, img: img("1526392060635-9d6019884377"), activities: ["Inca Trail", "Machu Picchu", "Sacred Valley", "Rainbow Mountain"], highlights: ["Machu Picchu", "Cusco", "Lima", "Lake Titicaca"], best: ["May", "Jun", "Jul", "Aug", "Sep"], duration: "8–10 days" },
  { name: "Brazil", country: "Brazil", continent: "South America", type: "international", tagline: "Carnival spirit, beaches & Amazon", lat: -14.24, lng: -51.93, img: img("1483729558449-99ef09a8c325"), activities: ["Christ the Redeemer", "Beach day", "Samba night", "Amazon tour"], highlights: ["Rio de Janeiro", "Iguazu Falls", "Amazon", "Salvador"], best: ["Dec", "Jan", "Feb", "Mar"], duration: "9–12 days" },
  { name: "USA West Coast", country: "USA", continent: "North America", type: "international", tagline: "Neon cities to national parks", lat: 36.78, lng: -119.42, img: img("1449034446853-66c86144b0ad"), activities: ["Grand Canyon", "Vegas nights", "Coastal drive", "Theme parks"], highlights: ["Los Angeles", "Las Vegas", "San Francisco", "Grand Canyon"], best: ["Apr", "May", "Sep", "Oct"], duration: "10–14 days" },
  { name: "Canada Rockies", country: "Canada", continent: "North America", type: "international", tagline: "Turquoise lakes & alpine giants", lat: 51.18, lng: -115.57, img: img("1609825488888-3a766db05542"), activities: ["Lake cruise", "Gondola ride", "Wildlife tour", "Glacier walk"], highlights: ["Banff", "Lake Louise", "Jasper", "Vancouver"], best: ["Jun", "Jul", "Aug", "Sep"], duration: "8–10 days" },
];

/** Fully-generated destination catalogue (deterministic). */
export const destinations: Destination[] = seeds.map((s, i) => {
  const r = rng(1000 + i);
  const rating = round2(4.3 + r() * 0.6);
  const gallery = Array.from({ length: 6 }, (_, g) => travelImages[(i + g * 3) % travelImages.length]);
  return {
    id: `dest-${i + 1}`,
    slug: slugify(s.name),
    name: s.name,
    country: s.country,
    continent: s.continent,
    type: s.type,
    tagline: s.tagline,
    description: `${s.name} is one of ${s.type === "domestic" ? "India's" : "the world's"} most sought-after destinations — ${s.tagline.toLowerCase()}. TravelX curates handcrafted itineraries here with hand-picked stays, private transfers and expert local guides so you experience the very best of ${s.name} at an unhurried, premium pace.`,
    image: s.img,
    gallery,
    coordinates: { lat: s.lat, lng: s.lng },
    rating,
    reviewCount: between(r(), 180, 2400),
    packageCount: between(r(), 6, 22),
    startingPrice: between(r(), s.type === "domestic" ? 8999 : 34999, s.type === "domestic" ? 34999 : 189999),
    bestTimeToVisit: s.best,
    idealDuration: s.duration,
    weather: [
      { season: "Peak", temp: `${between(r(), 18, 26)}°C`, note: "Clear skies, ideal for sightseeing" },
      { season: "Shoulder", temp: `${between(r(), 24, 32)}°C`, note: "Fewer crowds, great value" },
      { season: "Off-season", temp: `${between(r(), 28, 38)}°C`, note: "Lush landscapes, occasional rain" },
    ],
    activities: s.activities,
    highlights: s.highlights,
    trending: !!s.trending,
    featured: !!s.featured,
    tags: [s.continent, s.type, ...s.activities.slice(0, 2)],
  };
});

export const getDestinationBySlug = (slug: string) =>
  destinations.find((d) => d.slug === slug);

export const featuredDestinations = destinations.filter((d) => d.featured);
export const trendingDestinations = destinations.filter((d) => d.trending);
export const domesticDestinations = destinations.filter((d) => d.type === "domestic");
export const internationalDestinations = destinations.filter((d) => d.type === "international");
