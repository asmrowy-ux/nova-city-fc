import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeagueTable from "@/components/LeagueTable";
import MatchLineup from "@/components/MatchLineup";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [match, settings, defaultLineup] = await Promise.all([
    client.fetch(
      `*[_type == "match" && _id == $id][0]{
        ...,
        opponentLogo { asset { _ref } },
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
      }`,
      { id }
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

  if (!match) return notFound();

  // Handle Default Lineup injection for Nova City
  if (match.useDefaultHomeLineup && defaultLineup?.lineupHome) {
    if (match.isHome) {
      match.lineupHome = defaultLineup.lineupHome;
      match.homeFormation = defaultLineup.formation;
    } else {
      match.lineupAway = defaultLineup.lineupHome;
      match.awayFormation = defaultLineup.formation;
    }
  }

  function getImageUrl(ref?: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  // Find linked article
  const linkedArticle = await client.fetch(
    `*[_type == "post" && relatedMatch._ref == $matchId][0]{ title, slug }`,
    { matchId: id }
  );

  // Fetch league table
  const table = await client.fetch(`*[_type == "leagueTable"][0]{ teams }`);

  const ncName = settings?.title || '';
  const ncLogoUrl = getImageUrl(settings?.logo?.asset?._ref);
  const oppLogoUrl = getImageUrl(match.opponentLogo?.asset?._ref);

  const homeTeam = match.isHome ? ncName : match.opponent;
  const awayTeam = match.isHome ? match.opponent : ncName;
  const homeLogo = match.isHome ? ncLogoUrl : oppLogoUrl;
  const awayLogo = match.isHome ? oppLogoUrl : ncLogoUrl;
  const homeShort = match.isHome ? 'NC' : match.opponentShort;
  const awayShort = match.isHome ? match.opponentShort : 'NC';

  const stats = [
    { label: 'Posiadanie piłki', home: match.possessionHome ? `${match.possessionHome}%` : '-', away: match.possessionAway ? `${match.possessionAway}%` : '-' },
    { label: 'Strzały', home: match.shotsHome ?? '-', away: match.shotsAway ?? '-' },
    { label: 'Strzały celne', home: match.shotsOnTargetHome ?? '-', away: match.shotsOnTargetAway ?? '-' },
    { label: 'Rzuty rożne', home: match.cornersHome ?? '-', away: match.cornersAway ?? '-' },
    { label: 'Faule', home: match.foulsHome ?? '-', away: match.foulsAway ?? '-' },
    { label: 'Żółte kartki', home: match.yellowCardsHome ?? '-', away: match.yellowCardsAway ?? '-' },
    { label: 'Czerwone kartki', home: match.redCardsHome ?? '-', away: match.redCardsAway ?? '-' },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      {/* Match Header */}
      <div className="pt-28 pb-12 bg-gradient-to-b from-secondary/60 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-2">{match.competition}</div>
          <div className="text-sm text-gray-400 mb-8">{new Date(match.date).toLocaleString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
            <div className="flex-1 text-center md:text-right order-1 md:order-none">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-secondary rounded-full flex items-center justify-center mx-auto md:ml-auto md:mr-0 mb-4 border border-white/10 p-4">
                {homeLogo ? (
                  <img src={homeLogo} alt={homeTeam} className="w-full h-full object-contain" />
                ) : (
                  <span className="font-black text-xl md:text-2xl text-primary">{homeShort}</span>
                )}
              </div>
              <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight">{homeTeam}</h2>
            </div>

            <div className="flex flex-col items-center min-w-[120px] order-2 md:order-none my-4 md:my-0">
              {match.status === 'finished' ? (
                <>
                  <div className="text-5xl md:text-7xl font-black tracking-tighter">
                    {match.homeScore} <span className="text-white/30">-</span> {match.awayScore}
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest mt-2">Koniec meczu</span>
                </>
              ) : match.status === 'live' ? (
                <>
                  <div className="text-5xl md:text-7xl font-black tracking-tighter text-red-500">
                    {match.homeScore ?? 0} <span className="text-white/30">-</span> {match.awayScore ?? 0}
                  </div>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest mt-2 animate-pulse">● NA ŻYWO</span>
                </>
              ) : (
                <>
                  <div className="text-5xl md:text-7xl font-black tracking-tighter text-white/30">VS</div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">Nadchodzący</span>
                </>
              )}
            </div>

            <div className="flex-1 text-center md:text-left order-3 md:order-none">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-secondary rounded-full flex items-center justify-center mx-auto md:mr-auto md:ml-0 mb-4 border border-white/10 p-4">
                {awayLogo ? (
                  <img src={awayLogo} alt={awayTeam} className="w-full h-full object-contain opacity-80" />
                ) : (
                  <span className="font-black text-xl md:text-2xl text-white/60">{awayShort}</span>
                )}
              </div>
              <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight">{awayTeam}</h2>
            </div>
          </div>

          {/* Linked Article Button */}
          {linkedArticle && (
            <div className="mt-10 order-4 md:order-none">
              <Link
                href={`/news/${linkedArticle.slug?.current}`}
                className="inline-flex items-center gap-3 px-8 py-3 bg-primary text-background font-bold text-sm uppercase tracking-widest hover:bg-primary/80 transition-colors rounded-sm"
              >
                <FileText className="w-4 h-4" />
                Czytaj raport meczowy
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        {/* Goalscorers */}
        {match.goalscorers && (
          <div className="mb-12 p-6 bg-secondary/30 rounded-xl border border-white/5 text-center">
            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Bramki</div>
            <p className="text-gray-300">{match.goalscorers}</p>
          </div>
        )}

        <MatchLineup 
          homeTeam={homeTeam} 
          awayTeam={awayTeam} 
          homeLogo={homeLogo} 
          awayLogo={awayLogo} 
          lineupHome={match.lineupHome} 
          lineupAway={match.lineupAway}
          homeFormation={match.homeFormation}
          awayFormation={match.awayFormation}
          isHome={match.isHome}
        />

        {/* Match Statistics */}
        {match.status === 'finished' && (
          <div className="mb-16">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 text-center">
              Statystyki <span className="text-primary">Meczu</span>
            </h3>
            <div className="space-y-4">
              {stats.map((stat, i) => {
                const homeVal = typeof stat.home === 'number' ? stat.home : parseInt(String(stat.home)) || 0;
                const awayVal = typeof stat.away === 'number' ? stat.away : parseInt(String(stat.away)) || 0;
                const total = homeVal + awayVal || 1;
                const homePercent = (homeVal / total) * 100;

                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-16 text-right font-bold text-sm">{stat.home}</div>
                    <div className="flex-1">
                      <div className="flex h-2 rounded-full overflow-hidden bg-white/5">
                        <div className="bg-primary rounded-l-full transition-all duration-700" style={{ width: `${homePercent}%` }} />
                        <div className="bg-gray-500 rounded-r-full transition-all duration-700" style={{ width: `${100 - homePercent}%` }} />
                      </div>
                      <div className="text-center text-xs text-gray-500 mt-1">{stat.label}</div>
                    </div>
                    <div className="w-16 text-left font-bold text-sm">{stat.away}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* League Table */}
        {table?.teams && table.teams.length > 0 && (
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 text-center">
              Tabela <span className="text-primary">Ligi</span>
            </h3>
            <LeagueTable teams={table.teams} />
          </div>
        )}

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link href="/matches" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Wszystkie mecze
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
