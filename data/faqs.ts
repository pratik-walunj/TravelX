import type { FaqItem } from "@/types";
import faqsJson from "./cms/faqs.json";

/**
 * FAQs — sourced from the CMS (content/faqs/*, edited at /keystatic).
 * Regenerate this data after editing content with `npm run cms:sync`.
 */
export const faqs = faqsJson as unknown as FaqItem[];

export const faqCategories = Array.from(new Set(faqs.map((f) => f.category)));
export const getFaqsByCategory = (category: string) => faqs.filter((f) => f.category === category);
