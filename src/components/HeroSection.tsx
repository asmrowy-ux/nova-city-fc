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

export default function HeroSection({ clubName = '', logoRef = '' }: { clubName?: string, logoRef?: string }) {
  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const bgLogoUrl = getImageUrl(logoRef);
  const titleParts = clubName ? clubName.split(' ') : ['WICHER', 'GDYNIA'];
  const titleFirst = titleParts[0] || 'WICHER';
  const titleRest = titleParts.slice(1).join(' ') || 'GDYNIA';

  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-background">
      {/* Background stays the same as before */}
      <div 
        className="absolute inset-0 z-0 opacity-30 dark:opacity-30 opacity-10"
        style={{
          background: 'radial-gradient(circle at 10% 10%, rgba(212, 175, 55, 0.25) 0%, transparent 60%), radial-gradient(circle at 90% 90%, rgba(100, 100, 100, 0.1) 0%, transparent 60%)'
        }}
      />
      
      {bgLogoUrl && (
        <svg className="absolute inset-0 z-0 w-full h-full opacity-40 dark:opacity-40 opacity-10">
          <defs>
            <pattern 
              id="club-pattern" 
              x="0" 
              y="0" 
              width="200" 
              height="200" 
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="200" y2="200" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" className="animate-pulse" />
              <line x1="200" y1="0" x2="0" y2="200" stroke="rgba(100, 100, 100, 0.3)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
              
              <circle cx="200" cy="0" r="5" fill="currentColor" className="animate-ping text-foreground" style={{ animationDuration: '3s' }} opacity="0.4" />
              <circle cx="0" cy="200" r="8" fill="rgba(212, 175, 55, 1)" className="animate-pulse" style={{ animationDuration: '2s' }} opacity="0.6" />
              
              <image 
                href={bgLogoUrl} 
                x="40" 
                y="40" 
                width="120" 
                height="120" 
                preserveAspectRatio="xMidYMid meet" 
                opacity="0.1"
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#club-pattern)" />
        </svg>
      )}

      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background/50 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
        
        {/* Left Column: Logo, Title, Text, Socials */}
        <div className="flex flex-col items-start pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10 mb-8">
            {bgLogoUrl && (
              <img src={bgLogoUrl} alt={clubName} className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-2xl" />
            )}
            <div className="flex flex-col leading-none pt-4">
              <h1 className="text-6xl md:text-[5.5rem] font-black uppercase tracking-tighter text-foreground m-0 p-0 leading-[0.85] drop-shadow-lg">
                {titleFirst}
              </h1>
              <h1 className="text-6xl md:text-[5.5rem] font-black uppercase tracking-tighter text-primary m-0 p-0 leading-[0.85] drop-shadow-lg">
                {titleRest}
              </h1>
            </div>
          </div>

          <div className="w-20 h-1 bg-primary mb-8 ml-2" />

          <p className="text-muted-foreground max-w-lg text-lg leading-relaxed mb-10 font-medium ml-2">
            Oficjalna strona {clubName || 'Klubu'}. <br/>
            Bądź na bieżąco z najnowszymi wiadomościami, meczami i ekskluzywnymi treściami klubowymi.
          </p>

          <div className="flex items-center gap-6 ml-2">
            <a href="#" className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary text-muted-foreground transition-colors group">
              <Globe className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary text-muted-foreground transition-colors group">
              <FacebookIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary text-muted-foreground transition-colors group">
              <InstagramIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary text-muted-foreground transition-colors group">
              <YoutubeIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: "KLUB" Menu Card */}
        <div className="flex justify-start lg:justify-end pt-12">
          <div className="bg-secondary/80 backdrop-blur-2xl border border-border rounded-3xl p-8 w-full max-w-[420px] shadow-2xl">
            <h2 className="text-primary font-black text-xl md:text-2xl uppercase tracking-widest mb-8 px-2">KLUB</h2>
            
            <div className="flex flex-col gap-2">
              <Link href="/history" className="flex items-center justify-between group px-4 py-5 border border-transparent hover:border-border hover:bg-primary/5 rounded-2xl transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <Trophy className="w-6 h-6 text-primary" />
                  <span className="text-foreground/80 font-semibold text-lg md:text-xl tracking-wide group-hover:text-foreground transition-colors">Historia</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
              
              <Link href="/stadium" className="flex items-center justify-between group px-4 py-5 border border-transparent hover:border-border hover:bg-primary/5 rounded-2xl transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
                      <path d="M4 14.5C4 14.5 9 12 12 12C15 12 20 14.5 20 14.5" />
                      <path d="M20 14.5V19C20 19 15 22 12 22C9 22 4 19 4 19V14.5" />
                      <path d="M12 12V4" />
                      <path d="M8 6H16" />
                    </svg>
                  </div>
                  <span className="text-foreground/80 font-semibold text-lg md:text-xl tracking-wide group-hover:text-foreground transition-colors">Stadion</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
              
              <Link href="/board" className="flex items-center justify-between group px-4 py-5 border border-transparent hover:border-border hover:bg-primary/5 rounded-2xl transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <Users className="w-6 h-6 text-primary" />
                  <span className="text-foreground/80 font-semibold text-lg md:text-xl tracking-wide group-hover:text-foreground transition-colors">Zarząd</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
              
              <Link href="/careers" className="flex items-center justify-between group px-4 py-5 border border-transparent hover:border-border hover:bg-primary/5 rounded-2xl transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <Briefcase className="w-6 h-6 text-primary" />
                  <span className="text-foreground/80 font-semibold text-lg md:text-xl tracking-wide group-hover:text-foreground transition-colors">Kariera</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
              
              <Link href="/contact" className="flex items-center justify-between group px-4 py-5 border border-transparent hover:border-border hover:bg-primary/5 rounded-2xl transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <Mail className="w-6 h-6 text-primary" />
                  <span className="text-foreground/80 font-semibold text-lg md:text-xl tracking-wide group-hover:text-foreground transition-colors">Kontakt</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
