import { MessageCircle, Camera, Globe, Video } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import SponsorCarousel from "./SponsorCarousel";

export default async function Footer() {
  const t = await getTranslations("Footer");

  const sponsors = await client.fetch(`*[_type == "sponsor"] | order(order asc){
    _id, name, url, tier,
    logo { asset { _ref } }
  }`);

  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ 
    title, 
    logoSize,
    logo { asset { _ref } } 
  }`);

  let logoUrl = "";
  if (settings?.logo?.asset?._ref) {
    const ref = settings.logo.asset._ref;
    logoUrl = `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const clubName = settings?.title || '';

  return (
    <footer className="bg-secondary pt-20 pb-10 border-t border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={clubName || "Club Logo"} 
                  style={{ height: settings?.logoSize ? `${settings.logoSize}px` : '56px', width: 'auto' }}
                  className="object-contain shrink-0" 
                />
              ) : (
                <div className="w-14 h-14 bg-primary flex items-center justify-center font-bold text-background text-lg shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  NC
                </div>
              )}
              <div className="flex flex-col leading-none pt-1">
                <div className="font-black text-xl tracking-wider uppercase drop-shadow-sm flex gap-1">
                  <span className="text-white">{clubName ? clubName.split(' ')[0] : 'WICHER'}</span>
                  <span className="text-primary">{clubName ? clubName.split(' ').slice(1).join(' ') : 'GDYNIA'}</span>
                </div>
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                  KLUB SPORTOWY
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              {t('description', { clubName })}
            </p>
            <div className="flex gap-4">
              {[Globe, MessageCircle, Camera, Video].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-background/50 border border-border flex items-center justify-center hover:bg-primary hover:text-background hover:border-primary transition-all">
                  <Icon className="w-5 h-5 text-foreground" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-bold uppercase tracking-widest mb-6">{t('club')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/history" className="hover:text-primary transition-colors">{t('history')}</Link></li>
              <li><Link href="/stadium" className="hover:text-primary transition-colors">{t('stadium')}</Link></li>
              <li><Link href="/board" className="hover:text-primary transition-colors">{t('executive')}</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">{t('careers')}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold uppercase tracking-widest mb-6">{t('teams')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              {[
                { key: 'firstTeam', href: '/team' },
                { key: 'womensTeam', href: '/women' },
                { key: 'academy', href: '/academy' },
                { key: 'staff', href: '/staff' }
              ].map(link => (
                <li key={link.key}><Link href={link.href} className="hover:text-primary transition-colors">{t(link.key as any)}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold uppercase tracking-widest mb-6">{t('newsletter')}</h4>
            <p className="text-sm text-gray-400 mb-4">{t('newsletterDesc')}</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder={t('enterEmail')} 
                className="bg-background border border-border px-4 py-3 w-full text-sm focus:outline-none focus:border-primary text-foreground"
              />
              <button className="bg-primary text-background font-bold px-4 hover:bg-foreground hover:text-background transition-colors">
                {t('go')}
              </button>
            </form>
          </div>
        </div>

        {/* Sponsor Carousel */}
        <SponsorCarousel sponsors={sponsors} />

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} {t('rights', { clubName })}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">{t('privacy')}</Link>
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">{t('terms')}</Link>
            <Link href="/legal/cookies" className="hover:text-foreground transition-colors">{t('cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
