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
    favicon { asset { _ref } },
    logo { asset { _ref } }
  }`);

  let iconUrl = "/favicon.ico";
  const iconRef = settings?.favicon?.asset?._ref || settings?.logo?.asset?._ref;
  if (iconRef) {
    iconUrl = `https://cdn.sanity.io/images/3kzdw0qu/production/${iconRef.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg').replace('-ico', '.ico')}?w=64&h=64&fit=crop`;
  }

  return {
    title: {
      template: `%s | ${settings?.title || ''}`,
      default: settings?.title || '',
    },
    description: "Welcome to the official website. News, fixtures, and more.",
    icons: {
      icon: iconUrl,
    },
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
    secondaryColor,
    foregroundColor,
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
  const themeSecondary = settings?.secondaryColor || '#1a1a1a';
  const themeFg = settings?.foregroundColor || '#f5f5f5';

  return (
    <html lang={locale} className={`${inter.variable} antialiased scroll-smooth`} suppressHydrationWarning>
      <body 
        className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-black"
        style={{
          '--decoration-color': decorationColor,
          '--decoration-display': showDecorations ? 'block' : 'none',
          '--theme-primary': themePrimary,
          '--theme-bg': themeBg,
          '--theme-secondary': themeSecondary,
          '--theme-fg': themeFg,
        } as React.CSSProperties}
      >
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
