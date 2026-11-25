import Image from "next/image";

const HERO_IMAGE = "/images/hero-kerala.webp";

/**
 * Decorative full-bleed background photo for the hero, with a neutral dark
 * scrim on top for text legibility.
 */
export function HeroSlideshow() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      {/* Neutral dark scrim so the white hero text stays readable over the photo. */}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
