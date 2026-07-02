import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { ChevronRight, ShoppingBag } from "lucide-react";

export default async function ShopPage() {
  const [products, settings] = await Promise.all([
    client.fetch(`*[_type == "product"] | order(_createdAt desc)`),
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
          <span className="text-primary">Sklep</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-border pb-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Oficjalny <span className="text-primary">Sklep</span>
          </h1>
          <div className="flex items-center gap-2 text-gray-400">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-bold tracking-widest uppercase text-sm">{products.length} Produktów</span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-secondary/50 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-4 text-gray-500 dark:text-gray-400">Brak produktów.</h2>
            <p className="text-gray-400 dark:text-gray-500">Przejdź do Sanity Studio, aby dodać pierwsze produkty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => {
              const imageUrl = getImageUrl(product.image?.asset?._ref);
              
              return (
                <div key={product._id} className="group bg-secondary/30 rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                  <div className="aspect-square relative bg-white dark:bg-zinc-900 p-6 flex items-center justify-center">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center overflow-hidden relative opacity-20">
                        {clubLogoUrl ? <img src={clubLogoUrl} alt="Logo" className="w-1/2 h-1/2 object-contain" /> : <ShoppingBag className="w-12 h-12" />}
                      </div>
                    )}
                    
                    {!product.inStock && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full">
                        Brak w magazynie
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col bg-secondary border-t border-border">
                    <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">
                      {product.category === 'clothing' ? 'Odzież' : product.category === 'accessories' ? 'Akcesoria' : 'Pamiątki'}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-6 flex-1 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl font-black text-foreground">
                        {product.price.toFixed(2)} PLN
                      </span>
                      <button 
                        disabled={!product.inStock}
                        className="bg-primary text-background font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-md hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {product.inStock ? 'Kup Teraz' : 'Niedostępne'}
                      </button>
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
