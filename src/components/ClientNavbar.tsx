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
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#0a0a0a] border-b border-gray-900">
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
                  <span className="text-white">{titleFirst}</span>
                  <span className="text-primary">{titleRest}</span>
                </div>
                <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-1">
                  KLUB SPORTOWY
                </span>
              </div>
            </Link>
          </div>
          
          {/* Main Links */}
          <div className="hidden lg:flex space-x-8 xl:space-x-12 items-center">
            <Link href="/news" className="text-xs font-bold tracking-[0.15em] uppercase text-gray-300 hover:text-white transition-colors">
              AKTUALNOŚCI
            </Link>
            <Link href="/team" className="text-xs font-bold tracking-[0.15em] uppercase text-gray-300 hover:text-white transition-colors">
              DRUŻYNY
            </Link>
            <Link href="/history" className="text-xs font-bold tracking-[0.15em] uppercase text-gray-300 hover:text-white transition-colors">
              KLUB
            </Link>
            <Link href="/careers" className="text-xs font-bold tracking-[0.15em] uppercase text-gray-300 hover:text-white transition-colors">
              KARIERA
            </Link>
            <Link href="/contact" className="text-xs font-bold tracking-[0.15em] uppercase text-gray-300 hover:text-white transition-colors">
              KONTAKT
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-300 hover:text-white transition-colors"
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
              className="hidden sm:inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-background font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-background transition-all rounded-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              DOŁĄCZ DO KLUBU
            </Link>
            <button className="lg:hidden text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <CartDrawer />
    </nav>
  );
}
