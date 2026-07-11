import type { BlogPost } from "@/types";
import { rng, between, slugify, pick } from "./seed";
import { blogCovers, avatars, travelImages } from "./images";

const blogSeeds = [
  ["10 Hidden Gems in Kerala You Haven't Heard Of", "Destinations", "Beyond the backwaters lie secret villages, waterfalls and hilltop hamlets. Here's where to go before the crowds arrive."],
  ["The Ultimate Guide to Planning a Maldives Honeymoon", "Honeymoon", "From choosing the right atoll to booking an overwater villa, everything you need for the perfect romantic escape."],
  ["Ladakh on a Motorcycle: A First-Timer's Playbook", "Adventure", "High passes, thin air and unforgettable views. Our complete guide to riding through the Himalayas safely."],
  ["Best Time to Visit Switzerland (Month by Month)", "Travel Tips", "Snowy peaks or wildflower meadows? A month-by-month breakdown to help you pick the perfect season."],
  ["Solo Female Travel in Southeast Asia: Safety & Tips", "Travel Tips", "Practical, real-world advice for travelling confidently and safely across Thailand, Vietnam and Bali."],
  ["How to Pack for a 2-Week International Trip in Carry-On", "Travel Tips", "Master the art of packing light with our tried-and-tested capsule packing method."],
  ["A Foodie's Guide to Vietnam: 15 Dishes to Try", "Food & Culture", "From pho at dawn to bánh mì on the street corner, these are the flavours you can't leave without."],
  ["Wildlife Safaris in India: Where to Spot Tigers", "Wildlife", "The best national parks, ideal months and insider tips for a successful big-cat sighting."],
  ["Budget Europe: 10 Days Under ₹1 Lakh (Flights Included)", "Budget Travel", "Yes, it's possible. Our route, hacks and booking timeline for an affordable European adventure."],
  ["Bali Beyond the Beaches: Temples, Rice Fields & Volcanoes", "Destinations", "Trade the crowds for culture with this alternative itinerary through the real Bali."],
  ["Everything You Need to Know About Schengen Visas", "Visa & Docs", "Documents, timelines, appointments and common mistakes — demystifying the Schengen application."],
  ["Dubai in 4 Days: The Perfect First-Timer Itinerary", "Destinations", "Skyscrapers, deserts and souks. Here's how to see the best of Dubai without rushing."],
  ["The Science of Beating Jet Lag on Long-Haul Flights", "Travel Tips", "Simple, research-backed strategies to arrive fresh and adjust to a new timezone faster."],
  ["Northern Lights: Where and When to See the Aurora", "Adventure", "Iceland, Norway or Finland? Chasing the aurora with the best odds and least hassle."],
  ["Family Travel: Keeping Kids Happy on Long Journeys", "Family", "Games, snacks, screen-time strategies and sanity-savers for travelling with little ones."],
  ["A Pilgrim's Guide to Char Dham Yatra", "Pilgrimage", "Routes, timing, fitness and spiritual preparation for one of India's most sacred journeys."],
  ["Underrated European Cities That Beat the Classics", "Destinations", "Skip the queues in Paris and Rome — these lesser-known gems deliver just as much magic."],
  ["Travel Insurance Explained: What You Actually Need", "Travel Tips", "Decode the jargon and choose the right cover so you're protected without overpaying."],
  ["The Best Beaches in the Andaman Islands, Ranked", "Beach", "Crystal waters and powder sand — our definitive ranking of the Andamans' finest shores."],
  ["Photography Tips for Capturing the Perfect Travel Shot", "Photography", "Composition, golden hour and gear advice to make your holiday photos truly frame-worthy."],
];

const authorsPool = [
  ["Ananya Iyer", "Senior Travel Writer"], ["Rohan Mehta", "Destination Expert"],
  ["Priya Nair", "Adventure Editor"], ["Karan Kapoor", "Food & Culture Lead"],
];

/** 50 blog posts (20 curated titles cycled + generated meta). */
export const blogPosts: BlogPost[] = Array.from({ length: 50 }, (_, i) => {
  const r = rng(7000 + i);
  const [title, category, excerpt] = blogSeeds[i % blogSeeds.length];
  const [aName, aRole] = authorsPool[i % authorsPool.length];
  const daysAgo = between(r(), 2, 300);
  const date = new Date(2026, 6, 11);
  date.setDate(date.getDate() - daysAgo);
  const uniqueTitle = i < blogSeeds.length ? title : `${title} — Part ${Math.floor(i / blogSeeds.length) + 1}`;
  const paragraphs = Array.from({ length: 6 }, () =>
    "Travel has a way of reshaping how we see the world. On this journey we uncover the details that guidebooks skip — the timing, the routes, the local wisdom and the small moments that turn a good trip into an unforgettable one. TravelX experts share hard-won advice so you can travel smarter, deeper and with total peace of mind.",
  );
  return {
    id: `blog-${i + 1}`,
    slug: slugify(`${uniqueTitle}`),
    title: uniqueTitle,
    excerpt,
    content: paragraphs.join("\n\n"),
    cover: i % 3 === 0 ? blogCovers[i % blogCovers.length] : travelImages[i % travelImages.length],
    category,
    tags: [category, "Travel", pick(["Guide", "Tips", "Inspiration", "Story"], r())],
    author: { name: aName, avatar: avatars[i % avatars.length], role: aRole },
    publishedAt: date.toISOString(),
    readingMinutes: between(r(), 4, 12),
    featured: i < 4,
  };
});

export const getBlogBySlug = (slug: string) => blogPosts.find((b) => b.slug === slug);
export const featuredBlogs = blogPosts.filter((b) => b.featured);
export const blogCategories = Array.from(new Set(blogPosts.map((b) => b.category)));
export const relatedBlogs = (post: BlogPost, count = 3) =>
  blogPosts.filter((b) => b.id !== post.id && b.category === post.category).slice(0, count);
