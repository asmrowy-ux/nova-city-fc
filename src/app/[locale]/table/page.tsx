import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeagueTable from "@/components/LeagueTable";
import FixturesWidget from "@/components/FixturesWidget";

export default async function TablePage({ searchParams }: { searchParams: { season?: string } }) {
  const params = await searchParams;
  const urlSeason = params?.season;

  const allTables = await client.fetch(`*[_type == "leagueTable"] | order(seasonName desc){ seasonName, competition, autoCalculate, teams }`);
  const seasons = allTables.map((t: any) => t.seasonName);
  
  const selectedSeason = urlSeason && seasons.includes(urlSeason) ? urlSeason : (seasons[0] || null);
  const table = allTables.find((t: any) => t.seasonName === selectedSeason) || null;

  const matches = selectedSeason ? await client.fetch(`*[_type == "match" && season == $season] | order(date asc)`, { season: selectedSeason }) : [];

  let tableData = table?.teams ? [...table.teams] : [];

  if (table?.autoCalculate && tableData.length > 0) {
    tableData = tableData.map(team => ({
      ...team, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0
    }));

    let novaCityIndex = tableData.findIndex(t => t.teamName.toLowerCase().includes('nova city') || t.teamName.toLowerCase().includes('wicher'));
    if (novaCityIndex === -1) novaCityIndex = 0;

    matches
      .filter((m: any) => m.status === 'finished' && m.competition === table.competition)
      .forEach((match: any) => {
      const isHome = match.isHome;
      const ourGoals = isHome ? match.homeScore : match.awayScore;
      const theirGoals = isHome ? match.awayScore : match.homeScore;
      
      const opponentName = match.opponent;
      const oppIndex = tableData.findIndex(t => t.teamName.toLowerCase() === opponentName.toLowerCase());

      if (novaCityIndex !== -1) {
        const team = tableData[novaCityIndex];
        team.played++; team.goalsFor += ourGoals; team.goalsAgainst += theirGoals;
        if (ourGoals > theirGoals) { team.won++; team.points += 3; }
        else if (ourGoals === theirGoals) { team.drawn++; team.points += 1; }
        else { team.lost++; }
      }

      if (oppIndex !== -1) {
        const team = tableData[oppIndex];
        team.played++; team.goalsFor += theirGoals; team.goalsAgainst += ourGoals;
        if (theirGoals > ourGoals) { team.won++; team.points += 3; }
        else if (theirGoals === ourGoals) { team.drawn++; team.points += 1; }
        else { team.lost++; }
      }
    });

    tableData.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const aDiff = a.goalsFor - a.goalsAgainst;
      const bDiff = b.goalsFor - b.goalsAgainst;
      if (bDiff !== aDiff) return bDiff - aDiff;
      return b.goalsFor - a.goalsFor;
    });
  }

  const upcomingMatches = matches.filter((m: any) => m.status === 'upcoming').slice(0, 3);
  const finishedMatches = matches.filter((m: any) => m.status === 'finished').slice(-3).reverse();

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="pt-48 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-center">
          Tabela <span className="text-primary">Ligi</span>
        </h1>
        {table && (
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-12">
            {table.competition}
          </p>
        )}

        {seasons.length > 1 && (
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {seasons.map((s: string) => (
              <a 
                key={s} 
                href={`/table?season=${encodeURIComponent(s)}`}
                className={`px-6 py-2 rounded-full border text-sm font-bold uppercase tracking-widest transition-colors ${
                  s === selectedSeason 
                    ? 'bg-primary text-background border-primary' 
                    : 'bg-background text-foreground border-border hover:border-primary/50'
                }`}
              >
                {s}
              </a>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-12">
          {!tableData || tableData.length === 0 ? (
            <div className="text-center py-20 bg-secondary/50 rounded-2xl border border-border">
              <h2 className="text-2xl font-bold mb-4 text-gray-500 dark:text-gray-400">Brak danych dla wybranego sezonu.</h2>
              <p className="text-gray-400 dark:text-gray-500">Przejdź do /studio → League Table i dodaj tabele!</p>
            </div>
          ) : (
            <LeagueTable teams={tableData} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <FixturesWidget matches={upcomingMatches} title="NADCHODZĄCE MECZE" />
            <FixturesWidget matches={finishedMatches} title="OSTATNIE WYNIKI" />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
