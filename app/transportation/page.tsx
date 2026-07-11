import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/service-page";
import { servicesData } from "@/constants/services";

const data = servicesData["transportation"];
export const metadata: Metadata = {
  title: `${data.title} — Transfers, Cars & Coaches`,
  description: data.description,
  alternates: { canonical: "/transportation" },
};

export default function TransportationPage() {
  return <ServicePage {...data} />;
}
