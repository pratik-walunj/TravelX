import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/service-page";
import { servicesData } from "@/constants/services";

const data = servicesData["visa-services"];
export const metadata: Metadata = {
  title: `${data.title} — Hassle-Free Visa Assistance`,
  description: data.description,
  alternates: { canonical: "/visa-services" },
};

export default function VisaServicesPage() {
  return <ServicePage {...data} />;
}
