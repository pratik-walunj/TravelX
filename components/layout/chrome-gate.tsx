"use client";

import { usePathname } from "next/navigation";

/**
 * Renders the public-site chrome (announcement bar, navbar, footer, floating
 * actions) around the page — EXCEPT on the /keystatic admin route, where the
 * CMS needs the full viewport with no site chrome.
 *
 * Chrome is passed in as props (rendered by the server layout) so server
 * components like <Footer> can be used without importing them into this client
 * component.
 */
export function ChromeGate({
  skipLink,
  header,
  footer,
  children,
}: {
  skipLink: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/keystatic");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {skipLink}
      {header}
      {children}
      {footer}
    </>
  );
}
