"use client";

import { Menu, Search, ShoppingBag, Globe, ChevronDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { ThemeToggle } from "./ThemeToggle";

export default function ClientNavbar({ logoUrl, title, logoSize }: { logoUrl?: string, title?: string, logoSize?: number }) {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  const navLinks: { key: string; href: string }[] = [
    { key: 'news', href: '/news' },
    { key: 'team', href: '/team' },
    { key: 'staff', href: '/staff' },
    { key: 'matches', href: '/matches' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 min-h-[5rem] gap-8">
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex-shrink-0 flex items-center gap-1">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={title || "Club Logo"} 
                  style={{ height: logoSize ? `${logoSize}px` : '48px', width: 'auto' }} 
                  className="object-contain" 
                />
              ) : (
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-background">
                  NC
                </div>
              )}
              <span className="font-black text-xl tracking-wider uppercase hidden sm:block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent drop-shadow-sm">
                {title || ''}
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((item) => (
              <Link 
                key={item.key} 
                href={item.href} 
                className="text-sm font-semibold tracking-widest uppercase hover:text-primary transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}

            {/* Klub dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-semibold tracking-widest uppercase hover:text-primary transition-colors">
                {t('club')}
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-secondary border border-border rounded-lg overflow-hidden shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                <Link href="/history" className="block px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-colors border-b border-border">
                  🏛️ Historia Klubu
                </Link>
                <Link href="/hall-of-fame" className="block px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-colors border-b border-border">
                  ⭐ Hall of Fame
                </Link>
                <Link href="/team" className="block px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-colors border-b border-border">
                  👥 Pierwsza Drużyna
                </Link>
                <Link href="/staff" className="block px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-colors border-b border-border">
                  🏋️ Sztab Trenerski
                </Link>
                <Link href="/table" className="block px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-colors border-b border-border">
                  📊 Tabela Ligi
                </Link>
                <Link href="/matches" className="block px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-colors">
                  ⚽ Mecze i Wyniki
                </Link>
              </div>
            </div>

            <Link 
              href="/shop" 
              className="text-sm font-semibold tracking-widest uppercase hover:text-primary transition-colors"
            >
              {t('shop')}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="group relative hidden sm:flex items-center cursor-pointer">
              <Globe className="w-5 h-5 text-gray-400 hover:text-primary transition-colors" />
              <div className="absolute top-full mt-2 right-0 bg-secondary border border-border rounded overflow-hidden shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href={pathname} locale="pl" className="block px-4 py-2 text-xs font-bold hover:bg-primary hover:text-background">PL</Link>
                <Link href={pathname} locale="en" className="block px-4 py-2 text-xs font-bold hover:bg-primary hover:text-background">EN</Link>
                <Link href={pathname} locale="uk" className="block px-4 py-2 text-xs font-bold hover:bg-primary hover:text-background">UK</Link>
              </div>
            </div>
            <button className="text-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-foreground hover:text-primary transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <Link 
              href="/tickets" 
              className="hidden sm:inline-flex items-center justify-center px-6 py-2 border border-primary text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-background transition-all"
            >
              {t('tickets')}
            </Link>
            <button className="md:hidden text-foreground">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
