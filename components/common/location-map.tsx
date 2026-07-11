import type { Coordinates } from "@/types";

/**
 * Lightweight embedded map via OpenStreetMap (no API key needed).
 * Swap for Google Maps Embed / Mapbox when you add a key.
 */
export function LocationMap({ coordinates, name }: { coordinates: Coordinates; name: string }) {
  const { lat, lng } = coordinates;
  const d = 3;
  const bbox = `${lng - d},${lat - d},${lng + d},${lat + d}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
      <iframe
        title={`Map of ${name}`}
        src={src}
        className="h-[320px] w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
