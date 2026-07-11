import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/service-page";
import { servicesData } from "@/constants/services";

const data = servicesData["hotel-booking"];
export const metadata: Metadata = {
  title: `${data.title} — Handpicked Stays at the Best Rates`,
  description: data.description,
  alternates: { canonical: "/hotel-booking" },
};

export default function HotelBookingPage() {
  return <ServicePage {...data} />;
}
