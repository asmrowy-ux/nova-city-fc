"use client";

interface TeamEntry {
  _key?: string;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export default function LeagueTable({ teams }: { teams: TeamEntry[] }) {
  if (!teams || teams.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-secondary/60 text-gray-600 dark:text-gray-400 uppercase tracking-widest text-xs">
            <th className="py-3 px-2 sm:px-4 text-left w-6 sm:w-10">#</th>
            <th className="py-3 px-2 sm:px-4 text-left">Drużyna</th>
            <th className="py-3 px-2 sm:px-3 text-center">M</th>
            <th className="py-3 px-2 sm:px-3 text-center hidden sm:table-cell">W</th>
            <th className="py-3 px-2 sm:px-3 text-center hidden sm:table-cell">R</th>
            <th className="py-3 px-2 sm:px-3 text-center hidden sm:table-cell">P</th>
            <th className="py-3 px-2 sm:px-3 text-center hidden md:table-cell">BZ</th>
            <th className="py-3 px-2 sm:px-3 text-center hidden md:table-cell">BS</th>
            <th className="py-3 px-2 sm:px-3 text-center hidden md:table-cell">+/-</th>
            <th className="py-3 px-2 sm:px-4 text-center font-black">PKT</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, i) => {
            const isNovaCity = team.teamName.toLowerCase().includes('nova') || team.teamName.toLowerCase().includes('wicher');
            const gd = (team.goalsFor || 0) - (team.goalsAgainst || 0);
            const pos = i + 1;
            return (
              <tr
                key={team._key || i}
                className={`border-t border-border transition-colors hover:bg-foreground/5 text-xs sm:text-sm ${
                  isNovaCity ? 'bg-primary/10 border-l-2 border-l-primary' : ''
                }`}
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-500">{pos}</td>
                <td className={`py-2 sm:py-3 px-2 sm:px-4 font-bold truncate max-w-[120px] sm:max-w-none ${isNovaCity ? 'text-primary' : 'text-foreground'}`}>
                  {team.teamName}
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-3 text-center text-gray-600 dark:text-gray-400">{team.played || 0}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-3 text-center text-gray-600 dark:text-gray-400 hidden sm:table-cell">{team.won || 0}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-3 text-center text-gray-600 dark:text-gray-400 hidden sm:table-cell">{team.drawn || 0}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-3 text-center text-gray-600 dark:text-gray-400 hidden sm:table-cell">{team.lost || 0}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-3 text-center text-gray-600 dark:text-gray-400 hidden md:table-cell">{team.goalsFor || 0}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-3 text-center text-gray-600 dark:text-gray-400 hidden md:table-cell">{team.goalsAgainst || 0}</td>
                <td className={`py-2 sm:py-3 px-2 sm:px-3 text-center hidden md:table-cell font-bold ${gd > 0 ? 'text-green-500 dark:text-green-400' : gd < 0 ? 'text-red-500 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {gd > 0 ? `+${gd}` : gd}
                </td>
                <td className={`py-2 sm:py-3 px-2 sm:px-4 text-center font-black text-base sm:text-lg ${isNovaCity ? 'text-primary' : 'text-foreground'}`}>
                  {team.points || 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
