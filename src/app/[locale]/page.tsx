import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsGridCustom from "@/components/NewsGridCustom";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";

export default async function Home() {
  const [posts, settings, sponsors] = await Promise.all([
    client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...3]`),
    client.fetch(`*[_type == "siteSettings"][0]{ title, logo { asset { _ref } } }`),
    client.fetch(`*[_type == "sponsor"] | order(_createdAt desc)[0...10]`)
  ]);

  const clubName = settings?.title || '';
  const logoRef = settings?.logo?.asset?._ref || '';

  return (
    <main className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <Navbar />
      <HeroSection clubName={clubName} logoRef={logoRef} />
      <NewsGridCustom posts={posts} clubName={clubName} logoRef={logoRef} />
      <SponsorsSection sponsors={sponsors} />
      <Footer />
    </main>
  );
}
