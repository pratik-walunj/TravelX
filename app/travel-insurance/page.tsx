import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/service-page";
import { servicesData } from "@/constants/services";

const data = servicesData["travel-insurance"];
export const metadata: Metadata = {
  title: `${data.title} — Comprehensive Cover for Every Trip`,
  description: data.description,
  alternates: { canonical: "/travel-insurance" },
};

export default function TravelInsurancePage() {
  return <ServicePage {...data} />;
}
