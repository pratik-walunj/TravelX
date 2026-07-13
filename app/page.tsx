import { Hero } from "@/components/sections/hero";
import { PopularDestinations } from "@/components/sections/popular-destinations";
import { Categories } from "@/components/sections/categories";
import { PackageRail } from "@/components/sections/package-rail";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { StatsCounter } from "@/components/sections/stats-counter";
import { TravelProcess } from "@/components/sections/travel-process";
import { SpecialOffers } from "@/components/sections/special-offers";
import { DestinationCarousel } from "@/components/sections/destination-carousel";
import { Testimonials } from "@/components/sections/testimonials";
import { InstagramGallery } from "@/components/sections/instagram-gallery";
import { BlogTeaser } from "@/components/sections/blog-teaser";
import { Partners } from "@/components/sections/partners";
import { CtaBanner } from "@/components/sections/cta-banner";
import {
  featuredPackages,
  bestsellerPackages,
  weekendPackages,
  domesticPackages,
  internationalPackages,
  getPackagesByCategory,
} from "@/data/packages";

export default function HomePage() {
  return (
    <>
      <Hero />

      <PopularDestinations />

      <PackageRail
        eyebrow="Featured"
        title="Handpicked featured tours"
        description="Our travel designers' current favourites, loved by thousands."
        packages={featuredPackages}
        viewAllHref="/tour-packages"
        viewAllLabel="View all packages"
      />

      <Categories />

      <PackageRail
        eyebrow="Bestsellers"
        title="Trending & bestselling trips"
        description="The trips everyone's booking right now."
        packages={bestsellerPackages}
        viewAllHref="/tour-packages?sort=popular"
        muted
      />

      <WhyChooseUs />
      <StatsCounter />

      <PackageRail
        eyebrow="Luxury Escapes"
        title="Indulge in luxury"
        description="Five-star stays, private guides and experiences money can't usually buy."
        packages={getPackagesByCategory("luxury")}
        viewAllHref="/luxury-tours"
      />

      <SpecialOffers />

      <PackageRail
        eyebrow="Quick Getaways"
        title="Weekend escapes"
        description="Short on time? These 2–3 day trips are made for you."
        packages={weekendPackages}
        viewAllHref="/weekend-tours"
        muted
      />

      <TravelProcess />

      <PackageRail
        eyebrow="Explore India"
        title="Incredible domestic tours"
        description="Discover the diversity of India, one unforgettable trip at a time."
        packages={domesticPackages.slice(0, 12)}
        viewAllHref="/tour-packages?type=domestic"
      />

      <DestinationCarousel />

      <PackageRail
        eyebrow="Go International"
        title="Journeys beyond borders"
        description="World-class destinations, seamlessly organised end to end."
        packages={internationalPackages.slice(0, 12)}
        viewAllHref="/tour-packages?type=international"
        muted
      />

      <Testimonials />
      <BlogTeaser />
      <InstagramGallery />
      <Partners />
      <CtaBanner />
    </>
  );
}
