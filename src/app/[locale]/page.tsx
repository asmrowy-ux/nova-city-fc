import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsGridCustom from "@/components/NewsGridCustom";
import LeagueTableWidget from "@/components/LeagueTableWidget";
import FixturesWidget from "@/components/FixturesWidget";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [posts, settings, sponsors, leagueTable, matches] = await Promise.all([
    client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...3]`),
    client.fetch(`*[_type == "siteSettings"][0]{ title, heroTitle, logo { asset { _ref } }, heroBackground { asset { _ref } }, heroDescription, footerDescription, syncHeroWithFooter, newsSectionTitle }`),
    client.fetch(`*[_type == "sponsor"] | order(_createdAt desc)[0...10]`),
    client.fetch(`*[_type == "leagueTable"] | order(seasonName desc)[0] { ..., teams[]{ ..., logo { asset { _ref } } } }`),
    client.fetch(`*[_type == "match"] | order(date asc)`)
  ]);

  const clubName = settings?.title || '';
  const heroTitle = settings?.heroTitle || clubName;
  const logoRef = settings?.logo?.asset?._ref || '';
  const bgRef = settings?.heroBackground?.asset?._ref || '';
  const newsTitle = settings?.newsSectionTitle || 'AKTUALNOŚCI';
  
  let description = '';
  if (settings?.syncHeroWithFooter && settings?.footerDescription) {
    description = settings.footerDescription;
  } else if (settings?.heroDescription) {
    description = settings.heroDescription;
  }

  const upcomingMatches = matches?.filter((m: any) => m.status === 'upcoming').slice(0, 4) || [];

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <HeroSection clubName={clubName} heroTitle={heroTitle} bgRef={bgRef} logoRef={logoRef} description={description} />
      <NewsGridCustom posts={posts} clubName={clubName} logoRef={logoRef} title={newsTitle} />
      
      {/* League Table & Fixtures Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LeagueTableWidget leagueTable={leagueTable} matches={matches} />
            <FixturesWidget matches={upcomingMatches} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
