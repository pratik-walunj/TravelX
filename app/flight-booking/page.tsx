import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/service-page";
import { servicesData } from "@/constants/services";

const data = servicesData["flight-booking"];
export const metadata: Metadata = {
  title: `${data.title} — Best Routes & Fares, Managed for You`,
  description: data.description,
  alternates: { canonical: "/flight-booking" },
};

export default function FlightBookingPage() {
  return <ServicePage {...data} />;
}
