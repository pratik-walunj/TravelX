import { config, fields, collection } from "@keystatic/core";

/**
 * Keystatic CMS configuration for TravelX.
 *
 * Storage is env-driven so you get the best of both:
 *   • Local dev  → `{ kind: 'local' }` — edit files on disk, no setup needed.
 *   • Production → `{ kind: 'github' }` — edits commit to your repo (which
 *     triggers a Vercel redeploy), so you can manage content on the live site.
 *
 * To enable GitHub mode on Vercel, set these environment variables:
 *   NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO   = "owner/repo"          (e.g. "jane/travelx")
 *   NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG = "<your-app-slug>"
 *   KEYSTATIC_GITHUB_CLIENT_ID          = "<from the GitHub App>"
 *   KEYSTATIC_GITHUB_CLIENT_SECRET      = "<from the GitHub App>"
 *   KEYSTATIC_SECRET                    = "<random 40+ char string>"
 * The last four are produced by Keystatic's one-click setup wizard the first
 * time you open /keystatic on the deployed site (see the README).
 *
 * Content is stored as YAML under `content/<collection>/<slug>/index.yaml`.
 * Build-time reads (scripts/cms-sync.mts) always read local files, so this
 * env switch never affects builds.
 */

const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}` | undefined;

// Only switch to GitHub mode once ALL required auth env vars are present, so a
// half-configured deploy never breaks the build — it just stays in local mode.
const githubReady =
  !!githubRepo &&
  !!process.env.KEYSTATIC_SECRET &&
  !!process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;

const storage = githubReady
  ? ({ kind: "github", repo: githubRepo! } as const)
  : ({ kind: "local" } as const);

const imageUrl = (label: string) => fields.text({ label, description: "Full image URL" });

export default config({
  storage,
  ui: {
    brand: { name: "TravelX CMS" },
    navigation: {
      Content: ["posts", "packages", "destinations"],
      "Social proof": ["reviews", "faqs", "offers"],
    },
  },
  collections: {
    /* ---------------------------------------------------------------- Blog */
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/blog/*/",
      columns: ["title", "category", "publishedAt"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        category: fields.text({ label: "Category" }),
        cover: imageUrl("Cover image URL"),
        publishedAt: fields.date({ label: "Published date" }),
        readingMinutes: fields.integer({ label: "Reading time (minutes)", defaultValue: 5 }),
        featured: fields.checkbox({ label: "Featured post", defaultValue: false }),
        authorName: fields.text({ label: "Author name" }),
        authorRole: fields.text({ label: "Author role" }),
        authorAvatar: imageUrl("Author avatar URL"),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (p) => p.value }),
        body: fields.text({ label: "Body", multiline: true }),
      },
    }),

    /* ------------------------------------------------------------ Packages */
    packages: collection({
      label: "Tour Packages",
      slugField: "title",
      path: "content/packages/*/",
      columns: ["title", "destination", "price"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        destination: fields.text({ label: "Destination name" }),
        destinationSlug: fields.text({ label: "Destination slug", description: "Slug of the linked destination" }),
        country: fields.text({ label: "Country" }),
        type: fields.select({
          label: "Type",
          options: [{ label: "Domestic", value: "domestic" }, { label: "International", value: "international" }],
          defaultValue: "domestic",
        }),
        category: fields.select({
          label: "Category",
          options: ["luxury", "adventure", "family", "honeymoon", "pilgrimage", "weekend", "group", "corporate", "wildlife", "cruise", "beach", "cultural"].map((v) => ({ label: v, value: v })),
          defaultValue: "luxury",
        }),
        summary: fields.text({ label: "Summary", multiline: true }),
        description: fields.text({ label: "Description", multiline: true }),
        image: imageUrl("Main image URL"),
        gallery: fields.array(imageUrl("Image URL"), { label: "Gallery", itemLabel: (p) => p.value }),
        durationDays: fields.integer({ label: "Duration (days)", defaultValue: 5 }),
        durationNights: fields.integer({ label: "Duration (nights)", defaultValue: 4 }),
        price: fields.integer({ label: "Price (₹)", defaultValue: 50000 }),
        oldPrice: fields.integer({ label: "Old price (₹)", defaultValue: 60000 }),
        currency: fields.select({
          label: "Currency",
          options: ["INR", "USD", "EUR", "GBP", "AED"].map((v) => ({ label: v, value: v })),
          defaultValue: "INR",
        }),
        rating: fields.text({ label: "Rating (e.g. 4.7)" }),
        reviewCount: fields.integer({ label: "Review count", defaultValue: 0 }),
        groupSizeMin: fields.integer({ label: "Group size min", defaultValue: 2 }),
        groupSizeMax: fields.integer({ label: "Group size max", defaultValue: 20 }),
        difficulty: fields.select({
          label: "Difficulty",
          options: [{ label: "Easy", value: "Easy" }, { label: "Moderate", value: "Moderate" }, { label: "Challenging", value: "Challenging" }],
          defaultValue: "Easy",
        }),
        seatsLeft: fields.integer({ label: "Seats left", defaultValue: 10 }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        trending: fields.checkbox({ label: "Trending", defaultValue: false }),
        bestseller: fields.checkbox({ label: "Bestseller", defaultValue: false }),
        highlights: fields.array(fields.text({ label: "Highlight" }), { label: "Highlights", itemLabel: (p) => p.value }),
        inclusions: fields.array(fields.text({ label: "Inclusion" }), { label: "Inclusions", itemLabel: (p) => p.value }),
        exclusions: fields.array(fields.text({ label: "Exclusion" }), { label: "Exclusions", itemLabel: (p) => p.value }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (p) => p.value }),
        themes: fields.array(fields.text({ label: "Theme" }), { label: "Themes", itemLabel: (p) => p.value }),
        departureCities: fields.array(fields.text({ label: "City" }), { label: "Departure cities", itemLabel: (p) => p.value }),
        availableDates: fields.array(fields.date({ label: "Date" }), { label: "Available dates", itemLabel: (p) => p.value ?? "" }),
        hotels: fields.array(
          fields.object({
            name: fields.text({ label: "Hotel name" }),
            rating: fields.integer({ label: "Star rating", defaultValue: 4 }),
            nights: fields.integer({ label: "Nights", defaultValue: 1 }),
          }),
          { label: "Hotels", itemLabel: (p) => p.fields.name.value || "Hotel" },
        ),
        itinerary: fields.array(
          fields.object({
            day: fields.integer({ label: "Day", defaultValue: 1 }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            stay: fields.text({ label: "Stay (hotel)" }),
            meals: fields.multiselect({
              label: "Meals",
              options: [{ label: "Breakfast", value: "Breakfast" }, { label: "Lunch", value: "Lunch" }, { label: "Dinner", value: "Dinner" }],
            }),
            activities: fields.array(fields.text({ label: "Activity" }), { label: "Activities", itemLabel: (p) => p.value }),
          }),
          { label: "Day-wise itinerary", itemLabel: (p) => `Day ${p.fields.day.value}: ${p.fields.title.value}` },
        ),
      },
    }),

    /* -------------------------------------------------------- Destinations */
    destinations: collection({
      label: "Destinations",
      slugField: "name",
      path: "content/destinations/*/",
      columns: ["name", "country", "type"],
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        country: fields.text({ label: "Country" }),
        continent: fields.text({ label: "Continent" }),
        type: fields.select({
          label: "Type",
          options: [{ label: "Domestic", value: "domestic" }, { label: "International", value: "international" }],
          defaultValue: "domestic",
        }),
        tagline: fields.text({ label: "Tagline" }),
        description: fields.text({ label: "Description", multiline: true }),
        image: imageUrl("Main image URL"),
        gallery: fields.array(imageUrl("Image URL"), { label: "Gallery", itemLabel: (p) => p.value }),
        lat: fields.text({ label: "Latitude" }),
        lng: fields.text({ label: "Longitude" }),
        rating: fields.text({ label: "Rating (e.g. 4.8)" }),
        reviewCount: fields.integer({ label: "Review count", defaultValue: 0 }),
        packageCount: fields.integer({ label: "Package count", defaultValue: 0 }),
        startingPrice: fields.integer({ label: "Starting price (₹)", defaultValue: 20000 }),
        idealDuration: fields.text({ label: "Ideal duration" }),
        trending: fields.checkbox({ label: "Trending", defaultValue: false }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        bestTimeToVisit: fields.array(fields.text({ label: "Month" }), { label: "Best time to visit", itemLabel: (p) => p.value }),
        activities: fields.array(fields.text({ label: "Activity" }), { label: "Activities", itemLabel: (p) => p.value }),
        highlights: fields.array(fields.text({ label: "Highlight" }), { label: "Highlights", itemLabel: (p) => p.value }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (p) => p.value }),
        weather: fields.array(
          fields.object({
            season: fields.text({ label: "Season" }),
            temp: fields.text({ label: "Temperature" }),
            note: fields.text({ label: "Note" }),
          }),
          { label: "Weather", itemLabel: (p) => p.fields.season.value || "Season" },
        ),
      },
    }),

    /* ------------------------------------------------------------- Reviews */
    reviews: collection({
      label: "Reviews",
      slugField: "title",
      path: "content/reviews/*/",
      columns: ["title", "author", "source"],
      schema: {
        title: fields.slug({ name: { label: "Review title" } }),
        author: fields.text({ label: "Author name" }),
        avatar: imageUrl("Avatar URL"),
        location: fields.text({ label: "Location" }),
        rating: fields.text({ label: "Rating (1-5, e.g. 4.5)" }),
        date: fields.date({ label: "Date" }),
        content: fields.text({ label: "Review text", multiline: true }),
        source: fields.select({
          label: "Source",
          options: [{ label: "Google", value: "Google" }, { label: "TripAdvisor", value: "TripAdvisor" }, { label: "TravelX", value: "TravelX" }, { label: "Facebook", value: "Facebook" }],
          defaultValue: "Google",
        }),
        packageSlug: fields.text({ label: "Package slug (optional)" }),
        destinationSlug: fields.text({ label: "Destination slug (optional)" }),
        tripType: fields.text({ label: "Trip type (optional)" }),
        verified: fields.checkbox({ label: "Verified", defaultValue: true }),
        helpfulCount: fields.integer({ label: "Helpful count", defaultValue: 0 }),
      },
    }),

    /* ---------------------------------------------------------------- FAQs */
    faqs: collection({
      label: "FAQs",
      slugField: "question",
      path: "content/faqs/*/",
      columns: ["question", "category"],
      schema: {
        question: fields.slug({ name: { label: "Question" } }),
        answer: fields.text({ label: "Answer", multiline: true }),
        category: fields.text({ label: "Category" }),
      },
    }),

    /* -------------------------------------------------------------- Offers */
    offers: collection({
      label: "Offers",
      slugField: "title",
      path: "content/offers/*/",
      columns: ["title", "code", "expiresAt"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        code: fields.text({ label: "Promo code" }),
        discountLabel: fields.text({ label: "Discount label" }),
        image: imageUrl("Image URL"),
        expiresAt: fields.date({ label: "Expires at" }),
        badge: fields.text({ label: "Badge" }),
      },
    }),
  },
});
