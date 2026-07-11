"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { WishlistProvider, CompareProvider } from "@/hooks/use-collection";

/**
 * Root client provider tree — theme (dark mode), wishlist & compare stores,
 * and the global toast host. Kept in one place so app/layout stays a server
 * component.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <WishlistProvider>
        <CompareProvider>
          {children}
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            toastOptions={{ className: "rounded-2xl" }}
          />
        </CompareProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}
