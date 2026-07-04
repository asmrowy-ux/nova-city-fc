import { Calendar } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface MatchCenterProps {
  finishedMatch?: any;
  upcomingMatches?: any[];
  clubName: string;
  clubLogoRef: string;
}

export default function MatchCenter({ finishedMatch, upcomingMatches = [], clubName, clubLogoRef }: MatchCenterProps) {
  const t = useTranslations("MatchCenter");

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const ncLogoUrl = getImageUrl(clubLogoRef);

  return (
    <section className="py-16 bg-secondary border-y border-border relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-foreground/[0.02] whitespace-nowrap select-none pointer-events-none">
        {t('title').toUpperCase()}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          
          {finishedMatch && (
            <Link href={`/matches/${finishedMatch._id}`} className="flex-1 w-full bg-background/50 p-6 sm:p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer">
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  {finishedMatch.status === 'finished' ? t('fullTime') : 'Nadchodzący'} • {finishedMatch.competition || 'Liga'}
                </div>
                <div className="text-xs sm:text-sm font-bold text-foreground/70 bg-background/50 px-4 py-1.5 rounded-full border border-border/50 uppercase tracking-widest">
                  {new Date(finishedMatch.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-6 sm:gap-12">
                {/* Home Team */}
                <div className="text-center w-24">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-foreground/5 rounded-full flex items-center justify-center font-black text-foreground text-xl mb-3 shadow-lg mx-auto overflow-hidden">
                    {finishedMatch.isHome ? (
                      ncLogoUrl ? <img src={ncLogoUrl} alt="Home" className="w-full h-full object-contain drop-shadow-md" /> : 'NC'
                    ) : (
                      finishedMatch.opponentLogo ? <img src={getImageUrl(finishedMatch.opponentLogo.asset._ref)} alt="Away" className="w-full h-full object-contain drop-shadow-md" /> : finishedMatch.opponentShort
                    )}
                  </div>
                  <span className="text-sm font-bold uppercase truncate block px-2 text-foreground">
                    {finishedMatch.isHome ? clubName : finishedMatch.opponent}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="text-4xl sm:text-5xl font-black text-primary tracking-tighter mb-1">
                    {finishedMatch.status === 'finished' ? `${finishedMatch.homeScore} - ${finishedMatch.awayScore}` : 'VS'}
                  </div>
                </div>

                {/* Away Team */}
                <div className="text-center w-24">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-foreground/5 rounded-full flex items-center justify-center font-black text-foreground text-xl mb-3 shadow-lg mx-auto overflow-hidden group-hover:bg-primary/20 transition-colors">
                    {!finishedMatch.isHome ? (
                      ncLogoUrl ? <img src={ncLogoUrl} alt="Away" className="w-full h-full object-contain drop-shadow-md" /> : 'NC'
                    ) : (
                      finishedMatch.opponentLogo ? <img src={getImageUrl(finishedMatch.opponentLogo.asset._ref)} alt="Home" className="w-full h-full object-contain drop-shadow-md" /> : finishedMatch.opponentShort
                    )}
                  </div>
                  <span className="text-sm font-bold uppercase truncate block px-2 text-foreground">
                    {!finishedMatch.isHome ? clubName : finishedMatch.opponent}
                  </span>
                </div>
              </div>
              <div className="mt-8 text-center flex flex-col items-center gap-3">
                {finishedMatch.status !== 'finished' && (
                  <span className={`text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border ${
                    (finishedMatch.lineupHome?.starters?.length || finishedMatch.lineupAway?.starters?.length) 
                    ? 'bg-primary/10 text-primary border-primary/20' 
                    : 'bg-white/5 text-gray-400 border-white/10'
                  }`}>
                    Składy: {(finishedMatch.lineupHome?.starters?.length || finishedMatch.lineupAway?.starters?.length) ? 'Dostępne' : 'WKRÓTCE!'}
                  </span>
                )}
                <span className="text-xs font-semibold text-gray-400 group-hover:text-primary transition-colors uppercase tracking-widest">
                  {finishedMatch.status === 'finished' ? t('matchReport') : 'Szczegóły meczu'} →
                </span>
              </div>
            </Link>
          )}

          <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-border to-transparent"></div>

          <div className="flex-1 w-full flex flex-col justify-center">
            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-3 text-foreground">
              <Calendar className="w-5 h-5 text-primary" /> {t('upcomingFixtures')}
            </h3>
            
            <div className="space-y-4">
              {upcomingMatches.length > 0 ? upcomingMatches.map((match: any) => (
                <Link href={`/matches/${match._id}`} key={match._id} className="flex items-center justify-between p-4 bg-background/30 rounded-xl hover:bg-background/80 transition-colors cursor-pointer group border border-transparent hover:border-primary/30">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium mb-1">
                      {new Date(match.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="font-bold uppercase text-sm text-foreground group-hover:text-primary transition-colors">
                      {match.isHome ? `vs ${match.opponent}` : `@ ${match.opponent}`}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-4 py-2 border border-border text-foreground text-xs font-bold uppercase tracking-widest rounded hover:bg-primary hover:text-background hover:border-primary transition-colors">
                      {t('tickets')}
                    </span>
                  </div>
                </Link>
              )) : (
                <div className="text-gray-500 text-sm">Brak nadchodzących meczów.</div>
              )}
            </div>
            
            <Link href="/matches" className="inline-block mt-6 text-sm font-bold text-primary uppercase tracking-widest hover:text-foreground transition-colors">
              {t('viewAll')} →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
