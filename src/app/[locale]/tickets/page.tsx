import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { ChevronRight, Ticket, CalendarDays } from "lucide-react";

export default async function TicketsPage() {
  const [tickets, settings] = await Promise.all([
    client.fetch(`*[_type == "ticket"] | order(eventDate asc)`),
    client.fetch(`*[_type == "siteSettings"][0]{ title, logo { asset { _ref } } }`)
  ]);

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const clubLogoUrl = getImageUrl(settings?.logo?.asset?._ref);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Klub</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">Bilety</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-border pb-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Centrum <span className="text-primary">Biletów</span>
          </h1>
          <div className="flex items-center gap-2 text-gray-400">
            <Ticket className="w-5 h-5" />
            <span className="font-bold tracking-widest uppercase text-sm">{tickets.length} Dostępnych Wydarzeń</span>
          </div>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-20 bg-secondary/50 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-4 text-gray-500 dark:text-gray-400">Brak biletów w sprzedaży.</h2>
            <p className="text-gray-400 dark:text-gray-500">Przejdź do Sanity Studio, aby dodać pierwsze pakiety biletowe.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tickets.map((ticket: any) => {
              const imageUrl = getImageUrl(ticket.image?.asset?._ref);
              const eventDate = ticket.eventDate ? new Date(ticket.eventDate) : null;
              
              return (
                <div key={ticket._id} className="group bg-secondary/30 rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col sm:flex-row">
                  <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto relative bg-background border-b sm:border-b-0 sm:border-r border-border overflow-hidden">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={ticket.title} 
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-background p-6">
                        {clubLogoUrl && <img src={clubLogoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-20 dark:opacity-30 mix-blend-luminosity" />}
                        <Ticket className="w-16 h-16 text-gray-500/50 relative z-10" />
                      </div>
                    )}
                    
                    <div className="absolute top-4 left-4 bg-primary text-background text-xs font-bold px-3 py-1 uppercase tracking-widest rounded">
                      {ticket.category === 'vip' ? 'VIP' : ticket.category === 'season' ? 'Karnet' : ticket.category === 'discount' ? 'Ulgowy' : 'Normalny'}
                    </div>
                  </div>
                  
                  <div className="p-8 sm:w-3/5 flex flex-col bg-secondary">
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-foreground group-hover:text-primary transition-colors">
                      {ticket.title}
                    </h3>
                    
                    {eventDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 bg-background/50 p-3 rounded-lg border border-border">
                        <CalendarDays className="w-4 h-4 text-primary" />
                        <span className="font-bold">{eventDate.toLocaleDateString('pl-PL')}</span>
                        <span>{eventDate.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    )}

                    <p className="text-sm text-gray-400 mb-8 flex-1">
                      {ticket.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-3xl font-black text-foreground">
                        {ticket.price.toFixed(2)} PLN
                      </span>
                      <Link 
                        href={`/tickets/${ticket.slug.current}`}
                        className="bg-primary text-background font-bold uppercase tracking-widest text-xs px-6 py-4 rounded-md hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
                      >
                        <Ticket className="w-4 h-4" />
                        Szczegóły
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
