import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { PortableText } from '@portabletext/react';
import ContactForm from "@/components/ContactForm";

export default async function ContactPage() {
  const [contact, settings] = await Promise.all([
    client.fetch(`*[_type == "contact"][0]{
      ...,
      mainImage { asset { _ref } }
    }`),
    client.fetch(`*[_type == "siteSettings"][0]{ title, logo { asset { _ref } } }`)
  ]);

  const clubName = settings?.title || '';

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const imageUrl = getImageUrl(contact?.mainImage?.asset?._ref);
  const clubLogoUrl = getImageUrl(settings?.logo?.asset?._ref);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Klub</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">Kontakt</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">
          Skontaktuj się <span className="text-primary">z nami</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            {!contact ? (
              <div className="mb-12 text-center p-8 bg-secondary/30 rounded-xl border border-border">
                <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm">Dodaj dane kontaktowe (telefon, email, adres) w Sanity Studio.</p>
              </div>
            ) : (
              <>
                <div className="space-y-6 mb-12">
                  {contact.email && (
                    <div className="bg-secondary/30 p-6 rounded-xl border border-border flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                        <Mail className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Email</div>
                        <a href={`mailto:${contact.email}`} className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="bg-secondary/30 p-6 rounded-xl border border-border flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                        <Phone className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Telefon</div>
                        <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {contact.address && (
                    <div className="bg-secondary/30 p-6 rounded-xl border border-border flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                        <MapPin className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Siedziba Klubu</div>
                        <div className="text-lg font-bold text-foreground">
                          {contact.address}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {contact.description && (
                  <div className="prose dark:prose-invert prose-lg text-gray-700 dark:text-gray-300">
                    <PortableText value={contact.description} />
                  </div>
                )}
              </>
            )}

            <ContactForm recipientEmail={contact?.formRecipientEmail || contact?.email} />
          </div>

          <div className="relative">
            {imageUrl ? (
              <div 
                className={`sticky top-32 rounded-2xl overflow-hidden border border-border shadow-2xl mx-auto ${!contact?.imageSize ? 'h-full min-h-[400px]' : ''}`}
                style={{
                  maxWidth: contact?.imageSize ? `${contact.imageSize}px` : '100%',
                }}
              >
                <img 
                  src={imageUrl} 
                  alt="Siedziba klubu" 
                  className={contact?.imageSize ? "w-full h-auto object-contain" : "w-full h-full object-cover absolute inset-0"} 
                />
                {!contact?.imageSize && <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />}
              </div>
            ) : (
              <div className="sticky top-32 rounded-2xl overflow-hidden border border-border shadow-2xl h-full min-h-[400px] bg-secondary flex items-center justify-center relative">
                {clubLogoUrl && <img src={clubLogoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-20 dark:opacity-30 mix-blend-luminosity" />}
                <span className="text-gray-500 font-bold uppercase tracking-widest text-sm relative z-10">Brak zdjęcia</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
