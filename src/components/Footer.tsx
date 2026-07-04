import { MessageCircle, Camera, Globe, Video } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import SponsorCarousel from "./SponsorCarousel";

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

export default async function Footer() {
  const t = await getTranslations("Footer");

  const sponsors = await client.fetch(`*[_type == "sponsor"] | order(order asc){
    _id, name, url, tier,
    logo { asset { _ref } }
  }`);

  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ 
    title, 
    logoSize,
    footerDescription,
    footerCopyright,
    logo { asset { _ref } } 
  }`);

  let logoUrl = "";
  if (settings?.logo?.asset?._ref) {
    const ref = settings.logo.asset._ref;
    logoUrl = `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const clubName = settings?.title || '';
  const footerDesc = settings?.footerDescription || t('description', { clubName });
  const footerCopy = settings?.footerCopyright || `© ${new Date().getFullYear()} ${clubName}. Wszelkie prawa zastrzeżone.`;

  return (
    <>
      {/* Sponsor Carousel globally visible on all pages just above the footer content */}
      <div className="bg-background border-b border-border">
        <SponsorCarousel sponsors={sponsors} />
      </div>

      <footer className="bg-secondary pt-20 pb-10 border-t border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-2">
              <Link href="/" className="flex items-center gap-1 mb-6">
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
                <div className="flex flex-col leading-none">
                  <div className="font-black text-xl tracking-wider uppercase drop-shadow-sm flex gap-1">
                    <span className="text-foreground">{clubName ? clubName.split(' ')[0] : 'WICHER'}</span>
                    <span className="text-primary">{clubName ? clubName.split(' ').slice(1).join(' ') : 'GDYNIA'}</span>
                  </div>
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                    KLUB SPORTOWY
                  </span>
                </div>
              </Link>
              <p className="text-gray-400 text-sm mb-6 max-w-sm">
                {footerDesc}
              </p>
              <div className="flex gap-4">
                {[Globe, FacebookIcon, InstagramIcon, YoutubeIcon].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-background/50 border border-border flex items-center justify-center hover:bg-primary hover:text-background hover:border-primary transition-all group">
                    <Icon className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
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

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium border-t border-border/50 pt-8">
            <p>{footerCopy}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/legal/privacy" className="hover:text-foreground transition-colors">{t('privacy')}</Link>
              <Link href="/legal/terms" className="hover:text-foreground transition-colors">{t('terms')}</Link>
              <Link href="/legal/cookies" className="hover:text-foreground transition-colors">{t('cookies')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
