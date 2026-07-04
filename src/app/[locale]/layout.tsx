import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { client } from "@/sanity/lib/client";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ 
    title,
    seoTitle,
    seoDescription,
    seoKeywords,
    seoImage { asset { _ref } },
    favicon { asset { _ref } },
    logo { asset { _ref } }
  }`);

  let iconUrl = "/favicon.ico";
  const iconRef = settings?.favicon?.asset?._ref || settings?.logo?.asset?._ref;
  if (iconRef) {
    iconUrl = `https://cdn.sanity.io/images/3kzdw0qu/production/${iconRef.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg').replace('-ico', '.ico')}?w=64&h=64&fit=crop`;
  }
  
  let ogImageUrl = "";
  const ogImageRef = settings?.seoImage?.asset?._ref || settings?.logo?.asset?._ref;
  if (ogImageRef) {
    ogImageUrl = `https://cdn.sanity.io/images/3kzdw0qu/production/${ogImageRef.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}?w=1200&h=630&fit=crop`;
  }

  const siteTitle = settings?.seoTitle || settings?.title || 'Klub Sportowy';
  const siteDesc = settings?.seoDescription || "Oficjalna strona klubu. Najnowsze wiadomości, mecze, tabele i skład.";

  return {
    title: {
      template: `%s | ${siteTitle}`,
      default: siteTitle,
    },
    description: siteDesc,
    keywords: settings?.seoKeywords || 'piłka nożna, klub, mecze, wyniki, sport',
    icons: {
      icon: iconUrl,
    },
    openGraph: {
      title: siteTitle,
      description: siteDesc,
      type: 'website',
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDesc,
      images: ogImageUrl ? [ogImageUrl] : [],
    }
  };
}

import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from '@/components/CartContext';

import RouteGuard from "@/components/RouteGuard";
import UnderConstruction from "@/components/UnderConstruction";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  // Fetch site settings to get mainMenu for RouteGuard and global decorative settings
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    decorationsEnabled,
    decorationsColor,
    primaryColor,
    backgroundColor,
    headerBackgroundColor,
    footerBackgroundColor,
    secondaryColor,
    foregroundColor,
    accentTextColor,
    buttonColorNavbar,
    buttonColorNews,
    buttonColorFooter,
    newsSectionTitleColor,
    sponsorsSectionTitleColor,
    mainMenu[] {
      _type,
      title,
      link,
      items[] {
        _type,
        title,
        link
      }
    }
  }`);
  
  const mainMenu = settings?.mainMenu || [];
  
  // Decoration settings
  const showDecorations = settings?.decorationsEnabled !== false; // default true
  const decorationColor = settings?.decorationsColor || '#FBBF24'; // default gold

  // Theme settings
  const themePrimary = settings?.primaryColor || '#d4af37';
  const themeBg = settings?.backgroundColor || '#050505';
  const themeHeaderBg = settings?.headerBackgroundColor || '#050505';
  const themeFooterBg = settings?.footerBackgroundColor || '#000000';
  const themeSecondary = settings?.secondaryColor || '#1a1a1a';
  const themeFg = settings?.foregroundColor || '#f5f5f5';
  const themeAccentText = settings?.accentTextColor || themePrimary; // Fallback to primary if not set
  
  const themeHeaderNews = settings?.newsSectionTitleColor || themePrimary; // Fallback to primary
  const themeHeaderSponsors = settings?.sponsorsSectionTitleColor || themePrimary; // Fallback to primary

  // Button settings
  const btnNav = settings?.buttonColorNavbar || decorationColor || themePrimary;
  const btnNews = settings?.buttonColorNews || themePrimary;
  const btnFooter = settings?.buttonColorFooter || themePrimary;

  // Gradient settings (fallback to empty string so CSS fallbacks take over)
  const newsGradientStart = settings?.newsGradientStart || '';
  const newsGradientMid = settings?.newsGradientMid || '';
  const newsGradientEnd = settings?.newsGradientEnd || '';

  return (
    <html lang={locale} className={`${inter.variable} antialiased scroll-smooth`} suppressHydrationWarning>
      <body 
        className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-black relative"
        style={{
          '--decoration-color': decorationColor,
          '--decoration-display': showDecorations ? 'block' : 'none',
          '--sanity-primary': themePrimary,
          '--sanity-bg': themeBg,
          '--sanity-header-bg': themeHeaderBg,
          '--sanity-footer-bg': themeFooterBg,
          '--sanity-secondary': themeSecondary,
          '--sanity-fg': themeFg,
          '--sanity-accent-text': themeAccentText,
          '--sanity-header-news': themeHeaderNews,
          '--sanity-header-sponsors': themeHeaderSponsors,
          '--sanity-btn-nav': btnNav || undefined,
          '--sanity-btn-news': btnNews || undefined,
          '--sanity-btn-footer': btnFooter || undefined,
          '--sanity-gradient-start': newsGradientStart || undefined,
          '--sanity-gradient-mid': newsGradientMid || undefined,
          '--sanity-gradient-end': newsGradientEnd || undefined,
        } as React.CSSProperties}
      >
        {/* Global Diagonal Accents for all pages */}
        <div className="fixed top-0 left-0 w-96 h-96 pointer-events-none overflow-hidden z-0" style={{ display: 'var(--decoration-display)' }}>
          <div className="absolute w-[500px] h-[2px] -rotate-45 top-[100px] -left-[150px] opacity-60 shadow-[0_0_10px_var(--decoration-color)]" style={{ backgroundColor: 'var(--decoration-color)' }} />
          <div className="absolute w-[500px] h-[1px] -rotate-45 top-[130px] -left-[120px] opacity-30" style={{ backgroundColor: 'var(--decoration-color)' }} />
        </div>

        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <CartProvider>
              <RouteGuard mainMenu={mainMenu} fallback={<UnderConstruction />}>
                {children}
              </RouteGuard>
            </CartProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
