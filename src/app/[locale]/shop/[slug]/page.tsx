import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug }
  );

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 w-full flex items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-500">Produkt nie znaleziony</h1>
        </div>
        <Footer />
      </main>
    );
  }

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const imageUrl = getImageUrl(product.image?.asset?._ref);

  const cartItem = {
    id: product._id,
    name: product.name,
    price: product.price,
    imageUrl,
    type: 'product' as const,
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Klub</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-primary transition-colors">Sklep</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-secondary/30 rounded-2xl p-12 border border-border flex items-center justify-center min-h-[500px]">
             {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={product.name} 
                  className="w-full h-auto max-h-[600px] object-contain mix-blend-multiply dark:mix-blend-normal"
                />
              ) : (
                <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Brak zdjęcia</span>
              )}
          </div>
          
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-4">
              {product.category === 'clothing' ? 'Odzież' : product.category === 'accessories' ? 'Akcesoria' : 'Pamiątki'}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-foreground">
              {product.name}
            </h1>
            
            <div className="text-4xl font-black text-primary mb-8">
              {product.price.toFixed(2)} PLN
            </div>
            
            <p className="text-lg text-gray-400 mb-12 leading-relaxed">
              {product.description}
            </p>
            
            <div className="mt-auto border-t border-border pt-8 flex flex-col gap-4">
               {!product.inStock && (
                  <div className="bg-red-900/20 text-red-500 font-bold text-sm px-4 py-3 rounded-md uppercase tracking-widest border border-red-900/50">
                    Obecnie brak w magazynie
                  </div>
               )}
               <AddToCartButton item={cartItem} disabled={!product.inStock} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
