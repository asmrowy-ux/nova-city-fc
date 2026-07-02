"use client";

import { Menu, Search, ShoppingBag, Globe, ChevronDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";

export default function ClientNavbar({ logoUrl, title, logoSize }: { logoUrl?: string, title?: string, logoSize?: number }) {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  const titleParts = title ? title.split(' ') : ['WICHER', 'GDYNIA'];
  const titleFirst = titleParts[0] || 'WICHER';
  const titleRest = titleParts.slice(1).join(' ') || 'GDYNIA';

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 min-h-[5rem] gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={title || "Club Logo"} 
                  style={{ height: logoSize ? `${logoSize}px` : '56px', width: 'auto' }} 
                  className="object-contain" 
                />
              ) : (
                <div className="w-14 h-14 bg-primary flex items-center justify-center font-bold text-background" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  NC
                </div>
              )}
              <div className="hidden sm:flex flex-col leading-none pt-1">
                <div className="font-black text-xl md:text-2xl tracking-wider uppercase drop-shadow-sm flex gap-1">
                  <span className="text-foreground">{titleFirst}</span>
                  <span className="text-primary">{titleRest}</span>
                </div>
                <span className="text-foreground/50 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-1">
                  KLUB SPORTOWY
                </span>
              </div>
            </Link>
          </div>
          
          {/* Main Links */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            <Link href="/news" className="text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/80 hover:text-primary transition-colors">
              AKTUALNOŚCI
            </Link>
            <Link href="/team" className="text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/80 hover:text-primary transition-colors">
              DRUŻYNY
            </Link>
            
            {/* Klub dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/80 hover:text-primary transition-colors">
                KLUB
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 bg-secondary border border-border rounded-lg overflow-hidden shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                <Link href="/history" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors border-b border-border">
                  🏛️ Historia Klubu
                </Link>
                <Link href="/hall-of-fame" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors border-b border-border">
                  ⭐ Hall of Fame
                </Link>
                <Link href="/team" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors border-b border-border">
                  👥 Pierwsza Drużyna
                </Link>
                <Link href="/staff" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors border-b border-border">
                  🏋️ Sztab Trenerski
                </Link>
                <Link href="/table" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors border-b border-border">
                  📊 Tabela Ligi
                </Link>
                <Link href="/matches" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors">
                  ⚽ Mecze i Wyniki
                </Link>
              </div>
            </div>

            <Link href="/careers" className="text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/80 hover:text-primary transition-colors">
              KARIERA
            </Link>
            <Link href="/contact" className="text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/80 hover:text-primary transition-colors">
              KONTAKT
            </Link>
            <Link href="/shop" className="text-[11px] font-bold tracking-[0.1em] uppercase text-primary hover:text-foreground transition-colors">
              SKLEP
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="group relative hidden sm:flex items-center cursor-pointer">
              <Globe className="w-5 h-5 text-foreground/60 hover:text-primary transition-colors" />
              <div className="absolute top-full mt-4 right-0 bg-secondary border border-border rounded overflow-hidden shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href={pathname} locale="pl" className="block px-5 py-2 text-[11px] font-bold text-foreground/80 hover:bg-primary hover:text-background">PL</Link>
                <Link href={pathname} locale="en" className="block px-5 py-2 text-[11px] font-bold text-foreground/80 hover:bg-primary hover:text-background">EN</Link>
                <Link href={pathname} locale="uk" className="block px-5 py-2 text-[11px] font-bold text-foreground/80 hover:bg-primary hover:text-background">UK</Link>
              </div>
            </div>
            <button className="text-foreground/60 hover:text-primary transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-foreground/80 hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-background text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <Link 
              href="/join" 
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary text-background font-bold text-[11px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-all rounded-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              DOŁĄCZ DO KLUBU
            </Link>
            <button className="lg:hidden text-foreground">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <CartDrawer />
    </nav>
  );
}
