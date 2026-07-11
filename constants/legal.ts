import type { LegalSection } from "@/components/sections/legal-page";

/** Placeholder legal copy — replace with your reviewed legal text before launch. */
export const privacyPolicy: LegalSection[] = [
  { heading: "Information We Collect", body: ["We collect information you provide directly — such as your name, email, phone number and travel preferences when you make an enquiry or booking.", "We also automatically collect certain technical data such as your IP address, browser type and pages visited, using cookies and similar technologies."] },
  { heading: "How We Use Your Information", body: ["To process bookings, respond to enquiries, personalise your experience and send you relevant offers (only if you've opted in).", "To improve our website, services and customer support, and to comply with legal obligations."] },
  { heading: "Sharing Your Information", body: ["We share data only with trusted partners necessary to fulfil your booking — such as hotels, airlines and visa authorities — and never sell your personal data to third parties."] },
  { heading: "Cookies", body: ["We use cookies to remember your preferences, analyse traffic and improve functionality. You can control cookies through our consent banner and your browser settings."] },
  { heading: "Data Security", body: ["We use industry-standard encryption and security measures to protect your data. Payment information is processed through PCI-DSS compliant gateways and is never stored on our servers."] },
  { heading: "Your Rights", body: ["You have the right to access, correct or delete your personal data, and to withdraw consent for marketing at any time. Contact us to exercise these rights."] },
  { heading: "Contact Us", body: ["For any privacy-related questions, email privacy@travelx.com and our data protection team will respond within 30 days."] },
];

export const refundPolicy: LegalSection[] = [
  { heading: "Cancellation by You", body: ["Cancellations must be requested in writing. Charges depend on how far in advance you cancel:", "• 30+ days before departure: free cancellation (excluding non-refundable deposits).", "• 15–29 days: 25% of the total trip cost.", "• 7–14 days: 50% of the total trip cost.", "• Less than 7 days: 100% of the total trip cost."] },
  { heading: "Refund Processing", body: ["Approved refunds are processed within 7–10 business days to your original payment method. Bank processing times may vary."] },
  { heading: "Non-Refundable Items", body: ["Certain components — such as special-fare flights, visa fees, insurance premiums and some hotel deposits — are non-refundable regardless of cancellation timing. These are clearly marked at booking."] },
  { heading: "Cancellation by TravelX", body: ["In the rare event we must cancel a trip (e.g. due to force majeure), you'll receive a full refund of recoverable costs or the option to rebook, plus our assistance rearranging your plans."] },
  { heading: "Rescheduling", body: ["Where possible, we'll help you reschedule rather than cancel. Rescheduling fees are typically lower than cancellation charges and depend on supplier terms."] },
  { heading: "Travel Insurance", body: ["We strongly recommend travel insurance with cancellation cover to protect your non-refundable costs against unforeseen events."] },
];

export const termsConditions: LegalSection[] = [
  { heading: "Acceptance of Terms", body: ["By using our website and booking with TravelX, you agree to these Terms & Conditions. Please read them carefully before making a booking."] },
  { heading: "Bookings & Payments", body: ["A booking is confirmed once we issue a confirmation and receive the required deposit or full payment. Prices are subject to availability and may change until a booking is confirmed."] },
  { heading: "Pricing", body: ["All prices are per person unless stated otherwise and include the components listed under 'inclusions'. Prices may vary based on season, availability, currency fluctuations and group size."] },
  { heading: "Traveller Responsibilities", body: ["You are responsible for ensuring you have valid travel documents (passport, visas, insurance), meet health requirements, and arrive on time for all scheduled services."] },
  { heading: "Changes & Cancellations", body: ["Changes to confirmed bookings are subject to availability and may incur fees. Cancellations are governed by our Refund Policy."] },
  { heading: "Liability", body: ["TravelX acts as an intermediary between you and service providers. We are not liable for acts, errors or omissions of third-party suppliers, or for events beyond our reasonable control."] },
  { heading: "Governing Law", body: ["These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts of Pune, Maharashtra."] },
];
