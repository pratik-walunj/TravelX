import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";
import { siteConfig, whatsappLink } from "@/constants/site";

/** Bold closing call-to-action band before the footer. */
export function CtaBanner() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-[2rem] px-6 py-16 text-center text-white shadow-glow sm:px-12 lg:py-20">
          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/80 to-secondary-900/80" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="heading-lg text-white">
              Ready for your next <span className="text-accent-300">adventure?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
              Talk to a travel expert today and get a free, no-obligation itinerary tailored just for you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={whatsappLink()} variant="accent" size="lg">
                <MessageCircle className="size-5" /> Chat on WhatsApp
              </ButtonLink>
              <ButtonLink href="/custom-tour-planner" variant="glass" size="lg">
                Plan a Custom Trip
              </ButtonLink>
            </div>
            <a href={siteConfig.phoneHref} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
              <Phone className="size-4" /> Or call us at {siteConfig.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
