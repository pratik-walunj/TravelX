"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  travelers: z.string().optional(),
  date: z.string().optional(),
  message: z.string().min(5, "Tell us a little about your trip"),
});
type FormValues = z.infer<typeof schema>;

interface EnquiryFormProps {
  packageTitle?: string;
  compact?: boolean;
}

/** Lead-capture enquiry form used on package/contact pages. */
export function EnquiryForm({ packageTitle, compact }: EnquiryFormProps) {
  const [sent, setSent] = useState(false);
  const {
    register, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: packageTitle ? `I'm interested in the "${packageTitle}" package. Please share more details.` : "",
    },
  });

  // TODO(backend): POST enquiry to your CRM / lead endpoint here.
  const onSubmit = async (values: FormValues) => {
    void values;
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-secondary-500/30 bg-secondary-500/10 p-8 text-center">
        <CheckCircle2 className="size-12 text-secondary-500" />
        <h3 className="font-heading text-xl font-semibold">Enquiry received!</h3>
        <p className="text-sm text-muted-foreground">Our travel expert will get back to you within a few hours. Check your inbox and WhatsApp.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field label="Full name" error={errors.name?.message}>
          <Input placeholder="Jane Traveller" aria-invalid={!!errors.name} {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input type="email" placeholder="jane@example.com" aria-invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <Input type="tel" placeholder="+91 98765 43210" aria-invalid={!!errors.phone} {...register("phone")} />
        </Field>
        <Field label="Travellers">
          <Select {...register("travelers")}>
            {["1", "2", "3", "4", "5", "6+"].map((n) => <option key={n} value={n}>{n} {n === "1" ? "traveller" : "travellers"}</option>)}
          </Select>
        </Field>
      </div>
      <Field label="Preferred date">
        <Input type="date" {...register("date")} />
      </Field>
      <Field label="Message" error={errors.message?.message}>
        <Textarea rows={4} placeholder="Tell us about your dream trip…" aria-invalid={!!errors.message} {...register("message")} />
      </Field>
      <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full">
        Send Enquiry <Send className="size-4" />
      </Button>
      <p className="text-center text-xs text-muted-foreground">We typically reply within 2 hours during business hours.</p>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
