import Link from "next/link";
import {
  Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter, Youtube, Linkedin,
  ShieldCheck, Award, HeadphonesIcon, CreditCard,
} from "lucide-react";
import { siteConfig, footerNav } from "@/constants/site";
import { Logo } from "./logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const socials = [
  { icon: Instagram, href: siteConfig.socials.instagram, label: "Instagram" },
  { icon: Facebook, href: siteConfig.socials.facebook, label: "Facebook" },
  { icon: Twitter, href: siteConfig.socials.twitter, label: "Twitter" },
  { icon: Youtube, href: siteConfig.socials.youtube, label: "YouTube" },
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Secure Booking" },
  { icon: Award, label: "IATA Accredited" },
  { icon: HeadphonesIcon, label: "24/7 Support" },
  { icon: CreditCard, label: "Safe Payments" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      {/* Newsletter band */}
      <div className="border-b border-border">
        <div className="container grid gap-8 py-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="heading-lg">
              Get travel inspiration & <span className="text-gradient">exclusive deals</span>
            </h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Join 148,000+ travellers. Handpicked destinations, insider tips and members-only offers — straight to your inbox.
            </p>
          </div>
          <div className="lg:justify-self-end lg:w-full lg:max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-secondary-500" />
              <span>{siteConfig.address}</span>
            </li>
            <li>
              <a href={siteConfig.phoneHref} className="flex items-center gap-2.5 hover:text-foreground">
                <Phone className="size-4 shrink-0 text-secondary-500" /> {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 hover:text-foreground">
                <Mail className="size-4 shrink-0 text-secondary-500" /> {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-secondary-500" /> {siteConfig.hours}
            </li>
          </ul>
        </div>

        {Object.entries(footerNav).map(([heading, links]) => (
          <div key={heading}>
            <h3 className="text-sm font-semibold">{heading}</h3>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="border-t border-border">
        <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-6">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <b.icon className="size-5 text-secondary-500" /> {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © {siteConfig.founded}–2026 {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary-600 hover:bg-primary-600 hover:text-white"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/refund-policy" className="hover:text-foreground">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
