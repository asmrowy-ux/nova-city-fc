import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import PhotoGallery from "@/components/PhotoGallery";
import MatchLineup from "@/components/MatchLineup";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    client.fetch(`*[_type == "post" && slug.current == $slug][0]{ title, body, mainImage { asset { _ref } } }`, { slug }),
    client.fetch(`*[_type == "siteSettings"][0]{ title }`)
  ]);

  if (!post) return {};
  
  const clubName = settings?.title || '';
  const displayTitle = post.title?.replace(/\[KLUB\]/g, clubName) || '';
  
  // Extract a brief description from the body (first block of text)
  let description = "Przeczytaj najnowsze informacje.";
  if (post.body && Array.isArray(post.body)) {
    const firstTextBlock = post.body.find((b: any) => b._type === 'block' && b.children);
    if (firstTextBlock) {
      description = firstTextBlock.children.map((c: any) => c.text).join('').substring(0, 160).replace(/\[KLUB\]/g, clubName);
    }
  }

  let imageUrl = "";
  if (post.mainImage?.asset?._ref) {
    imageUrl = `https://cdn.sanity.io/images/3kzdw0qu/production/${post.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}?w=1200&h=630&fit=crop`;
  }

  return {
    title: displayTitle,
    description: description,
    openGraph: {
      title: displayTitle,
      description: description,
      type: 'article',
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    }
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [post, settings, defaultLineup] = await Promise.all([
    client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        category,
        publishedAt,
        body,
        mainImage { asset { _ref } },
        gallery[]{ asset { _ref }, caption },
        showMatchLineup,
        relatedMatch->{
          opponent,
          opponentShort,
          opponentLogo { asset { _ref } },
          isHome,
          useDefaultHomeLineup,
          homeFormation,
          awayFormation,
          lineupHome {
            starters[] {
              position, customName, "name": player->name, "number": player->number
            },
            bench[] {
              position, customName, "name": player->name, "number": player->number
            }
          },
          lineupAway {
            starters[] {
              position, customName, "name": player->name, "number": player->number
            },
            bench[] {
              position, customName, "name": player->name, "number": player->number
            }
          }
        }
      }`,
      { slug }
    ),
    client.fetch(`*[_type == "siteSettings"][0]{ title, logo { asset { _ref } } }`),
    client.fetch(`*[_type == "defaultLineup"][0]{
      formation,
      lineupHome {
        starters[] {
          position, customName, "name": player->name, "number": player->number
        },
        bench[] {
          position, customName, "name": player->name, "number": player->number
        }
      }
    }`)
  ]);

  if (!post) return notFound();

  // Handle Default Lineup injection for Nova City
  if (post.relatedMatch?.useDefaultHomeLineup && defaultLineup?.lineupHome) {
    if (post.relatedMatch.isHome) {
      post.relatedMatch.lineupHome = defaultLineup.lineupHome;
      post.relatedMatch.homeFormation = defaultLineup.formation;
    } else {
      post.relatedMatch.lineupAway = defaultLineup.lineupHome;
      post.relatedMatch.awayFormation = defaultLineup.formation;
    }
  }

  const clubName = settings?.title || '';

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`;
  }

  // Import utility at top: import { replaceClubTag } from "@/utils/textUtils";
  // We'll replace it inline to save space

  const galleryImages = (post.gallery || []).map((img: any) => ({
    src: getImageUrl(img.asset._ref),
    caption: img.caption || '',
  }));

  const displayTitle = post.title?.replace(/\[KLUB\]/g, clubName);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero image */}
      <div className="relative w-full h-[40vh] md:h-[55vh]">
        {post.mainImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${getImageUrl(post.mainImage.asset._ref)})` }}
            />
            <div className="absolute inset-0 bg-gradient-animated opacity-20 pointer-events-none z-10" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-animated" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-20" />

        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <span className="inline-block px-3 py-1 bg-primary text-background text-xs font-bold tracking-widest uppercase mb-4">
            {post.category || 'News'}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">
            {displayTitle}
          </h1>
          {post.publishedAt && (
            <p className="text-sm text-gray-400 mt-4">
              {new Date(post.publishedAt).toLocaleDateString('pl-PL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="prose prose-invert prose-lg max-w-none">
          {post.body?.map((block: any, i: number) => {
            if (block._type === 'block') {
              const Tag = block.style === 'h2' ? 'h2' : block.style === 'h3' ? 'h3' : block.style === 'h4' ? 'h4' : 'p';
              const classMap: Record<string, string> = {
                h2: 'text-3xl font-black uppercase tracking-tighter mt-10 mb-4',
                h3: 'text-2xl font-bold uppercase tracking-tight mt-8 mb-3',
                h4: 'text-xl font-bold mt-6 mb-2',
                normal: 'text-gray-300 leading-relaxed mb-6 text-lg',
              };
              
              const rawText = block.children?.map((child: any) => child.text).join('') || '';
              const processedText = rawText.replace(/\[KLUB\]/g, clubName);

              return (
                <Tag key={i} className={classMap[block.style || 'normal'] || classMap.normal}>
                  {processedText}
                </Tag>
              );
            }
            return null;
          })}
        </div>

        {/* Match Lineup */}
        {post.showMatchLineup && post.relatedMatch && (
          <div className="mt-16 border-t border-white/10 pt-16">
            <MatchLineup 
              homeTeam={post.relatedMatch.isHome ? clubName : post.relatedMatch.opponent}
              awayTeam={post.relatedMatch.isHome ? post.relatedMatch.opponent : clubName}
              homeLogo={post.relatedMatch.isHome ? getImageUrl(settings?.logo?.asset?._ref) : getImageUrl(post.relatedMatch.opponentLogo?.asset?._ref)}
              awayLogo={post.relatedMatch.isHome ? getImageUrl(post.relatedMatch.opponentLogo?.asset?._ref) : getImageUrl(settings?.logo?.asset?._ref)}
              lineupHome={post.relatedMatch.lineupHome}
              lineupAway={post.relatedMatch.lineupAway}
              homeFormation={post.relatedMatch.homeFormation}
              awayFormation={post.relatedMatch.awayFormation}
              isHome={post.relatedMatch.isHome}
            />
          </div>
        )}

        {/* Photo Gallery */}
        {galleryImages.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">
              Galeria <span className="text-primary">Zdjęć</span>
            </h2>
            <PhotoGallery images={galleryImages} />
          </div>
        )}

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/news"
            className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Wszystkie wiadomości
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
