import { Link } from "@/i18n/routing";

export default function LeagueTableWidget({ leagueTable, matches, title = 'TABELA LIGOWA' }: { leagueTable: any, matches: any[], title?: string }) {
  if (!leagueTable || !leagueTable.teams) return null;

  let tableData = [...leagueTable.teams];

  if (leagueTable.autoCalculate) {
    // Reset points for calculation
    tableData = tableData.map(team => ({
      ...team,
      played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0
    }));

    // Find Nova City Team Entry
    // We assume the first entry or one named 'Nova City' is the club. 
    // If not found by name, assume first team is Nova City
    let novaCityIndex = tableData.findIndex(t => t.teamName.toLowerCase().includes('nova city') || t.teamName.toLowerCase().includes('wicher'));
    if (novaCityIndex === -1) novaCityIndex = 0; // fallback to first entry
    
    matches
      .filter(m => m.status === 'finished' && m.competition === leagueTable.competition && m.season === leagueTable.seasonName)
      .forEach(match => {
      const isHome = match.isHome;
      const ourGoals = isHome ? match.homeScore : match.awayScore;
      const theirGoals = isHome ? match.awayScore : match.homeScore;
      
      const opponentName = match.opponent;
      const oppIndex = tableData.findIndex(t => t.teamName.toLowerCase() === opponentName.toLowerCase());

      // Update our team
      if (novaCityIndex !== -1) {
        const team = tableData[novaCityIndex];
        team.played++;
        team.goalsFor += ourGoals;
        team.goalsAgainst += theirGoals;
        if (ourGoals > theirGoals) { team.won++; team.points += 3; }
        else if (ourGoals === theirGoals) { team.drawn++; team.points += 1; }
        else { team.lost++; }
      }

      // Update opponent
      if (oppIndex !== -1) {
        const team = tableData[oppIndex];
        team.played++;
        team.goalsFor += theirGoals;
        team.goalsAgainst += ourGoals;
        if (theirGoals > ourGoals) { team.won++; team.points += 3; }
        else if (theirGoals === ourGoals) { team.drawn++; team.points += 1; }
        else { team.lost++; }
      }
    });

    // Sort table
    tableData.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const aDiff = a.goalsFor - a.goalsAgainst;
      const bDiff = b.goalsFor - b.goalsAgainst;
      if (bDiff !== aDiff) return bDiff - aDiff;
      return b.goalsFor - a.goalsFor;
    });
  }

  // Take top 6 for the widget
  const displayTeams = tableData.slice(0, 6);

  return (
    <div className="bg-secondary rounded-3xl p-8 border border-border h-full flex flex-col">
      <h3 className="font-black text-xl uppercase tracking-widest mb-8" style={{ color: 'var(--theme-header-news)' }}>
        {title} <span className="text-foreground/30 text-sm ml-2">{leagueTable.competition}</span>
      </h3>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="text-foreground/50 border-b border-border/50 text-xs sm:text-sm">
              <th className="pb-3 font-bold w-6 sm:w-8 text-center px-1 sm:px-2">#</th>
              <th className="pb-3 font-bold px-1 sm:px-2">Klub</th>
              <th className="pb-3 font-bold text-center w-6 sm:w-8 px-1 sm:px-2">M</th>
              <th className="pb-3 font-bold text-center w-8 hidden sm:table-cell">Z</th>
              <th className="pb-3 font-bold text-center w-8 hidden sm:table-cell">R</th>
              <th className="pb-3 font-bold text-center w-8 hidden sm:table-cell">P</th>
              <th className="pb-3 font-bold text-center w-12 hidden md:table-cell">B</th>
              <th className="pb-3 font-black text-center w-10 sm:w-12 text-primary px-1 sm:px-2">PKT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {displayTeams.map((team, index) => {
              const ref = team?.logo?.asset?._ref || '';
              const logoUrl = ref ? `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}` : '';
              
              const isNovaCity = team.teamName.toLowerCase().includes('nova city') || team.teamName.toLowerCase().includes('wicher');
              
              return (
                <tr key={index} className={`group hover:bg-background/50 transition-colors text-xs sm:text-sm ${isNovaCity ? 'bg-primary/5' : ''}`}>
                  <td className="py-2 sm:py-3 text-center font-bold text-foreground/50 px-1 sm:px-2">{index + 1}</td>
                  <td className="py-2 sm:py-3 px-1 sm:px-2 flex items-center gap-2 sm:gap-3">
                    {logoUrl ? (
                      <img src={logoUrl} alt={team.teamName} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                    ) : (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-background border border-border flex items-center justify-center text-[8px] font-black opacity-50 shrink-0">
                        {team.teamName.substring(0,2).toUpperCase()}
                      </div>
                    )}
                    <span className={`font-bold truncate max-w-[100px] sm:max-w-none ${isNovaCity ? 'text-primary' : 'text-foreground'}`}>{team.teamName}</span>
                  </td>
                  <td className="py-2 sm:py-3 text-center text-foreground/70 px-1 sm:px-2">{team.played}</td>
                  <td className="py-2 sm:py-3 text-center text-foreground/70 hidden sm:table-cell">{team.won}</td>
                  <td className="py-2 sm:py-3 text-center text-foreground/70 hidden sm:table-cell">{team.drawn}</td>
                  <td className="py-2 sm:py-3 text-center text-foreground/70 hidden sm:table-cell">{team.lost}</td>
                  <td className="py-2 sm:py-3 text-center text-foreground/50 text-xs hidden md:table-cell">{team.goalsFor}:{team.goalsAgainst}</td>
                  <td className="py-2 sm:py-3 text-center font-black text-foreground px-1 sm:px-2">{team.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Link href="/table" className="mt-8 text-center text-xs font-bold text-foreground/50 hover:text-primary uppercase tracking-widest transition-colors block">
        PEŁNA TABELA LIGOWA →
      </Link>
    </div>
  );
}
