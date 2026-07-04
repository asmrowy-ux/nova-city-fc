import { Link } from "@/i18n/routing";

export default function FixturesWidget({ matches, title = 'TERMINARZ' }: { matches: any[], title?: string }) {
  if (!matches || matches.length === 0) return null;

  return (
    <div className="bg-secondary rounded-3xl p-8 border border-border h-full flex flex-col">
      <h3 className="font-black text-xl uppercase tracking-widest mb-8" style={{ color: 'var(--theme-header-sponsors)' }}>
        {title}
      </h3>

      <div className="flex flex-col gap-4 flex-1">
        {matches.map((match) => {
          const matchDate = new Date(match.date);
          const dateStr = matchDate.toLocaleDateString('pl-PL', { day: '2-digit', month: 'short' }).replace('.', '');
          const timeStr = matchDate.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });

          const opponentName = match.opponentShort || match.opponent.substring(0, 3).toUpperCase();
          const isHome = match.isHome;

          const team1 = isHome ? 'WIC' : opponentName;
          const team2 = isHome ? opponentName : 'WIC';
          const team1Score = match.status === 'finished' ? (isHome ? match.homeScore : match.awayScore) : '-';
          const team2Score = match.status === 'finished' ? (isHome ? match.awayScore : match.homeScore) : '-';

          return (
            <Link key={match._id} href={`/matches/${match._id}`} className="group flex flex-col p-4 bg-background/50 rounded-xl hover:bg-background border border-transparent hover:border-primary/20 transition-all cursor-pointer relative">
              <div className="text-center mb-3">
                <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider bg-background/80 px-3 py-1 rounded-full border border-border/50">
                  {dateStr} • {timeStr}
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4 w-full">
                <span className={`font-black text-base sm:text-lg truncate flex-1 text-right ${isHome ? 'text-primary' : 'text-foreground'}`}>{team1}</span>
                
                {match.status === 'finished' || match.status === 'live' ? (
                  <div className="bg-primary/20 text-primary font-black px-2 sm:px-3 py-1 rounded text-xs sm:text-sm whitespace-nowrap shrink-0">
                    {team1Score} : {team2Score}
                  </div>
                ) : (
                  <span className="text-foreground/30 font-black text-xs sm:text-sm shrink-0">VS</span>
                )}

                <span className={`font-black text-base sm:text-lg truncate flex-1 text-left ${!isHome ? 'text-primary' : 'text-foreground'}`}>{team2}</span>
              </div>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-xs">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Link href="/matches" className="mt-8 text-center text-xs font-bold text-foreground/50 hover:text-primary uppercase tracking-widest transition-colors block">
        ZOBACZ PEŁNY TERMINARZ →
      </Link>
    </div>
  );
}
