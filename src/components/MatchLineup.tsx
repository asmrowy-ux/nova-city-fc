"use client";

interface PlayerEntry {
  name?: string;
  number?: number;
  customName?: string;
  position?: string;
}

interface LineupData {
  starters?: PlayerEntry[];
  bench?: PlayerEntry[];
}

interface MatchLineupProps {
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  lineupHome?: LineupData;
  lineupAway?: LineupData;
  homeFormation?: string;
  awayFormation?: string;
  isHome: boolean;
}

function getPlayerDisplay(player: PlayerEntry) {
  if (player.name) {
    return { name: player.name, number: player.number?.toString() || '?' };
  } else if (player.customName) {
    const [num, ...nameParts] = player.customName.split('-');
    const name = nameParts.length > 0 ? nameParts.join('-').trim() : player.customName.trim();
    const displayNum = nameParts.length > 0 ? num.trim() : '?';
    return { name, number: displayNum };
  }
  return { name: 'Nieznany', number: '?' };
}

function mapPlayersToPitch(formation: string | undefined, players: PlayerEntry[] | undefined) {
  if (!players || players.length === 0) return null;
  
  const hasPositions = players.some(p => p.position);
  
  if (hasPositions) {
    const lines = {
      gk: [] as PlayerEntry[],
      def: [] as PlayerEntry[],
      cdm: [] as PlayerEntry[],
      mid: [] as PlayerEntry[],
      cam: [] as PlayerEntry[],
      fwd: [] as PlayerEntry[]
    };

    const sortWeight: Record<string, number> = {
      'LB': 1, 'LWB': 1, 'LM': 1, 'LW': 1,
      'CB': 2, 'CDM': 2, 'CM': 2, 'CAM': 2, 'CF': 2, 'ST': 2,
      'RB': 3, 'RWB': 3, 'RM': 3, 'RW': 3,
      'GK': 2
    };

    const sortedPlayers = [...players].sort((a, b) => (sortWeight[a.position || ''] || 2) - (sortWeight[b.position || ''] || 2));

    for (const p of sortedPlayers) {
      const pos = p.position || '';
      if (pos === 'GK') lines.gk.push(p);
      else if (['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(pos)) lines.def.push(p);
      else if (pos === 'CDM') lines.cdm.push(p);
      else if (['CM', 'LM', 'RM'].includes(pos)) lines.mid.push(p);
      else if (['CAM', 'LW', 'RW'].includes(pos)) lines.cam.push(p);
      else if (['ST', 'CF'].includes(pos)) lines.fwd.push(p);
      else lines.mid.push(p);
    }

    return [lines.fwd, lines.cam, lines.mid, lines.cdm, lines.def, lines.gk].filter(line => line.length > 0);
  }

  if (!formation || formation === 'list' || players.length !== 11) return null;
  const parts = formation.split('-').map(Number);
  const sum = parts.reduce((a, b) => a + b, 0);
  if (sum !== 10) return null;
  
  const rows = [];
  rows.push([players[0]]); // GK
  let playerIndex = 1;
  for (let count of parts) {
    rows.push(players.slice(playerIndex, playerIndex + count));
    playerIndex += count;
  }
  return rows.reverse();
}

export default function MatchLineup({ homeTeam, awayTeam, homeLogo, awayLogo, lineupHome, lineupAway, homeFormation, awayFormation, isHome }: MatchLineupProps) {
  const hasHomeLineup = lineupHome?.starters?.length || lineupHome?.bench?.length;
  const hasAwayLineup = lineupAway?.starters?.length || lineupAway?.bench?.length;

  if (!hasHomeLineup && !hasAwayLineup) {
    return null;
  }

  const renderPlayerList = (players?: PlayerEntry[], isPrimary = false) => {
    if (!players || players.length === 0) return <div className="text-gray-500 text-sm py-2">Brak danych</div>;
    return (
      <ul className="space-y-1">
        {players.map((player, i) => {
          const display = getPlayerDisplay(player);
          return (
            <li key={i} className={`flex items-center gap-3 py-2 border-b border-white/5 last:border-0 ${isPrimary ? 'text-primary font-bold' : 'text-gray-300'}`}>
              <span className="w-6 text-center font-black opacity-60 text-sm">{display.number}</span>
              <span>{display.name}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderPitch = (rows: PlayerEntry[][], isPrimary: boolean) => {
    return (
      <div className="relative w-full aspect-[2/3] max-w-sm mx-auto bg-[#2b6b39] rounded-lg border-2 border-white/40 overflow-hidden flex flex-col justify-between py-6 mb-8 shadow-inner">
        {/* Field markings */}
        <div className="absolute inset-0 border-[1.5px] border-white/30 m-3 pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 right-0 border-t-[1.5px] border-white/30 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full border-[1.5px] border-white/30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-white/30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        {/* Penalty areas */}
        <div className="absolute bottom-3 left-1/2 w-1/2 h-1/6 border-[1.5px] border-b-0 border-white/30 -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-3 left-1/2 w-1/4 h-[8%] border-[1.5px] border-b-0 border-white/30 -translate-x-1/2 pointer-events-none"></div>
        
        <div className="absolute top-3 left-1/2 w-1/2 h-1/6 border-[1.5px] border-t-0 border-white/30 -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute top-3 left-1/2 w-1/4 h-[8%] border-[1.5px] border-t-0 border-white/30 -translate-x-1/2 pointer-events-none"></div>

        {/* Rows */}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="relative z-10 flex justify-around w-full px-4">
            {row.map((player, pIndex) => {
              const display = getPlayerDisplay(player);
              return (
                <div key={pIndex} className="flex flex-col items-center">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-black shadow-lg mb-1 border-2 border-background/20 ${isPrimary ? 'bg-primary text-background' : 'bg-white text-black'}`}>
                    {display.number}
                  </div>
                  <div className="text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded truncate max-w-[70px] text-center backdrop-blur-sm shadow-sm">
                    {display.name}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderTeamColumn = (teamName: string, logo: string | undefined, lineup: LineupData | undefined, formation: string | undefined, isPrimary: boolean) => {
    if (!lineup?.starters?.length && !lineup?.bench?.length) return null;
    
    const pitchRows = mapPlayersToPitch(formation, lineup?.starters);

    return (
      <div className={`flex-1 ${!hasAwayLineup || !hasHomeLineup ? 'max-w-md mx-auto w-full' : ''}`}>
        <div className="flex items-center justify-center md:justify-start gap-4 mb-6 pb-4 border-b border-white/10">
          {logo ? (
            <img src={logo} alt={teamName} className="w-12 h-12 object-contain drop-shadow-lg" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-xl opacity-50">
              {teamName.substring(0, 2).toUpperCase()}
            </div>
          )}
          <h4 className={`text-xl md:text-2xl font-black uppercase ${isPrimary ? 'text-primary' : 'text-foreground'}`}>{teamName}</h4>
        </div>

        <div className="mb-8">
          <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 text-center md:text-left">Wyjściowa XI {formation !== 'list' && formation ? `(${formation})` : ''}</h5>
          {pitchRows ? renderPitch(pitchRows, isPrimary) : renderPlayerList(lineup.starters, isPrimary)}
        </div>

        <div className="bg-background/30 p-4 rounded-xl border border-white/5">
          <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Ławka rezerwowych</h5>
          {renderPlayerList(lineup.bench, false)}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-16">
      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-12 text-center">
        Składy <span className="text-primary">Meczowe</span>
      </h3>
      
      <div className="flex flex-col lg:flex-row gap-12 bg-secondary/30 p-6 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
        {hasHomeLineup && renderTeamColumn(homeTeam, homeLogo, lineupHome, homeFormation, isHome)}
        {hasHomeLineup && hasAwayLineup && <div className="w-px bg-white/5 hidden lg:block"></div>}
        {hasAwayLineup && renderTeamColumn(awayTeam, awayLogo, lineupAway, awayFormation, !isHome)}
      </div>
    </div>
  );
}
