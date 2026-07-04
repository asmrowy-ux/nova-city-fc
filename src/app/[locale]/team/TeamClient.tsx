"use client";

import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";

export default function TeamClient({ 
  players, 
  clubName, 
  clubLogoUrl,
  title = "Pierwsza",
  subtitle = "Drużyna",
  pageName = "Pierwsza Drużyna",
  emptyStateMsg = "Brak zawodników w pierwszej drużynie."
}: { 
  players: any[], 
  clubName?: string, 
  clubLogoUrl?: string,
  title?: string,
  subtitle?: string,
  pageName?: string,
  emptyStateMsg?: string
}) {
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);

  // Group players by position
  const goalkeepers = players.filter(p => p.position === 'goalkeeper' || p.position === 'Bramkarz');
  const defenders = players.filter(p => p.position === 'defender' || p.position === 'Obrońca');
  const midfielders = players.filter(p => p.position === 'midfielder' || p.position === 'Pomocnik');
  const forwards = players.filter(p => p.position === 'forward' || p.position === 'Napastnik');

  const groups = [
    { title: 'Bramkarze', players: goalkeepers },
    { title: 'Obrońcy', players: defenders },
    { title: 'Pomocnicy', players: midfielders },
    { title: 'Napastnicy', players: forwards },
  ];

  function getImageUrl(ref?: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  return (
    <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
      <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Klub</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-primary">{pageName}</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16">
        {title} <span className="text-primary">{subtitle}</span>
      </h1>

      {groups.map((group, idx) => group.players.length > 0 && (
        <div key={idx} className="mb-16">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 pb-4 border-b border-border flex items-center gap-4">
            <span className="w-3 h-3 bg-primary rounded-full"></span>
            {group.title}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {group.players.map((player: any) => {
              const imgUrl = getImageUrl(player.image?.asset?._ref);
              
              return (
                <div 
                  key={player._id} 
                  onClick={() => setSelectedPlayer(player)}
                  className="group relative bg-secondary rounded-xl overflow-hidden cursor-pointer border border-border hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
                >
                  <div className="aspect-[3/4] bg-background relative flex items-end justify-center overflow-hidden">
                    {imgUrl ? (
                      <>
                        <img 
                          src={imgUrl} 
                          alt={player.name} 
                          className="absolute bottom-0 w-full h-full object-contain object-bottom mask-image-bottom transition-transform duration-500 group-hover:scale-110" 
                          style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-animated opacity-20 pointer-events-none z-10" style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)' }} />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-animated flex items-center justify-center overflow-hidden">
                        {clubLogoUrl ? (
                          <img src={clubLogoUrl} alt="Logo" className="w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-50 drop-shadow-2xl z-10" />
                        ) : (
                          <span className="text-primary font-black text-6xl opacity-50 z-10">NC</span>
                        )}
                        <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />
                      </div>
                    )}
                    
                    {/* Number Overlay */}
                    {player.number && (
                      <div className="absolute top-4 left-4 font-black text-4xl text-white/20 group-hover:text-primary/40 transition-colors">
                        {player.number}
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
                  </div>
                  
                  <div className="p-6 relative z-10 bg-secondary">
                    <div className="text-xs text-primary font-bold tracking-widest uppercase mb-1">
                      {player.position === 'goalkeeper' ? 'Bramkarz' : 
                       player.position === 'defender' ? 'Obrońca' : 
                       player.position === 'midfielder' ? 'Pomocnik' : 
                       player.position === 'forward' ? 'Napastnik' : player.position}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                      {player.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {players.length === 0 && (
        <div className="text-center py-20 bg-secondary/50 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold mb-4 text-gray-500 dark:text-gray-400">{emptyStateMsg}</h2>
          <p className="text-gray-400 dark:text-gray-500">Przejdź do Sanity Studio, aby dodać graczy.</p>
        </div>
      )}

      <ProfileModal 
        isOpen={!!selectedPlayer} 
        onClose={() => setSelectedPlayer(null)} 
        profile={selectedPlayer}
        type="player"
        clubName={clubName}
      />
    </div>
  );
}
