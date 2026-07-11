"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // TODO(observability): report to your error-tracking service (Sentry etc.).
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-24">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-3xl bg-danger/10 text-danger">
          <AlertTriangle className="size-10" />
        </div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">
          An unexpected error occurred. Please try again — if it persists, our team is on it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} variant="primary"><RefreshCw className="size-4" /> Try again</Button>
          <ButtonLink href="/" variant="outline"><Home className="size-4" /> Go home</ButtonLink>
        </div>
      </div>
    </div>
  );
}
