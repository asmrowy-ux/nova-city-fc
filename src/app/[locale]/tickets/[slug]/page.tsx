import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { ChevronRight, CalendarDays, MapPin } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";

export default async function TicketPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const [ticket, settings] = await Promise.all([
    client.fetch(
      `*[_type == "ticket" && slug.current == $slug][0]`,
      { slug }
    ),
    client.fetch(`*[_type == "siteSettings"][0]{ title, logo { asset { _ref } } }`)
  ]);

  if (!ticket) {
    return (
      <main className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 w-full flex items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-500">Bilet nie znaleziony</h1>
        </div>
        <Footer />
      </main>
    );
  }

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const imageUrl = getImageUrl(ticket.image?.asset?._ref);
  const clubLogoUrl = getImageUrl(settings?.logo?.asset?._ref);
  const eventDate = ticket.eventDate ? new Date(ticket.eventDate) : null;

  const cartItem = {
    id: ticket._id,
    name: ticket.title,
    price: ticket.price,
    imageUrl,
    type: 'ticket' as const,
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Klub</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/tickets" className="hover:text-primary transition-colors">Bilety</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary truncate max-w-[200px]">{ticket.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-secondary/30 rounded-2xl border border-border overflow-hidden min-h-[500px] relative">
             {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={ticket.title} 
                  className="w-full h-full object-cover absolute inset-0"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-background p-6 absolute inset-0">
                  {clubLogoUrl && <img src={clubLogoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-20 dark:opacity-30 mix-blend-luminosity" />}
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-sm relative z-10">Grafika Wydarzenia</span>
                </div>
              )}
              
              <div className="absolute top-6 left-6 bg-primary text-background text-sm font-black px-4 py-2 uppercase tracking-widest rounded-md shadow-2xl">
                {ticket.category === 'vip' ? 'Bilet VIP' : ticket.category === 'season' ? 'Karnet' : ticket.category === 'discount' ? 'Bilet Ulgowy' : 'Bilet Normalny'}
              </div>
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-foreground">
              {ticket.title}
            </h1>
            
            {eventDate && (
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-4 bg-secondary p-4 rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <CalendarDays className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Data i czas</div>
                    <div className="font-bold text-lg text-foreground">
                      {eventDate.toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      <span className="mx-2 text-gray-400">•</span>
                      {eventDate.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-secondary p-4 rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Miejsce</div>
                    <div className="font-bold text-lg text-foreground">
                      Stadion Główny Nova City
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-4xl font-black text-primary mb-8">
              {ticket.price.toFixed(2)} PLN
            </div>
            
            <p className="text-lg text-gray-400 mb-12 leading-relaxed">
              {ticket.description}
            </p>
            
            <div className="mt-auto border-t border-border pt-8 flex flex-col gap-4">
               {!ticket.isAvailable && (
                  <div className="bg-red-900/20 text-red-500 font-bold text-sm px-4 py-3 rounded-md uppercase tracking-widest border border-red-900/50">
                    Wyprzedane
                  </div>
               )}
               <AddToCartButton item={cartItem} disabled={!ticket.isAvailable} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
