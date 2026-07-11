import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle, Building2 } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { LocationMap } from "@/components/common/location-map";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { faqs } from "@/data/faqs";
import { siteConfig, whatsappLink } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact Us — Talk to a Travel Expert",
  description: "Get in touch with the TravelX team by phone, email or WhatsApp. We're here to help plan your perfect trip.",
  alternates: { canonical: "/contact" },
};

const offices = [
  { city: "Branch Office — Warje, Pune", address: "Shop No-4, Chaudhari Heights, Above Swarna Hotel, Warje, Pune", phone: siteConfig.phone },
];

export default function ContactPage() {
  const contactFaqs = faqs.filter((f) => ["General", "Booking"].includes(f.category)).slice(0, 5);

  return (
    <>
      <PageHero
        eyebrow="We'd love to hear from you"
        title="Get in touch"
        description="Questions, custom trips or just saying hi — our travel experts reply within a couple of hours."
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Contact" }]}
      />

      <div className="container section-tight">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard icon={<Phone className="size-5" />} title="Call us" value={siteConfig.phone} href={siteConfig.phoneHref} />
              <ContactCard icon={<MessageCircle className="size-5" />} title="WhatsApp" value="Chat with an expert" href={whatsappLink()} />
              <ContactCard icon={<Mail className="size-5" />} title="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
              <ContactCard icon={<Clock className="size-5" />} title="Hours" value={siteConfig.hours} />
            </div>

            {/* Offices */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-heading text-lg font-semibold"><Building2 className="size-5 text-secondary-500" /> Our offices</h3>
              <div className="space-y-3">
                {offices.map((o) => (
                  <div key={o.city} className="rounded-2xl border border-border bg-card p-4">
                    <p className="font-semibold">{o.city}</p>
                    <p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0 text-secondary-500" /> {o.address}</p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><Phone className="size-4 text-secondary-500" /> {o.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            <LocationMap coordinates={{ lat: 18.479, lng: 73.802 }} name="TravelX Warje, Pune" />
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
            <h2 className="font-heading text-2xl font-bold">Send us a message</h2>
            <p className="mb-6 mt-1 text-sm text-muted-foreground">Fill in the form and we&apos;ll craft a response (and maybe an itinerary) just for you.</p>
            <EnquiryForm />
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="heading-lg mb-6 text-center text-2xl">Quick answers</h2>
          <Accordion items={contactFaqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? <ButtonLink href="/faq" variant="link" className="px-1">Visit our full FAQ</ButtonLink>
          </p>
        </div>
      </div>
    </>
  );
}

function ContactCard({ icon, title, value, href }: { icon: React.ReactNode; title: string; value: string; href?: string }) {
  const inner = (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-soft">
      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary-600/10 text-primary-600 dark:text-primary-300">{icon}</span>
      <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
      <p className="mt-0.5 font-semibold">{value}</p>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
