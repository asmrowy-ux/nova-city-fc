import { ChevronRight, Globe, Trophy, Users, Briefcase, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function HeroSection({ clubName = '', heroTitle = '', bgRef = '', logoRef = '', description = '' }: { clubName?: string, heroTitle?: string, bgRef?: string, logoRef?: string, description?: string }) {
  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const bgLogoUrl = getImageUrl(logoRef);
  const bgImageUrl = getImageUrl(bgRef) || '/hero-bg.png';
  
  const titleParts = (heroTitle || clubName || 'WICHER GDYNIA').split(' ');
  const titleFirst = titleParts[0] || 'WICHER';
  const titleRest = titleParts.slice(1).join(' ') || '';
  const displayDescription = description || `Oficjalna strona ${clubName || 'Klubu'}. Bądź na bieżąco z najnowszymi wiadomościami, meczami i ekskluzywnymi treściami klubowymi.`;

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background py-24 lg:py-0">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-30"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      />
      
      {/* Animated gradient overlay over the image */}
      <div className="absolute inset-0 bg-gradient-animated opacity-20 mix-blend-overlay z-0 pointer-events-none" />

      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background/50 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
        
        {/* Left Column: Logo, Title, Text, Socials */}
        <div className="flex flex-col items-start pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 mb-4">
            {bgLogoUrl && (
              <img src={bgLogoUrl} alt={clubName} className="w-56 h-56 md:w-80 md:h-80 object-contain drop-shadow-2xl" />
            )}
            <div className="flex flex-col leading-none pt-4 max-w-full overflow-hidden">
              <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-black uppercase tracking-tighter text-foreground m-0 p-0 leading-[0.95] md:leading-[0.85] drop-shadow-lg break-words mb-2 md:mb-0">
                {titleFirst}
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-black uppercase tracking-tighter m-0 p-0 leading-[0.95] md:leading-[0.85] drop-shadow-lg break-words" style={{ color: 'var(--theme-accent-text)' }}>
                {titleRest}
              </h1>
            </div>
          </div>

          {/* Under-Logo Decorative Line */}
          <div className="flex items-center mt-2 mb-8 gap-3 ml-2" style={{ display: 'var(--decoration-display)' }}>
            <div className="flex gap-1.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-3.5 skew-x-[-30deg]" style={{ backgroundColor: 'var(--decoration-color)' }}></div>
              ))}
            </div>
            <div className="w-64 h-[2px] shadow-[0_0_8px_rgba(251,191,36,0.6)]" style={{ backgroundColor: 'var(--decoration-color)' }}></div>
          </div>

          <p className="text-foreground/80 max-w-lg text-lg leading-relaxed mb-10 font-medium ml-2 whitespace-pre-line">
            {displayDescription}
          </p>

          <div className="flex items-center gap-5 ml-2 mt-2">
            <a href="#" className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-primary hover:text-background text-white transition-colors group shadow-[0_0_10px_rgba(251,191,36,0.15)]" style={{ borderColor: 'var(--decoration-color)' }}>
              <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-primary hover:text-background text-white transition-colors group shadow-[0_0_10px_rgba(251,191,36,0.15)]" style={{ borderColor: 'var(--decoration-color)' }}>
              <FacebookIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-primary hover:text-background text-white transition-colors group shadow-[0_0_10px_rgba(251,191,36,0.15)]" style={{ borderColor: 'var(--decoration-color)' }}>
              <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-primary hover:text-background text-white transition-colors group shadow-[0_0_10px_rgba(251,191,36,0.15)]" style={{ borderColor: 'var(--decoration-color)' }}>
              <YoutubeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: "KLUB" Menu Card */}
        <div className="flex justify-start lg:justify-end pt-12 pb-12 lg:pb-0">
          <div className="relative bg-secondary/95 backdrop-blur-xl border rounded-[40px] p-6 sm:p-8 w-full max-w-[400px] min-h-[500px] h-auto lg:h-[640px] shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col" style={{ borderColor: 'color-mix(in srgb, var(--decoration-color) 50%, transparent)' }}>
            
            <div style={{ display: 'var(--decoration-display)' }}>
              {/* Top Right Accents */}
              <div className="absolute -top-4 -right-4 w-40 h-40 pointer-events-none">
                <div className="absolute w-[120px] h-[1px] -rotate-45 top-[40px] left-[20px]" style={{ backgroundColor: 'var(--decoration-color)' }} />
                <div className="absolute w-[140px] h-[4px] -rotate-45 top-[60px] left-[10px] shadow-[0_0_8px_rgba(251,191,36,0.8)]" style={{ backgroundColor: 'var(--decoration-color)' }} />
                <div className="absolute w-[100px] h-[10px] -rotate-45 top-[85px] left-[40px]" style={{ backgroundColor: 'var(--decoration-color)' }} />
                <div className="absolute w-[40px] h-[2px] -rotate-45 top-[110px] left-[90px]" style={{ backgroundColor: 'var(--decoration-color)' }} />
              </div>
              
              {/* Bottom Right Accents */}
              <div className="absolute -bottom-4 -right-4 w-48 h-48 pointer-events-none">
                <div className="absolute w-[160px] h-[2px] -rotate-45 top-[100px] left-[10px]" style={{ backgroundColor: 'var(--decoration-color)' }} />
                <div className="absolute w-[140px] h-[6px] -rotate-45 top-[120px] left-[30px] shadow-[0_0_8px_rgba(251,191,36,0.8)]" style={{ backgroundColor: 'var(--decoration-color)' }} />
                <div className="absolute w-[100px] h-[14px] -rotate-45 top-[145px] left-[60px]" style={{ backgroundColor: 'var(--decoration-color)' }} />
                <div className="absolute flex gap-1.5 -rotate-45 top-[175px] left-[90px]">
                  {[...Array(6)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rotate-45 rounded-sm opacity-80" style={{ backgroundColor: 'var(--decoration-color)' }} />)}
                </div>
              </div>
              
              {/* Left side dots */}
              <div className="absolute left-6 top-[35%] flex flex-col gap-2 pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-[1px] border-[1.5px]" style={{ borderColor: 'var(--decoration-color)' }}></div>
                <div className="w-1.5 h-1.5 rounded-[1px] border-[1.5px]" style={{ borderColor: 'var(--decoration-color)' }}></div>
                <div className="w-1.5 h-1.5 rounded-[1px] border-[1.5px]" style={{ borderColor: 'var(--decoration-color)' }}></div>
                <div className="w-1.5 h-1.5 rounded-[1px] border-[1.5px]" style={{ borderColor: 'var(--decoration-color)' }}></div>
              </div>
            </div>

            <h2 className="relative z-10 font-black text-3xl uppercase tracking-widest mt-12 ml-10 mb-8 drop-shadow-md" style={{ color: 'var(--decoration-color)' }}>KLUB</h2>
            
            {/* Inner Zig-Zag Container */}
            <div className="relative z-10 flex-1 mx-4 mb-10 flex flex-col">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ display: 'var(--decoration-display)' }}>
                <path 
                  d="M 10 0 L 100 0 L 100 100 L 0 100 L 0 85 L 8 80 L 0 75 L 0 65 L 8 60 L 0 55 L 0 45 L 8 40 L 0 35 L 0 25 L 8 20 L 0 15 L 0 8 L 8 0 Z" 
                  stroke="var(--decoration-color)" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" strokeOpacity="0.8"
                />
              </svg>

              <div className="flex flex-col h-full justify-evenly px-4 py-2 relative z-20">
                <Link href="/history" className="flex items-center justify-between group px-4 py-3 hover:bg-foreground/5 transition-all cursor-pointer rounded-r-lg">
                  <div className="flex items-center gap-5">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium text-lg tracking-wide group-hover:text-primary transition-colors">Historia</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                
                <div className="h-[1px] w-[95%] self-end bg-primary/20" />
                
                <Link href="/stadium" className="flex items-center justify-between group px-4 py-3 hover:bg-foreground/5 transition-all cursor-pointer rounded-r-lg">
                  <div className="flex items-center gap-5">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                        <ellipse cx="12" cy="8" rx="8" ry="3" />
                        <path d="M4 8v6c0 1.66 3.58 3 8 3s8-1.34 8-3V8" />
                        <path d="M12 11v3" />
                        <path d="M8 10.5v2" />
                        <path d="M16 10.5v2" />
                      </svg>
                    </div>
                    <span className="text-foreground font-medium text-lg tracking-wide group-hover:text-primary transition-colors">Stadion</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>

                <div className="h-[1px] w-[95%] self-end bg-primary/20" />
                
                <Link href="/board" className="flex items-center justify-between group px-4 py-3 hover:bg-foreground/5 transition-all cursor-pointer rounded-r-lg">
                  <div className="flex items-center gap-5">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium text-lg tracking-wide group-hover:text-primary transition-colors">Zarząd</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>

                <div className="h-[1px] w-[95%] self-end bg-primary/20" />
                
                <Link href="/careers" className="flex items-center justify-between group px-4 py-3 hover:bg-foreground/5 transition-all cursor-pointer rounded-r-lg">
                  <div className="flex items-center gap-5">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium text-lg tracking-wide group-hover:text-primary transition-colors">Kariera</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>

                <div className="h-[1px] w-[95%] self-end bg-primary/20" />
                
                <Link href="/contact" className="flex items-center justify-between group px-4 py-3 hover:bg-foreground/5 transition-all cursor-pointer rounded-r-lg">
                  <div className="flex items-center gap-5">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium text-lg tracking-wide group-hover:text-primary transition-colors">Kontakt</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
