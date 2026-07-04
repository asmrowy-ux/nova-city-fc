"use client";

import { Menu, Search, ShoppingBag, Globe, ChevronDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";

export default function ClientNavbar({ logoUrl, title, logoSize, mainMenu }: { logoUrl?: string, title?: string, logoSize?: number, mainMenu?: any[] }) {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const titleParts = title ? title.split(' ') : ['WICHER', 'GDYNIA'];
  const titleFirst = titleParts[0] || 'WICHER';
  const titleRest = titleParts.slice(1).join(' ') || 'GDYNIA';

  return (
    <nav 
      className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-sm border-b border-border"
      style={{ backgroundColor: 'color-mix(in srgb, var(--theme-header-bg) 95%, transparent)' }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 min-h-[5rem] gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center min-w-0">
            <Link href="/" className="flex items-center gap-1 sm:gap-2 min-w-0">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={title || "Club Logo"} 
                  style={{ height: logoSize ? `${logoSize}px` : '56px', width: 'auto' }} 
                  className="object-contain shrink-0 max-h-[40px] sm:max-h-[56px]" 
                />
              ) : (
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary flex items-center justify-center font-bold text-background shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  NC
                </div>
              )}
              <div className="flex flex-col leading-none min-w-0">
                <div className="font-black text-xs sm:text-base md:text-xl tracking-wider uppercase drop-shadow-sm flex flex-wrap gap-x-1">
                  <span className="text-foreground">{titleFirst}</span>
                  <span className="text-primary">{titleRest}</span>
                </div>
                <span className="text-gray-500 text-[7px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mt-1 whitespace-nowrap">
                  KLUB SPORTOWY
                </span>
              </div>
            </Link>
          </div>
          
          {/* Main Links */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            {mainMenu && mainMenu.length > 0 ? (
              mainMenu.map((item, idx) => {
                if (item._type === 'menuItem') {
                  return (
                    <Link key={idx} href={item.link || '#'} className="text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/80 hover:text-primary transition-colors">
                      {item.title}
                    </Link>
                  );
                }
                if (item._type === 'menuDropdown') {
                  return (
                    <div key={idx} className="group relative">
                      <button className="flex items-center gap-1 text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/80 hover:text-primary transition-colors">
                        {item.title}
                        <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                      </button>
                      <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 bg-secondary border border-border rounded-lg overflow-hidden shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                        {item.items?.map((subItem: any, subIdx: number) => (
                          <Link key={subIdx} href={subItem.link || '#'} className={`block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors ${subIdx !== item.items.length - 1 ? 'border-b border-border' : ''}`}>
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <>
                <Link href="/news" className="text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/80 hover:text-primary transition-colors">
                  AKTUALNOŚCI
                </Link>
                
                {/* Drużyny dropdown */}
                <div className="group relative">
                  <button className="flex items-center gap-1 text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/80 hover:text-primary transition-colors">
                    DRUŻYNY
                    <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 bg-secondary border border-border rounded-lg overflow-hidden shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                    <Link href="/team" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors border-b border-border">
                      Pierwsza Drużyna
                    </Link>
                    <Link href="/women" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors border-b border-border">
                      Drużyna Kobiet
                    </Link>
                    <Link href="/academy" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors border-b border-border">
                      Akademia
                    </Link>
                  </div>
                </div>
                
                {/* Klub dropdown */}
                <div className="group relative">
                  <button className="flex items-center gap-1 text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/80 hover:text-primary transition-colors">
                    KLUB
                    <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 bg-secondary border border-border rounded-lg overflow-hidden shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                    <Link href="/history" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors border-b border-border">
                      Historia Klubu
                    </Link>
                    <Link href="/hall-of-fame" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors border-b border-border">
                      Hall of Fame
                    </Link>
                    <Link href="/staff" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors border-b border-border">
                      Sztab Trenerski
                    </Link>
                    <Link href="/table" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors border-b border-border">
                      Tabela Ligi
                    </Link>
                    <Link href="/matches" className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground/80 hover:bg-primary hover:text-background transition-colors">
                      Mecze i Wyniki
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
              </>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
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
              href="/contact" 
              className="hidden sm:inline-flex relative items-center justify-center gap-1.5 px-6 py-2.5 font-bold text-[11px] uppercase tracking-widest hover:text-background transition-all group"
              style={{
                clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
                color: 'var(--theme-btn-nav)'
              }}
            >
              <div className="absolute inset-0 border pointer-events-none" style={{ borderColor: 'var(--theme-btn-nav)', clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}></div>
              <div className="absolute inset-0 opacity-10 group-hover:opacity-100 transition-opacity -z-10" style={{ backgroundColor: 'var(--theme-btn-nav)' }}></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 z-10 group-hover:text-background">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="z-10 group-hover:text-background">DOŁĄCZ DO KLUBU</span>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-foreground">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border py-4 px-4 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-4">
              <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold tracking-wider uppercase text-foreground hover:text-primary">AKTUALNOŚCI</Link>
              <Link href="/team" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold tracking-wider uppercase text-foreground hover:text-primary">PIERWSZA DRUŻYNA</Link>
              <Link href="/academy" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold tracking-wider uppercase text-foreground hover:text-primary">AKADEMIA</Link>
              <Link href="/table" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold tracking-wider uppercase text-foreground hover:text-primary">TABELA LIGI</Link>
              <Link href="/matches" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold tracking-wider uppercase text-foreground hover:text-primary">MECZE I WYNIKI</Link>
              <Link href="/history" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold tracking-wider uppercase text-foreground hover:text-primary">HISTORIA KLUBU</Link>
              <Link href="/board" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold tracking-wider uppercase text-foreground hover:text-primary">ZARZĄD</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold tracking-wider uppercase text-foreground hover:text-primary">KONTAKT</Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold tracking-wider uppercase text-primary">SKLEP</Link>
              
              <div className="flex gap-4 pt-4 border-t border-border">
                <Link href={pathname} locale="pl" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-foreground">PL</Link>
                <Link href={pathname} locale="en" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-foreground">EN</Link>
                <Link href={pathname} locale="uk" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-foreground">UK</Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <CartDrawer />
    </nav>
  );
}
