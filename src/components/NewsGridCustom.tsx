import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function NewsGridCustom({ posts = [], clubName = '', logoRef = '' }: { posts: any[], clubName?: string, logoRef?: string }) {
  if (!posts || posts.length === 0) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 3);

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const mainImageUrl = mainPost.mainImage?.asset?._ref ? getImageUrl(mainPost.mainImage.asset._ref) : '';
  const fallbackLogoUrl = getImageUrl(logoRef);

  const renderFallback = () => (
    <div className="w-full h-full bg-gradient-animated flex items-center justify-center p-8 relative overflow-hidden">
      {fallbackLogoUrl ? (
        <img src={fallbackLogoUrl} alt={clubName} className="w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-50 drop-shadow-2xl z-10" />
      ) : (
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary opacity-50 z-10">NC</div>
      )}
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />
    </div>
  );

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-primary font-black text-2xl uppercase tracking-widest mb-12">AKTUALNOŚCI</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Big News Card */}
          <Link href={`/news/${mainPost.slug?.current}`} className="group relative rounded-3xl overflow-hidden min-h-[400px] border border-border flex flex-col justify-end p-8 cursor-pointer">
            <div className="absolute inset-0 z-0">
              {mainImageUrl ? (
                <>
                  <img 
                    src={mainImageUrl} 
                    alt={mainPost.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-animated opacity-20 pointer-events-none z-10" />
                </>
              ) : (
                renderFallback()
              )}
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-20" />
            </div>

            <div className="relative z-10 flex flex-col items-start w-full">
              <div className="bg-primary text-background text-xs font-black px-3 py-1 uppercase tracking-widest rounded mb-auto absolute top-0 right-0 m-8">
                AKTUALNOŚĆ
              </div>
              
              <div className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-4">
                {new Date(mainPost.publishedAt).toLocaleDateString('pl-PL', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')}
              </div>
              
              <h3 className="text-foreground font-black text-3xl md:text-4xl uppercase tracking-tight mb-6 line-clamp-2">
                {mainPost.title}
              </h3>
              
              <div className="text-primary font-bold text-sm tracking-widest flex items-center gap-2 group-hover:text-foreground transition-colors">
                Czytaj więcej <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Right Side Smaller Cards */}
          <div className="flex flex-col gap-6">
            {sidePosts.map((post, index) => {
              const imageUrl = post.mainImage?.asset?._ref ? getImageUrl(post.mainImage.asset._ref) : '';
              return (
                <Link key={post._id || index} href={`/news/${post.slug?.current}`} className="group flex flex-col sm:flex-row bg-secondary border border-border rounded-3xl overflow-hidden cursor-pointer hover:bg-secondary/80 transition-colors flex-1">
                  <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden shrink-0">
                    {imageUrl ? (
                      <>
                        <img 
                          src={imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-animated opacity-20 pointer-events-none z-10" />
                      </>
                    ) : (
                      renderFallback()
                    )}
                  </div>
                  
                  <div className="p-8 flex flex-col justify-center flex-1 relative">
                    <h3 className="text-foreground font-bold text-xl leading-snug mb-4 pr-6">
                      {post.title}
                    </h3>
                    <div className="text-foreground/50 text-xs font-bold uppercase tracking-widest">
                      {new Date(post.publishedAt).toLocaleDateString('pl-PL', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')}
                    </div>
                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 transform duration-300" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
