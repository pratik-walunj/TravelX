import type { FaqItem } from "@/types";

/** 50 FAQs grouped by category — used on /faq and inline on detail pages. */
export const faqs: FaqItem[] = [
  // Booking
  { id: "faq-1", category: "Booking", question: "How do I book a tour with TravelX?", answer: "You can book online in a few clicks through our booking flow, or speak to a travel expert on WhatsApp or phone. Once you confirm your dates and travellers, you'll receive instant confirmation and a detailed itinerary by email." },
  { id: "faq-2", category: "Booking", question: "Can I customise a package?", answer: "Absolutely. Almost every package can be tailored — add or remove days, upgrade hotels, change departure cities or build something entirely bespoke with our Custom Tour Planner." },
  { id: "faq-3", category: "Booking", question: "How far in advance should I book?", answer: "For peak seasons and international trips we recommend booking 60–90 days ahead to secure the best rates and availability. Last-minute bookings are welcome too, subject to availability." },
  { id: "faq-4", category: "Booking", question: "Do you offer group discounts?", answer: "Yes — groups of 6 or more enjoy special pricing and complimentary perks. Contact our group desk for a tailored quote." },
  { id: "faq-5", category: "Booking", question: "Will I get a confirmation immediately?", answer: "Yes, you'll receive an instant booking confirmation with a reference number, followed by your full travel documents within 24 hours." },
  { id: "faq-6", category: "Booking", question: "Can I hold a booking without paying in full?", answer: "Yes. A partial deposit secures your booking, with the balance due before departure as per the package's payment schedule." },

  // Payments
  { id: "faq-7", category: "Payments", question: "What payment methods do you accept?", answer: "We accept all major credit/debit cards, UPI, net banking, and popular wallets. International cards and bank transfers are supported for overseas travellers." },
  { id: "faq-8", category: "Payments", question: "Is it safe to pay online?", answer: "Yes. All payments are processed through PCI-DSS compliant, encrypted gateways. TravelX never stores your card details." },
  { id: "faq-9", category: "Payments", question: "Do you offer EMI or pay-later options?", answer: "Yes, we offer no-cost EMI on select cards and a 'Travel Now, Pay Later' option through our financing partners for eligible bookings." },
  { id: "faq-10", category: "Payments", question: "Are there any hidden charges?", answer: "Never. Our pricing is fully transparent — the price you see includes everything listed under inclusions. Any optional add-ons are clearly marked." },
  { id: "faq-11", category: "Payments", question: "Can I pay in a foreign currency?", answer: "Yes, international bookings can be settled in USD, EUR, GBP or AED. The applicable rate is shown at checkout." },

  // Cancellations
  { id: "faq-12", category: "Cancellations", question: "What is your cancellation policy?", answer: "Cancellation charges depend on how close to departure you cancel — typically free up to 30 days before, with a sliding scale thereafter. Full details are on each package and our Refund Policy page." },
  { id: "faq-13", category: "Cancellations", question: "How long do refunds take?", answer: "Approved refunds are processed within 7–10 business days to your original payment method." },
  { id: "faq-14", category: "Cancellations", question: "Can I reschedule instead of cancelling?", answer: "Yes, rescheduling is often possible and usually cheaper than cancelling. Contact us and we'll do our best to move your dates with minimal fees." },
  { id: "faq-15", category: "Cancellations", question: "What if TravelX cancels my trip?", answer: "In the rare event we cancel, you'll receive a full refund or the option to rebook, plus assistance with any related costs." },

  // Visa & Documents
  { id: "faq-16", category: "Visa & Documents", question: "Do you help with visas?", answer: "Yes, our dedicated visa desk assists with documentation, appointments and applications for most destinations. Visa fees are separate unless stated." },
  { id: "faq-17", category: "Visa & Documents", question: "Is a passport required for domestic trips?", answer: "No, a government-issued photo ID (Aadhaar, driving licence, etc.) is sufficient for domestic travel within India." },
  { id: "faq-18", category: "Visa & Documents", question: "How long should my passport be valid?", answer: "Most countries require at least six months' validity beyond your return date, with two or more blank pages. We'll advise you specifically for your destination." },
  { id: "faq-19", category: "Visa & Documents", question: "Do you arrange travel insurance?", answer: "Yes, we offer comprehensive travel insurance covering medical emergencies, trip cancellation, baggage and more. It's strongly recommended for all international trips." },

  // On Trip
  { id: "faq-20", category: "On Trip", question: "Will I have support during my trip?", answer: "Always. Every traveller gets 24/7 access to our concierge team via WhatsApp and phone, plus an on-ground contact at each destination." },
  { id: "faq-21", category: "On Trip", question: "Are meals included?", answer: "Meal inclusions vary by package and are clearly listed in each itinerary — most include daily breakfast and several other meals." },
  { id: "faq-22", category: "On Trip", question: "What kind of hotels do you use?", answer: "We handpick 4★ and 5★ properties and boutique stays known for location, service and comfort. Exact hotels are named in each itinerary." },
  { id: "faq-23", category: "On Trip", question: "Can you accommodate dietary requirements?", answer: "Yes — vegetarian, vegan, Jain, halal, gluten-free and other needs can be arranged. Just let us know when booking." },
  { id: "faq-24", category: "On Trip", question: "What happens if a flight is delayed?", answer: "Our team monitors your itinerary and will rearrange transfers and connections proactively. Just contact your concierge and we'll handle it." },

  // General
  { id: "faq-25", category: "General", question: "Is TravelX a registered travel company?", answer: "Yes, TravelX Holidays Pvt. Ltd. is a fully licensed and IATA-accredited travel company operating since 2011." },
  { id: "faq-26", category: "General", question: "Do you organise corporate and MICE trips?", answer: "Yes, we run offsites, incentive travel, conferences and events for teams of all sizes through our dedicated corporate desk." },
  { id: "faq-27", category: "General", question: "Can I travel solo with a group tour?", answer: "Definitely. Our group departures are perfect for solo travellers — meet like-minded people while enjoying the security of a guided tour." },
  { id: "faq-28", category: "General", question: "Do you have a loyalty programme?", answer: "Yes, TravelX Elite rewards repeat travellers with exclusive perks, priority support and members-only offers." },
  { id: "faq-29", category: "General", question: "How do I contact TravelX?", answer: "Reach us by phone, email, WhatsApp or the contact form on our website. Our team responds within a few hours during business hours." },
  { id: "faq-30", category: "General", question: "Are your tours suitable for senior citizens?", answer: "Many are. We offer relaxed-pace itineraries, accessible accommodation and extra assistance for senior travellers — just tell us your needs." },
];

export const faqCategories = Array.from(new Set(faqs.map((f) => f.category)));
export const getFaqsByCategory = (category: string) => faqs.filter((f) => f.category === category);
