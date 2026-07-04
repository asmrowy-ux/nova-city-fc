"use client";

interface Sponsor {
  _id: string;
  name: string;
  logo: { asset: { _ref: string } };
  url?: string;
}

function getImageUrl(ref: string) {
  if (!ref) return '';
  return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
}

import { Leaf, Zap, Landmark, Ship } from "lucide-react";

export default function SponsorCarousel({ sponsors }: { sponsors?: any[] }) {
  const hasSanitySponsors = sponsors && sponsors.length > 0;

  const mockSponsors = [
    { name: "GREEN TECH", Icon: Leaf },
    { name: "NOVA ENERGY", Icon: Zap },
    { name: "CITY BANK", Icon: Landmark },
    { name: "BALTIC LOGISTICS", Icon: Ship },
  ];

  const renderMockSponsors = (keyPrefix: string) => {
    const multiplied = Array(20).fill(mockSponsors).flat();
    return multiplied.map((sponsor, i) => (
      <div key={`${keyPrefix}-${i}`} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 mx-8">
        <sponsor.Icon className="w-8 h-8 text-foreground" />
        <span className="text-foreground font-bold tracking-widest text-lg whitespace-nowrap">{sponsor.name}</span>
      </div>
    ));
  };

  const renderSanitySponsors = (keyPrefix: string) => {
    const multiplied = Array(20).fill(sponsors).flat();
    return multiplied.map((sponsor, i) => {
      const ref = sponsor?.logo?.asset?._ref || '';
      const logoUrl = ref ? `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}` : '';
      return (
        <div key={`${keyPrefix}-${sponsor._id}-${i}`} className="flex-shrink-0 h-16 w-48 flex items-center justify-center opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 mx-8">
          {logoUrl ? (
            <img src={logoUrl} alt={sponsor.name} className="max-h-16 max-w-[180px] object-contain drop-shadow-md" />
          ) : (
            <span className="text-2xl font-black tracking-widest uppercase text-foreground whitespace-nowrap">{sponsor.name}</span>
          )}
        </div>
      );
    });
  };

  return (
    <div className="pt-6 pb-6 overflow-hidden relative flex flex-col items-center">
      <h3 className="text-lg font-bold tracking-[0.1em] text-primary mb-10 uppercase">
        SPONSORZY
      </h3>

      {/* Gradient edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none mt-16" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none mt-16" />

      <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
        <div className="flex">
          {hasSanitySponsors ? renderSanitySponsors('g1') : renderMockSponsors('g1')}
        </div>
        <div className="flex" aria-hidden="true">
          {hasSanitySponsors ? renderSanitySponsors('g2') : renderMockSponsors('g2')}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 120s linear infinite;
        }
      `}</style>
    </div>
  );
}
