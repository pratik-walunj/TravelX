import type { Metadata } from "next";
import { XCircle, RefreshCw, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/constants/site";

export const metadata: Metadata = {
  title: "Payment Failed",
  description: "Your payment could not be processed.",
  robots: { index: false, follow: false },
};

export default function PaymentFailedPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-24">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-card sm:p-10">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-danger/15 text-danger">
          <XCircle className="size-12" />
        </div>
        <h1 className="mt-6 font-heading text-3xl font-bold">Payment failed</h1>
        <p className="mt-2 text-muted-foreground">Something went wrong and your payment couldn&apos;t be processed. Don&apos;t worry — you haven&apos;t been charged.</p>

        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5 text-left text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Common reasons</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Insufficient funds or card limit reached</li>
            <li>Incorrect card details or expired card</li>
            <li>Bank declined the transaction</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/booking" variant="primary"><RefreshCw className="size-4" /> Try again</ButtonLink>
          <ButtonLink href={whatsappLink("Hi TravelX, I had trouble with my payment.")} variant="outline"><MessageCircle className="size-4" /> Chat with us</ButtonLink>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Need help? Call {siteConfig.phone}.</p>
      </div>
    </div>
  );
}
