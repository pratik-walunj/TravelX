import type { Metadata } from "next";
import { CheckCircle2, Download, Calendar, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Your TravelX booking is confirmed.",
  robots: { index: false, follow: false },
};

export default function PaymentSuccessPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-24">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-card sm:p-10">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-12" />
        </div>
        <h1 className="mt-6 font-heading text-3xl font-bold">Payment successful</h1>
        <p className="mt-2 text-muted-foreground">Your trip is booked and confirmed. We can&apos;t wait to host you!</p>

        <div className="mt-6 space-y-3 rounded-2xl border border-border bg-muted/40 p-5 text-left text-sm">
          <div className="flex items-center justify-between"><span className="text-muted-foreground">Booking reference</span><span className="font-heading font-bold tracking-wider">TX-2026-84120</span></div>
          <div className="flex items-center gap-2"><Calendar className="size-4 text-secondary-500" /> Confirmation sent to your email</div>
          <div className="flex items-center gap-2"><MapPin className="size-4 text-secondary-500" /> Your travel documents are on the way</div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/" variant="primary"><Download className="size-4" /> Download receipt</ButtonLink>
          <ButtonLink href="/tour-packages" variant="outline">Explore more trips</ButtonLink>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Questions? Email <a href={`mailto:${siteConfig.email}`} className="underline">{siteConfig.email}</a> or call {siteConfig.phone}.
        </p>
      </div>
    </div>
  );
}
