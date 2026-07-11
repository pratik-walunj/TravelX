"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
type FormValues = z.infer<typeof schema>;

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // TODO(backend): POST `values.email` to your newsletter/CRM endpoint here.
  const onSubmit = async (values: FormValues) => {
    void values;
    await new Promise((r) => setTimeout(r, 800));
    setDone(true);
    reset();
    setTimeout(() => setDone(false), 4000);
  };

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-secondary-500/30 bg-secondary-500/10 p-4 text-secondary-700 dark:text-secondary-300">
        <CheckCircle2 className="size-5 shrink-0" />
        <p className="text-sm font-medium">You&apos;re in! Check your inbox to confirm your subscription.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <Input
            id="newsletter-email"
            type="email"
            placeholder="you@example.com"
            className="h-12 rounded-full bg-background"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </div>
        <Button type="submit" size="lg" variant="primary" loading={isSubmitting} className="shrink-0">
          Subscribe <Send className="size-4" />
        </Button>
      </div>
      {errors.email && <p className="mt-2 px-2 text-xs text-danger">{errors.email.message}</p>}
      <p className="mt-2 px-2 text-xs text-muted-foreground">
        No spam. Unsubscribe anytime. We respect your privacy.
      </p>
    </form>
  );
}
